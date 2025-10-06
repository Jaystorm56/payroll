import { useEffect, useRef } from "react";
import { PayrollMockData } from "../mockData";
import { Chart } from "chart.js";

const PayrollDoughnutChart = () => {
    const doughnutRef = useRef(null);
    const doughnutInstance = useRef(null);

    useEffect(() => {
        if (doughnutRef.current) {
            if (doughnutInstance.current) {
                doughnutInstance.current.destroy();
            }

            const ctx = doughnutRef.current.getContext('2d');
            const { departments } = PayrollMockData.departmentData;

            doughnutInstance.current = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: departments.map(dept => dept.name),
                    datasets: [{
                        data: departments.map(dept => dept.amount),
                        backgroundColor: departments.map(dept => dept.color),
                        borderWidth: 0,
                        cutout: '75%'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return context.label + ': ' + new Intl.NumberFormat('en-Us', {
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
            if (doughnutInstance.current) {
                doughnutInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="bg-white p-4 sm:p-5 md:p-6 border border-gray-200 rounded-lg shadow-sm h-[460px]">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">{PayrollMockData.departmentData.title}</h3>

            <div className="relative">
                <div className="h-36 sm:h-36 md:h-40">
                    <canvas ref={doughnutRef} />

                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none ">
                        <div className="text-center"> 
                            <div className="text-xs sm:text-sm text-gray-600 mb-1">Total</div>
                            <div className="text-sm font-bold text-black mb-[10rem]">{PayrollMockData.departmentData.total}</div>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="space-y-3 mt-16">
                    {PayrollMockData.departmentData.departments.map((dept, index) => (
                        <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-2 last:border-0">
                            <div className="flex items-center ">
                                <div
                                    className="w-3 h-3 rounded-full mr-3"
                                    style={{ backgroundColor: dept.color }}
                                ></div>
                                <span className="text-sm text-gray-700">{dept.name}</span>
                            </div>
                            <span className="text-sm font-medium text-gray-900 ">
                                {new Intl.NumberFormat('en-Us', {
                                    style: 'currency',
                                    currency: 'NGN',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(dept.amount)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default PayrollDoughnutChart;