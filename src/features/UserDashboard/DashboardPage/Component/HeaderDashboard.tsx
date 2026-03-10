import AboutImg from "@/assets/img/aboutimg.png";

export type StatusType =
  | "pending"
  | "daftar"
  | "pengumuman_lolos"
  | "pengumuman_tidak_lolos"
  | "diterima";

interface HeaderDashboardProps {
  currentStatus: StatusType;
}

const HeaderDashboard = ({ currentStatus }: HeaderDashboardProps) => {
  return (
    <div className="flex flex-col items-start gap-6 lg:flex-row">
      <div className="flex-1">
        <h1 className="mb-5 text-2xl font-bold text-gray-800">Dashboard</h1>

        {(currentStatus === "pending" || currentStatus === "daftar") && (
          <div className="p-5 bg-amber-50 border-l-4 border-amber-500 rounded-md shadow-sm">
            <h3 className="text-sm font-bold uppercase text-amber-800">
              Status: Menunggu Verifikasi
            </h3>
            <p className="text-sm text-amber-700 mt-2">
              Data Anda sedang diproses oleh admin Polda Jateng.
            </p>
          </div>
        )}

        {(currentStatus === "pengumuman_lolos" || currentStatus === "diterima") && (
          <div className="p-5 bg-green-50 border-l-4 border-green-500 rounded-md shadow-sm">
            <h3 className="text-sm font-bold uppercase text-green-800">
              Status: Diterima
            </h3>
            <p className="text-sm text-green-700 mt-2">
              Selamat! Anda lolos seleksi magang.
            </p>
          </div>
        )}

        {currentStatus === "pengumuman_tidak_lolos" && (
          <div className="p-5 bg-red-50 border-l-4 border-red-500 rounded-md shadow-sm">
            <h3 className="text-sm font-bold uppercase text-red-800">
              Status: Belum Berhasil
            </h3>
            <p className="text-sm text-red-700 mt-2">
              Mohon maaf Anda belum lolos seleksi.
            </p>
          </div>
        )}
      </div>

      <div className="w-full lg:w-[360px]">
        <img
          src={AboutImg}
          alt="Polda Jateng"
          className="object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default HeaderDashboard;