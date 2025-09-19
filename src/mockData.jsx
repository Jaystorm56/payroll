// src/mockData.js
export const mockData = {
  metrics: [
    {
      id: 1,
      title: "Total Employees",
      value: 22,
      icon: { name: 'Users' },
      growth: {
        percentage: 10,
        previousCount: 20
      },
      variant: 'default'
    },
    {
      id: 2,
      title: "Total Net Pay (Last Period)",
      value: 2000150,
      icon: { name: 'DollarSign' },
      growth: {
        percentage: 2.5,
        previousAmount: 1950000
      },
      variant: 'default'
    },
    {
      id: 3,
      title: "Pending Leave Requests",
      value: 5,
      icon: { name: 'AlertCircle' },
      variant: 'alert'
    },
    {
      id: 4,
      title: "Upcoming Payroll Date",
      value: "30th September, 2025",
      icon: { name: 'Calendar' },
      variant: 'default'
    }
  ],
  chartData: {
    title: "Monthly Salary Chart",
    data: [
      { month: 'Apr', salary: 250000 },
      { month: 'May', salary: 320000 },
      { month: 'Jun', salary: 580000 },
      { month: 'Jul', salary: 380000 },
      { month: 'Aug', salary: 550000 },
      { month: 'Sep', salary: 720000 },
      { month: 'Oct', salary: 780000 },
      { month: 'Nov', salary: 450000 },
      { month: 'Dec', salary: 650000 }
    ]
  }
};