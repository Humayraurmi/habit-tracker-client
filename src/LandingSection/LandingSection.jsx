// LandingSections.jsx
import React from 'react';
import HowHabitSyncWorks from '../components/HowHabitSyncWorks/HowHabitSyncWorks';
import Testimonials from '../components/Testimonials/Testimonials';
import Benefits from '../components/Benefits/Benefits';


const LandingSections = ({
    benefitsHabitsPromise,
    howItWorksStepsPromise,
    testimonialsPromise,
}) => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 mb-5">

                    <div>
                        <Benefits
                            benefitsHabitsPromise={benefitsHabitsPromise}
                            sideBySideView={true}
                        />
                    </div>

                    <div>
                        <HowHabitSyncWorks
                            stepsPromise={howItWorksStepsPromise}
                            sideBySideView={true}
                        />
                    </div>
                </div>

                <div>
                    <Testimonials
                        testimonialsPromise={testimonialsPromise}
                        fullWidthView={true}
                    />
                </div>

            </div>
        </section>
    );
};

export default LandingSections;