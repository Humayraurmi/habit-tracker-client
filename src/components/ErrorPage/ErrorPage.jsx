import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center px-4">
            <div className="max-w-md p-8 bg-white shadow-xl rounded-lg">
                <h1 className="text-9xl font-extrabold text-[#9F62F2]">404</h1>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
                <p className="text-lg text-gray-600 mb-6">
                    Oops! The page you are looking for might have been removed or is temporarily unavailable.
                </p>
                
                {error.statusText || error.message ? (
                    <p className="text-sm text-red-500 italic mb-6">
                        {error.statusText || error.message}
                    </p>
                ) : null}

                <Link 
                    to="/" 
                    className="btn bg-[#9F62F2] hover:bg-[#8e52e2] text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;