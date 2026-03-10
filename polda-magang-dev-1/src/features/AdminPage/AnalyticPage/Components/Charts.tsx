import ReactApexChart from "react-apexcharts";
import { BarChart3 } from "lucide-react";

interface ChartItem {
  bulan: string;
  jumlah: number;
}

interface Props {
  data?: ChartItem[];
}

const Charts = ({ data = [] }: Props) => {
  const predikatSeries = [
    { name: "Predikat A", data: [15, 10, 20, 35, 17, 25, 8] },
    { name: "Predikat B", data: [8, 15, 10, 19, 5, 5, 10] },
    { name: "Predikat C", data: [2, 2, 1, 3, 2, 1, 3] },
  ];

  const predikatOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "Inter, system-ui, sans-serif",
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: { enabled: true, delay: 120 },
        dynamicAnimation: { enabled: true, speed: 350 },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        borderRadiusApplication: "end",
        columnWidth: "50%",
        distributed: false,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => val.toString(),
      offsetY: -2,
      style: {
        fontSize: "11px",
        fontWeight: 600,
        colors: ["#fff"],
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 0,
        blur: 2,
        opacity: 0.15,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#94a3b8", fontSize: "12px", fontWeight: 500 },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#94a3b8", fontSize: "12px" },
        formatter: (val: number) => Math.round(val).toString(),
      },
    },
    colors: ["#3B82F6", "#22C55E", "#8B5CF6"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.2,
        opacityFrom: 1,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "13px",
      fontWeight: 500,
      markers: { size: 8, shape: "circle" },
      itemMargin: { horizontal: 16, vertical: 8 },
      labels: { colors: "#64748b" },
    },
    grid: {
      borderColor: "#f1f5f9",
      strokeDashArray: 6,
      xaxis: { lines: { show: false } },
      padding: { top: -10, bottom: 0, left: 8, right: 8 },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val: number) => `${val} Mahasiswa` },
      style: { fontSize: "12px" },
    },
  };

  const lineOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      fontFamily: "Inter",
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: data.map((d) => d.bulan),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#94a3b8", fontSize: "12px" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#94a3b8", fontSize: "12px" },
        formatter: (val: number) => Math.round(val).toString(),
      },
    },
    colors: ["#2563eb"],
    grid: {
      borderColor: "#f1f5f9",
      strokeDashArray: 6,
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val: number) => `${val} Pendaftar` },
    },
  };

  const lineSeries = [
    {
      name: "Pendaftar",
      data: data.map((d) => d.jumlah),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Chart Grafik Pendaftaran — data dari API sama seperti overview */}
      <div className="p-5 bg-white border rounded-xl">
        <h3 className="mb-4 font-semibold">Grafik Pendaftaran</h3>
        <ReactApexChart
          options={lineOptions}
          series={lineSeries}
          type="line"
          height={320}
        />
      </div>

      {/* Chart Predikat */}
      <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-50">
            <BarChart3 size={18} className="text-indigo-500" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              Analisis Nilai Projek Mahasiswa
            </h2>
            <p className="text-xs text-muted-foreground">
              Distribusi predikat per bulan
            </p>
          </div>
        </div>

        <ReactApexChart
          options={predikatOptions}
          series={predikatSeries}
          type="bar"
          height={320}
        />
      </div>
    </div>
  );
};

export default Charts;