import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AbsenMasuk from "./AbsenMasuk";
import AbsenPulang from "./AbsenPulang";

type AbsensiView = "table" | "masuk" | "pulang";

const Absensi = () => {
  const [view, setView] = useState<AbsensiView>("table");

  const [jamMasuk, setJamMasuk] = useState<string | null>(null);
  const [jamPulang, setJamPulang] = useState<string | null>(null);

  const handleMasuk = () => {
    const now = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setJamMasuk(now);
    setView("table");
  };

  const handlePulang = () => {
    const now = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setJamPulang(now);
    setView("table");
  };

  if (view === "masuk") {
    return <AbsenMasuk onSuccess={handleMasuk} onBack={() => setView("table")} />;
  }

  if (view === "pulang") {
    return (
      <AbsenPulang onSuccess={handlePulang} onBack={() => setView("table")} />
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Absensi Harian</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Absen Masuk</TableHead>
            <TableHead>Absen Pulang</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>
              {jamMasuk && jamPulang ? (
                <span className="font-medium text-green-600">Lengkap</span>
              ) : (
                <span className="font-medium text-yellow-600">Belum Lengkap</span>
              )}
            </TableCell>

            <TableCell>
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </TableCell>

            <TableCell>
              {jamMasuk ? (
                <span className="font-medium">{jamMasuk}</span>
              ) : (
                <Button
                  size="sm"
                  className="text-white bg-abu"
                  onClick={() => setView("masuk")}
                >
                  Absen Masuk
                </Button>
              )}
            </TableCell>

            <TableCell>
              {jamPulang ? (
                <span className="font-medium">{jamPulang}</span>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-abu text-abu"
                  onClick={() => setView("pulang")}
                >
                  Absen Pulang
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Absensi;
