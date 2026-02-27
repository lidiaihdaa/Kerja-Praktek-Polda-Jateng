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
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

type InstansiMitra = {
  id: number;
  universitas: string;
  jurusan: string;
  jumlahMahasiswa: number;
  statusMoU: "Aktif" | "Tidak Aktif";
};

const DATA: InstansiMitra[] = [
  { id: 1, universitas: "Universitas Diponegoro", jurusan: "Teknik Informatika", jumlahMahasiswa: 15, statusMoU: "Aktif" },
  { id: 2, universitas: "Universitas Dian Nuswantoro", jurusan: "Sistem Informasi", jumlahMahasiswa: 12, statusMoU: "Aktif" },
  { id: 3, universitas: "UIN Walisongo", jurusan: "Teknik Informatika", jumlahMahasiswa: 8, statusMoU: "Tidak Aktif" },
  { id: 4, universitas: "Universitas Negeri Semarang", jurusan: "Ilmu Komputer", jumlahMahasiswa: 10, statusMoU: "Aktif" },
  { id: 5, universitas: "Universitas Diponegoro", jurusan: "Hukum", jumlahMahasiswa: 5, statusMoU: "Aktif" },
  { id: 6, universitas: "Universitas Dian Nuswantoro", jurusan: "Desain Komunikasi Visual", jumlahMahasiswa: 7, statusMoU: "Tidak Aktif" },
  { id: 7, universitas: "Universitas Negeri Semarang", jurusan: "Manajemen", jumlahMahasiswa: 9, statusMoU: "Aktif" },
  { id: 8, universitas: "Universitas Diponegoro", jurusan: "Teknik Sipil", jumlahMahasiswa: 6, statusMoU: "Aktif" },
  { id: 9, universitas: "UIN Walisongo", jurusan: "Ilmu Komunikasi", jumlahMahasiswa: 4, statusMoU: "Aktif" },
  { id: 10, universitas: "Universitas Dian Nuswantoro", jurusan: "Teknik Informatika", jumlahMahasiswa: 11, statusMoU: "Aktif" },
  { id: 11, universitas: "Universitas Negeri Semarang", jurusan: "Teknik Elektro", jumlahMahasiswa: 3, statusMoU: "Tidak Aktif" },
  { id: 12, universitas: "Universitas Diponegoro", jurusan: "Akuntansi", jumlahMahasiswa: 8, statusMoU: "Aktif" },
  { id: 13, universitas: "UIN Walisongo", jurusan: "Psikologi", jumlahMahasiswa: 6, statusMoU: "Aktif" },
  { id: 14, universitas: "Universitas Dian Nuswantoro", jurusan: "Manajemen Informatika", jumlahMahasiswa: 10, statusMoU: "Aktif" },
  { id: 15, universitas: "Universitas Negeri Semarang", jurusan: "Pendidikan TI", jumlahMahasiswa: 7, statusMoU: "Tidak Aktif" },
  { id: 16, universitas: "Universitas Diponegoro", jurusan: "Ilmu Komputer", jumlahMahasiswa: 14, statusMoU: "Aktif" },
  { id: 17, universitas: "UIN Walisongo", jurusan: "Sistem Informasi", jumlahMahasiswa: 5, statusMoU: "Aktif" },
  { id: 18, universitas: "Universitas Dian Nuswantoro", jurusan: "Teknik Elektro", jumlahMahasiswa: 4, statusMoU: "Aktif" },
  { id: 19, universitas: "Universitas Negeri Semarang", jurusan: "Teknik Informatika", jumlahMahasiswa: 13, statusMoU: "Aktif" },
  { id: 20, universitas: "Universitas Diponegoro", jurusan: "Sistem Informasi", jumlahMahasiswa: 9, statusMoU: "Tidak Aktif" },
];

const PER_PAGE = 10;

const TableInstansiMitra = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(DATA.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentData = DATA.slice(start, start + PER_PAGE);

  return (
    <div className="p-6 bg-white border rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">Laporan Instansi Mitra</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Universitas</TableHead>
            <TableHead>Jurusan</TableHead>
            <TableHead>Jumlah Mahasiswa</TableHead>
            <TableHead>Status MoU</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.universitas}</TableCell>
              <TableCell>{item.jurusan}</TableCell>
              <TableCell>{item.jumlahMahasiswa}</TableCell>
              <TableCell>
                <Badge
                  variant={item.statusMoU === "Aktif" ? "default" : "destructive"}
                  className={
                    item.statusMoU === "Aktif"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : "bg-red-100 text-red-700 hover:bg-red-100"
                  }
                >
                  {item.statusMoU}
                </Badge>
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

export default TableInstansiMitra;
