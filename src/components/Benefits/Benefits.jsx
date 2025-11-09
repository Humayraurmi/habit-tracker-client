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

const Benefits = ({ benefitsHabitsPromise, sideBySideView }) => {
    const benefitCards = use(benefitsHabitsPromise);
    const sectionClasses = sideBySideView ? "bg-blue-50 p-6 rounded-xl h-full" : "py-16 bg-white";

    return (
        <section className={sectionClasses}>
            <div className="max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Why Building Habits Matters
                </h2>

                <div
                    className="grid gap-4 sm:grid-cols-2 md:grid-cols-2"
                >
                    {benefitCards.map((card) => {
                        const IconComponent = IconMap[card.icon_name] || IconMap.default;

                        const cardClasses = "bg-white p-4 rounded-xl shadow-md flex flex-col items-center text-center h-full";
                        const iconClasses = "text-green-500 text-4xl mb-3";
                        const titleClasses = "text-lg font-semibold text-gray-800 mb-1";
                        const descriptionClasses = "text-gray-600 text-sm flex-grow";

                        return (
                            <div
                                key={card._id}
                                className={cardClasses}
                            >
                                <div className={iconClasses}>
                                    <IconComponent />
                                </div>
                                <h3 className={titleClasses}>
                                    {card.title}
                                </h3>

                                <p className={descriptionClasses}>
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