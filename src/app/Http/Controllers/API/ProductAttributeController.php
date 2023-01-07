<?php

namespace App\Http\Controllers\API;

use App\Color;
use App\Size;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\ResponseTrait;

class ProductAttributeController extends Controller
{
    use ResponseTrait;
    
    public function storeColor(Request $request)
    {
        try {
            $color = new Color();
            $color->color = $request->color;
            $color->store_id = 1;
            $color->save();
            return $this->success(null, 'Inserted successfully');
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage());
        }
    }

    public function getAllColor()
    {
        try {
            $color = Color::orderBy('id', 'desc')->where('store_id', 1)->get()->map->formatSelect();
            return $this->success($color);
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage());
        }
    }

    public function storeSize(Request $request)
    {
        try {
            $size = new Size();
            $size->size = $request->size;
            $size->store_id = 1;
            $size->save();
            return $this->success(null, 'Inserted successfully');
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage());
        }
    }

    public function getAllSize()
    {
        try {
            $size = Size::orderBy('id', 'desc')->where('store_id', 1)->get()->map->formatSelect();
            return $this->success($size);
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage());
        }
    }
}
