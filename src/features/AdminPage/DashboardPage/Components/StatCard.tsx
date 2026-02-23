import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, Users, Building, Award, Info, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Pendaftar Baru",
    value: 100,
    subtitle: "Sejak Minggu Lalu",
    percentage: "13.47%",
    icon: ClipboardList,
  },
  {
    title: "Pemagang Aktif",
    value: 50,
    subtitle: "Sejak Minggu Lalu",
    percentage: "13.47%",
    icon: Users,
  },
  {
    title: "Total Instansi Mitra",
    value: 15,
    subtitle: "Bulan Lalu",
    percentage: "13.47%",
    icon: Building,
  },
  {
    title: "Rata - Rata Nilai Alumni",
    value: 90,
    subtitle: "",
    percentage: "",
    icon: Award,
  },
];

export const StatCard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <stat.icon size={16} className="text-abu" />
                <p className="text-xs text-abu">{stat.title}</p>
              </div>
              <Info size={14} className="cursor-pointer text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
            {stat.subtitle && (
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            )}
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-xs font-medium cursor-pointer text-abu hover:underline">
                Detail
              </span>
              {stat.percentage && (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <span>{stat.percentage}</span>
                  <TrendingUp size={12} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
