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

        // Validasi input
        $validator = Validator::make($request->all(), [
            'tempat_lahir'   => 'nullable|string',
            'tanggal_lahir'  => 'nullable|date',
            'no_hp'          => 'nullable|string',
            'universitas'    => 'nullable|string',
            'fakultas'       => 'nullable|string',
            'jurusan'        => 'nullable|string',
            'nim'            => 'nullable|string',
            'instagram'      => 'nullable|string',
            'divisi'         => 'nullable|string',
            'rekomendasi'    => 'nullable|string',
            'tgl_mulai'      => 'nullable|date',
            'tgl_selesai'    => 'nullable|date',
            'foto'           => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 400);
        }
        
        $mahasiswa = Mahasiswa::updateOrCreate(
            ['user_id' => $user->id],
            $request->except(['foto', 'berkas_cv'])
        );

        // Logika Upload Foto
        if ($request->hasFile('foto')) {
            if ($mahasiswa->foto) {
                Storage::delete('public/fotos/' . $mahasiswa->foto);
            }
            
            $file = $request->file('foto');
            $fileName = time() . '_foto_' . $user->id . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/fotos', $fileName);
            $mahasiswa->update(['foto' => $fileName]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Data pendaftaran berhasil diperbarui!',
            'data' => $mahasiswa
        ]);
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

    public function getProfile()
    {
        $user = Auth::user();
        $mahasiswa = Mahasiswa::where('user_id', $user->id)->first();

        $current_step = 'pendaftaran';
        if ($mahasiswa) {
            if ($mahasiswa->status == 'diterima') {
                $current_step = 'diterima';
            } elseif ($mahasiswa->berkas_cv) {
                $current_step = 'upload_berkas';
            } elseif ($mahasiswa->status == 'pending') {
                $current_step = 'review_admin';
            }
        }
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'detail' => $mahasiswa
        ]);
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
