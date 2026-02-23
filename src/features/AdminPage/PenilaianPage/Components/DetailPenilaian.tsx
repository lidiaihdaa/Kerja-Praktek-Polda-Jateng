import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Download, Calendar, Pencil } from "lucide-react";

type AnggotaTim = {
  id: number;
  nama: string;
  nim: string;
  role: string;
  avatar: string;
};

const TEAM_DATA = {
  teamName: "Tim A - Tekinfo",
  universitas: "Universitas Diponegoro",
  periode: "1 Februari 2025 - 1 Juni 2025",
  avatar: "https://i.pravatar.cc/100?img=1",
  deskripsiProyek:
    "Pengembangan Sistem Informasi Manajemen Magang berbasis Web untuk Polda Jateng. Sistem ini mencakup fitur manajemen data mahasiswa, absensi digital, penilaian, dan pelaporan terintegrasi.",
};

const ANGGOTA: AnggotaTim[] = [
  { id: 1, nama: "Budi Santoso", nim: "21120122140001", role: "Ketua Tim", avatar: "https://i.pravatar.cc/100?img=11" },
  { id: 2, nama: "Siti Aminah", nim: "21120122140002", role: "Frontend Developer", avatar: "https://i.pravatar.cc/100?img=12" },
  { id: 3, nama: "Ahmad Fauzi", nim: "21120122140003", role: "Backend Developer", avatar: "https://i.pravatar.cc/100?img=13" },
  { id: 4, nama: "Dewi Cahyani", nim: "21120122140004", role: "UI/UX Designer", avatar: "https://i.pravatar.cc/100?img=14" },
];

const DetailPenilaian = () => {
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

      <h2 className="text-lg font-semibold">Detail Penilaian Projek</h2>

      {/* Team Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={TEAM_DATA.avatar} />
              <AvatarFallback>TA</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{TEAM_DATA.teamName}</h3>
              <p className="text-sm text-muted-foreground">{TEAM_DATA.universitas}</p>
              <p className="text-sm text-muted-foreground">{TEAM_DATA.periode}</p>
            </div>
          </div>

          <Separator className="my-5" />

          {/* Project Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Deskripsi Proyek</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{TEAM_DATA.deskripsiProyek}</p>
          </div>
        </CardContent>
      </Card>

      {/* Anggota Tim */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <h3 className="text-lg font-semibold">Anggota Tim</h3>

          {ANGGOTA.map((anggota, index) => (
            <div key={anggota.id}>
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={anggota.avatar} />
                  <AvatarFallback>{anggota.nama.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold">{anggota.nama}</h4>
                    <p className="text-xs text-muted-foreground">{anggota.nim} &middot; {anggota.role}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">Nilai</label>
                      <Input type="number" placeholder="0 - 100" className="bg-gray-50" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">Keterangan</label>
                      <Input placeholder="Masukkan keterangan..." className="bg-gray-50" />
                    </div>
                  </div>
                </div>
              </div>

              {index < ANGGOTA.length - 1 && <Separator className="mt-5" />}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="gap-2 bg-abu hover:bg-abu/90">
          <Pencil size={14} />
          Update
        </Button>
      </div>
    </div>
  );
};

export default DetailPenilaian;
