export default function ProgressBar({ currentStep, totalSteps, title }) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
        <span className="text-gray-500 font-medium">
          {currentStep}/{totalSteps} Complete
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-black transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
