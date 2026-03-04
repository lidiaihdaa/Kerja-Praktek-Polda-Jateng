<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::table('mahasiswa', function (Blueprint $table) {
        // Cek kolom utama agar tidak bentrok
        if (!Schema::hasColumn('mahasiswa', 'nama')) {
            // Kita buat kolom pondasi yang tadi error
            $table->string('nama')->after('user_id');
            $table->string('email')->after('nama');
            $table->string('foto_profil')->nullable()->after('email');
            
            // Kolom tambahan lainnya
            $table->string('tempat_lahir')->nullable()->after('foto_profil');
            $table->date('tanggal_lahir')->nullable()->after('tempat_lahir');
            $table->string('no_hp', 15)->nullable()->after('tanggal_lahir');
            $table->string('fakultas')->nullable()->after('universitas');
            $table->string('instagram')->nullable()->after('jurusan');
            $table->string('divisi')->nullable()->after('instagram');
            $table->string('rekomendasi')->nullable()->after('divisi');
            $table->date('tgl_mulai')->nullable()->after('rekomendasi');
            $table->date('tgl_selesai')->nullable()->after('tgl_mulai');
        }
    });
}

public function down(): void
{
    Schema::table('mahasiswa', function (Blueprint $table) {
        $table->dropColumn([
            'nama', 'email', 'foto_profil', 'tempat_lahir', 'tanggal_lahir', 
            'no_hp', 'fakultas', 'instagram', 'divisi', 'rekomendasi', 
            'tgl_mulai', 'tgl_selesai'
        ]);
    });
}
};
