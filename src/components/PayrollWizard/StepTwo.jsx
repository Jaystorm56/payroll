import { Search, Filter, Pencil } from "lucide-react"
import { useFormContext } from "react-hook-form"
import ProgressBar from "./ProgressBar"

export default function StepTwo({ onNext, onBack, totalGrossPay, totalDeductions, totalNetPay }) {
  const { watch } = useFormContext()
  const employees = watch("employees")

  return (
    <div>
      <ProgressBar currentStep={2} totalSteps={4} title="Run Payroll: Step 2 of 4 - Review & Edit Data" />

      <div className="mt-8 border border-gray-200 rounded-lg p-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, or others..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
            <span>All Department</span>
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-white border border-gray-200 rounded-lg">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{employees.length}</div>
            <div className="text-sm text-gray-500">Total Employees</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">#{totalGrossPay.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Total Gross Pay</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">#{totalDeductions.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Total Deductions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">#{totalNetPay.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Total Net Pay</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Employee ID</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Employee's Name</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Department</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Gross Pay</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Deductions</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Net Pay</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm">{employee.id}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-xl">
                        {employee.avatar}
                      </div>
                      <span className="font-medium">{employee.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm">{employee.department}</td>
                  <td className="py-4 px-4 text-sm font-semibold">#{employee.grossPay.toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm font-semibold">#{employee.deductions.toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm font-semibold">#{employee.netPay.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Pencil className="w-5 h-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back : Verify Details
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Next : Preview Totals
        </button>
      </div>
    </div>
  )
}
