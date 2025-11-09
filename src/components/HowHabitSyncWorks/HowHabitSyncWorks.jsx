// HowHabitSyncWorks.jsx
import React, { use } from 'react';
import { 
  FaCheckCircle, FaChartArea, FaTasks, FaTrophy, FaQuestion 
} from 'react-icons/fa'; 

const IconMap = {
    FaCheckCircle: FaCheckCircle,
    FaChartArea: FaChartArea,
    FaTasks: FaTasks,
    FaTrophy: FaTrophy,
    default: FaQuestion 
};


const HowHabitSyncWorks = ({ stepsPromise }) => {
  
  const steps = use(stepsPromise); 

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          How HabitSync Helps You Succeed
        </h2>

        <div 
          className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => {
            const IconComponent = IconMap[step.icon_name] || IconMap.default;

            return (
              <div 
                key={step._id} 
                className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500 flex flex-col items-center text-center"
              >
                <div className="text-blue-500 text-5xl mb-4">
                  <IconComponent /> 
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {step.order}. {step.title} 
                </h3>

                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowHabitSyncWorks;