"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import StepOne from "./StepOne"
import StepTwo from "./StepTwo"
import StepThree from "./StepThree"
import StepFour from "./StepFour"

export default function PayrollWizard({ onClose }) {
  const [currentStep, setCurrentStep] = useState(1)

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      startDate: "01/09/2025",
      endDate: "30/09/2025",
      payDate: "03/10/2025",
      employees: [
        {
          id: "#TS2387",
          name: "James Trafford",
          department: "Engineering",
          grossPay: 200000,
          deductions: 20000,
          netPay: 180000,
          avatar: "👨‍💼",
        },
        {
          id: "#SF2906",
          name: "Patrick Drogo",
          department: "Design",
          grossPay: 200000,
          deductions: 20000,
          netPay: 180000,
          avatar: "👨‍💻",
        },
        {
          id: "#MK3421",
          name: "Sarah Johnson",
          department: "Marketing",
          grossPay: 180000,
          deductions: 18000,
          netPay: 162000,
          avatar: "👩‍💼",
        },
        {
          id: "#HR4532",
          name: "Michael Chen",
          department: "HR",
          grossPay: 220000,
          deductions: 22000,
          netPay: 198000,
          avatar: "👨",
        },
        {
          id: "#FN5643",
          name: "Emily Davis",
          department: "Finance",
          grossPay: 240000,
          deductions: 24000,
          netPay: 216000,
          avatar: "👩",
        },
        {
          id: "#IT6754",
          name: "David Wilson",
          department: "Engineering",
          grossPay: 210000,
          deductions: 21000,
          netPay: 189000,
          avatar: "👨‍🔧",
        },
        {
          id: "#SL7865",
          name: "Lisa Anderson",
          department: "Sales",
          grossPay: 190000,
          deductions: 19000,
          netPay: 171000,
          avatar: "👩‍💻",
        },
      ],
      confirmed: false,
    },
  })

  const employees = methods.watch("employees")
  const totalGrossPay = employees.reduce((sum, emp) => sum + emp.grossPay, 0)
  const totalDeductions = employees.reduce((sum, emp) => sum + emp.deductions, 0)
  const totalNetPay = employees.reduce((sum, emp) => sum + emp.netPay, 0)

  const handleNext = async () => {
    const isValid = await methods.trigger()
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    onClose()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FormProvider {...methods}>
        <div className="p-6 md:p-8 lg:p-12">
          {currentStep === 1 && <StepOne onNext={handleNext} />}
          {currentStep === 2 && (
            <StepTwo
              onNext={handleNext}
              onBack={handleBack}
              totalGrossPay={totalGrossPay}
              totalDeductions={totalDeductions}
              totalNetPay={totalNetPay}
            />
          )}
          {currentStep === 3 && (
            <StepThree
              onNext={handleNext}
              onBack={handleBack}
              totalGrossPay={totalGrossPay}
              totalDeductions={totalDeductions}
              totalNetPay={totalNetPay}
            />
          )}
          {currentStep === 4 && (
            <StepFour
              onComplete={handleComplete}
              totalGrossPay={totalGrossPay}
              totalDeductions={totalDeductions}
              totalNetPay={totalNetPay}
            />
          )}
        </div>
      </FormProvider>
    </div>
  )
}