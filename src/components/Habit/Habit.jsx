import React from 'react';

const Habit = ({ habit }) => {
    const { habit_name, short_description, creator_name, _id } = habit; 
    const habitId = habit._id || Date.now(); 

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between h-full border border-gray-100">
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                    {habit_name}
                </h3>
                
                <p className="text-sm text-blue-600 font-medium mb-3">
                    By: {creator_name}
                </p>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[60px]"> 
                    {short_description}
                </p>
            </div>
            <button
                onClick={() => console.log(`Viewing details for ${habit_name} (ID: ${habitId})`)} 
                className="self-start px-4 py-2 text-sm font-semibold border  rounded-full btn-primary transition-colors duration-200 mt-2"
            >
                View Details
            </button>
        </div>
    );
};

export default Habit;