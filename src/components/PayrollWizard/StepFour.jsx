"use client"

import { Check } from "lucide-react"
import { useFormContext } from "react-hook-form"
import ProgressBar from "./ProgressBar"

export default function StepFour({ onComplete, totalGrossPay, totalDeductions, totalNetPay }) {
  const { watch } = useFormContext()
  const employees = watch("employees")
  const startDate = watch("startDate")
  const endDate = watch("endDate")

  return (
    <div>
      <ProgressBar currentStep={4} totalSteps={4} title="Run Payroll: Step 4 of 4 - Submission Complete" />

      <div className="mt-8 border border-gray-200 rounded-lg p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Payroll Submitted!</h2>
          <p className="text-gray-600 text-lg">
            Payroll for {startDate} to {endDate} has been successfully submitted.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-green-600">{employees?.length || 0}</div>
              <div className="text-sm text-gray-500">Total Employees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-blue-600">#{totalGrossPay.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total Gross Pay</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-red-600">#{totalDeductions.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total Deductions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">#{totalNetPay.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total Net Pay</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onComplete}
          className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Done - Return to Payroll Dashboard
        </button>
      </div>
    </div>
  )
}
