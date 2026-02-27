<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/kuota-magang', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'Data kuota magang Polda Jateng berhasil diambil',
        'data' => [
            [
                'id' => 1, 
                'nama_divisi' => 'Bid TIK (Teknologi Informasi & Komunikasi)', 
                'sisa_kuota' => 5, 
                'kebutuhan_skill' => 'Programmer, Jaringan (Network)'
            ],
            [
                'id' => 2, 
                'nama_divisi' => 'Bid Humas (Hubungan Masyarakat)', 
                'sisa_kuota' => 2, 
                'kebutuhan_skill' => 'Desain Grafis, Video Editor'
            ],
            [
                'id' => 3, 
                'nama_divisi' => 'Ditreskrimsus (Subdit Cyber Crime)', 
                'sisa_kuota' => 3, 
                'kebutuhan_skill' => 'Cyber Security, Data Analis'
            ],
            [
                'id' => 4, 
                'nama_divisi' => 'Biro SDM (Sumber Daya Manusia)', 
                'sisa_kuota' => 4, 
                'kebutuhan_skill' => 'Sistem Informasi, Administrasi'
            ],
            [
                'id' => 5, 
                'nama_divisi' => 'Ditlantas (Lalu Lintas)', 
                'sisa_kuota' => 0, // Contoh kuota habis
                'kebutuhan_skill' => 'Admin Database'
            ]
        ]
    ]);
});
use App\Http\Controllers\AuthController;

// API untuk Autentikasi
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
