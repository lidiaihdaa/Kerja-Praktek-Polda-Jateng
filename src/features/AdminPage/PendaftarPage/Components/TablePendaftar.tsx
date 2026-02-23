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
import { ChevronRight, MoreVertical, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Pendaftar = {
  id: number;
  nama: string;
  instansi: string;
  jurusan: string;
  divisiPengajuan: string;
};

const DATA: Pendaftar[] = [
  { id: 1, nama: "Budi Santoso", instansi: "Universitas Diponegoro", jurusan: "Teknik Informatika", divisiPengajuan: "Subbid Tekinfo" },
  { id: 2, nama: "Siti Aminah", instansi: "Universitas Dian Nuswantoro", jurusan: "Sistem Informasi", divisiPengajuan: "Humas" },
  { id: 3, nama: "Ahmad Fauzi", instansi: "UIN Walisongo", jurusan: "Teknik Informatika", divisiPengajuan: "Reskrim" },
  { id: 4, nama: "Dewi Cahyani", instansi: "Universitas Negeri Semarang", jurusan: "Ilmu Komputer", divisiPengajuan: "Lantas" },
  { id: 5, nama: "Rizky Pratama", instansi: "Universitas Diponegoro", jurusan: "Hukum", divisiPengajuan: "Subbid Tekinfo" },
  { id: 6, nama: "Nurul Hidayah", instansi: "Universitas Dian Nuswantoro", jurusan: "DKV", divisiPengajuan: "Humas" },
  { id: 7, nama: "Andi Wijaya", instansi: "Universitas Negeri Semarang", jurusan: "Manajemen", divisiPengajuan: "Reskrim" },
  { id: 8, nama: "Fitri Rahmawati", instansi: "Universitas Diponegoro", jurusan: "Teknik Sipil", divisiPengajuan: "Lantas" },
  { id: 9, nama: "Dimas Prasetyo", instansi: "UIN Walisongo", jurusan: "Ilmu Komunikasi", divisiPengajuan: "Humas" },
  { id: 10, nama: "Rina Sari", instansi: "Universitas Dian Nuswantoro", jurusan: "Teknik Informatika", divisiPengajuan: "Subbid Tekinfo" },
  { id: 11, nama: "Yoga Aditya", instansi: "Universitas Negeri Semarang", jurusan: "Teknik Elektro", divisiPengajuan: "Lantas" },
  { id: 12, nama: "Maya Putri", instansi: "Universitas Diponegoro", jurusan: "Akuntansi", divisiPengajuan: "Humas" },
  { id: 13, nama: "Fajar Ramadhan", instansi: "UIN Walisongo", jurusan: "Psikologi", divisiPengajuan: "Reskrim" },
  { id: 14, nama: "Lestari Wulandari", instansi: "Universitas Dian Nuswantoro", jurusan: "Manajemen Informatika", divisiPengajuan: "Subbid Tekinfo" },
  { id: 15, nama: "Hendra Gunawan", instansi: "Universitas Negeri Semarang", jurusan: "Pendidikan TI", divisiPengajuan: "Lantas" },
  { id: 16, nama: "Sari Indah", instansi: "Universitas Diponegoro", jurusan: "Ilmu Komputer", divisiPengajuan: "Subbid Tekinfo" },
  { id: 17, nama: "Bayu Saputra", instansi: "UIN Walisongo", jurusan: "Sistem Informasi", divisiPengajuan: "Humas" },
  { id: 18, nama: "Anisa Rahma", instansi: "Universitas Dian Nuswantoro", jurusan: "Teknik Elektro", divisiPengajuan: "Reskrim" },
  { id: 19, nama: "Widi Nugroho", instansi: "Universitas Negeri Semarang", jurusan: "Teknik Informatika", divisiPengajuan: "Lantas" },
  { id: 20, nama: "Putri Ayu", instansi: "Universitas Diponegoro", jurusan: "Sistem Informasi", divisiPengajuan: "Subbid Tekinfo" },
];

const PER_PAGE = 10;

const TablePendaftar = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const totalPages = Math.ceil(DATA.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentData = DATA.slice(start, start + PER_PAGE);

  return (
    <div className="p-6 bg-white border rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">Data Pendaftar Baru</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Mahasiswa</TableHead>
            <TableHead>Instansi</TableHead>
            <TableHead>Jurusan</TableHead>
            <TableHead>Divisi Pengajuan</TableHead>
            <TableHead className="text-center">Detail</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nama}</TableCell>
              <TableCell>{item.instansi}</TableCell>
              <TableCell>{item.jurusan}</TableCell>
              <TableCell>{item.divisiPengajuan}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => navigate(`/admin/pendaftar/${item.id}`)}
                      className="gap-2"
                    >
                      <Eye size={14} />
                      Detail
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

export default TablePendaftar;
