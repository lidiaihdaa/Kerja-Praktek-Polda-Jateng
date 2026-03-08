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

export type HasilMagang = {
  id: number;
  nama: string;
  universitas: string;
  divisi: string;
  nilai: number;
};

interface Props {
  data: HasilMagang[];
}

const PER_PAGE = 10;

const TableHasilMagang = ({ data }: Props) => {
  const [page, setPage] = useState(1);

  const getPredikat = (nilai: number) => {
    if (nilai >= 90) return "A";
    if (nilai >= 80) return "B";
    if (nilai >= 70) return "C";
    return "D";
  };

  const totalPages = Math.ceil(data.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentData = data.slice(start, start + PER_PAGE);

  return (
    <div className="p-6 bg-white border rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">Laporan Hasil Magang</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Mahasiswa</TableHead>
            <TableHead>Universitas</TableHead>
            <TableHead>Divisi Penempatan</TableHead>
            <TableHead>Nilai Akhir</TableHead>
            <TableHead>Predikat</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Tidak ada data hasil magang
              </TableCell>
            </TableRow>
          ) : (
            currentData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.universitas}</TableCell>
                <TableCell>{item.divisi}</TableCell>
                <TableCell>{item.nilai}</TableCell>
                <TableCell>{getPredikat(item.nilai)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

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
    </div>
  );
};

export default TableHasilMagang;