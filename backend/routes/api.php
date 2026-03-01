<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MahasiswaController; 
use App\Http\Controllers\ProgresController;   
use App\Http\Controllers\AdminController;

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

// API untuk Autentikasi
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function (){
    Route::post('/logout', [AuthController::class, 'logout']);

    // User/Mahasiswa
    Route::get('/profile', [MahasiswaController::class, 'getProfile']);
    Route::post('/profile/update', [MahasiswaController::class, 'updateProfile']);
    Route::post('/profile/upload-berkas', [MahasiswaController::class, 'uploadBerkas']);
    Route::post('/progres/simpan', [ProgresController::class, 'store']);
    Route::post('/tugas-akhir/upload', [MahasiswaController::class, 'uploadTugas']); // Gabung ke MahasiswaController
    
    Route::get('/download-surat', [MahasiswaController::class, 'downloadFile']);

    // Admin
    Route::middleware('admin')->group(function () {
        //Overview
        Route::get('/admin/overview', [AdminController::class, 'getOverviewStarts']);
        Route::get('/admin/mahasiswa/{id}', [AdminController::class, 'getDetailMahasiswa']);
        
        //Laporan
        Route::get('/admin/laporan', [AdminController::class, 'indexLaporan']);
        Route::post('/admin/mahasiswa/{id}/aksi', [AdminController::class, 'kelolaAksi']);
        Route::put('/laporan/mahasiswa/{id}', [AdminController::class, 'updateProfil']);
        Route::get('/laporan/download/{id}/{jenis}', [AdminController::class, 'downloadBerkas']);

        //Penilaian
        Route::post('/admin/penilaian/update', [AdminController::class, 'updatePenilaian']);
        Route::get('/admin/penilaian/filter', [AdminController::class, 'getPenilaianByDate']);

        //Notifikasi
        Route::get('/admin/notifications', [AdminController::class, 'getNotifications']);

        Route::get('/admin/pendaftar', [AdminController::class, 'getPendaftarBaru']);
        Route::get('/admin/download-laporan', [AdminController::class, 'downloadLaporan']);
    });

    Route::get('/download/{folder}/{filename}', [MahasiswaController::class, 'downloadFile']);
});
