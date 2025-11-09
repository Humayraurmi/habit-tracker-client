import React, { use } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = ({ testimonialsPromise }) => {
    const testimonials = use(testimonialsPromise);

    if (testimonials.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                    What Our Users Say
                </h2>
                <div
                    className="grid gap-8 
                     sm:grid-cols-1 
                     md:grid-cols-2 
                     lg:grid-cols-2"
                >
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial._id}
                            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-start"
                        >
                            <div className="flex items-start mb-4">
                                <FaQuoteLeft className="text-blue-400 text-2xl mr-3 opacity-75" />
                                <p className="text-gray-700 text-base italic leading-relaxed">
                                    "{testimonial.feedback}"
                                </p>
                            </div>

                            <div className="flex items-center mt-auto pt-4 border-t border-gray-100 w-full">
                                <img
                                    src={testimonial.user_image}
                                    alt={testimonial.user_name}
                                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-500 shadow-sm"
                                />
                                <p className="font-semibold text-gray-800 text-lg">
                                    {testimonial.user_name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;