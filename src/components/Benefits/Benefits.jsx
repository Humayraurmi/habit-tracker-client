import React, { use } from 'react';
import {
    FaBrain, FaHeartbeat, FaRocket, FaTrophy, FaQuestion
} from 'react-icons/fa';

const IconMap = {
    FaBrain: FaBrain,
    FaHeartbeat: FaHeartbeat,
    FaRocket: FaRocket,
    FaTrophy: FaTrophy,
    default: FaQuestion
};

const Benefits = ({ benefitsHabitsPromise }) => {
    const benefitCards = use(benefitsHabitsPromise);
    console.log(benefitCards)
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                    Why Building Habits Matters
                </h2>

                <div
                    className="grid gap-8 
                     sm:grid-cols-1   
                     md:grid-cols-2   
                     lg:grid-cols-4"
                >
                    {benefitCards.map((card) => {
                        const IconComponent = IconMap[card.icon_name] || IconMap.default;

                        return (
                            <div
                                key={card._id}
                                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center h-full border border-gray-100"
                            >
                                <div className="text-blue-600 text-5xl mb-4">
                                    <IconComponent />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {card.title}
                                </h3>

                                <p className="text-gray-600 text-sm flex-grow">
                                    {card.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Benefits;