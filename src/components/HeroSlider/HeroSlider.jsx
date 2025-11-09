
import React, { useState, useEffect } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const TypewriterDisplay = ({ textToType }) => {
    const [text] = useTypewriter({
        words: textToType,
        loop: 1,
        typeSpeed: 70,
        deleteSpeed: 50,
        delaySpeed: 1000,
    });

    return (
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {text}
            <Cursor cursorColor="#fff" />
        </h1>
    );
};

const slides = [
    {
        id: 1,
        typewriterText: ["Build Your Habits, Change Your Life."],
        secondaryText: "Track Your Progress, Achieve Your Goals.",
    },
    {
        id: 2,
        typewriterText: ["Track Your Progress, Achieve Your Goals."],
        secondaryText: "Set clear objectives and monitor your improvements.",
    },
    {
        id: 3,
        typewriterText: ["Join a Community of Habit Builders."],
        secondaryText: "Connect with like-minded individuals and grow together.",
    },
];

const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext(); 
        }, 5000); 

        return () => clearInterval(interval);
    }, []); 

    const currentSlide = slides[currentIndex];

    const variants = {
        enter: { opacity: 0, x: 100 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
    };

    return (
        <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
            <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={currentIndex}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.5 },
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-400 to-green-300 p-8"
                >
                    <div className="text-center text-white max-w-2xl">
                        <TypewriterDisplay
                            key={currentIndex}
                            textToType={currentSlide.typewriterText}
                        />

                        <p className="text-xl md:text-2xl mb-8">{currentSlide.secondaryText}</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 btn-primary font-semibold rounded-full text-lg shadow-lg hover:bg-gray-100 transition-colors"
                        >
                            Start Building Habits
                        </motion.button>
                    </div>
                </motion.div>
            </AnimatePresence>

            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 p-2 rounded-full text-white text-2xl hover:bg-opacity-50 transition-colors z-10"
            >
                <FiChevronLeft />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 p-2 rounded-full text-white text-2xl hover:bg-opacity-50 transition-colors z-10"
            >
                <FiChevronRight />
            </button>
        </div>
    );
};

export default HeroSlider;