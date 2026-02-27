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
import { ChevronRight, MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Absensi = {
  id: number;
  nama: string;
  divisi: string;
  jamMasuk: string;
  jamPulang: string;
};

const DATA: Absensi[] = [
  { id: 1, nama: "Budi Santoso", divisi: "Subbid Tekinfo", jamMasuk: "07:30", jamPulang: "16:00" },
  { id: 2, nama: "Siti Aminah", divisi: "Humas", jamMasuk: "07:45", jamPulang: "16:00" },
  { id: 3, nama: "Ahmad Fauzi", divisi: "Reskrim", jamMasuk: "08:00", jamPulang: "16:00" },
  { id: 4, nama: "Dewi Cahyani", divisi: "Lantas", jamMasuk: "07:30", jamPulang: "16:00" },
  { id: 5, nama: "Rizky Pratama", divisi: "Subbid Tekinfo", jamMasuk: "07:30", jamPulang: "16:00" },
  { id: 6, nama: "Nurul Hidayah", divisi: "Humas", jamMasuk: "08:15", jamPulang: "16:30" },
  { id: 7, nama: "Andi Wijaya", divisi: "Reskrim", jamMasuk: "07:30", jamPulang: "16:00" },
  { id: 8, nama: "Fitri Rahmawati", divisi: "Lantas", jamMasuk: "07:45", jamPulang: "16:00" },
  { id: 9, nama: "Dimas Prasetyo", divisi: "Humas", jamMasuk: "08:00", jamPulang: "16:00" },
  { id: 10, nama: "Rina Sari", divisi: "Subbid Tekinfo", jamMasuk: "07:30", jamPulang: "16:00" },
  { id: 11, nama: "Yoga Aditya", divisi: "Lantas", jamMasuk: "07:30", jamPulang: "16:00" },
  { id: 12, nama: "Maya Putri", divisi: "Humas", jamMasuk: "07:45", jamPulang: "16:00" },
  { id: 13, nama: "Fajar Ramadhan", divisi: "Reskrim", jamMasuk: "08:00", jamPulang: "16:00" },
  { id: 14, nama: "Lestari Wulandari", divisi: "Subbid Tekinfo", jamMasuk: "07:30", jamPulang: "16:00" },
  { id: 15, nama: "Hendra Gunawan", divisi: "Lantas", jamMasuk: "07:30", jamPulang: "16:00" },
  { id: 16, nama: "Sari Indah", divisi: "Subbid Tekinfo", jamMasuk: "08:00", jamPulang: "16:00" },
  { id: 17, nama: "Bayu Saputra", divisi: "Humas", jamMasuk: "07:30", jamPulang: "16:00" },
  { id: 18, nama: "Anisa Rahma", divisi: "Reskrim", jamMasuk: "07:45", jamPulang: "16:00" },
  { id: 19, nama: "Widi Nugroho", divisi: "Lantas", jamMasuk: "08:00", jamPulang: "16:00" },
  { id: 20, nama: "Putri Ayu", divisi: "Subbid Tekinfo", jamMasuk: "07:30", jamPulang: "16:00" },
];

const PER_PAGE = 10;

const TableAbsensi = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const totalPages = Math.ceil(DATA.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentData = DATA.slice(start, start + PER_PAGE);

  return (
    <div className="p-6 bg-white border rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">Data Absensi Magang</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Divisi</TableHead>
            <TableHead>Jam Masuk</TableHead>
            <TableHead>Jam Pulang</TableHead>
            <TableHead className="text-center">Detail</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nama}</TableCell>
              <TableCell>{item.divisi}</TableCell>
              <TableCell>{item.jamMasuk}</TableCell>
              <TableCell>{item.jamPulang}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => navigate(`/admin/absensi/${item.id}`)}
                      className="gap-2"
                    >
                      <Eye size={14} />
                      Detail
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Pencil size={14} />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600">
                      <Trash2 size={14} />
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationLink
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              >
                <ChevronRight size={16} />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TableAbsensi;
