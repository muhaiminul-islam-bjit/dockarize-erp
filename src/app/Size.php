<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    public function formatSelect()
    {
        return [
            'value'=>$this->size,
            'label'=>$this->size,
        ];
    }
}
