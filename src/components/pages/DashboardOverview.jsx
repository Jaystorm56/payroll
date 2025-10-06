import PayrollBarChart from "../BarChart";
import MetricsGrid from "../MetricsGrid";
import EmployeeList from "../EmployeeList";
import HomeBarChart from "../BarChart";

const DashboardOverview = () => {
  return (
    <div className="container mx-auto max-w-7xl pt-[35px]">
      <header className="mb-8 flex flex-start justify-between items-center mx-6 md:mx-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome Ayomide 👋
          </h1>
        </div>
      </header>
      <MetricsGrid />
      <HomeBarChart/>
      <EmployeeList />
    </div>
  );
};

export default DashboardOverview;
