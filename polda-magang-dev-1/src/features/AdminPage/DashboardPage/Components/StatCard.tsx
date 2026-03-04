import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, Users, Building, Award } from "lucide-react";

interface CardsData {
  pendaftar: number;
  aktif: number;
  instansi: number;
  nilai: number;
}

interface Props {
  cards?: CardsData;
}

export const StatCard = ({ cards }: Props) => {

  const data = [
    {
      title: "Pendaftar Baru",
      value: cards?.pendaftar ?? 0,
      icon: ClipboardList
    },
    {
      title: "Pemagang Aktif",
      value: cards?.aktif ?? 0,
      icon: Users
    },
    {
      title: "Total Instansi Mitra",
      value: cards?.instansi ?? 0,
      icon: Building
    },
    {
      title: "Rata - Rata Nilai Alumni",
      value: cards?.nilai ?? 0,
      icon: Award
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

      {data.map((item, index) => {

        const Icon = item.icon;

        return (
          <Card key={index}>
            <CardContent className="p-4 space-y-2">

              <div className="flex items-center gap-2">
                <Icon size={16} className="text-gray-500"/>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>
              </div>

              <p className="text-3xl font-bold">
                {item.value}
              </p>

            </CardContent>
          </Card>
        );

      })}

    </div>
  );
};