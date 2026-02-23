import { Button } from "@/components/ui/button";
import { Download, Calendar, FileText, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const DetailPendaftar = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Data Pendaftar Baru</h1>

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

      <h2 className="text-lg font-semibold">Detail Pendaftar</h2>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex-shrink-0">
              <div className="w-40 h-48 overflow-hidden border-2 border-yellow-600 rounded-lg bg-gray-50">
                <img
                  src="https://i.pravatar.cc/200?img=32"
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid items-center grid-cols-1 md:grid-cols-[160px_1fr] gap-y-4 gap-x-4">
                <span className="text-sm font-semibold">Nama Lengkap</span>
                <Input value="Budi Santoso" readOnly className="bg-gray-50" />

                <span className="text-sm font-semibold">Email</span>
                <Input value="budisantoso@gmail.com" readOnly className="bg-gray-50" />

                <span className="text-sm font-semibold">No. HP Aktif</span>
                <Input value="+62-812-345-6789" readOnly className="bg-gray-50" />

                <span className="text-sm font-semibold">Universitas</span>
                <Input value="Universitas Diponegoro" readOnly className="bg-gray-50" />

                <span className="text-sm font-semibold">Jurusan</span>
                <Input value="Teknik Informatika" readOnly className="bg-gray-50" />

                <span className="text-sm font-semibold">Fakultas</span>
                <Input value="Fakultas Teknik" readOnly className="bg-gray-50" />

                <span className="text-sm font-semibold">Divisi Pengajuan</span>
                <Input value="Subbid Tekinfo" readOnly className="bg-gray-50" />
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-semibold">Berkas</h3>

            <div className="flex flex-wrap gap-8">
              <div className="space-y-2">
                <span className="text-sm font-medium">CV :</span>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center justify-center w-16 h-20 border-2 border-dashed rounded border-gray-300 bg-gray-50">
                    <FileText size={36} className="text-gray-300" />
                  </div>
                  <span className="text-xs text-muted-foreground italic">*Verifikasi Agar Pendaftar dapat Upload Berkas</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">Proposal Magang :</span>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center justify-center w-16 h-20 border-2 border-dashed rounded border-gray-300 bg-gray-50">
                    <FileText size={36} className="text-gray-300" />
                  </div>
                  <span className="text-xs text-muted-foreground italic">*Verifikasi Agar Pendaftar dapat Upload Berkas</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Surat Pengantar Kampus :</span>
              <div className="flex flex-col items-center gap-1 w-fit">
                <div className="flex items-center justify-center w-16 h-20 border-2 border-dashed rounded border-gray-300 bg-gray-50">
                  <FileText size={36} className="text-gray-300" />
                </div>
                <span className="text-xs text-muted-foreground italic">*Verifikasi Agar Pendaftar dapat Upload Berkas</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white">
              <Check size={14} />
              Verifikasi
            </Button>
            <Button className="gap-2 bg-red-600 hover:bg-red-700 text-white">
              <X size={14} />
              Tolak
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailPendaftar;
