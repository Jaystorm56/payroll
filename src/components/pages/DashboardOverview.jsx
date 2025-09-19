import PayrollBarChart from "../BarChart";
import MetricsGrid from "../MetricsGrid";


const DashboardOverview = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <header className="mb-8 flex flex-start justify-between items-center mx-6 md:mx-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome Ayomide  👋</h1>
          
        </div>
       
      </header>
      <MetricsGrid />
      <PayrollBarChart />
    </div>
  );
};

export default DashboardOverview;