import UsersIcon from '../public/icons/persona.svg';
import DollarIcon from '../public/icons/money.svg';
import AlertIcon from '../public/icons/stack-fill1.svg';
import CalendarIcon from '../public/icons/calendar.svg';

const iconComponents = {
  Users: UsersIcon,
  DollarSign: DollarIcon,
  AlertCircle: AlertIcon,
  Calendar: CalendarIcon
};

const PayrollMetricCard = ({ metric }) => {
  const formatValue = (val) => {
    if (typeof val === 'number' && val > 1000) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(val);
    }
    return val;
  };

  const baseClasses = "p-4 sm:p-4 md:p-6 rounded-xl border card-hover fade-in mx-2 md:mx-0 flex flex-col min-h-[150px]";
  const variantClasses = {
    default: "bg-[#222222FF]/10 border-gray-500",
    alert: "bg-[#EEA23E]/10 border-[#EEA23E]"
  };
  const iconWrapper = {
    default: "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center bg-white rounded-full",
    alert: "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center bg-[#EEA23E] rounded-full"
  }

  const IconComponent = iconComponents[metric.icon.name];

  return (
    <div className={`${baseClasses} ${variantClasses[metric.variant]}`}>
    
      <div className="flex items-center mb-3 sm:mb-4">
        <h3 className="text-xs font-semi-bold text-[#222222]">{metric.title}</h3>
      </div>
      
      <div className="flex justify-between items-start flex-grow">
       
        <div></div>
        
        <div className={iconWrapper[metric.variant]}>
          <img
            src={IconComponent}
            alt={metric.icon.name}
            className="h-4 w-4 sm:h-5 sm:w-5"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <p className="text-xl font-semi-bold text-[#222222]">
          {formatValue(metric.value)}
        </p>
      </div>
    </div>
  );
};

export default PayrollMetricCard;