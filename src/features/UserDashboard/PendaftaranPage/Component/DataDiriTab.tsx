import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DataDiriTab = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-40 h-48 bg-gray-200 border-[10px] rounded border-abu">
          <span className="text-sm text-gray-500">PAS FOTO</span>
        </div>
        <p className="text-xs text-center">PAS FOTO BERWARNA</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Input placeholder="Nama Lengkap *" />
        <Input placeholder="Email Pribadi *" />
        <Input placeholder="Tempat Lahir *" />
        <Input placeholder="No. HP Aktif *" />
        <Input type="date" />
        <Input placeholder="Instagram *" />

        <div className="flex justify-end mt-4">
          <Button className="bg-biru">NEXT</Button>
        </div>
      </div>
    </div>
  );
};

export default DataDiriTab;
