import ReactApexChart from "react-apexcharts";
import { TrendingUp, Info } from "lucide-react";

const Chart = () => {
  const series = [
    { name: "Predikat A", data: [15, 10, 20, 35, 17, 25, 8] },
    { name: "Predikat B", data: [8, 15, 10, 19, 5, 5, 10] },
    { name: "Predikat C", data: [3, 4, 2, 3, 2, 2, 3] },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "Inter, system-ui, sans-serif",
      animations: {
        enabled: true,
        speed: 700,
        animateGradually: { enabled: true, delay: 100 },
        dynamicAnimation: { enabled: true, speed: 300 },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "48%",
        borderRadius: 8,
        borderRadiusApplication: "end",
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
        style: {
          colors: "#94a3b8",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#94a3b8",
          fontSize: "12px",
        },
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
      y: {
        formatter: (val: number) => `${val} Mahasiswa`,
      },
      style: { fontSize: "12px" },
    },
    states: {
      hover: { filter: { type: "darken" } },
      active: { filter: { type: "darken" } },
    },
  };

  return (
    <div className="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50">
            <TrendingUp size={18} className="text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Grafik Reputasi Universitas
            </p>
            <p className="text-xs text-muted-foreground">
              Kompetensi universitas 7 bulan terakhir
            </p>
          </div>
        </div>
        <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
          <Info size={16} className="text-muted-foreground" />
        </button>
      </div>

      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={320}
      />
    </div>
  );
};

export default Chart;
