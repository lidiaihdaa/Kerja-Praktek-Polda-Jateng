import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronRight, MoreVertical, Eye, Pencil, Trash2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PER_PAGE = 10;

const TableAbsensi = () => {
  const [dataAbsen, setDataAbsen] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // MENGAMBIL DATA ASLI DARI DATABASE LARAVEL
  useEffect(() => {
    const fetchRiwayatAbsen = async () => {
      const token = localStorage.getItem("auth_token");
      try {
        // Sesuaikan endpoint ini dengan rute API Laravel-mu (misal: /api/absensi atau /api/riwayat-absen)
        const response = await fetch("http://127.0.0.1:8000/api/absensi", {
          headers: {
            "Authorization": `Bearer ${token}`, // <-- INI KUNCI AGAR TIDAK UNAUTHENTICATED
            "Accept": "application/json"
          }
        });
        
        const result = await response.json();
        if (response.ok) {
          // Asumsi Laravel mengembalikan response: { data: [...] }
          setDataAbsen(result.data || []);
        } else {
          console.error("Gagal mengambil data:", result.message);
        }
      } catch (error) {
        console.error("Error koneksi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayatAbsen();
  }, []);

  const totalPages = Math.max(1, Math.ceil(dataAbsen.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const currentData = dataAbsen.slice(start, start + PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center p-10 bg-white border rounded-xl">
        <Loader2 className="w-8 h-8 animate-spin text-abu" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">Data Absensi Magang</h2>

      <Table>
        <TableHeader>
          <TableRow>
            {/* Disesuaikan dengan kolom yang mungkin ada di database-mu */}
            <TableHead>Tanggal</TableHead>
            <TableHead>Jam Masuk</TableHead>
            <TableHead>Jam Pulang</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                Belum ada data absensi.
              </TableCell>
            </TableRow>
          ) : (
            currentData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.tanggal || "-"}</TableCell>
                <TableCell>{item.jam_masuk || "-"}</TableCell>
                <TableCell>{item.jam_pulang || "-"}</TableCell>
                <TableCell>{item.status || "Hadir"}</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/user/absensi/${item.id}`)} className="gap-2">
                        <Eye size={14} /> Detail
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationLink onClick={() => setPage((p) => Math.min(p + 1, totalPages))}>
                  <ChevronRight size={16} />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default TableAbsensi;