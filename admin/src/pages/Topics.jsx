import React, { useState, useEffect } from 'react';
import axios from '../auth/axiosConfig';
import { useParams } from 'react-router-dom';

export default function Topics() {
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState(null);
    const { courseId } = useParams();

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const res = await axios.get(`/api/v1/course/getCourse/${courseId}`);
                setTopics(res.data.topics);
            } catch (err) {
                setError("An error occurred while fetching the topics.");
            }
        };
        fetchTopics();
    }, [courseId]);

    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
    if (!topics.length) return <div className="text-center py-4">Loading...</div>;

    return (
        <div className="container mx-auto p-6 ml-80 font-poppins">
            <h1 className="text-3xl font-bold text-left mb-8">Course Topics</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic, index) => (
                    <div 
                        key={topic.id} 
                        className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                        <h1 className="text-lg font-semibold text-main mb-2">Lesson {index + 1}</h1>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{topic.title}</h2>
                        <p className="text-gray-600 mb-4">{topic.description}</p>
                        <video 
                            controls 
                            src={topic.video} 
                            className="w-full rounded-lg mb-4"
                        ></video>
                    </div>
                ))}
            </div>
        </div>
    );
}
