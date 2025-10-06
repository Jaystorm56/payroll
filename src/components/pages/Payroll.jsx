import PayrollBarChart from "../PayrollBarChart";
import PayrollDoughnutChart from "../PayrollDoughnutChart";
import PayrollMetricsGrid from "../PayrollMetricsGrid";
import PayrollHistory from "./PayrollHistoryTable";
import PayrollWizard from "../PayrollWizard/PayrollWizard";
import { useState } from "react";

export default function PayrollPage() {
    const [showWizard, setShowWizard] = useState(false)

    // If wizard is shown, only render the wizard as full page
    if (showWizard) {
        return <PayrollWizard onClose={() => setShowWizard(false)} />
    }

    // Otherwise, render the normal payroll dashboard
    return (
        <div className="container mx-auto max-w-7xl">
            <header>
                <div className="flex justify-between items-center mb-4 sm:mb-7 px-3 sm:px-4 md:px-4 pt-6">
                    <h1 className="text-2xl md:text-3xl font-semi-bold text-black">Payroll Management</h1>
                    <button
                        onClick={() => setShowWizard(true)}
                        className="items-center px-14 py-3 bg-black text-white text-xs font-semibold rounded-md hover:bg-gray-800 transition-colors"
                    >
                        <p>Run Payroll</p>
                    </button>
                </div>
            </header>
            <PayrollMetricsGrid/>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 lg:flex-[2]">
                    <PayrollBarChart />
                </div>
                <div className="flex-1 lg:flex-[1]">
                    <PayrollDoughnutChart />
                </div>
            </div>
            <PayrollHistory/>
        </div>
    );
}