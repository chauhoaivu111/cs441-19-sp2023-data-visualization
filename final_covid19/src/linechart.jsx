



import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from 'chart.js/auto'

function LineChart() {
  const [chartData, setChartData] = useState({});
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      const cases = Object.values(result.data.cases);
      const dates = Object.keys(result.data.cases);

      setChartData({
        labels: dates,
        datasets: [
          {
            label: "total case",
            data: cases,
            borderColor: "rgb(255, 99, 132)",
            fill: false
          }
        ]
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Total Cases'
                }
              }
            ]
          },
          legend: {
            display: false
          }
        }
      });
    }
  }, [chartData]);

  return <canvas id="myChart" ref={canvasRef} className="linechart"></canvas>;
}

export default LineChart;
