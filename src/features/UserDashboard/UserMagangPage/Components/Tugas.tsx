import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Tugas = () => {
  return (
    <div className="p-6">
      <div className="p-6 bg-white border rounded-lg">
        <div className="flex justify-center mb-6">
          <div className="px-6 py-2 text-sm font-semibold text-white rounded-md bg-abu">
            TUGAS AKHIR
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Divisi <span className="text-red-500">*</span>
            </label>

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

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              File Tugas Akhir <span className="text-red-500">*</span>
            </label>

            <div className="p-2 rounded-md ">
              <Input
                type="file"
                className="bg-transparent border-none file:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-slate-600 hover:bg-slate-700">Upload</Button>
        </div>
      </div>
    </div>
  );
};

export default Tugas;