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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Mahasiswa = {
  id: number;
  nama: string;
  universitas: string;
  divisi: string;
  jurusan: string;
};

const PER_PAGE = 10;

const TableMahasiswa = () => {
  const [data, setData] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const fetchMahasiswa = async () => {
    try {
      const token = localStorage.getItem("auth_token");

      const res = await fetch(
        "http://127.0.0.1:8000/api/admin/pendaftar",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const result = await res.json();

      console.log("API RESULT:", result);

      if (res.ok) {

        // handle response array atau {data:[]}
        if (Array.isArray(result)) {
          setData(result);
        } else if (Array.isArray(result.data)) {
          setData(result.data);
        } else {
          setData([]);
        }

      }

    } catch (error) {
      console.error("Gagal mengambil data mahasiswa:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const totalPages = Math.ceil(data.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentData = data.slice(start, start + PER_PAGE);

  return (
    <div className="p-6 bg-white border rounded-xl">

      <h2 className="mb-4 text-lg font-semibold">
        Laporan Data Mahasiswa
      </h2>

      <Table>

        <TableHeader>
          <TableRow>
            <TableHead>Nama Mahasiswa</TableHead>
            <TableHead>Instansi</TableHead>
            <TableHead>Divisi Penempatan</TableHead>
            <TableHead>Jurusan</TableHead>
            <TableHead className="text-right">
              Detail Profil
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {loading ? (

            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Memuat data...
              </TableCell>
            </TableRow>

          ) : currentData.length === 0 ? (

            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Tidak ada data mahasiswa
              </TableCell>
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
                    onClick={() =>
                      navigate(`/admin/laporan/mhs/${item.id}`)
                    }
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
                        <AlertDialogTitle>
                          Yakin hapus data ini?
                        </AlertDialogTitle>
                      </AlertDialogHeader>

                      <div className="flex justify-end gap-2">

                        <AlertDialogCancel>
                          Batal
                        </AlertDialogCancel>

                        <AlertDialogAction className="bg-red-600">
                          Hapus
                        </AlertDialogAction>

                      </div>

                    </AlertDialogContent>

                  </AlertDialog>

                </TableCell>

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
                onClick={() =>
                  setPage((p) => Math.min(p + 1, totalPages))
                }
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