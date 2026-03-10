import { useState } from "react";
import TablePendaftar from "./Components/TablePendaftar";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const PendaftarPage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [downloadFn, setDownloadFn] = useState<(() => void) | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Data Pendaftar Baru</h1>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* DATE FILTER */}
        <div className="flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-md px-3 py-2"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-md px-3 py-2"
          />
        </div>

        {/* DOWNLOAD BUTTON */}
        <Button
          size="sm"
          className="gap-2"
          onClick={() => downloadFn?.()}
        >
          <Download size={14} />
          Download
        </Button>
      </div>

      <TablePendaftar
        startDate={startDate}
        endDate={endDate}
        onDownloadReady={setDownloadFn}
      />
    </div>
  );
};

export default PendaftarPage;