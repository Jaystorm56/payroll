import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { mockData } from '../mockData';

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
          labels: mockData.chartData.data.map(item => item.month),
          datasets: [{
            label: 'Salary Paid',
            data: mockData.chartData.data.map(item => item.salary),
            backgroundColor: 'rgba(67, 126, 247, 1)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
            borderRadius: 6,
            hoverBackgroundColor: '#437EF7'
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
                  return '$' + value/1000 + 'k';
                },
                // Responsive font size for y-axis
                font: {
                  size: window.innerWidth < 768 ? 10 : 12
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              // Responsive font size for x-axis
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
                  return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
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

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white p-4 sm:p-5 md:p-6 border border-gray-200 card-hover fade-in mx-2 sm:mx-3 md:px-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">{mockData.chartData.title}</h3>
      
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