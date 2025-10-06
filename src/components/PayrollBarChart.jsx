import { useEffect, useRef } from "react";
import { PayrollMockData } from "../mockData";
import Chart from "chart.js/auto";
const PayrollBarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: PayrollMockData.chartData.data.map(item => item.month),
          datasets: [{
            label: 'Salary Paid',
            data: PayrollMockData.chartData.data.map(item => item.salary),
            backgroundColor: 'rgba(67, 126, 247, 1)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
            hoverBackgroundColor: '#437EF7',
            barPercentage: 0.9,
            categoryPercentage: 0.9
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false
              },
              ticks: {
                callback: function(value) {
                  return (value/1000).toLocaleString() + 'k';
                },
                font: {
                  size: window.innerWidth < 768 ? 10 : 12
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: window.innerWidth < 768 ? 10 : 12
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return new Intl.NumberFormat('en-Us', {
                    style: 'currency',
                    currency: 'NGN',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(context.raw);
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white p-4 sm:p-5 md:p-6 border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">{PayrollMockData.chartData.title}</h3>
      
      <div className="flex items-center justify-end mb-3 sm:mb-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-xs sm:text-sm text-gray-600">Salary Paid</span>
        </div>
      </div>
      
      <div className="h-64 sm:h-72 md:h-80">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};
export default PayrollBarChart;