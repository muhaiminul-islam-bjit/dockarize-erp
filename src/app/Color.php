<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    public function formatSelect()
    {
        return [
            'value'=>$this->color,
            'label'=>$this->color,
        ];
    }
}
