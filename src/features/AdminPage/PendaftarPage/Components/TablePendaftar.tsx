import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table";

import { CheckSquare, CheckCheck, Trash2, Eye } from "lucide-react";

interface Anggota {
nama: string;
}

interface Mahasiswa {
id: number;
nama: string;
universitas: string;
jurusan: string;
tipe: string;
status: string;
created_at: string;

cv?: string;
proposal?: string;
surat?: string;

anggota?: Anggota[];

user: {
name: string;
email: string;
};
}

interface Props {
startDate?: string;
endDate?: string;
onDownloadReady?: (fn: () => void) => void;
}

const TablePendaftar = ({ startDate: _startDate, endDate: _endDate }: Props) => {
const [data, setData] = useState<Mahasiswa[]>([]);
const [loading, setLoading] = useState(true);
const [updatingId, setUpdatingId] = useState<number | null>(null);
const [search, setSearch] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [selected, setSelected] = useState<Mahasiswa | null>(null);

const itemsPerPage = 5;

const fetchData = async () => {
const token = localStorage.getItem("auth_token");

try {
  const response = await fetch(
    "http://127.0.0.1:8000/api/admin/pendaftar",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  const result = await response.json();

  if (response.ok) setData(result.data);
  else throw new Error();
} catch {
  toast.error("Tidak dapat mengambil data");
}

setLoading(false);


};

useEffect(() => {
fetchData();
const interval = setInterval(fetchData, 10000);
return () => clearInterval(interval);
}, []);

const callEndpoint = async (
id: number,
endpoint: string,
successMsg: string
) => {
const token = localStorage.getItem("auth_token");


setUpdatingId(id);

try {
  const response = await fetch(
    `http://127.0.0.1:8000/api/admin/pendaftar/${id}/${endpoint}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  const result = await response.json();

  if (!response.ok) throw new Error(result.message);

  await fetchData();
  toast.success(successMsg);
} catch (e: any) {
  toast.error(e.message || "Terjadi kesalahan");
}

setUpdatingId(null);


};

const handleApprove = (id: number) =>
callEndpoint(id, "approve", "Pendaftar lolos seleksi");

const handleReject = (id: number) =>
callEndpoint(id, "reject", "Pendaftar ditolak");

const handleTerima = (id: number) =>
callEndpoint(id, "terima", "Mahasiswa resmi diterima");

const filteredData = data.filter(
(item) =>
item.universitas?.toLowerCase().includes(search.toLowerCase()) ||
item.nama?.toLowerCase().includes(search.toLowerCase())
);

const totalPages = Math.ceil(filteredData.length / itemsPerPage);

const pageData = filteredData.slice(
(currentPage - 1) * itemsPerPage,
currentPage * itemsPerPage
);

const getStatusStyle = (status: string) => {
switch (status) {
case "pending":
return "bg-yellow-100 text-yellow-700";
case "diterima":
return "bg-green-100 text-green-700";
case "pengumuman_lolos":
return "bg-blue-100 text-blue-700";
case "pengumuman_tidak_lolos":
return "bg-red-100 text-red-700";
default:
return "bg-gray-100 text-gray-600";
}
};

return ( <div className="p-6 bg-white border rounded-xl space-y-6">


  <Input
    placeholder="Cari nama / universitas..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  {loading ? (
    <p>Memuat data...</p>
  ) : (
    <>
      <Table>

        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Universitas</TableHead>
            <TableHead>Jurusan</TableHead>
            <TableHead>Tipe</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pageData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nama}</TableCell>
              <TableCell>{item.universitas}</TableCell>
              <TableCell>{item.jurusan}</TableCell>

              <TableCell>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                  {item.tipe}
                </span>
              </TableCell>

              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </TableCell>

              <TableCell className="flex justify-end gap-2">

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelected(item)}
                >
                  <Eye size={14} />
                </Button>

                {item.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={updatingId === item.id}
                      onClick={() => handleApprove(item.id)}
                    >
                      <CheckSquare size={14} />
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={updatingId === item.id}
                      onClick={() => handleReject(item.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </>
                )}

                {item.status === "berkas" && (
                  <Button
                    size="sm"
                    className="bg-green-600 text-white"
                    onClick={() => handleTerima(item.id)}
                  >
                    <CheckCheck size={14} />
                    Terima
                  </Button>
                )}

              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>

      <div className="flex justify-between">
        <p>
          Halaman {currentPage} dari {totalPages || 1}
        </p>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  )}

  <Dialog
    open={!!selected}
    onOpenChange={(open) => !open && setSelected(null)}
  >
    <DialogContent className="max-w-lg">

      <DialogHeader>
        <DialogTitle>Detail Pendaftar</DialogTitle>
      </DialogHeader>

      {selected && (
        <>
          <div className="space-y-3 text-sm">

            <div>
              <b>Nama</b>
              <p>{selected.nama}</p>
            </div>

            <div>
              <b>Email</b>
              <p>{selected.user?.email}</p>
            </div>

            <div>
              <b>Universitas</b>
              <p>{selected.universitas}</p>
            </div>

            <div>
              <b>Jurusan</b>
              <p>{selected.jurusan}</p>
            </div>

            <div>
              <b>Tipe</b>
              <p>{selected.tipe}</p>
            </div>

            {selected.tipe === "kelompok" && selected.anggota && (
              <div className="pt-2">
                <b>Anggota Kelompok</b>
                <ul className="list-disc ml-5 mt-1">
                  {selected.anggota.map((a, i) => (
                    <li key={i}>{a.nama}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <b>Status</b>
              <p>{selected.status}</p>
            </div>

          </div>

          <div className="pt-4 border-t space-y-2">

            <b>Berkas</b>

            {selected.cv && (
              <a
                href={`http://127.0.0.1:8000/storage/${selected.cv}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block"
              >
                Lihat CV
              </a>
            )}

            {selected.proposal && (
              <a
                href={`http://127.0.0.1:8000/storage/${selected.proposal}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block"
              >
                Lihat Proposal
              </a>
            )}

            {selected.surat && (
              <a
                href={`http://127.0.0.1:8000/storage/${selected.surat}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block"
              >
                Lihat Surat Pengantar
              </a>
            )}

          </div>

          <div className="flex gap-2 pt-4">

            <Button
              className="bg-green-600 text-white"
              onClick={() => selected && handleApprove(selected.id)}
            >
              Approve
            </Button>

            <Button
              variant="destructive"
              onClick={() => selected && handleReject(selected.id)}
            >
              Reject
            </Button>

          </div>
        </>
      )}

    </DialogContent>
  </Dialog>
</div>


);
};

export default TablePendaftar;
