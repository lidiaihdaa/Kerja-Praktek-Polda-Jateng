<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;

class AdminPendaftarController extends Controller
{
    public function index()
    {
        $mahasiswa = Mahasiswa::with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $mahasiswa
        ]);
    }

    public function approve($id)
    {
        $mahasiswa = Mahasiswa::findOrFail($id);
        $mahasiswa->update(['status' => 'diterima']);

        return response()->json([
            'status' => 'success',
            'message' => 'Mahasiswa berhasil diterima'
        ]);
    }

    public function reject($id)
    {
        $mahasiswa = Mahasiswa::findOrFail($id);
        $mahasiswa->update(['status' => 'ditolak']);

        return response()->json([
            'status' => 'success',
            'message' => 'Mahasiswa berhasil ditolak'
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $mahasiswa = Mahasiswa::findOrFail($id);
        $mahasiswa->update(['status' => $request->status]);

        return response()->json([
            'status' => 'success',
            'data' => $mahasiswa
        ]);
    }
}