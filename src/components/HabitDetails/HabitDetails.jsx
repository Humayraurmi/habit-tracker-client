import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import calculateCurrentStreak from '../../utils/streakUtils';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { AuthContext } from '../../context/AuthContext';

const urlPromise = "https://habit-tracker-server-seven.vercel.app";

const calculateProgress = (completionHistory) => {
    if (!completionHistory || completionHistory.length === 0) return 0;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const uniqueCompletedDays = new Set();

    completionHistory.forEach(dateStr => {
        const date = new Date(dateStr);
        if (date >= thirtyDaysAgo) {
            uniqueCompletedDays.add(date.toDateString());
        }
    });

    const completedDays = uniqueCompletedDays.size;
    return Math.round((completedDays / 30) * 100);
};

const HabitDetails = () => {
    const { id } = useParams();
    const [habit, setHabit] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchHabitDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${urlPromise}/habits/${id}`);
            const data = await response.json();

            if (response.ok) {
                const completionHistory = data.completionHistory || [];
                const currentStreak = calculateCurrentStreak(completionHistory);
                const progress = calculateProgress(completionHistory);

                setHabit({
                    ...data,
                    currentStreak,
                    progress
                });
            } else {
                toast.error(data.message || 'Failed to fetch habit details.');
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchHabitDetails();
        }
    }, [id]);


    const handleMarkComplete = async () => {
        if (!user || !user.email) {
            toast.error("Please log in to track this habit.");
            return;
        }

        const emailToSend = user.email.toLowerCase();
        const nameToSend = user.displayName || user.email.split('@')[0];

        try {
            const response = await fetch(`${urlPromise}/habits/complete/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: emailToSend,
                    userName: nameToSend,
                }),
            });
            const result = await response.json();

            if (response.ok) {

                if (result.isNewHabit) {
                    toast.success('Habit added to My Habits and marked complete! Redirecting to your personal habit page...');

                    setTimeout(() => {
                        if (result.newHabitId) {
                            navigate(`/habit-details/${result.newHabitId}`);
                        } else {
                            navigate('/myHabits');
                        }
                    }, 500);

                } else if (result.modifiedCount > 0) {
                    toast.success('Habit marked complete! Keep the streak going!');
                    fetchHabitDetails(); 

                } else if (result.message && result.message.includes('already completed')) {
                    toast('Already completed today!', { icon: 'ℹ️' });

                } else {
                    toast('Status updated.', { icon: 'ℹ️' });
                }

            } else {
                toast.error(result.message || 'Failed to mark complete.');
            }
        } catch (error) {
            console.error("Complete error:", error);
            toast.error('An error occurred. Check server logs.');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center py-40 min-h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    if (!habit) {
        return <div className="text-center py-20 min-h-screen text-red-500">Habit not found.</div>;
    }

    const today = new Date().toDateString();
    const isCompletedToday = habit.completionHistory && habit.completionHistory.some(dateStr => {
        return new Date(dateStr).toDateString() === today;
    });

    const displayTitle = habit.title || habit.habit_name;
    const displayDescription = habit.description || habit.short_description;
    const displayCreator = habit.userName || habit.creator_name || 'System Habit';
    const displayImage = habit.image_url || 'https://via.placeholder.com/600x400?text=Habit+Image';

    return (
        <div className="container mx-auto max-w-4xl py-10 px-4">
            <div className="bg-white p-6 md:p-10 shadow-2xl rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row gap-8">
                    <img src={displayImage} alt={displayTitle} className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md" />

                    <div className="md:w-2/3">
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{displayTitle}</h1>
                        <p className="text-lg text-gray-600 mb-6">{displayDescription}</p>

                        <div className="space-y-4 mb-6">
                            <p className="text-sm font-medium text-gray-700">
                                **Category:** <span className="badge badge-info badge-lg">{habit.category || 'N/A'}</span>
                            </p>
                            <p className="text-sm font-medium text-gray-700">
                                **Creator:** {displayCreator}
                            </p>
                        </div>

                        <div className="flex items-center space-x-4 mb-6">
                            <div className={`badge badge-lg ${habit.currentStreak > 0 ? 'badge-success' : 'badge-outline'} text-white font-bold`}>
                                🔥 Current Streak: {habit.currentStreak || 0} Days
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Last 30 Days Progress:</h3>
                            <ProgressBar progress={habit.progress} />
                            <p className="text-sm text-gray-500 mt-2">{habit.progress}% of days completed.</p>
                        </div>
                        <button
                            onClick={handleMarkComplete}
                            className={`w-full btn text-white text-lg ${isCompletedToday ? 'btn-disabled bg-gray-400' : 'btn-success'}`}
                            disabled={isCompletedToday}
                        >
                            {isCompletedToday ? '✅ Completed Today' : 'Mark Complete'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HabitDetails;