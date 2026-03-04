<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

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

        // Validasi data dasar (sesuaikan dengan nama field di React)
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string',
            'email' => 'required|email',
            'nim' => 'required|string',
            'universitas' => 'required|string',
            'jurusan' => 'required|string',
            'tgl_mulai' => 'required|date',
            'tgl_selesai' => 'required|date',
            // ... (tambahkan validasi lain jika perlu)
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false, 
                'message' => 'Validasi gagal, periksa kembali data Anda.', 
                'errors' => $validator->errors()
            ], 400);
        }

        try {
            // Gunakan updateOrCreate agar data tidak ganda jika user mencoba daftar ulang
            $mahasiswa = Mahasiswa::updateOrCreate(
                ['user_id' => $user->id], // Cari berdasarkan user_id yang sedang login
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
                    'status' => 'pending', // Status awal untuk memunculkan "Menunggu Verifikasi"
                    
                    // Nanti kita bahas cara simpan fotonya di sini jika dikirim dari React
                    // 'foto' => json_encode($request->images) 
                ]
            );

            return response()->json([
                'success' => true,
                'message' => 'Pendaftaran berhasil disimpan!',
                'data' => $mahasiswa
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server: ' . $e->getMessage()
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
    return response()->json(['status' => 'empty', 'data' => null], 404);
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
