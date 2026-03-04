import PenilaianList from "./Components/PenilaianList";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";

const PenilaianPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Penilaian</h1>

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

      <PenilaianList />
    </div>
  );
};

export default PenilaianPage;
