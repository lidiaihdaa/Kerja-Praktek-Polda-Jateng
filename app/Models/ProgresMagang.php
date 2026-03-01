<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgresMagang extends Model
{
    protected $fillable = [
        'user_id',
        'kegiatan',
        'dokumentasi',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
