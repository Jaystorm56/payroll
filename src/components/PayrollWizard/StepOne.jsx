import { Calendar } from "lucide-react"
import { useFormContext } from "react-hook-form"
import ProgressBar from "./ProgressBar"

export default function StepOne({ onNext }) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div>
      <ProgressBar currentStep={1} totalSteps={4} title="Run Payroll: Step 1 of 4 - Verify Details" />

      <div className="mt-8 border border-gray-200 rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-8">Payroll Period</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <div className="relative">
              <input
                type="text"
                {...register("startDate", { required: "Start date is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <div className="relative">
              <input
                type="text"
                {...register("endDate", { required: "End date is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Pay Date</label>
            <div className="relative">
              <input
                type="text"
                {...register("payDate", { required: "Pay date is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {errors.payDate && <p className="text-red-500 text-sm mt-1">{errors.payDate.message}</p>}
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-6">Verification Checklist</h2>

        <div className="border border-gray-200 rounded-lg p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20  flex items-center justify-center">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-base">All employees have banking info</span>
          </div>
          <span className="px-4 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full flex items-center gap-2">
            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
            Ready
          </span>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Next : Review Data
        </button>
      </div>
    </div>
  )
}
