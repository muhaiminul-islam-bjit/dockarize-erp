<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Sell;
use App\SellItems;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class SellController extends Controller
{
    use ResponseTrait;

    public function index(Request $request)
    {
        try {
            $Sell = Sell::orderBy('id', 'desc')->paginate($request->get('perPage'));
            return $this->success($Sell);
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage());
        }
    }

    public function getSellItems($sellId)
    {
        try {
            $Sell = SellItems::where('sell_id',$sellId)->get();
            return $this->success($Sell);
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage());
        }
    }
}
