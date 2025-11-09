import React, { use, useState } from 'react';
import toast from 'react-hot-toast';
import running from '../../assets/running.avif'
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { signInWithGoogle, createUser, updateUserProfile } = use(AuthContext);

    const validatePassword = (pwd) => {
        let validationError = '';

        if (pwd.length < 6) {
            validationError = 'Password must be at least 6 characters long.';
        }
        else if (!/[A-Z]/.test(pwd)) {
            validationError = 'Password must contain at least one uppercase letter.';
        }
        else if (!/[a-z]/.test(pwd)) {
            validationError = 'Password must contain at least one lowercase letter.';
        }

        return validationError;
    };



    const handleRegister = (e) => {
        e.preventDefault();
        setError('');

        const passwordError = validatePassword(password);

        if (passwordError) {
            setError(passwordError);
            toast.error(passwordError);
            return;
        }

        createUser(email, password)
            .then(result => {
                toast('Registration successful!', { icon: '👏' });
                console.log('User registered via Email/Password:', result.user);
                updateUserProfile(name, photoURL)
                    .then(() => {
                        console.log('Profile updated successfully!');
                        toast.success('Profile updated successfully! Welcome to Habit Tracker.');
                        const newUser = { name, email, image: photoURL };
                        fetch("http://localhost:3000/users", {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(newUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log('data after save ', data);
                            });
                    })
                    .catch(profileError => {
                        console.error('Profile update error:', profileError);
                        toast.error('Registration successful, but profile update failed.');
                    });
            })
            .catch(err => {
                setError(err.message.replace('Firebase: Error (auth/', '').replace(').', ''));
                console.error(err);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL,
                }

                //create user in the database 
                fetch("http://localhost:3000/users", {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data after save ', data)
                    })
                toast.success('Successfully logged in with Google!');
            })
            .catch(error => {
                console.log(error);
                toast.error('Google sign-in failed.');
            })
    }

    return (
        <div className='mx-auto md:flex justify-center gap-10 items-center'>
            <img className='w-[300px] h-[450px]' src={running} alt="" />
            <div className="mt-5 card bg-base-100 p-10 max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-5xl font-bold">Habit Tracker</h1>
                <h3 className='mt-1'>Create your account</h3>
                <form onSubmit={handleRegister} className="card-body">
                    <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label className="label">Email</label>
                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className="label">PhotoURL</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="photoURL"
                            value={photoURL} 
                            onChange={(e) => setPhotoURL(e.target.value)} 
                            required
                        />
                        <label className="label">Password</label>
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div><a className="link link-hover">Forgot password?</a></div>

                        {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}

                        <button type="submit" className="btn btn-neutral mt-4">SignUp</button>
                    </fieldset>
                </form>
                <h3 className='text-center text-blue-500 font-bold'>Or</h3>
                <div className='px-8 pt-4  text-center'>
                    <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                    <h2 className='py-5'>Already have an account? <Link to='/login' className='link link-hover text-red-500'>Login</Link></h2>
                </div>
            </div>
        </div>
    );
};

export default Register;