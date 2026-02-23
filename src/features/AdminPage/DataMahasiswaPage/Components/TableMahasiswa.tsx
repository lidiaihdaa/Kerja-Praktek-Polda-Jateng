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
import { Pencil, Trash2, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Mahasiswa = {
  id: number;
  nama: string;
  instansi: string;
  divisi: string;
  jurusan: string;
};

const DATA: Mahasiswa[] = [
  { id: 1, nama: "Budi Santoso", instansi: "Universitas Diponegoro", divisi: "Subbid Tekinfo", jurusan: "Teknik Informatika" },
  { id: 2, nama: "Siti Aminah", instansi: "Universitas Dian Nuswantoro", divisi: "Humas", jurusan: "Ilmu Komunikasi" },
  { id: 3, nama: "Ahmad F", instansi: "Universitas X", divisi: "Reskrim", jurusan: "Hukum" },
  { id: 4, nama: "Dewi C", instansi: "Universitas Negeri Semarang", divisi: "Lantas", jurusan: "Hukum" },
  { id: 5, nama: "Budi Santoso", instansi: "Universitas Diponegoro", divisi: "Subbid Tekinfo", jurusan: "Teknik Informatika" },
  { id: 6, nama: "Siti Aminah", instansi: "Universitas Dian Nuswantoro", divisi: "Humas", jurusan: "Ilmu Komunikasi" },
  { id: 7, nama: "Ahmad F", instansi: "Universitas X", divisi: "Reskrim", jurusan: "Hukum" },
  { id: 8, nama: "Dewi C", instansi: "Universitas Negeri Semarang", divisi: "Lantas", jurusan: "Hukum" },
  { id: 9, nama: "Budi Santoso", instansi: "Universitas Diponegoro", divisi: "Subbid Tekinfo", jurusan: "Teknik Informatika" },
  { id: 10, nama: "Siti Aminah", instansi: "Universitas Dian Nuswantoro", divisi: "Humas", jurusan: "Ilmu Komunikasi" },
  { id: 11, nama: "Ahmad F", instansi: "Universitas X", divisi: "Reskrim", jurusan: "Hukum" },
  { id: 12, nama: "Dewi C", instansi: "Universitas Negeri Semarang", divisi: "Lantas", jurusan: "Hukum" },
  { id: 13, nama: "Budi Santoso", instansi: "Universitas Diponegoro", divisi: "Subbid Tekinfo", jurusan: "Teknik Informatika" },
  { id: 14, nama: "Siti Aminah", instansi: "Universitas Dian Nuswantoro", divisi: "Humas", jurusan: "Ilmu Komunikasi" },
  { id: 15, nama: "Ahmad F", instansi: "Universitas X", divisi: "Reskrim", jurusan: "Hukum" },
  { id: 16, nama: "Dewi C", instansi: "Universitas Negeri Semarang", divisi: "Lantas", jurusan: "Hukum" },
  { id: 17, nama: "Budi Santoso", instansi: "Universitas Diponegoro", divisi: "Subbid Tekinfo", jurusan: "Teknik Informatika" },
  { id: 18, nama: "Siti Aminah", instansi: "Universitas Dian Nuswantoro", divisi: "Humas", jurusan: "Ilmu Komunikasi" },
  { id: 19, nama: "Ahmad F", instansi: "Universitas X", divisi: "Reskrim", jurusan: "Hukum" },
  { id: 20, nama: "Dewi C", instansi: "Universitas Negeri Semarang", divisi: "Lantas", jurusan: "Hukum" },
];

const PER_PAGE = 10;

const TableMahasiswa = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const totalPages = Math.ceil(DATA.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentData = DATA.slice(start, start + PER_PAGE);

  return (
    <div className="p-6 bg-white border rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">Laporan Data Mahasiswa</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Mahasiswa</TableHead>
            <TableHead>Instansi</TableHead>
            <TableHead>Divisi Penempatan</TableHead>
            <TableHead>Jurusan</TableHead>
            <TableHead className="text-right">Detail Profil</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nama}</TableCell>
              <TableCell>{item.instansi}</TableCell>
              <TableCell>{item.divisi}</TableCell>
              <TableCell>{item.jurusan}</TableCell>

              <TableCell className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/admin/laporan/mhs/${item.id}`)}
                >
                  <Pencil size={14} className="mr-1" />
                  Edit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      <Trash2 size={14} />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Yakin hapus data ini?</AlertDialogTitle>
                    </AlertDialogHeader>

                    <div className="flex justify-end gap-2">
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600">
                        Hapus
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
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

export default TableMahasiswa;
