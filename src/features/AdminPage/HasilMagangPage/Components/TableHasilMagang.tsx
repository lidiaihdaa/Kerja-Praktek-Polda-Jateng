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
import { ChevronRight } from "lucide-react";
import { useState } from "react";

type HasilMagang = {
  id: number;
  nama: string;
  universitas: string;
  divisi: string;
  nilaiAkhir: number;
  predikat: string;
};

const DATA: HasilMagang[] = [
  { id: 1, nama: "Budi Santoso", universitas: "Universitas Diponegoro", divisi: "Subbid Tekinfo", nilaiAkhir: 92, predikat: "A" },
  { id: 2, nama: "Siti Aminah", universitas: "Universitas Dian Nuswantoro", divisi: "Humas", nilaiAkhir: 88, predikat: "A" },
  { id: 3, nama: "Ahmad F", universitas: "Universitas X", divisi: "Reskrim", nilaiAkhir: 65, predikat: "C" },
  { id: 4, nama: "Dewi C", universitas: "Universitas Negeri Semarang", divisi: "Lantas", nilaiAkhir: 75, predikat: "B" },
  { id: 5, nama: "Budi Santoso", universitas: "Universitas Diponegoro", divisi: "Subbid Tekinfo", nilaiAkhir: 92, predikat: "A" },
  { id: 6, nama: "Siti Aminah", universitas: "Universitas Dian Nuswantoro", divisi: "Humas", nilaiAkhir: 88, predikat: "A" },
  { id: 7, nama: "Ahmad F", universitas: "Universitas X", divisi: "Reskrim", nilaiAkhir: 65, predikat: "C" },
  { id: 8, nama: "Dewi C", universitas: "Universitas Negeri Semarang", divisi: "Lantas", nilaiAkhir: 75, predikat: "B" },
  { id: 9, nama: "Budi Santoso", universitas: "Universitas Diponegoro", divisi: "Subbid Tekinfo", nilaiAkhir: 92, predikat: "A" },
  { id: 10, nama: "Siti Aminah", universitas: "Universitas Dian Nuswantoro", divisi: "Humas", nilaiAkhir: 88, predikat: "A" },
  { id: 11, nama: "Ahmad F", universitas: "Universitas X", divisi: "Reskrim", nilaiAkhir: 65, predikat: "C" },
  { id: 12, nama: "Dewi C", universitas: "Universitas Negeri Semarang", divisi: "Lantas", nilaiAkhir: 75, predikat: "B" },
  { id: 13, nama: "Budi Santoso", universitas: "Universitas Diponegoro", divisi: "Subbid Tekinfo", nilaiAkhir: 92, predikat: "A" },
  { id: 14, nama: "Siti Aminah", universitas: "Universitas Dian Nuswantoro", divisi: "Humas", nilaiAkhir: 88, predikat: "A" },
  { id: 15, nama: "Ahmad F", universitas: "Universitas X", divisi: "Reskrim", nilaiAkhir: 65, predikat: "C" },
  { id: 16, nama: "Dewi C", universitas: "Universitas Negeri Semarang", divisi: "Lantas", nilaiAkhir: 75, predikat: "B" },
  { id: 17, nama: "Budi Santoso", universitas: "Universitas Diponegoro", divisi: "Subbid Tekinfo", nilaiAkhir: 92, predikat: "A" },
  { id: 18, nama: "Siti Aminah", universitas: "Universitas Dian Nuswantoro", divisi: "Humas", nilaiAkhir: 88, predikat: "A" },
  { id: 19, nama: "Ahmad F", universitas: "Universitas X", divisi: "Reskrim", nilaiAkhir: 65, predikat: "C" },
  { id: 20, nama: "Dewi C", universitas: "Universitas Negeri Semarang", divisi: "Lantas", nilaiAkhir: 75, predikat: "B" },
];

const PER_PAGE = 10;

const TableHasilMagang = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(DATA.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentData = DATA.slice(start, start + PER_PAGE);

  return (
    <div className="p-6 bg-white border rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">Laporan Hasil Magang</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Mahasiswa</TableHead>
            <TableHead>Universitas</TableHead>
            <TableHead>Divisi Penempatan</TableHead>
            <TableHead>Nilai Akhir (Rata - Rata)</TableHead>
            <TableHead>Predikat</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nama}</TableCell>
              <TableCell>{item.universitas}</TableCell>
              <TableCell>{item.divisi}</TableCell>
              <TableCell>{item.nilaiAkhir}</TableCell>
              <TableCell>{item.predikat}</TableCell>
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

export default TableHasilMagang;
