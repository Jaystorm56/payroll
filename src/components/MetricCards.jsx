import {
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';

import UsersIcon from '../public/icons/persona.svg';
import DollarIcon from '../public/icons/money.svg';
import AlertIcon from '../public/icons/stack-fill.svg';
import CalendarIcon from '../public/icons/calendar.svg';

const iconComponents = {
  Users: UsersIcon,
  DollarSign: DollarIcon,
  AlertCircle: AlertIcon,
  Calendar: CalendarIcon
};

const MetricCard = ({ metric }) => {
  const formatValue = (val) => {
    if (typeof val === 'number' && val > 1000) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(val);
    }
    return val;
  };
  
  const baseClasses = "p-4 sm:p-4 md:p-6 rounded-xl border card-hover fade-in mx-2 md:mx-0 flex flex-col min-h-[150px]";
  const variantClasses = {
    default: "bg-[#2222220D] border-black",
    alert: "bg-[#FF00000D] border-red-500"
  };

  const IconComponent = iconComponents[metric.icon.name];

  const renderTrendIndicator = () => {
    if (!metric.growth || !metric.growth.percentage) return null;

    const { percentage } = metric.growth;
    const isPositive = percentage > 0;
    const isNeutral = percentage === 0;

    const trendConfig = {
      positive: {
        icon: TrendingUp,
        iconClass: 'text-[#008000]',
        textClass: 'text-gray-700'
      },
      negative: {
        icon: TrendingDown,
        iconClass: 'text-red-600',
        textClass: 'text-gray-700'
      },
      neutral: {
        icon: Minus,
        iconClass: 'text-gray-600',
        textClass: 'text-gray-700'
      }
    };

    const trendType = isPositive ? 'positive' : isNeutral ? 'neutral' : 'negative';
    const { icon: TrendIcon, iconClass, textClass } = trendConfig[trendType];

    return (
      <>
        <div className="inline-flex items-center justify-center w-5 h-5 rounded bg-green-50 border border-[#008000]">
          <TrendIcon className={`h-3 w-3 ${iconClass}`} />
        </div>
        <span className={`ml-1 text-xs ${textClass}`}>
          {isPositive ? '+' : ''}{percentage}%
        </span>
      </>
    );
  };

  // Format comparison text
  const formatComparisonText = () => {
    if (!metric.growth) return null;

    const { previousCount, previousAmount } = metric.growth;
    const comparisonText = previousAmount
      ? `${formatValue(previousAmount)} last month`
      : `${previousCount} last month`;

    return (
      <span className="ml-2 text-gray-500 text-xs font-semibold">
        {comparisonText}
      </span>
    );
  };

  return (
    <div className={`${baseClasses} ${variantClasses[metric.variant]}`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-sm font-semibold text-[#222222]">{metric.title}</h3>
      </div>

      <div className="flex flex-col flex-grow justify-between">
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg sm:text-xl font-semibold text-[#222222]">
            {formatValue(metric.value)}
          </p>
          <div className='w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center bg-white rounded-full'>
            <img 
              src={IconComponent} 
              alt={metric.icon.name} 
              className="h-4 w-4 sm:h-5 sm:w-5"
            />
          </div>
        </div>

        {metric.growth && (
          <div className="flex items-center text-xs sm:text-sm mt-auto">
            {renderTrendIndicator()}
            {formatComparisonText()}
          </div>
        )}
        
        {/* {!metric.growth && <div className="mt-auto"></div>} */}
      </div>
    </div>
  );
};

export default MetricCard;