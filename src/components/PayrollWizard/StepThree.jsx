import { Calendar } from "lucide-react"
import { useFormContext } from "react-hook-form"
import ProgressBar from "./ProgressBar"

export default function StepThree({ onNext, onBack, totalGrossPay, totalDeductions, totalNetPay }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()
  const confirmed = watch("confirmed")
  const employees = watch("employees")

  return (
    <div>
      <ProgressBar currentStep={3} totalSteps={4} title="Run Payroll: Step 3 of 4 - Final Preview" />

      <div className="mt-8 border border-gray-200 rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-8">Payroll Summary</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="text-sm font-medium text-gray-600">Total Net Pay</div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-1">#{totalNetPay.toLocaleString()}</div>
                <div className="text-sm text-gray-500">{employees.length} Employee</div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Gross Pay</span>
                <span className="font-semibold">#{totalGrossPay.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Deductions</span>
                <span className="font-semibold">#{totalDeductions.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Calendar className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600 mb-1">Pay Date</div>
                <div className="text-lg font-semibold">Monday, September 29, 2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border border-gray-200 rounded-lg p-6">
        <label className="flex items-start gap-4 cursor-pointer">
          <input
            type="checkbox"
            {...register("confirmed", {
              required: "You must confirm to proceed",
            })}
            className="mt-1 w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
          />
          <div className="flex-1">
            <div className="font-medium mb-2">
              I confirm that I have reviewed the payroll data and approve these payments.
            </div>
            <div className="text-sm text-gray-600">
              By checking this box, you authorize the processing of payroll for {employees.length} employees with a
              total net pay of <span className="font-semibold">#{totalNetPay.toLocaleString()}</span>. This action
              cannot be undone.
            </div>
          </div>
        </label>
        {errors.confirmed && <p className="text-red-500 text-sm mt-2">{errors.confirmed.message}</p>}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back : Review & Edit Data
        </button>
        <button
          onClick={onNext}
          disabled={!confirmed}
          className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next : Submit Payroll
        </button>
      </div>
    </div>
  )
}
