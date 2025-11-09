import React, { use, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, signOutUser } = use(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);


    const handleSignOut = () => {
        signOutUser()
            .then(()=>{
                toast.success('Successfully logged out!');
            })
            .catch((error) => {
                console.error(error);
                toast.error('Error logging out. Please try again.'); // ⭐ ৩.২. লগআউট এরর
            })
    }

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/publicHabits'>Public Habits</NavLink></li>

        {
            user && <>
                <li><NavLink to='/addHabit'>Add Habit</NavLink></li>
                <li><NavLink to='/myHabits'>My Habits</NavLink></li>
            </>
        }
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Habit-Tracker</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {!user ? (
                    <>
                        <Link to="/register" className="btn">SignUp</Link>
                    </>
                ) : (
                    <div className="flex gap-2">
                        <img
                            src={user.photoURL || "/defaultUser.png"}
                            alt="User"
                            className="w-10 h-10 rounded-full cursor-pointer"
                            onClick={() => setShowDropdown(!showDropdown)}
                        />
                        <button
                            className="btn btn-sm mt-2"
                            onClick={handleSignOut}
                        >
                            Log Out
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4">
                                <p className="font-bold">{user.displayName}</p>
                                <p className="text-sm">{user.email}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>


        </div>
    );
};

export default Navbar;