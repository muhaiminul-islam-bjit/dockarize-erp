<?php

namespace App\Http\Controllers\API;

use App\Account;
use App\Customer;
use App\CustomerPayment;
use App\Http\Controllers\Controller;
use App\Purchase;
use App\Sell;
use App\Supplier;
use App\SupplierPayment;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    use ResponseTrait;

    public function customerPayment(Request $request)
    {
        DB::beginTransaction();
        try {
            $account = Account::find($request->account_id);
            $account->current_balance += $request->amount;
            $account->save();
            $customer = Customer::where('id', $request->customer_id)->first();
            $customerPayment = new CustomerPayment();
            $customerPayment->sell_id = " ";
            $customerPayment->customer_id = $request->customer_id;
            $customerPayment->customer_phone = $customer->customer_phone;
            $customerPayment->customer_name = $customer->customer_name;
            $customerPayment->amount = $request->amount;
            $customerPayment->date = $request->date;
            $customerPayment->account = $account->account_name;
            $customerPayment->save();
            $allSell = Sell::where('customer_id', $request->customer_id)->where('due', '>', 0)->get();
            $payment = $request->amount;
            foreach ($allSell as $sell) {
                if ($sell->due >= $payment) {
                    $sell->due -= $payment;
                    $sell->payment += $payment;
                    $sell->save();
                    $payment = 0;
                } else {
                    $sell->due = 0;
                    $sell->payment += $sell->due;
                    $sell->save();
                    $payment -= $sell->due;
                }

                if ($payment == 0) {
                    break;
                }
            }
            $previousDue = Sell::where('customer_id', $request->customer_id)->sum('due');
            DB::commit();
            return $this->success(null, $previousDue);
        } catch (\Throwable $th) {
            DB::rollback();
            return $this->failure($th->getMessage());
        }
    }

    public function getCustomerPayments(Request $request)
    {
        try {
            $payments = CustomerPayment::orderBy('id', 'desc')->where('customer_id',$request->get('customerId'))->paginate($request->get('perPage'));
            return $this->success($payments);
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage());
        }
    }

    public function supplierPayment(Request $request)
    {
        DB::beginTransaction();
        try {
            $account = Account::find($request->account_id);
            $account->current_balance -= $request->amount;
            $account->save();
            $supplier = Supplier::where('id', $request->supplier_id)->first();
            $purchase = Purchase::where('id',$request->purchase_id)->first();
            $supplierPayment = new SupplierPayment();
            $supplierPayment->purchase_id = $request->purchase_id;
            $supplierPayment->invoice_no = $purchase->invoice_no;
            $supplierPayment->supplier_id = $request->supplier_id;
            $supplierPayment->supplier_name = $supplier->supplier_name;
            $supplierPayment->supplier_phone = $supplier->supplier_phone;
            $supplierPayment->amount = $request->amount;
            $supplierPayment->date = $request->date;
            $supplierPayment->account = $account->account_name;
            $supplierPayment->save();
            DB::commit();
            return $this->success(null, "Payment Successful");
        } catch (\Throwable $th) {
            DB::rollback();
            return $this->failure($th->getMessage());
        }
    }

    public function getSupplierPayments(Request $request)
    {
        try {
            $payments = SupplierPayment::orderBy('id', 'desc')->where('supplier_id',$request->get('supplierId'))->paginate($request->get('perPage'));
            return $this->success($payments);
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage());
        }
    }
}
