"use client";

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { ChartVariable } from "../../interfaces/ChartVariable.interface";
import { TenMonHoc } from "../../../variables/variables";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Reports() {
  const [chartData, setChartData] = useState<ChartVariable["data"]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_BACKEND}/reports`,
        );

        const result: ChartVariable = await response.json();

        if (!response.ok || !result.data) throw new Error();

        setChartData(result.data);
      } catch {
        toast.error("Failed to fetch report data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, []);

  const categories =
    chartData?.categories.map(
      (category) =>
        TenMonHoc[category as keyof typeof TenMonHoc] ?? category,
    ) ?? [];

  const options: ApexOptions = {
    chart: {
      toolbar: { show: false },
    },
    colors: ["#465fff", "#12b76a", "#f79009", "#f04438"],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "68%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
      labels: {
        rotate: 0,
        trim: false,
      },
    },
    yaxis: {
      title: {
        text: "Students",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    grid: {
      borderColor: "#e5e7eb",
    },
  };

  return (
    <div className="min-h-full bg-[#f8f9fa] p-4 md:p-8">
      <section className="mx-auto max-w-[1200px] rounded-xl bg-white p-6 shadow-md md:p-8">
        <h1 className="text-2xl font-bold">
          {chartData?.name ?? "Score Distribution"}
        </h1>
        <p className="mb-5 text-sm text-gray-500">
          Student score statistics by subject.
        </p>

        {isLoading && <p className="text-gray-500">Loading report...</p>}

        {!isLoading && chartData && (
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <Chart
                options={options}
                series={chartData.series}
                type="bar"
                height={430}
              />
            </div>
          </div>
        )}

        {!isLoading && !chartData && (
          <p className="text-red-600">Report data is unavailable.</p>
        )}
      </section>
    </div>
  );
}
