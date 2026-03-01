<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('mahasiswa', function (Blueprint $table) {
            if (!Schema::hasColumn('mahasiswa', 'tempat_lahir')) {
                $table->string('tempat_lahir')->nullable()->after('user_id');
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

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mahasiswa', function (Blueprint $table) {
            $table->dropColumn([
                'tempat_lahir', 'tanggal_lahir', 'no_hp', 'fakultas', 
                'instagram', 'divisi', 'rekomendasi', 'tgl_mulai', 'tgl_selesai'
            ]);
        });
    }
};
