import React, { use } from 'react';
import Habit from '../Habit/Habit'; 

const FeaturedHabits = ({ featuredHabitsPromise }) => {
    const habits = use(featuredHabitsPromise); 
    console.log("Fetched Habits:", habits); 

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                    Our Latest Public Habits
                </h2>

                <div 
                    className="grid gap-8 
                                sm:grid-cols-1   
                                md:grid-cols-2   
                                lg:grid-cols-3" 
                >
                    {habits.map(habit => (
                        <Habit habit={habit} key={habit._id || habit.id}></Habit>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturedHabits;