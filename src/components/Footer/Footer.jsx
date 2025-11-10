import React from 'react';
// *** CHANGE HERE: FaTwitter এর পরিবর্তে নতুন আইকন FaXTwitter ইমপোর্ট করা হয়েছে। ***
// FaXTwitter আইকনটি সাধারণত react-icons/fa6 প্যাকেজে পাওয়া যায়।
// যদি আপনি শুধু 'react-icons/fa' থেকে ইমপোর্ট করেন, তবে আপনাকে react-icons এর ভার্সন আপডেট করতে হতে পারে।
// নিশ্চিত করার জন্য, আমি ধরে নিচ্ছি আপনার react-icons/fa6 ইনস্টল করা আছে।
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // <<< NEW IMPORT

// Replace these with actual URLs and contact details
const SOCIAL_LINKS = [
    { icon: FaFacebook, url: '#', name: 'Facebook' },
    { icon: FaXTwitter, url: '#', name: 'X (Twitter)' }, // <<< ICON CHANGED
    { icon: FaInstagram, url: '#', name: 'Instagram' },
];

const LEGAL_LINKS = [
    { name: 'Privacy Policy', url: '#' },
    { name: 'Terms & Conditions', url: '#' },
    { name: 'Sitemap', url: '#' },
];

const CONTACT_DETAILS = [
    { icon: FaEnvelope, text: 'contact@habittracker.com', link: 'mailto:contact@habittracker.com' },
    { icon: FaPhone, text: '+1 (555) 123-4567', link: 'tel:+15551234567' },
];

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* 1. Main Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-b border-gray-700 pb-8">
                    
                    {/* Column 1: Logo and Website Name (Full width on small screens) */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-3">
                        <div className="flex items-center text-2xl font-bold text-blue-400">
                            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v5a1 1 0 102 0V7zm-1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            <span>Habit Tracker</span> 
                        </div>
                        <p className="text-gray-400 text-sm max-w-xs">
                            Master your daily routine. Build positive habits, track your progress, and achieve your long-term goals.
                        </p>
                    </div>

                    {/* Column 2: Contact Details */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold mb-2">Contact</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            {CONTACT_DETAILS.map((contact, index) => {
                                const Icon = contact.icon;
                                return (
                                    <li key={index} className="flex items-center hover:text-white transition-colors">
                                        <Icon className="mr-2 w-4 h-4" />
                                        <a href={contact.link}>{contact.text}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Column 3: Terms & Conditions / Legal Links */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold mb-2">Legal</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            {LEGAL_LINKS.map((link, index) => (
                                <li key={index} className="hover:text-white transition-colors">
                                    <a href={link.url}>{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Social Media Links */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold mb-2">Connect</h3>
                        <div className="flex space-x-4">
                            {SOCIAL_LINKS.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a 
                                        key={index}
                                        href={social.url} 
                                        aria-label={`Link to our ${social.name}`}
                                        className="text-gray-400 hover:text-blue-400 transition-colors text-2xl"
                                    >
                                        <Icon />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="pt-6 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Habit Tracker. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;