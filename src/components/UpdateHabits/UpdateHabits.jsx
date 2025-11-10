import React, { use, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const urlPromise = "http://localhost:3000";

const CATEGORIES = [
    'Morning', 'Work', 'Fitness', 'Evening', 'Study'
];

const UpdateHabits = () => {
    const { user } = use(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: CATEGORIES[0],
        reminderTime: '08:00',
        imageURL: '',
    });
    useEffect(() => {
        const fetchHabit = async () => {
            if (!id) return;
            try {
                const response = await fetch(`${urlPromise}/habits/${id}`);
                const data = await response.json();
                
                if (response.ok) {
                    if (data.userEmail !== user?.email) {
                        toast.error('Access denied to update this habit.');
                        navigate('/myHabits');
                        return;
                    }
                    
                    setFormData({
                        title: data.title || '',
                        description: data.description || '',
                        category: data.category || CATEGORIES[0],
                        reminderTime: data.reminderTime || '08:00',
                        imageURL: data.imageURL || '',
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

        if (user) {
            fetchHabit();
        }
    }, [id, user, navigate]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const updatedHabitData = { ...formData }; 

        try {
            const response = await fetch(`${urlPromise}/habits/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedHabitData),
            });
            const result = await response.json();

            if (response.ok && result.modifiedCount > 0) {
                toast.success('Habit updated successfully!');
                navigate('/myHabits'); 
            } else {
                if(result.modifiedCount === 0) {
                     toast('No changes detected!', { icon: 'ℹ️' });
                     navigate('/myHabits');
                } else {
                    toast.error('Failed to update habit. Please try again.');
                }
            }

        } catch (error) {
            console.error('Error updating habit:', error);
            toast.error('An error occurred during submission.');
        } finally {
            setSubmitting(false);
        }
    };
        if (loading) {
        return <div className="text-center py-20 text-xl">Loading habit for update...</div>;
    }

    return (
        <div className="container mx-auto max-w-2xl py-10 px-4 bg-gray-100 min-h-screen">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Update Habit: {formData.title} 📝
            </h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 shadow-2xl rounded-lg border border-gray-300">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                        <input type="text" defaultValue={user?.displayName || 'Unknown User'} readOnly className="w-full input input-bordered bg-gray-50 cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">User Email</label>
                        <input type="email" defaultValue={user?.email || ''} readOnly className="w-full input input-bordered bg-gray-50 cursor-not-allowed" />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Habit Title</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="w-full input input-bordered" />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows="3" className="w-full textarea textarea-bordered"
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
                    <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700 mb-1"> Image URL (Optional) </label>
                    <input
                        type="url" id="imageURL" name="imageURL" value={formData.imageURL} onChange={handleChange} placeholder="Image link here" className="w-full input input-bordered"
                    />
                </div>

                <button type="submit" className="w-full btn btn-warning text-white" disabled={submitting} >
                    {submitting ? (
                        <>
                            <span className="loading loading-spinner"></span>
                            Updating Habit...
                        </>
                    ) : 'Update Habit'}
                </button>
            </form>
        </div>
    );
};

export default UpdateHabits;