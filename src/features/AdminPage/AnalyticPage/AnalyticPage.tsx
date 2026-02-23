import Charts from "./Components/Charts";
import Map from "./Components/Map";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";

const AnalyticPage = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analisis</h1>

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

      <Charts />
      <Map />
    </div>
  );
};

export default AnalyticPage;
