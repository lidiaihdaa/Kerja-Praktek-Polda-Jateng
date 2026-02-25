import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DataKampusTab = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Input placeholder="Nama Perguruan Tinggi *" />
      <Input placeholder="Fakultas *" />
      <Input placeholder="Jurusan *" />
      <Input placeholder="NIM *" />

      <div className="flex justify-end mt-4 md:col-span-2">
        <Button className="bg-biru">NEXT</Button>
      </div>
    </div>
  );
};

export default DataKampusTab;
