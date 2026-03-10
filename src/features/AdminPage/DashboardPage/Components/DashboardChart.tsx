import ReactApexChart from "react-apexcharts";

interface ChartItem {
  bulan: string;
  jumlah: number;
}

interface Props {
  data: ChartItem[];
}

const DashboardChart = ({ data }: Props) => {

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      fontFamily: "Inter"
    },
    stroke: {
      curve: "smooth",
      width: 3
    },
    xaxis: {
      categories: data.map((d) => d.bulan)
    },
    colors: ["#2563eb"],
    grid: {
      borderColor: "#f1f5f9"
    }
  };

  const series = [
    {
      name: "Pendaftar",
      data: data.map((d) => d.jumlah)
    }
  ];

  return (
    <div className="p-5 bg-white border rounded-xl">
      <h3 className="mb-4 font-semibold">Grafik Pendaftaran</h3>

      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={320}
      />
    </div>
  );
};

export default DashboardChart;