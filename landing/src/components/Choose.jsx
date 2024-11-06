import React from 'react';
import Monitor from '../assets/MonitorPlay.png';
import Person from '../assets/personsvg.png';
import LockKeyOpen from '../assets/LockKeyOpen.png';

export default function Choose() {
    return (
        <div className='w-full h-auto py-8'>
            <h1 className='text-center font-bold font-inter text-black text-2xl lg:text-4xl mb-6'>
                Why Choose Us
            </h1>
            <div className='flex flex-col sm:flex-row md:flex-wrap lg:flex-nowrap justify-center items-center gap-6'>
                {/* Box 1 */}
                <div className='bg-border w-full sm:w-[45%] md:w-[30%] h-[300px] rounded-md flex flex-col items-center justify-center text-center p-4'>
                    <img src={Person} className='w-[80px] h-[80px]' alt="Explore Courses" />
                    <h2 className='font-bold font-inter text-lg mb-2'>Explore Courses</h2>
                    <p className='text-sm'>
                        A simple yet effective representation of educational content, emphasizing the variety of subjects users can explore.
                    </p>
                </div>

                {/* Box 2 */}
                <div className='bg-border w-full sm:w-[45%] md:w-[30%] h-[300px] rounded-md flex flex-col items-center justify-center text-center p-4'>
                    <img src={Monitor} className='w-[80px] h-[80px]' alt="Enroll & Learn" />
                    <h2 className='font-bold font-inter text-lg mb-2'>Enroll & Learn</h2>
                    <p className='text-sm'>
                        A straightforward depiction of a group of people, ideal for showcasing the collaborative nature of the learning environment.
                    </p>
                </div>

                {/* Box 3 */}
                <div className='bg-border w-full sm:w-[45%] md:w-[30%] h-[300px] rounded-md flex flex-col items-center justify-center text-center p-4'>
                    <img src={LockKeyOpen} className='w-[80px] h-[80px]' alt="Achieve & Grow" />
                    <h2 className='font-bold font-inter text-lg mb-2'>Achieve & Grow</h2>
                    <p className='text-sm'>
                        A dynamic icon representing upward progress, perfect for illustrating the growth and achievements of learners on the platform.
                    </p>
                </div>
            </div>
        </div>
    );
}
