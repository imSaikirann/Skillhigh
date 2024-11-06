import React from 'react';

export default function NeedHelp() {
    return (
        <div className='font-inter py-8'>
            <div className='flex flex-col sm:flex-col items-center gap-6'>
                <div className='flex flex-col sm:w-full sm:text-center'>
                    <h1 className='font-bold text-1xl lg:text-4xl mb-4'>
                        Need Help? Not sure which course to choose?
                    </h1>
                    <p className='text-sm text-gray-600'>
                        Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla nec.
                    </p>
                </div>

                <div className='flex flex-col sm:flex-row gap-6 w-full'>
                    {/* Box 1 */}
                    <div className='w-full sm:w-[48%] lg:w-[48%] h-[172px] bg-border rounded-lg p-4'>
                        <h2 className='font-bold text-xl mb-2'>Skill Development</h2>
                        <p className='text-sm mb-4'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        </p>
                        <button className='w-full border-2 border-main py-2 rounded-md'>
                            Explore Courses
                        </button>
                    </div>

                    {/* Box 2 */}
                    <div className='w-full sm:w-[48%] lg:w-[48%] h-[172px] bg-border rounded-lg p-4'>
                        <h2 className='font-bold text-xl mb-2'>Job Guaranteed</h2>
                        <p className='text-sm mb-4'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        </p>
                        <button className='w-full border-2 border-main py-2 rounded-md'>
                            Explore Jobs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
