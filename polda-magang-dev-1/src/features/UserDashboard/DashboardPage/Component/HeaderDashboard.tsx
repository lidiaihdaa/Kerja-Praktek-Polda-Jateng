import AboutImg from "@/assets/img/aboutimg.png";

// 🔥 PERBAIKAN 1: Tambahkan "pending" ke dalam daftar tipe status
export type StatusType = 
  | "pending"
  | "daftar" 
  | "review" 
  | "pengumuman_lolos" 
  | "pengumuman_tidak_lolos" 
  | "berkas" 
  | "diterima";

interface HeaderDashboardProps {
  currentStatus: StatusType; 
}

const HeaderDashboard = ({ currentStatus }: HeaderDashboardProps) => {
  return (
    <div className="flex flex-col items-start gap-6 lg:flex-row">
      <div className="flex-1">
        <h1 className="mb-5 text-2xl font-bold text-gray-800">Dashboard</h1>
        
        {/* KOTAK KUNING: MENUNGGU VERIFIKASI 
           🔥 PERBAIKAN 2: Tambahkan currentStatus === "pending" ke dalam pengecekan
        */}
        {(currentStatus === "pending" || currentStatus === "daftar" || currentStatus === "review") && (
          <div className="p-5 bg-amber-50 border-l-4 border-amber-500 rounded-md shadow-sm">
            <div className="flex items-start">
              <div className="ml-3">
                <h3 className="text-sm font-bold tracking-wider uppercase text-amber-800">
                  Status: Menunggu Verifikasi
                </h3>
                <p className="mt-2 text-sm text-amber-700">
                  Data Anda sedang diproses oleh Biro SDM Polda Jateng. Mohon cek timeline secara berkala.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* KOTAK HIJAU: DITERIMA / LOLOS */}
        {(currentStatus === "pengumuman_lolos" || currentStatus === "berkas" || currentStatus === "diterima") && (
          <div className="p-5 bg-green-50 border-l-4 border-green-500 rounded-md shadow-sm">
            <div className="flex items-start">
              <div className="ml-3">
                <h3 className="text-sm font-bold tracking-wider text-green-800 uppercase">
                  Status: Diterima
                </h3>
                <p className="mt-2 text-sm text-green-700">
                  Selamat! Pengajuan magang Anda telah disetujui. Silakan ikuti langkah selanjutnya di timeline.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* KOTAK MERAH: DITOLAK */}
        {currentStatus === "pengumuman_tidak_lolos" && (
          <div className="p-5 bg-red-50 border-l-4 border-red-500 rounded-md shadow-sm">
            <div className="flex items-start">
              <div className="ml-3">
                <h3 className="text-sm font-bold tracking-wider text-red-800 uppercase">
                  Status: Belum Berhasil
                </h3>
                <p className="mt-2 text-sm text-red-700">
                  Mohon maaf, pengajuan Anda belum dapat diterima. Silakan coba lagi di periode berikutnya.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full lg:w-[360px]">
        {/* Gambar gedung Polda Jateng tetap di sisi kanan */}
        <img src={AboutImg} alt="Polda Jateng" className="object-cover rounded-lg shadow-md" />
      </div>
    </div>
  );
};

export default HeaderDashboard;