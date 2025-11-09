import React, { use, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const { signInUser, signInWithGoogle } = use(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        signInUser(email, password)
            .then(result => {
                console.log('User logged in successfully:', result.user);
                toast.success('Successfully logged in!');
                navigate(from, { replace: true });
            })
            .catch(err => {
                const firebaseError = err.message.replace('Firebase: Error (auth/', '').replace(').', '');
                setError(firebaseError);
                toast.error(firebaseError);
                console.error(err);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log('Google Sign-in successful:', result.user);

                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL,
                };

                fetch("http://localhost:3000/users", {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data after save ', data);
                        navigate(from, { replace: true });
                    });
                toast.success('Successfully logged in with Google!');
            })
            .catch(error => {
                console.error('Google Sign-in Error:', error);
                setError('Google Sign-in failed. Please try again.');
                toast.error('Google sign-in failed. Please try again.');
            });
    };


    return (
        <div className='mx-auto md:flex justify-center gap-10 items-center'>
            <div className="mt-5 card bg-base-100 p-10 max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-5xl font-bold">Habit Tracker</h1>
                <h3 className='mt-2'>Login to your account</h3>

                <form onSubmit={handleLogin} className="card-body px-0 pt-4 pb-0">
                    <fieldset className="fieldset space-y-4">
                        <div className="form-control">
                            <label className="label py-1">Email</label>
                            <input
                                type="email"
                                className="input input-bordered"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label py-1">Password</label>
                            <input
                                type="password"
                                className="input input-bordered"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <a className="link link-hover label-text-alt pt-1">Forgot password?</a>
                        </div>
                        {error && <p className="text-red-500 text-sm font-medium pt-2">{error}</p>}

                        <div className="mt-6">
                            <button type="submit" className="btn btn-neutral w-full">
                                Login
                            </button>
                        </div>
                    </fieldset>
                </form>

                <div className='px-8 pb-8 pt-4 text-center'>
                    <h3 className='text-center font-bold'>Or</h3>

                    <button
                        onClick={handleGoogleSignIn}
                        className="btn bg-white text-black border-[#e5e5e5] w-full mt-4">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>

                    <h2 className='py-5'>Don't have an account? <Link to='/register' className='link link-hover text-red-500'>Register</Link></h2>
                </div>
            </div>
        </div>

    );
};

export default Login;