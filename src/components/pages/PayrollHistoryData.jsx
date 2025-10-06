// Payroll History Mock Data
export const payrollHistoryData = [
  {
    id: 1,
    confirmationId: 'PR-254834',
    payrollPeriodFrom: 'July 01, 2025',
    payrollPeriodTo: 'July 30, 2025',
    runDate: 'August 01, 2025',
    employeesPaid: 8,
    totalNetPay: 2000000,
    status: 'Pending'
  },
  {
    id: 2,
    confirmationId: 'PR-254274',
    payrollPeriodFrom: 'August 01, 2025',
    payrollPeriodTo: 'August 30, 2025',
    runDate: 'September 01, 2025',
    employeesPaid: 8,
    totalNetPay: 2000000,
    status: 'Paid'
  },
  {
    id: 3,
    confirmationId: 'PR-254009',
    payrollPeriodFrom: 'July 01, 2025',
    payrollPeriodTo: 'July 30, 2025',
    runDate: 'August 01, 2025',
    employeesPaid: 8,
    totalNetPay: 2000000,
    status: 'Paid'
  },
  {
    id: 4,
    confirmationId: 'PR-254486',
    payrollPeriodFrom: 'September 01, 2025',
    payrollPeriodTo: 'September 30, 2025',
    runDate: 'October 01, 2025',
    employeesPaid: 8,
    totalNetPay: 2000000,
    status: 'Paid'
  },
  {
    id: 5,
    confirmationId: 'PR-252374',
    payrollPeriodFrom: 'July 01, 2025',
    payrollPeriodTo: 'July 30, 2025',
    runDate: 'August 01, 2025',
    employeesPaid: 8,
    totalNetPay: 2000000,
    status: 'Paid'
  }
];

// Extended PayrollMockData with history
export const PayrollMockData = {
  metrics: [
    {
      id: 5,
      title: "Next Payroll Date",
      value: "30th September, 2025",
      icon: { name: 'DollarSign' },
      variant: 'default'
    },
    {
      id: 6,
      title: "Current Status",
      value: "Pending Approvals",
      icon: { name: 'AlertCircle' },
      variant: 'alert'
    },
    {
      id: 7,
      title: "Employee To Be Paid",
      value:"08",
      icon: { name: 'Users' },
      variant: 'default'
    },
    {
      id: 8,
      title: "Etimated Total Net Pay",
      value: "₦2,000,000",
      icon: { name: 'DollarSign' },
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
  },
  departmentData: {
    title: "Department Net Pay",
    total: "₦2,000,000",
    departments: [
      { name: 'Engineering', amount: 600000, color: '#60A5FA' },
      { name: 'Design', amount: 800000, color: '#3B82F6' },
      { name: 'Human Resources', amount: 600000, color: '#1E40AF' }
    ]
  },
  // Add payroll history data
  payrollHistory: payrollHistoryData
};