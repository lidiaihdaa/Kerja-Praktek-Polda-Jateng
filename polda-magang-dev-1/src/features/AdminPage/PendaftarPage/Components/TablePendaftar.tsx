import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckSquare, CheckCheck, Trash2 } from "lucide-react";

interface Mahasiswa {
  id: number;
  nama: string;
  universitas: string;
  jurusan: string;
  tipe: string;
  status: string;
  created_at: string;
  user: {
    name: string;
    email: string;
  };
}

interface Props {
  startDate: string;
  endDate: string;
  onDownloadReady?: (downloadFn: () => void) => void;
}

const TablePendaftar = ({ startDate, endDate }: Props) => {
  const [data, setData] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    const token = localStorage.getItem("auth_token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/pendaftar", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const result = await response.json();
      if (response.ok) setData(result.data);
      else throw new Error();
    } catch {
      toast.error("Tidak dapat mengambil data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, search, startDate, endDate]);

  // Panggil endpoint spesifik sesuai tahap
  const callEndpoint = async (id: number, endpoint: string, successMsg: string) => {
    const token = localStorage.getItem("auth_token");
    setUpdatingId(id);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/pendaftar/${id}/${endpoint}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      await fetchData();
      toast.success(successMsg);
    } catch (e: any) {
      toast.error(e.message || "Terjadi kesalahan");
    }
    setUpdatingId(null);
  };

  const handleApprove = (id: number) =>
    callEndpoint(id, "approve", "Pendaftar lolos seleksi, menunggu upload berkas");
  const handleReject = (id: number) =>
    callEndpoint(id, "reject", "Pendaftar ditolak");
  const handleTerima = (id: number) =>
    callEndpoint(id, "terima", "Mahasiswa resmi diterima & akun anggota dibuat");

  const filteredData = data
    .filter((item) => statusFilter === "all" ? true : item.status === statusFilter)
    .filter((item) =>
      item.universitas?.toLowerCase().includes(search.toLowerCase()) ||
      item.nama?.toLowerCase().includes(search.toLowerCase()) ||
      item.user?.name?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => {
      if (!startDate || !endDate) return true;
      const created = new Date(item.created_at);
      return created >= new Date(startDate) && created <= new Date(endDate);
    });

  const totalPending = data.filter(d => d.status === "pending").length;
  const totalLolos = data.filter(d => d.status === "pengumuman_lolos").length;
  const totalBerkas = data.filter(d => d.status === "berkas").length;
  const totalDiterima = data.filter(d => d.status === "diterima").length;
  const totalDitolak = data.filter(d => d.status === "pengumuman_tidak_lolos").length;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pageData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "pengumuman_lolos": return "bg-blue-100 text-blue-700";
      case "pengumuman_tidak_lolos": return "bg-red-100 text-red-700";
      case "berkas": return "bg-purple-100 text-purple-700";
      case "diterima": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Menunggu";
      case "pengumuman_lolos": return "Lolos Seleksi";
      case "pengumuman_tidak_lolos": return "Tidak Lolos";
      case "berkas": return "Berkas Masuk";
      case "diterima": return "Diterima";
      default: return status;
    }
  };

  return (
    <div className="p-6 bg-white border rounded-xl space-y-6">

      {/* Filter Status */}
      <div className="flex flex-wrap gap-3">
        {[
          { key: "all", label: "Semua" },
          { key: "pending", label: `Pending: ${totalPending}` },
          { key: "pengumuman_lolos", label: `Lolos: ${totalLolos}` },
          { key: "berkas", label: `Berkas: ${totalBerkas}` },
          { key: "diterima", label: `Diterima: ${totalDiterima}` },
          { key: "pengumuman_tidak_lolos", label: `Ditolak: ${totalDitolak}` },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setStatusFilter(item.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              statusFilter === item.key
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <Input
        placeholder="Cari nama / universitas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Universitas</TableHead>
                <TableHead>Jurusan</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {pageData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.nama || item.user?.name}</TableCell>
                  <TableCell>{item.universitas}</TableCell>
                  <TableCell>{item.jurusan}</TableCell>
                  <TableCell>
                    <span className="capitalize text-xs px-2 py-1 rounded bg-gray-100">
                      {item.tipe || "individu"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">

                    {/* Tahap 1: pending → approve atau reject */}
                    {item.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={updatingId === item.id}
                          onClick={() => handleApprove(item.id)}
                          title="Loloskan seleksi"
                        >
                          <CheckSquare size={14} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive" disabled={updatingId === item.id}>
                              <Trash2 size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Tolak pendaftar ini?</AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className="flex justify-end gap-2">
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleReject(item.id)}>
                                Tolak
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}

                    {/* Tahap 2: menunggu user upload berkas */}
                    {item.status === "pengumuman_lolos" && (
                      <span className="text-xs text-blue-500 italic">Menunggu upload berkas...</span>
                    )}

                    {/* Tahap 3: berkas masuk → admin terima */}
                    {item.status === "berkas" && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        disabled={updatingId === item.id}
                        onClick={() => handleTerima(item.id)}
                        title="Terima & generate akun anggota"
                      >
                        <CheckCheck size={14} className="mr-1" />
                        Terima
                      </Button>
                    )}

                    {/* Sudah diterima */}
                    {item.status === "diterima" && (
                      <span className="text-xs text-green-600 font-medium">✓ Diterima</span>
                    )}

                    {/* Ditolak */}
                    {(item.status === "pengumuman_tidak_lolos" || item.status === "ditolak") && (
                      <span className="text-xs text-red-500 font-medium">✗ Ditolak</span>
                    )}

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between items-center">
            <p>Halaman {currentPage} dari {totalPages || 1}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TablePendaftar;