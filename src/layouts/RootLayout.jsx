import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

const RootLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;