<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
use App\Models\Mahasiswa;

class AbsensiController extends Controller
{
    /**
     * 🔥 PROTEKSI STATUS MAGANG
     * Hanya mahasiswa dengan status 'diterima' yang boleh akses fitur magang
     */
    private function checkStatusMagang($user)
    {
        $mahasiswa = Mahasiswa::where('user_id', $user->id)->first();

        if (!$mahasiswa || $mahasiswa->status !== 'diterima') {
            return response()->json([
                'success' => false,
                'message' => 'Anda belum resmi diterima sebagai peserta magang.'
            ], 403);
        }

        return null;
    }

    /**
     * VERIFIKASI WAJAH + ABSEN MASUK/PULANG
     */
    public function verifyFace(Request $request)
{
    $user = Auth::user();

    // 🔒 Cek status magang
    if ($response = $this->checkStatusMagang($user)) {
        return $response;
    }

    $request->validate([
        'image' => 'required|string'
    ]);

    try {

        // 🔥 KIRIM KE AI SERVICE
        $pythonResponse = Http::timeout(15)->post(
            'http://127.0.0.1:8001/face/verify',
            [
                'user_id' => $user->id,
                'image' => $request->image
            ]
        );

        if (!$pythonResponse->successful()) {
            return response()->json([
                'success' => false,
                'message' => 'AI Service tidak merespon.'
            ], 500);
        }

        $aiResult = $pythonResponse->json();

        // 🔒 VALIDASI HASIL FACE RECOGNITION
        if (!$aiResult['verified']) {
            return response()->json([
                'success' => false,
                'message' => 'Wajah tidak cocok.',
                'similarity' => $aiResult['similarity'] ?? 0
            ], 400);
        }

        $hariIni = Carbon::today()->toDateString();
        $sekarang = Carbon::now()->toTimeString();

        $absenHariIni = DB::table('absensi')
            ->where('user_id', $user->id)
            ->where('tanggal', $hariIni)
            ->first();

        if (!$absenHariIni) {

            DB::table('absensi')->insert([
                'user_id' => $user->id,
                'tanggal' => $hariIni,
                'jam_masuk' => $sekarang,
                'status' => 'Hadir',
                'created_at' => now(),
                'updated_at' => now()
            ]);

            $pesan = "Absen Masuk Berhasil pada $sekarang";

        } else if ($absenHariIni && null === $absenHariIni->jam_pulang) {

            DB::table('absensi')
                ->where('id', $absenHariIni->id)
                ->update([
                    'jam_pulang' => $sekarang,
                    'updated_at' => now()
                ]);

            $pesan = "Absen Pulang Berhasil pada $sekarang";

        } else {

            return response()->json([
                'success' => false,
                'message' => 'Anda sudah melakukan Absen hari ini.'
            ], 400);
        }

        return response()->json([
            'success' => true,
            'message' => $pesan,
            'similarity' => $aiResult['similarity']
        ]);

    } catch (\Exception $e) {

        return response()->json([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage()
        ], 500);
    }
}

    /**
     * CEK ABSEN HARI INI
     */
    public function cekAbsenHariIni(Request $request)
    {
        $user = Auth::user();

        // 🔒 Cek status dulu
        if ($response = $this->checkStatusMagang($user)) {
            return $response;
        }

        $hariIni = Carbon::today()->toDateString();

        $absen = DB::table('absensi')
            ->where('user_id', $user->id)
            ->where('tanggal', $hariIni)
            ->first();

        return response()->json([
            'success' => true,
            'data' => $absen
        ]);
    }

    /**
     * RIWAYAT ABSENSI
     */
    public function getRiwayat(Request $request)
    {
        $user = Auth::user();

        // 🔒 Cek status dulu
        if ($response = $this->checkStatusMagang($user)) {
            return $response;
        }

        $riwayat = DB::table('absensi')
            ->where('user_id', $user->id)
            ->orderBy('tanggal', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $riwayat
        ]);
    }
}