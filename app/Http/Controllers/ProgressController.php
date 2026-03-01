<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\ProgresMagang;
use Illuminate\Support\Facades\Auth;

class ProgressController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'kegiatan' => 'required',
            'dokumentasi' => 'image|mimes:jpg,png|max:2048'
        ]);

        $path = $request->file('dokumentasi') ? $request->file('dokumentasi')->store('public/progres') : null;

        ProgresMagang::create([
            'user_id' => Auth::id(),
            'kegiatan' => $request->kegiatan,
            'dokumentasi' => $path ? basename($path) : null
        ]);

        return response()->json(['message' => 'Progres berhasil disimpan']);
    }
}
