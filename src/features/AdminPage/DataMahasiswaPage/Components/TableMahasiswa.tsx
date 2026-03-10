import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
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
import { toast } from "sonner";

export type Mahasiswa = {
  id: number;
  nama: string;
  universitas: string;
  divisi: string;
  jurusan: string;
  email?: string;
  no_hp?: string;
  nim?: string;
  status?: string;
};

interface Props {
  data: Mahasiswa[];
  onDelete: (id: number) => void;
}

const PER_PAGE = 10;

const TableMahasiswa = ({ data, onDelete }: Props) => {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  // Filter hanya mahasiswa dengan status "diterima"
  const filteredData = data.filter(
    (item) => item.status?.toLowerCase() === "diterima"
  );

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`http://127.0.0.1:8000/api/admin/mahasiswa/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (res.ok) {
        onDelete(deleteId);
        toast.success("Data mahasiswa berhasil dihapus");
      } else {
        toast.error("Gagal menghapus data");
      }
    } catch (error) {
      console.error("Gagal hapus:", error);
      toast.error("Terjadi kesalahan");
    } finally {
      setDeleteId(null);
      setOpenDialog(false);
    }
  };

  const totalPages = Math.ceil(filteredData.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentData = filteredData.slice(start, start + PER_PAGE);

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
          {currentData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">Tidak ada data mahasiswa</TableCell>
            </TableRow>
          ) : (
            currentData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.universitas}</TableCell>
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

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setDeleteId(item.id);
                      setOpenDialog(true);
                    }}
                  >
                    <Trash2 size={14} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin hapus data ini?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel onClick={() => setOpenDialog(false)}>Batal</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600" onClick={handleDelete}>Hapus</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

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

export default TableMahasiswa;