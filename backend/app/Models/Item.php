<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'inventory_id', 'image', 'quantity', 'user_id'];

    public function inventory()
    {
        return $this->belongsTo(Inventory::class,'inventory_id','id');
    }
}
