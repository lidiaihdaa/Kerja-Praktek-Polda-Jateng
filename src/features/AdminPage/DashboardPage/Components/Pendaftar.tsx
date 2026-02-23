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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, MoreVertical, CheckSquare, Trash2 } from "lucide-react";

const data = [
  { id: 1, nama: "Abdul Khadir", universitas: "Universitas Satu Jaya", jurusan: "Teknik Informatika" },
  { id: 2, nama: "Bunga Kartika", universitas: "Universitas Bangkit Satria", jurusan: "Hukum" },
  { id: 3, nama: "Ananda Halim", universitas: "Universitas Bangkit Satria", jurusan: "Teknik Informatika" },
  { id: 4, nama: "Muhammad Ali", universitas: "Universitas Satu Jaya", jurusan: "Hukum" },
  { id: 5, nama: "Bayu Aji Wibowo", universitas: "Universitas Pemuda Pemuda", jurusan: "Administrasi" },
];

const Pendaftar = () => {
  return (
    <div className="p-6 bg-white border rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          Pendaftar Mahasiswa dan Siswa Magang Baru
        </h2>
        <Button size="icon" variant="outline" className="rounded-full">
          <ArrowRight size={16} />
        </Button>
      </div>

      <div className="mb-4">
        <Input placeholder="Filter Universitas" className="max-w-sm" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Detail</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Asal Universitas ↑↓</TableHead>
            <TableHead>Jurusan</TableHead>
            <TableHead className="text-right">Review</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <MoreVertical size={16} className="cursor-pointer text-muted-foreground" />
              </TableCell>
              <TableCell>{item.nama}</TableCell>
              <TableCell>{item.universitas}</TableCell>
              <TableCell>{item.jurusan}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                      <CheckSquare size={14} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Detail Pendaftar</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 text-sm">
                      <p><b>Nama:</b> {item.nama}</p>
                      <p><b>Universitas:</b> {item.universitas}</p>
                      <p><b>Jurusan:</b> {item.jurusan}</p>
                    </div>
                  </DialogContent>
                </Dialog>

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
    </div>
  );
};

export default Pendaftar;
