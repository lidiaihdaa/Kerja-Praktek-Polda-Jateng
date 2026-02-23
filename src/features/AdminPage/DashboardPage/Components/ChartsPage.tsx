import Chart from "./Chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";

const mahasiswaBaru = [
  {
    name: "Siti Aisyah",
    university: "Universitas Dian Nuswantoro",
    major: "Teknik Informatika",
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    name: "Nur Salim",
    university: "Universitas Diponegoro",
    major: "Hukum",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Bagas Ardianya",
    university: "Universitas Diponegoro",
    major: "Hukum",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    name: "Clara Sinta",
    university: "Universitas Dian Nuswantoro",
    major: "Ilmu Komunikasi",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "Rizky Widiyanto",
    university: "Universitas Negeri Semarang",
    major: "Administrasi",
    avatar: "https://i.pravatar.cc/100?img=8",
  },
];

const ChartsPage = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Chart />
      </div>

      <Card className="h-fit">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">
            Mahasiswa Magang Baru
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {mahasiswaBaru.map((mhs, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={mhs.avatar}
                  alt={mhs.name}
                  className="object-cover w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{mhs.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {mhs.university} – {mhs.major}
                  </p>
                </div>
              </div>

              <MoreVertical
                size={16}
                className="cursor-pointer text-muted-foreground"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsPage;
