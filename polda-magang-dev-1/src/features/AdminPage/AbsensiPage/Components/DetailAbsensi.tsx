import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Calendar, Search } from "lucide-react";

type AbsensiHarian = {
  no: number;
  tanggal: string;
  jamMasuk: string;
  jamPulang: string;
  status: "hadir" | "tidak_hadir" | "libur";
};

const PERSON_DATA = {
  nama: "Budi Santoso",
  divisi: "Subbid Tekinfo",
};

const BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const generateMonthlyData = (): AbsensiHarian[] => {
  const data: AbsensiHarian[] = [];
  for (let i = 1; i <= 28; i++) {
    const date = new Date(2025, 1, i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    data.push({
      no: i,
      tanggal: `${i} Februari 2025`,
      jamMasuk: isWeekend ? "-" : "07:30",
      jamPulang: isWeekend ? "-" : "16:00",
      status: isWeekend ? "libur" : i % 7 === 0 ? "tidak_hadir" : "hadir",
    });
  }
  return data;
};

const DATA = generateMonthlyData();

const DetailAbsensi = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Absensi Magang</h1>

      <div className="flex gap-2">
        <Button size="sm" className="gap-2 bg-abu hover:bg-abu/90">
          <Download size={14} />
          Download
        </Button>
        <Button size="sm" variant="outline" className="gap-2">
          <Calendar size={14} />
          Pilih Tgl
        </Button>
      </div>

      <h2 className="text-lg font-semibold">Detail Absensi</h2>

      {/* Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Bulan</label>
              <Select defaultValue="Februari">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Pilih bulan" />
                </SelectTrigger>
                <SelectContent>
                  {BULAN.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Tahun</label>
              <Select defaultValue="2025">
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Tahun" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button size="sm" className="gap-2 bg-abu hover:bg-abu/90">
              <Search size={14} />
              Tampilkan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Person Info */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Nama</span>
              <p className="text-sm font-semibold">{PERSON_DATA.nama}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Divisi</span>
              <p className="text-sm font-semibold">{PERSON_DATA.divisi}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">NO</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jam Masuk</TableHead>
                <TableHead>Jam Pulang</TableHead>
                <TableHead>Keterangan</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {DATA.map((item) => (
                <TableRow
                  key={item.no}
                  className={
                    item.status === "libur"
                      ? "bg-yellow-50"
                      : item.status === "tidak_hadir"
                        ? "bg-red-50"
                        : ""
                  }
                >
                  <TableCell>{item.no}</TableCell>
                  <TableCell>{item.tanggal}</TableCell>
                  <TableCell>{item.jamMasuk}</TableCell>
                  <TableCell>{item.jamPulang}</TableCell>
                  <TableCell>
                    {item.status === "libur" && (
                      <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                        LIBUR AKHIR PEKAN
                      </span>
                    )}
                    {item.status === "tidak_hadir" && (
                      <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded">
                        TIDAK HADIR
                      </span>
                    )}
                    {item.status === "hadir" && (
                      <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
                        HADIR
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailAbsensi;
