<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function getOverviewStarts(Request $request)
    {
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');
        $searchUniv = $request->query('universitas');

        $query = Mahasiswa::query();

        if ($startDate && $endDate) {
            $query->whereBetween('created_at', [$startDate . " 00:00:00", $endDate . " 23:59:59"]);
        }

        $cards = [
            [
                'title' => 'Pendaftar Baru',
                'value' => (clone $query)->where('status', 'pending')->count(),
                'detail_route' => '/admin/pendaftar-baru',
                'desc' => 'Mahasiswa yang belum diproses.'
            ],
            [
                'title' => 'Pemagang Aktif',
                'value' => (clone $query)->where('status', 'diterima')->count(),
                'detail_route' => '/admin/data-mahasiswa',
                'desc' => 'Mahasiswa yang sedang menjalankan magang.'
            ],
            [
                'title' => 'Total Instansi',
                'value' => (clone $query)->distinct('universitas')->count('universitas'),
                'detail_route' => '/admin/instansi-mitra',
                'desc' => 'Universitas/Instansi yang bekerja sama.'
            ],
            [
                'title' => 'Rata-Rata Nilai',
                'value' => round((clone $query)->whereNotNull('nilai')->avg('nilai') ?? 0, 1),
                'detail_route' => '/admin/hasil-magang',
                'desc' => 'Akumulasi nilai seluruh alumni magang.'
            ]
        ];

        $grafik = (clone $query)->select(
            DB::raw("DATE_FORMAT(created_at, '%b') as bulan"),
            DB::raw("count(*) as jumlah")
        )
        ->groupBy('bulan')
        ->orderBy('created_at', 'asc')
        ->get();

        $mahasiswaTerbaru = Mahasiswa::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $tabelQuery = Mahasiswa::with('user');

        if($searchUniv) {
            $tabelQuery->where('universitas', 'LIKE', "%{$searchUniv}%");
        }
        
        $tableData = Mahasiswa::with('user')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'cards' => $cards, 
            'charts' => [
                'data' => $grafik,
                'info_route' => '/admin/analisis-data',
                'description' => 'Analisis tren pendaftaran mahasiswa per bulan'
            ],
            'recent_students' => $mahasiswaTerbaru, 
            'table_data' => $tableData 
        ]);
    }

    public function indexLaporan(Request $request) {
        $type = $request->query('type');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $query = Mahasiswa::with('user')->where('status', 'diterima');

        if ($startDate && $endDate) {
            $query->whereBetween('created_at', [$startDate . " 00:00:00", $endDate . " 23:59:59"]);
        }

        if ($type == 'pendaftar-baru'){
            $data = $query->where('status', 'pending')->get()->map(function($m) {
                return [
                    'id' => $m->id,
                    'nama' => $m->user->name ?? 'N/A',
                    'instansi' => $m->universitas,
                    'jurusan' => $m->jurusan,
                    'divisi_pengajuan' => $m->divisi_penempatan,
                ];
            });
        } elseif ($type == 'hasil-magang') {
            $data = $query->whereNotNull('nilai')->get()->map(function($m) {
            return [
                'nama' => $m->user->name,
                'universitas' => $m->universitas,
                'divisi' => $m->jurusan, 
                'nilai_rata_rata' => $m->nilai,
                'predikat' => $m->nilai >= 85 ? 'Sangat Baik' : ($m->nilai >= 75 ? 'Baik' : 'Cukup')
            ];
        });
    } elseif ($type == 'instansi-mitra') {
        $data = Mahasiswa::select('universitas', 'jurusan', DB::raw('count(*) as jumlah_mahasiswa'))
            ->groupBy('universitas', 'jurusan')
            ->get()->map(function($i) {
                return [
                    'nama_universitas' => $i->universitas,
                    'jurusan' => $i->jurusan,
                    'jumlah_mahasiswa' => $i->jumlah_mahasiswa,
                    'status_mou' => 'Aktif' 
                ];
            });
    } else {
        $data = $query->where('status', 'diterima')->get();
    }
        return response()->json(['status' => 'success', 'data' => $data]);
    }
    
    public function getDetailMahasiswa($id)
    {
        $mahasiswa = Mahasiswa::with('user')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => [
                'id' => $mahasiswa->id,
                'nama' => $mahasiswa->user->name ?? 'N/A',
                'email' => $mahasiswa->user->email ?? 'N/A',
                'no_hp' => $mahasiswa->no_hp,
                'universitas' => $mahasiswa->universitas,
                'jurusan' => $mahasiswa->jurusan,
                'divisi' => $mahasiswa->divisi_penempatan,
                'status' => $mahasiswa->status
            ]
        ]);
    }

    public function kelolaAksi(Request $request, $id){
        $mahasiswa = Mahasiswa::findOrFail($id);
        $action = $request->input('action'); 

        if ($action == 'verifikasi') {
            $mahasiswa->update(['status' => 'diterima']);
            return response()->json(['status' => 'success', 'message' => 'Mahasiswa berhasil diverifikasi dan diterima']);
        }

        if ($action == 'tolak' || $action == 'hapus') {
            $user_id = $mahasiswa->user_id;

        if ($mahasiswa->surat_balasan) {
                Storage::delete('public/surat_balasan/' . $mahasiswa->surat_balasan);
            }

            $mahasiswa->delete();
            User::where('id', $user_id)->delete(); // Hapus akun usernya juga agar bersih

            return response()->json(['status' => 'success', 'message' => 'Data pendaftar telah dihapus dari database']);
        }

        return response()->json(['status' => 'error', 'message' => 'Aksi tidak valid'], 400);
    }

    public function updatePenilaian(Request $request, $id) {
        $request->validate([
            'penilaian' => 'required|array',
            'penilaian.*.id' => 'required|exists:data_mahasiswas,id',
            'penilaian.*.nilai' => 'required|numeric|min:0|max:100',
            'penilaian.*.keterangan' => 'nullable|string'
        ]);

        try {
            DB::beginTransaction();

            foreach ($request->penilaian as $item) {
                $mahasiswa = Mahasiswa::find($item['id']);
                $mahasiswa->update([
                    'nilai' => $item['nilai'],
                    'keterangan' => $item['keterangan']
                ]);
            }
            DB::commit();
            return response()->json(['status' => 'success', 'message' => 'Penilaian tim berhasil diperbarui!']);
            
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['status' => 'error', 'message' => 'Gagal menyimpan: ' . $e->getMessage()], 500);
        }
    }

    public function getPenilaianByDate(Request $request)
    {
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $query = Mahasiswa::with('user')->where('status', 'diterima');

        if ($startDate && $endDate) {
            $query->whereBetween('updated_at', [$startDate . " 00:00:00", $endDate . " 23:59:59"]);
        }

        $data = $query->get();

        return response()->json(['status' => 'success', 'data' => $data]);
    }

    public function getNotifications()
    {
        $notifications = [];

        $pendaftarBaru = Mahasiswa::with('user')
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        foreach ($pendaftarBaru as $p) {
            $notifications[] = [
                'type' => 'pendaftar-baru',
                'title' => 'Pendaftar Baru',
                'message' => ($p->user->name ?? 'Seseorang') . " dari " . $p->universitas . " telah mendaftar magang di divisi " . $p->divisi_penempatan,
                'time' => $p->created_at->diffForHumans(),
                'url' => '/admin/pendaftar-baru' // Link tujuan tombol "Lihat Detail"
            ];
        }

        $deadlineMhs = Mahasiswa::where('status', 'diterima')
            ->whereNull('nilai') // Belum dinilai
            ->whereBetween('tanggal_selesai', [Carbon::now(), Carbon::now()->addDays(7)])
            ->get();

        foreach ($deadlineMhs as $d) {
            $notifications[] = [
                'type' => 'peringatan-deadline',
                'title' => 'Peringatan Deadline',
                'message' => "Masa magang " . $d->user->name . " akan berakhir. Segera lakukan penilaian akhir.",
                'time' => 'Baru saja',
                'url' => '/admin/hasil-magang' // Link tujuan tombol "Tindak Lanjut"
            ];
        }

        $notifications[] = [
            'type' => 'info-system',
            'title' => 'Info Sistem',
            'message' => 'Pembaruan sistem telah berhasil dilakukan. Semua fitur berjalan normal.',
            'time' => '3 jam yang lalu',
            'url' => '/admin/analisis-data' // Link tujuan tombol "Selengkapnya"
        ];

        return response()->json([
            'status' => 'success',
            'data' => $notifications
        ]);
    }

    public function updateProfilMahasiswa(Request $request, $id){
        $mahasiswa = Mahasiswa::findOrFail($id);

        $request->validate([
            'no_hp' => 'string|max:15',
            'universitas' => 'string',
            'jurusan' => 'string',
            'tempat_lahir' => 'string',
            'tanggal_lahir' => 'date',
        ]);

        $mahasiswa->update($request->only(['no_hp', 'universitas', 'jurusan', 'tempat_lahir', 'tanggal_lahir']));

        return response()->json(['status' => 'success', 'message' => 'Data berhasil diperbarui']);
    }

    public function downloadBerkas($id, $jenis){
        $m = Mahasiswa::findOrFail($id);
        $filename = ($jenis == 'cv') ? $m->berkas_cv : (($jenis == 'proposal') ? $m->proposal : $m->surat_pengantar);
        
        if ($filename && Storage::exists('public/berkas/' . $filename)) {
            return Storage::download('public/berkas/' . $filename);
        }
        return response()->json(['message' => 'File tidak ditemukan'], 404);
    }


    public function downloadLaporan(Request $request)
    {
        $data['mahasiswa'] = Mahasiswa::with('user')->get();
        $data['total'] = $data['mahasiswa']->count();

        return response()->json(['message' => 'Fungsi download siap dihubungkan ke library PDF']);
    }


}
