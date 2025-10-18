"use client";

interface ProgressStepperProps {
  currentStep: number;
  steps: string[];
}

export default function ProgressStepper({ currentStep, steps }: ProgressStepperProps) {
  return (
    <div className="flex items-center justify-center space-x-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isActive = currentStep === stepNumber;
        const isUpcoming = currentStep < stepNumber;

        return (
          <div key={stepNumber} className="flex items-center">
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <div className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                isCompleted
                  ? 'bg-[#002D72] text-white shadow-lg'
                  : isActive
                  ? 'bg-white border-2 border-[#002D72] text-[#002D72] shadow-lg scale-110'
                  : 'bg-white border-2 border-gray-300 text-gray-400'
              }`}>
                {isCompleted ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className={`${isActive ? 'font-bold' : 'font-medium'}`}>
                    {stepNumber}
                  </span>
                )}
              </div>

              {/* Step Label */}
              <span className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                isCompleted || isActive
                  ? 'text-blue-500'
                  : 'text-gray-400'
              }`}>
                {step}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="relative">
                <div className={`w-16 h-0.5 transition-colors duration-300 ${
                  isCompleted
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`} />
                
                {/* Subtle drop shadow for connecting line */}
                <div className={`absolute top-0 w-16 h-0.5 rounded-full transition-opacity duration-300 ${
                  isCompleted
                    ? 'bg-blue-500/20 shadow-sm'
                    : 'opacity-0'
                }`} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
