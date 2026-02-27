import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, Pencil, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ProyekMagang = {
  id: number;
  teamName: string;
  subbid: string;
  avatar: string;
  projectFile: string;
  deskripsi: string;
};

const DATA: ProyekMagang[] = [
  {
    id: 1,
    teamName: "Tim A - Tekinfo",
    subbid: "Subbid Tekinfo",
    avatar: "https://i.pravatar.cc/100?img=1",
    projectFile: "proyek_tim_a.pdf",
    deskripsi: "Pengembangan Sistem Informasi Manajemen Magang berbasis Web untuk Polda Jateng",
  },
  {
    id: 2,
    teamName: "Tim B - Humas",
    subbid: "Humas",
    avatar: "https://i.pravatar.cc/100?img=2",
    projectFile: "proyek_tim_b.pdf",
    deskripsi: "Pembuatan Konten Digital dan Manajemen Media Sosial Polda Jateng",
  },
  {
    id: 3,
    teamName: "Tim C - Reskrim",
    subbid: "Reskrim",
    avatar: "https://i.pravatar.cc/100?img=3",
    projectFile: "proyek_tim_c.pdf",
    deskripsi: "Analisis Data Kriminal dan Pembuatan Dashboard Pelaporan Reskrim",
  },
  {
    id: 4,
    teamName: "Tim D - Lantas",
    subbid: "Lantas",
    avatar: "https://i.pravatar.cc/100?img=4",
    projectFile: "proyek_tim_d.pdf",
    deskripsi: "Redesign UI/UX Aplikasi Pelaporan Lalu Lintas Polda Jateng",
  },
  {
    id: 5,
    teamName: "Tim E - Tekinfo",
    subbid: "Subbid Tekinfo",
    avatar: "https://i.pravatar.cc/100?img=5",
    projectFile: "proyek_tim_e.pdf",
    deskripsi: "Pengembangan Sistem Absensi Digital berbasis QR Code untuk mahasiswa magang",
  },
  {
    id: 6,
    teamName: "Tim F - Humas",
    subbid: "Humas",
    avatar: "https://i.pravatar.cc/100?img=6",
    projectFile: "proyek_tim_f.pdf",
    deskripsi: "Dokumentasi dan Produksi Video Kegiatan Polda Jateng",
  },
  {
    id: 7,
    teamName: "Tim G - Reskrim",
    subbid: "Reskrim",
    avatar: "https://i.pravatar.cc/100?img=7",
    projectFile: "proyek_tim_g.pdf",
    deskripsi: "Pengembangan Sistem Pencatatan Barang Bukti Digital",
  },
  {
    id: 8,
    teamName: "Tim H - Lantas",
    subbid: "Lantas",
    avatar: "https://i.pravatar.cc/100?img=8",
    projectFile: "proyek_tim_h.pdf",
    deskripsi: "Sistem Monitoring Pelanggaran Lalu Lintas Terintegrasi",
  },
];

const PER_PAGE = 4;

const PenilaianList = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const totalPages = Math.ceil(DATA.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const currentData = DATA.slice(start, start + PER_PAGE);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Data Projek Magang</h2>

      <div className="space-y-4">
        {currentData.map((item) => (
          <Card key={item.id} className="border">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={item.avatar} />
                  <AvatarFallback>{item.teamName.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-sm">{item.teamName}</h3>
                    <p className="text-xs text-muted-foreground">{item.subbid}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText size={14} className="text-gray-400" />
                    <span>{item.projectFile}</span>
                  </div>

                  <p className="text-sm text-gray-700">{item.deskripsi}</p>
                </div>

                <Button
                  size="sm"
                  className="gap-2 bg-abu hover:bg-abu/90 shrink-0"
                  onClick={() => navigate(`/admin/penilaian/${item.id}`)}
                >
                  <Pencil size={14} />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationLink
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              >
                <ChevronRight size={16} />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default PenilaianList;
