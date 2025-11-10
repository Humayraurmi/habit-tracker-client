import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';

const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Toaster></Toaster>
            <div className='w-11/12 mx-auto'>
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default RootLayout;