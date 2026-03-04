<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use App\Models\Divisi;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Events\MahasiswaStatusUpdated;

class AdminMahasiswaController extends Controller
{

    public function approve($id)
    {
        return DB::transaction(function () use ($id) {

            $adminId = auth()->id();

            $mahasiswa = Mahasiswa::lockForUpdate()->findOrFail($id);

            if ($mahasiswa->status === 'diterima') {
                return response()->json([
                    'message' => 'Sudah diterima'
                ], 400);
            }

            $divisi = Divisi::where('nama_divisi', $mahasiswa->divisi)
                ->lockForUpdate()
                ->first();

            if (!$divisi || $divisi->sisa_kuota <= 0) {
                return response()->json([
                    'message' => 'Kuota habis'
                ], 400);
            }

            $divisi->decrement('sisa_kuota');

            $mahasiswa->update([
                'status' => 'diterima'
            ]);

            ActivityLog::create([
                'admin_id' => $adminId,
                'action' => 'approve',
                'mahasiswa_id' => $mahasiswa->id,
                'data' => [
                    'divisi' => $divisi->nama_divisi
                ]
            ]);

            event(new MahasiswaStatusUpdated($mahasiswa));

            return response()->json([
                'status' => 'success',
                'message' => 'Mahasiswa diterima'
            ]);
        });
    }

    public function reject($id)
    {
        return DB::transaction(function () use ($id) {

            $adminId = auth()->id();

            $mahasiswa = Mahasiswa::lockForUpdate()->findOrFail($id);

            if ($mahasiswa->status === 'diterima') {
                $divisi = Divisi::where('nama_divisi', $mahasiswa->divisi)
                    ->lockForUpdate()
                    ->first();

                if ($divisi) {
                    $divisi->increment('sisa_kuota');
                }
            }

            $mahasiswa->update([
                'status' => 'ditolak'
            ]);

            ActivityLog::create([
                'admin_id' => $adminId,
                'action' => 'reject',
                'mahasiswa_id' => $mahasiswa->id
            ]);

            event(new MahasiswaStatusUpdated($mahasiswa));

            return response()->json([
                'status' => 'success',
                'message' => 'Mahasiswa ditolak'
            ]);
        });
    }
}