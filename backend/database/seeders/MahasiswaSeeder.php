<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class MahasiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $univs = ['Universitas Diponegoro', 'Universitas Gadjah Mada', 'UNNES', 'UDINUS', 'UKSW'];
        $divisi = ['TIK', 'Humas', 'SDM', 'Lantas', 'Reskrim'];

        for ($i = 1; $i <= 10; $i++) {
            $user = User::updateOrCreate([
                'name' => 'Mahasiswa Contoh ' . $i,
                'email' => 'mhs' . $i . '@test.com',
                'password' => Hash::make('password123'),
                'role' => 'mahasiswa'
            ]);
        }
        Mahasiswa::create([
            'user_id'           => $user->id,
            'tempat_lahir'      => 'Semarang',
            'tanggal_lahir'     => Carbon::parse('2002-01-01')->addDays($i),
            'no_hp'             => '0812345678' . $i,
            'universitas'       => $univs[array_rand($univs)],
            'jurusan'           => 'Teknik Informatika',
            'divisi'            => $divisi[array_rand($divisi)],
            'berkas_cv'         => 'cv_mahasiswa_' . $i . '.pdf',
            'status'            => ($i <= 5) ? 'pending' : 'diterima',
            'nilai'             => ($i > 5) ? rand(70, 95) : null, 
            'keterangan'        => ($i > 5) ? 'Bekerja dengan sangat baik dalam tim.' : null,
            'created_at'        => now()->subDays(rand(1, 20)),
            'updated_at'        => now(),
            'tgl_selesai'   => now()->addDays(rand(2, 10)),
        ]);
    }
}
