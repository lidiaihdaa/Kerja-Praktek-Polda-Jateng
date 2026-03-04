<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;

class AdminPenilaianController extends Controller
{
    public function update(Request $request, $id)
    {
        $request->validate([
            'nilai' => 'required|numeric|min:0|max:100',
            'keterangan' => 'nullable|string'
        ]);

        $m = Mahasiswa::findOrFail($id);

        $m->update([
            'nilai' => $request->nilai,
            'keterangan' => $request->keterangan
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Penilaian diperbarui'
        ]);
    }
}