import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import HabitCard from '../HabitCard/HabitCard';

const ALL_HABITS_URL = "https://habit-tracker-server-seven.vercel.app/public-habits"; 

const CATEGORIES = [
    'All', 'Morning', 'Work', 'Fitness', 'Evening', 'Study'
];

const PublicHabits = () => {
    const [allHabits, setAllHabits] = useState([]); 
    const [filteredHabits, setFilteredHabits] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const response = await fetch(ALL_HABITS_URL);
                const data = await response.json();

                if (response.ok) {
                    const publicHabits = data.filter(habit => habit.habit_name || habit.short_description);
                    
                    setAllHabits(publicHabits);
                    setFilteredHabits(publicHabits);
                } else {
                    toast.error(data.message || 'Failed to fetch habit list.');
                }
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchHabits();
    }, []);

    useEffect(() => {
        let currentHabits = [...allHabits];

        if (selectedCategory !== 'All') {
            currentHabits = currentHabits.filter(habit => habit.category === selectedCategory);
        }
        if (searchTerm.trim() !== '') {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            currentHabits = currentHabits.filter(habit => 
                (habit.habit_name && habit.habit_name.toLowerCase().includes(lowerCaseSearchTerm)) ||
                (habit.short_description && habit.short_description.toLowerCase().includes(lowerCaseSearchTerm)) ||
                (habit.title && habit.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
                (habit.description && habit.description.toLowerCase().includes(lowerCaseSearchTerm))
            );
        }

        setFilteredHabits(currentHabits);
    }, [searchTerm, selectedCategory, allHabits]); 

    if (loading) {
        return <div className="flex justify-center items-center py-40 min-h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }
    
    return (
        <section className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                    Browse All Public Habits 🌍
                </h2>
                <div className="flex flex-col md:flex-row gap-4 mb-10 p-4 bg-white rounded-lg shadow-md">
                    <input
                        type="text"
                        placeholder="Search by title or keyword..."
                        className="input input-bordered w-full md:w-2/3"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    
                    <select 
                        className="select select-bordered w-full md:w-1/3"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                
                {filteredHabits.length > 0 ? (
                    <div 
                        className="grid gap-8 
                                   sm:grid-cols-1   
                                   md:grid-cols-2   
                                   lg:grid-cols-3 
                                   xl:grid-cols-4" 
                    >
                        {filteredHabits.map(habit => (
                            <HabitCard habit={habit} key={habit._id}></HabitCard>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        No habits found matching your criteria.
                    </div>
                )}
            </div>
        </section>
    );
};

export default PublicHabits;