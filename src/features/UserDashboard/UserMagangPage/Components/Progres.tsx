import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type ProgresItem = {
  id: number;
  status: "Pending" | "On Progress" | "Done";
  tanggal: string;
  kegiatan: string;
  dokumentasi?: File | null;
};

const Progres = () => {
  const [data, setData] = useState<ProgresItem[]>([
    {
      id: 1,
      status: "Pending",
      tanggal: "2026-02-25",
      kegiatan: "",
      dokumentasi: null,
    },
    {
      id: 2,
      status: "On Progress",
      tanggal: "2026-02-24",
      kegiatan: "Meeting Project",
      dokumentasi: null,
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const handleKegiatanChange = (id: number, value: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, kegiatan: value } : item,
      ),
    );
  };

  const handleSave = (id: number) => {
    const item = data.find((d) => d.id === id);
    console.log("SAVE KEGIATAN:", item);

    // TODO: panggil API di sini
    setEditingId(null);
  };

  const handleFileChange = (id: number, file: File | null) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, dokumentasi: file } : item,
      ),
    );

    console.log("UPLOAD FILE:", file);
    // TODO: upload ke API
  };

  const renderStatus = (status: ProgresItem["status"]) => {
    if (status === "Done") return <Badge variant={"secondary"}>Done</Badge>;
    if (status === "On Progress")
      return <Badge variant="secondary">On Progress</Badge>;
    return <Badge variant="outline">Pending</Badge>;
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Progres Kegiatan</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Kegiatan</TableHead>
            <TableHead>Dokumentasi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{renderStatus(item.status)}</TableCell>

              <TableCell>{item.tanggal}</TableCell>

              {/* KEGIATAN */}
              <TableCell className="w-[300px]">
                <div className="flex gap-2">
                  <Input
                    value={item.kegiatan}
                    placeholder="Isi kegiatan..."
                    onFocus={() => setEditingId(item.id)}
                    onChange={(e) =>
                      handleKegiatanChange(item.id, e.target.value)
                    }
                  />

                  {editingId === item.id && (
                    <Button size="sm" onClick={() => handleSave(item.id)}>
                      Simpan
                    </Button>
                  )}
                </div>
              </TableCell>

              {/* DOKUMENTASI */}
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Input
                    type="file"
                    onChange={(e) =>
                      handleFileChange(item.id, e.target.files?.[0] || null)
                    }
                  />

                  {item.dokumentasi && (
                    <span className="text-xs text-muted-foreground">
                      {item.dokumentasi.name}
                    </span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Progres;
