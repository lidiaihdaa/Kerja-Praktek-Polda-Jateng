import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DataMagangTab = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <label className="block mb-1 text-sm font-medium">Divisi *</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Divisi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tik">TIK</SelectItem>
            <SelectItem value="humas">HUMAS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Rekomendasi</label>
        <Input placeholder="Nama / Instansi Rekomendasi" />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Mulai Magang *</label>
        <Input type="date" />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Selesai Magang *
        </label>
        <Input type="date" />
      </div>
      {/* 
      <div className="md:col-span-2">
        <label className="block mb-1 text-sm font-medium">
          Alasan Mengikuti Magang *
        </label>
        <Textarea placeholder="Tuliskan alasan mengikuti magang..." />
      </div> */}

      <div className="flex justify-end mt-4 md:col-span-2">
        <Button className="bg-biru">UPLOAD</Button>
      </div>
    </div>
  );
};

export default DataMagangTab;