import React, { use, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const urlPromise = "http://localhost:3000";

const MyHabits = () => {
    const { user, loading: userLoading } = use(AuthContext);
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    const userEmail = user?.email;

    const fetchHabits = async () => {
        if (!userEmail) return;
        setLoading(true);
        try {
            const response = await fetch(`${urlPromise}/my-habits?email=${userEmail}`);
            const data = await response.json();

            if (response.ok) {
                setHabits(data);
            } else {
                toast.error(data.message || 'Failed to fetch habits.');
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userLoading && userEmail) {
            fetchHabits();
        }
    }, [userLoading, userEmail]);

    const handleDelete = async (id) => {

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${urlPromise}/habits/${id}`, {
                    method: 'DELETE',
                });
                const deleteResult = await response.json();

                if (response.ok && deleteResult.deletedCount > 0) {

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your habit has been deleted.",
                        icon: "success"
                    });

                    setHabits(prevHabits => prevHabits.filter(habit => habit._id !== id));

                } else {
                    toast.error(deleteResult.message || 'Failed to delete habit.');
                }
            } catch (error) {
                console.error("Delete error:", error);
                toast.error('An error occurred during deletion.');
            }
        }
    };
    const handleMarkComplete = (id) => {
        toast.success(`Habit ${id} marked complete for today! (Streak logic not implemented yet)`);
    };

    if (userLoading || loading) {
        return <div className="text-center py-20 text-xl">Loading your habits...</div>;
    }

    if (habits.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-50 min-h-screen">
                <h2 className="text-3xl font-bold text-gray-700 mb-4">No Habits Found!</h2>
                <p className="text-lg text-gray-500 mb-6">Start building good habits today.</p>
                <Link to="/addHabit" className="btn btn-primary text-white">
                    Add Your First Habit
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-4xl py-10 px-4 bg-gray-50">
            <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
                My Habits ({habits.length}) 🎯
            </h2>
            <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
                <table className="table w-full">
                    <thead className="text-md text-gray-600 bg-gray-100">
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Streak</th>
                            <th>Created Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habits.map((habit) => (
                            <tr key={habit._id}>
                                <td className="font-semibold">{habit.title}</td>
                                <td><span className="badge badge-info badge-outline">{habit.category}</span></td>
                                <td><span className="text-lg font-bold text-green-600">0 🔥</span></td>
                                <td>{new Date(habit.createdAt).toLocaleDateString()}</td>
                                <td className="flex justify-center space-x-2 py-4">
                                    <button
                                        onClick={() => handleMarkComplete(habit._id)}
                                        className="btn btn-success btn-sm text-white"
                                    >
                                        Mark Complete
                                    </button>
                                    <Link
                                        to={`/updateHabit/${habit._id}`}
                                        className="btn btn-warning btn-sm text-white"
                                    >
                                        Update
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(habit._id)}
                                        className="btn btn-error btn-sm text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyHabits;