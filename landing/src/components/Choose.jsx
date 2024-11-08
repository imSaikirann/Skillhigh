import React from 'react';
import Monitor from '../assets/MonitorPlay.png';
import Person from '../assets/personsvg.png';
import LockKeyOpen from '../assets/LockKeyOpen.png';

export default function Choose() {

    
    return (
        <div className='w-full h-auto py-8 px-4 font-inter'>
            <h1 className='text-center font-bold font-inter text-black text-2xl sm:text-3xl lg:text-4xl mb-6'>
                Why Choose Us
            </h1>
            <div className='flex flex-col sm:flex-row md:flex-wrap lg:flex-nowrap justify-center items-center gap-6'>
                {/* Box 1 */}
                <div className='bg-border w-full sm:w-[45%] md:w-[30%] lg:w-[25%] h-[300px] rounded-md flex flex-col items-center justify-center text-center p-4 hover:scale-105 hover:shadow-lg transition-transform duration-300'>
                    <img src={Person} className='w-[80px] h-[80px] mb-4' alt="Explore Courses" />
                    <h2 className='font-bold font-inter text-lg lg:text-xl mb-2'>Explore Courses</h2>
                    <p className='text-sm lg:text-base'>
                        Discover a variety of subjects designed to engage and inspire your learning journey.
                    </p>
                </div>

                {/* Box 2 */}
                <div className='bg-border w-full sm:w-[45%] md:w-[30%] lg:w-[25%] h-[300px] rounded-md flex flex-col items-center justify-center text-center p-4 hover:scale-105 hover:shadow-lg transition-transform duration-300'>
                    <img src={Monitor} className='w-[80px] h-[80px] mb-4' alt="Enroll & Learn" />
                    <h2 className='font-bold font-inter text-lg lg:text-xl mb-2'>Enroll & Learn</h2>
                    <p className='text-sm lg:text-base'>
                        Engage in a collaborative and enriching learning environment tailored to your needs.
                    </p>
                </div>

                {/* Box 3 */}
                <div className='bg-border w-full sm:w-[45%] md:w-[30%] lg:w-[25%] h-[300px] rounded-md flex flex-col items-center justify-center text-center p-4 hover:scale-105 hover:shadow-lg transition-transform duration-300'>
                    <img src={LockKeyOpen} className='w-[80px] h-[80px] mb-4' alt="Achieve & Grow" />
                    <h2 className='font-bold font-inter text-lg lg:text-xl mb-2'>Achieve & Grow</h2>
                    <p className='text-sm lg:text-base'>
                        Unlock your potential and progress toward your goals with our structured approach.
                    </p>
                </div>
            </div>
        </div>
    );
}
