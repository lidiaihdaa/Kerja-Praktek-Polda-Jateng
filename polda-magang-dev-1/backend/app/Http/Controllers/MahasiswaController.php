<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\Divisi;

class MahasiswaController extends Controller
{
    
    public function updateProfile(Request $request)
{
    $user = Auth::user();

    // Validasi: Pastikan 'foto' divalidasi sebagai image
    $validator = Validator::make($request->all(), [
        'nama'     => 'required|string',
        'email'    => 'required|email',
        'foto'     => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // Maks 2MB
    ]);

    if ($validator->fails()) {
        return response()->json(['status' => 'error', 'errors' => $validator->errors()], 400);
    }
    
    // Update data teks (nama, email, dsb)
    $mahasiswa = Mahasiswa::updateOrCreate(
        ['user_id' => $user->id],
        $request->except(['foto']) 
    );

    // LOGIKA SIMPAN FOTO KE DATABASE
    if ($request->hasFile('foto')) {
        // 1. Hapus foto lama di storage jika ada agar tidak memenuhi disk
        if ($mahasiswa->foto) {
            Storage::delete('public/fotos/' . $mahasiswa->foto);
        }
        
        // 2. Olah file baru
        $file = $request->file('foto');
        $fileName = time() . '_profile_' . $user->id . '.' . $file->getClientOriginalExtension();
        
        // 3. Simpan fisik file ke storage/app/public/fotos
        $file->storeAs('public/fotos', $fileName);
        
        // 4. Update nama file ke kolom 'foto' di database
        $mahasiswa->update(['foto_profil' => $fileName]);
    }

    return response()->json([
        'status' => 'success',
        'message' => 'Profil dan Foto berhasil disimpan!',
        'data' => $mahasiswa
    ]);
}
    // Fungsi baru untuk menangani Pendaftaran
    public function registerPeserta(Request $request)
{
    $user = Auth::user();

    $validator = Validator::make($request->all(), [
        'nama' => 'required|string',
        'email' => 'required|email',
        'nim' => 'required|string',
        'universitas' => 'required|string',
        'jurusan' => 'required|string',
        'tgl_mulai' => 'required|date',
        'tgl_selesai' => 'required|date',
        'divisi' => 'required|string'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 400);
    }

    try {

        // 🔎 cari divisi
        $divisi = Divisi::where('nama_divisi', $request->divisi)->first();

        if (!$divisi) {
            return response()->json([
                'success' => false,
                'message' => 'Divisi tidak ditemukan'
            ], 404);
        }

        // 🔎 cek kuota
        if ($divisi->sisa_kuota <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Kuota divisi sudah penuh'
            ], 400);
        }

        // simpan data mahasiswa
        $mahasiswa = Mahasiswa::updateOrCreate(
            ['user_id' => $user->id],
            [
                'nama' => $request->nama,
                'email' => $request->email,
                'nim' => $request->nim,
                'universitas' => $request->universitas,
                'fakultas' => $request->fakultas,
                'jurusan' => $request->jurusan,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'no_hp' => $request->no_hp,
                'instagram' => $request->instagram,
                'divisi' => $request->divisi,
                'rekomendasi' => $request->rekomendasi,
                'tgl_mulai' => $request->tgl_mulai,
                'tgl_selesai' => $request->tgl_selesai,
                'status' => 'pending'
            ]
        );

        // 🔥 kurangi kuota divisi
        $divisi->decrement('sisa_kuota');

        return response()->json([
            'success' => true,
            'message' => 'Pendaftaran berhasil',
            'data' => $mahasiswa
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage()
        ], 500);
    }
}

    public function uploadBerkas(Request $request)
    {
        $user = Auth::user();
        $request->validate(['berkas_cv' => 'required|mimes:pdf|max:5120']);

        $mahasiswa = Mahasiswa::where('user_id', $user->id)->first();
        if (!$mahasiswa) return response()->json(['message' => 'Data diri belum ada'], 404);

        if ($request->hasFile('berkas_cv')) {
            if ($mahasiswa->berkas_cv) Storage::delete('public/berkas/' . $mahasiswa->berkas_cv);
            
            $file = $request->file('berkas_cv');
            $fileName = time() . '_cv_' . $user->id . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/berkas', $fileName);
            $mahasiswa->update(['berkas_cv' => $fileName]);
        }

        return response()->json(['status' => 'success', 'file' => $mahasiswa->berkas_cv]);
    }

    public function getProfile(Request $request)
{

    $mahasiswa = Mahasiswa::where('user_id', Auth::id())->first();
    if ($mahasiswa) {
        return response()->json(['status' => 'success', 'data' => $mahasiswa]);
    }
    return response()->json([
    'status' => 'empty',
    'data' => null
], 200);
}
    public function downloadFile($folder, $filename)
    {
        $user = Auth::user();
        $mahasiswa = Mahasiswa::where('user_id', $user->id)->first();

        if ($mahasiswa && $mahasiswa->status == 'diterima' && $mahasiswa->surat_balasan) {
            $path = storage_path("app/public/surat_balasan/{$mahasiswa->surat_balasan}");
            return response()->download($path);
        }

        return response()->json(['message' => 'Surat belum tersedia atau Anda belum diterima'], 403);
    }
}
