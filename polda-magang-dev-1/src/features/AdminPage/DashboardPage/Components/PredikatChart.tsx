import ReactApexChart from "react-apexcharts";

const PredikatChart = () => {

  const series = [
    { name: "Predikat A", data: [15, 10, 20, 35, 17, 25, 8] },
    { name: "Predikat B", data: [8, 15, 10, 19, 5, 5, 10] },
    { name: "Predikat C", data: [3, 4, 2, 3, 2, 2, 3] }
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false }
    },
    xaxis: {
      categories: ["Jan","Feb","Mar","Apr","Mei","Jun","Jul"]
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "45%"
      }
    },
    colors: ["#3B82F6","#22C55E","#8B5CF6"],
    legend: {
      position: "bottom"
    }
  };

  return (
    <div className="p-5 bg-white border rounded-xl">

      <h3 className="mb-4 font-semibold">
        Grafik Reputasi Universitas
      </h3>

      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={320}
      />

    </div>
  );
};

export default PredikatChart;