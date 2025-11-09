import React from 'react';
import HeroSlider from '../HeroSlider/HeroSlider';
import FeaturedHabits from '../FeaturedHabits/FeaturedHabits';
import Benefits from '../Benefits/Benefits';
import HowHabitSyncWorks from '../HowHabitSyncWorks/HowHabitSyncWorks';
import Testimonials from '../Testimonials/Testimonials';
import LandingSections from '../../LandingSection/LandingSection';

const featuredHabitsPromise = fetch('http://localhost:3000/featured-habits').then(res=>res.json())
const benefitsHabitsPromise = fetch("http://localhost:3000/benefits").then(res=>res.json())
const howItWorksStepsPromise = fetch("http://localhost:3000/how-it-works").then(res=>res.json());
const testimonialsPromise = fetch("http://localhost:3000/testimonials").then(res=>res.json());


const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <FeaturedHabits featuredHabitsPromise={featuredHabitsPromise}></FeaturedHabits>
            <LandingSections
                benefitsHabitsPromise={benefitsHabitsPromise}
                howItWorksStepsPromise={howItWorksStepsPromise}
                testimonialsPromise={testimonialsPromise}
            ></LandingSections>
        </div>
    );
};

export default Home;