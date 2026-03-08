<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Divisi extends Model
{
    protected $table = 'divisis';

    protected $fillable = [
        'nama_divisi',
        'kuota_total',
        'sisa_kuota'
    ];
}