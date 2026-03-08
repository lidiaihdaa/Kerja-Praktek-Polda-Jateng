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

export type InstansiMitra = {
  universitas: string;
  jurusan: string;
  jumlahMahasiswa: number;
};

interface Props {
  data: InstansiMitra[];
}

const PER_PAGE = 10;

const TableInstansiMitra = ({ data }: Props) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentData = data.slice(start, start + PER_PAGE);

  return (
    <div className="p-6 bg-white border rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">Laporan Instansi Mitra</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Universitas</TableHead>
            <TableHead>Jurusan</TableHead>
            <TableHead>Jumlah Mahasiswa</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Tidak ada data instansi mitra
              </TableCell>
            </TableRow>
          ) : (
            currentData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.universitas}</TableCell>
                <TableCell>{item.jurusan}</TableCell>
                <TableCell>{item.jumlahMahasiswa}</TableCell>
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