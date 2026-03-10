import { useEffect, useState } from "react";
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
import { ArrowRight, MoreVertical, CheckSquare, Trash2, X } from "lucide-react";

interface Mahasiswa {
  id: number;
  universitas: string;
  jurusan: string;
  status: string;
  cv?: string;
  surat?: string;
  proposal?: string;

  user: {
    name: string;
    email: string;
  };
}

const Pendaftar = () => {
  const [data, setData] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const fetchData = async () => {
    const token = localStorage.getItem("auth_token");

    const response = await fetch("http://127.0.0.1:8000/api/admin/pendaftar", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const result = await response.json();

    if (response.ok) {
      setData(result.data);
    }

    setLoading(false);
  };

  const updateStatus = async (id: number, status: string) => {
    const token = localStorage.getItem("auth_token");

    await fetch(`http://127.0.0.1:8000/api/admin/pendaftar/${id}/status`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ status }),
    });

    fetchData();
  };

  const filtered = filter
    ? data.filter((item) =>
        item.universitas?.toLowerCase().includes(filter.toLowerCase()),
      )
    : data;

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

      <div className="mb-4 flex items-center gap-2 max-w-sm">
        <div className="relative w-full">
          <Input
            placeholder="Filter Universitas"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          {filter && (
            <button
              onClick={() => setFilter("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Detail</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Asal Universitas</TableHead>
              <TableHead>Jurusan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Review</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-gray-400 py-6"
                >
                  Tidak ada data untuk universitas "{filter}"
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <MoreVertical
                      size={16}
                      className="cursor-pointer text-muted-foreground"
                    />
                  </TableCell>

                  <TableCell>{item.user?.name}</TableCell>
                  <TableCell>{item.universitas}</TableCell>
                  <TableCell>{item.jurusan}</TableCell>

                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-semibold ${
                        item.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === "diterima"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>

                  <TableCell className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 border-green-600"
                        >
                          <CheckSquare size={14} />
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Detail Pendaftar</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-2 text-sm">
                          <p>
                            <b>Nama:</b> {item.user?.name}
                          </p>
                          <p>
                            <b>Email:</b> {item.user?.email}
                          </p>
                          <p>
                            <b>Universitas:</b> {item.universitas}
                          </p>
                          <p>
                            <b>Jurusan:</b> {item.jurusan}
                          </p>

                          <div className="pt-3 border-t">
                            <p className="font-semibold">Berkas</p>

                            {item.cv && (
                              <a
                                href={`http://127.0.0.1:8000/storage/${item.cv}`}
                                target="_blank"
                                className="text-blue-600 underline block"
                              >
                                Lihat CV
                              </a>
                            )}

                            {item.surat && (
                              <a
                                href={`http://127.0.0.1:8000/storage/${item.surat}`}
                                target="_blank"
                                className="text-blue-600 underline block"
                              >
                                Surat Pengantar
                              </a>
                            )}

                            {item.proposal && (
                              <a
                                href={`http://127.0.0.1:8000/storage/${item.proposal}`}
                                target="_blank"
                                className="text-blue-600 underline block"
                              >
                                Proposal Magang
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button
                            className="bg-green-600"
                            onClick={() => updateStatus(item.id, "diterima")}
                          >
                            Terima
                          </Button>

                          <Button
                            variant="destructive"
                            onClick={() => updateStatus(item.id, "ditolak")}
                          >
                            Tolak
                          </Button>
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
                          <AlertDialogTitle>
                            Tolak pendaftar ini?
                          </AlertDialogTitle>
                        </AlertDialogHeader>

                        <div className="flex justify-end gap-2">
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600">
                            Tolak
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
      )}
    </div>
  );
};

export default Pendaftar;
