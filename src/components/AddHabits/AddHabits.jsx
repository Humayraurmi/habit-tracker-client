import React, { use, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const addHabitsPromise = "http://localhost:3000/habits";
const successImage = "https://i.ibb.co.com/9k7vCj0F/successfully-completed-vector-seal-isolated-white-background-168286016.webp";

const CATEGORIES = [
    'Morning', 'Work', 'Fitness', 'Evening', 'Study'
];

const AddHabits = () => {
    const { user } = use(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const userEmail = user?.email || '';
    const userName = user?.displayName || 'Unknown User';

    const initialFormState = {
        title: '', 
        description: '', 
        category: CATEGORIES[0], 
        reminderTime: '08:00', 
        imageURL: '',
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const newHabit = { 
            ...formData,  userEmail, userName,  createdAt: new Date().toISOString(), 
        };

        try {
            const response = await fetch(`${addHabitsPromise}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newHabit),
            });
            const result = await response.json();

            if (result.acknowledged) {
                toast.success('Habit added successfully!');
                
                setLoading(false);
                setFormData(initialFormState);
                setIsSubmitted(true);
                setTimeout(() => {
                    navigate('/myHabits');
                }, 3000);
            } else {
                toast.error('Failed to add habit. Please try again.');
            }

        } catch (error) {
            console.error('Error adding habit:', error);
            toast.error('An error occurred during submission.');
        } finally {
            if (!isSubmitted) {
                setLoading(false);
            }
        }
    };
    
    if (isSubmitted) {
        return (
            <div className="container mx-auto max-w-lg py-20 px-4 text-center">
                <div className="bg-white p-8 md:p-12 shadow-2xl rounded-lg border border-green-200">
                    <img src={successImage} alt="Successfully Added Seal" className="w-48 h-48 mx-auto mb-6"
                    />
                    <h2 className="text-4xl font-extrabold text-green-600 mb-4">
                        Successfully Added! 🎉
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Your new habit has been saved.
                    </p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto max-w-2xl py-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Add a New Habit
            </h2>
            <form onSubmit={handleSubmit} className="bg-amber-50 p-6 md:p-10 shadow-xl rounded-lg border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                        <input type="text" defaultValue={userName} readOnly className="w-full input input-bordered bg-gray-50 cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">User Email</label>
                        <input type="email" defaultValue={userEmail} readOnly className="w-full input input-bordered bg-gray-50 cursor-not-allowed" />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Habit Title</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., Read for 30 minutes" className="w-full input input-bordered" />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows="3" placeholder="Why is this habit important?" className="w-full textarea textarea-bordered"
                    ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select id="category" name="category" value={formData.category} onChange={handleChange} required className="w-full select select-bordered">
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="reminderTime" className="block text-sm font-medium text-gray-700 mb-1">Reminder Time</label>
                        <input type="time" id="reminderTime" name="reminderTime" value={formData.reminderTime} onChange={handleChange} required className="w-full input input-bordered" />
                    </div>
                </div>
                <div className="mb-8">
                    <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700 mb-1"> Image URL </label>
                    <input
                        type="url" id="imageURL" name="imageURL" value={formData.imageURL} onChange={handleChange} placeholder="Image link here" className="w-full input input-bordered"
                    />
                </div>
                <button type="submit" className="w-full btn btn-primary text-white" disabled={loading} >
                    {loading ? (
                        <>
                            <span className="loading loading-spinner"></span>
                            Adding Habit...
                        </>
                    ) : 'Add Habit'}
                </button>
            </form>
        </div>
    );
};

export default AddHabits;