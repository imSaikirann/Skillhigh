import React from 'react';

export default function Choose() {
    return (
        <div className='w-full h-auto py-8'>
            <h1 className='text-center font-bold font-inter text-black text-2xl mb-6'>
                Why Choose Us
            </h1>
            <div className='flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap justify-center items-center gap-4'>
                {/* Box 1 */}
                <div className='bg-border w-full md:w-[45%] lg:w-[30%] h-[300px] rounded-md flex flex-col text-center p-4'>
                    <h2 className='font-bold font-inter text-lg mb-2'>Explore Courses</h2>
                    <p className='text-sm'>
                        A simple yet effective representation of educational content, emphasizing the variety of subjects users can explore.
                    </p>
                </div>
                
                {/* Box 2 */}
                <div className='bg-border w-full md:w-[45%] lg:w-[30%] h-[300px] rounded-md flex flex-col text-center p-4'>
                    <h2 className='font-bold font-inter text-lg mb-2'>Enroll & Learn</h2>
                    <p className='text-sm'>
                        A straightforward depiction of a group of people, ideal for showcasing the collaborative nature of the learning environment.
                    </p>
                </div>

                {/* Box 3 */}
                <div className='bg-border w-full md:w-[45%] lg:w-[30%] h-[300px] rounded-md flex flex-col text-center p-4'>
                    <h2 className='font-bold font-inter text-lg mb-2'>Achieve & Grow</h2>
                    <p className='text-sm'>
                        A dynamic icon representing upward progress, perfect for illustrating the growth and achievements of learners on the platform.
                    </p>
                </div>
            </div>
        </div>
    );
}
