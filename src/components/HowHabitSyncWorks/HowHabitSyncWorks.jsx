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

const HowHabitSyncWorks = ({ stepsPromise, sideBySideView }) => {
    
    const steps = use(stepsPromise); 
    const sectionClasses = sideBySideView ? "bg-gray-100 p-6 rounded-xl h-full" : "py-16 bg-gray-100";

    return (
        <section className={sectionClasses}>
            <div className="max-w-none">
                
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    How HabitSync Helps You Succeed
                </h2>
                <div 
                    className="grid gap-4 sm:grid-cols-2 md:grid-cols-2"
                >
                    {steps.map((step) => { 
                        const IconComponent = IconMap[step.icon_name] || IconMap.default;
                        return (
                            <div 
                                key={step._id} 
                                className="bg-white p-4 rounded-xl shadow-md border-t-2 border-blue-500 flex flex-col items-center text-center h-full"
                            >
                                <div className="text-blue-500 text-4xl mb-3">
                                    <IconComponent /> 
                                </div>
                                
                                <h3 className="text-lg font-bold text-gray-800 mb-1">
                                    {step.title} 
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