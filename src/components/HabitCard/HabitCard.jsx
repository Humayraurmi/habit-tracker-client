import React from 'react';
import { Link } from 'react-router-dom';

const HabitCard = ({ habit }) => {
    const displayTitle = habit.habit_name || habit.title || 'Untitled Habit';
    const displayDescription = habit.short_description || habit.description || 'No description provided.';
    const displayCreator = habit.creator_name || habit.userName || 'Unknown User';
    
    const habitId = habit._id;

    if (!habitId) return null;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between h-full border border-gray-100">
            <div>
                <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-0.5 rounded mb-2 inline-block">
                    {habit.category || 'General'}
                </span>
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {displayTitle}
                </h3>
                
                <p className="text-sm text-blue-600 font-medium mb-3">
                    By: {displayCreator}
                </p>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[60px]"> 
                    {displayDescription}
                </p>
            </div>
            
            <Link 
                to={`/habit-details/${habitId}`} 
                className="self-start px-4 py-2 text-sm font-semibold border rounded-full btn-primary text-white text-center transition-colors duration-200 mt-2"
            >
                See Details
            </Link>
        </div>
    );
};

export default HabitCard;