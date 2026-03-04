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
import { CheckSquare, Trash2 } from "lucide-react";

interface Mahasiswa {
  id: number;
  universitas: string;
  jurusan: string;
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

  // ================= FETCH DATA =================
  const fetchData = async () => {
    const token = localStorage.getItem("auth_token");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/admin/pendaftar",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setData(result.data);
      } else {
        throw new Error();
      }
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

  // ================= UPDATE STATUS =================
  const updateStatus = async (id: number, status: string) => {
  const token = localStorage.getItem("auth_token");
  setUpdatingId(id);

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/admin/pendaftar/${id}/status`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) throw new Error();

    // 🔥 INI YANG PENTING
    await fetchData(); // ambil ulang data dari backend

    toast.success(`Status berhasil diubah menjadi ${status}`);
  } catch {
    toast.error("Terjadi kesalahan saat update status");
  }

  setUpdatingId(null);
};

  // ================= FILTERING =================
  const filteredData = data
    .filter((item) =>
      statusFilter === "all" ? true : item.status === statusFilter
    )
    .filter((item) =>
      item.universitas.toLowerCase().includes(search.toLowerCase()) ||
      item.user?.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => {
      if (!startDate || !endDate) return true;

      const created = new Date(item.created_at);
      return (
        created >= new Date(startDate) &&
        created <= new Date(endDate)
      );
    });

  // ================= STATISTIK =================
  const totalPending = filteredData.filter(d => d.status === "pending").length;
const totalDiterima = filteredData.filter(d => d.status === "diterima").length;
const totalDitolak = filteredData.filter(d => d.status === "ditolak").length;

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const pageData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "diterima":
        return "bg-green-100 text-green-700";
      case "ditolak":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-white border rounded-xl space-y-6">

     <div className="flex flex-wrap gap-3">

  {[
    { key: "all", label: "All", color: "bg-gray-800 text-white" },
    { key: "pending", label: `Pending: ${totalPending}`, color: "bg-yellow-400 text-white" },
    { key: "diterima", label: `Diterima: ${totalDiterima}`, color: "bg-green-500 text-white" },
    { key: "ditolak", label: `Ditolak: ${totalDitolak}`, color: "bg-red-500 text-white" },
  ].map((item) => (
    <button
      key={item.key}
      onClick={() => setStatusFilter(item.key)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          statusFilter === item.key
            ? item.color
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
    >
      {item.label}
    </button>
  ))}
</div>
      {/* SEARCH */}
      <Input
        placeholder="Cari nama / universitas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
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
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {pageData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.user?.name}</TableCell>
                  <TableCell>{item.universitas}</TableCell>
                  <TableCell>{item.jurusan}</TableCell>

                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </TableCell>

                  <TableCell className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={
                        item.status !== "pending" ||
                        updatingId === item.id
                      }
                      onClick={() =>
                        updateStatus(item.id, "diterima")
                      }
                    >
                      <CheckSquare size={14} />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={
                            item.status !== "pending" ||
                            updatingId === item.id
                          }
                        >
                          <Trash2 size={14} />
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Tolak pendaftar ini?
                          </AlertDialogTitle>
                        </AlertDialogHeader>

                        <div className="flex justify-end gap-2">
                          <AlertDialogCancel>
                            Batal
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              updateStatus(item.id, "ditolak")
                            }
                          >
                            Tolak
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* PAGINATION */}
          <div className="flex justify-between items-center">
            <p>
              Halaman {currentPage} dari {totalPages || 1}
            </p>

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
                disabled={
                  currentPage === totalPages || totalPages === 0
                }
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