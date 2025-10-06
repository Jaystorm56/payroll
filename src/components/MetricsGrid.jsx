import {PayrollMockData } from "../mockData";
import MetricCard from "./MetricCards";

const MetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-7 md:mb-8 px-3 sm:px-4 md:px-4">
      {PayrollMockData.metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
};

export default MetricsGrid;