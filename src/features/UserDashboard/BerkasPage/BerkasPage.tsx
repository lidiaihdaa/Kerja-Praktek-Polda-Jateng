import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BerkasPage = () => {
  return (
    <div className="p-6 bg-white rounded-lg">
      <h1 className="mb-6 text-2xl font-bold">PERSYARATAN BERKAS</h1>

      <div className="border border-gray-300 rounded-lg">
        <div className="flex justify-center py-3 border-b border-abu bg-abu/40">
          <span className="px-6 py-1 text-sm font-semibold text-white rounded bg-abu">
            FILE PENDUKUNG
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Curriculum Vitae <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="flex-1 h-10 rounded bg-abu" />
              <Input type="file" className="w-36" />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Proposal Magang <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="flex-1 h-10 rounded bg-abu" />
              <Input type="file" className="w-36" />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Surat Pengantar Kampus <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="flex-1 h-10 rounded bg-abu" />
              <Input type="file" className="w-36" />
            </div>
          </div>
        </div>

        <div className="flex justify-end px-6 py-4 border-t border-abu">
          <Button className="text-white bg-biru">UPLOAD</Button>
        </div>
      </div>
    </div>
  );
};

export default BerkasPage;