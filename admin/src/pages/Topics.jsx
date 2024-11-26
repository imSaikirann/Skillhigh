import React, { useState, useEffect, useContext } from 'react';
import axios from '../auth/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { AppContext } from '../store/StoreContext';

export default function Topics() {
    const {setModules} = useContext(AppContext)
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState(null);
    const { courseId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const res = await axios.get(`/api/v1/course/getCourse/${courseId}`);
                setTopics(res.data.topics);
                setModules(res.data.modules)
            } catch (err) {
                setError("An error occurred while fetching the topics.");
            }
        };
        fetchTopics();
    }, [courseId]);

    const handleTaskBox = (topicId) => {
        navigate(`/dashboard/departments/courses/topic/${topicId}`);
    };

    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
   

    return (
        <div className="container mx-auto p-6 px-6 sm:pl-80 font-poppins">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Course Topics</h1>
                <div className="space-x-4">
                    <button 
                        className="bg-main text-white font-semibold py-2 px-4 rounded hover:bg-main-dark transition-colors"
                        onClick={() => navigate(`/courses/add-topic/${courseId}`)}
                    >
                        Add Topic
                    </button>
                    <button 
                        className="bg-main text-white font-semibold py-2 px-4 rounded hover:bg-main-dark transition-colors"
                        onClick={() => navigate(`/dashboard/courses/projects/${courseId}`)}
                    >
                        Course Projects
                    </button>
                    <button 
                        className="bg-main text-white font-semibold py-2 px-4 rounded hover:bg-main-dark transition-colors"
                        onClick={() => navigate(`/dashboard/courses/modules/${courseId}`)}
                    >
                        Modules
                    </button>
                </div>
            </div>
            
            {/* Topics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {topics.map((topic, index) => (
                    <div 
                        key={topic.id} 
                        className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 min-h-[300px] flex flex-col"
                    >
                        <div className="flex-grow">
                            <h1 className="text-lg font-semibold text-main mb-2">Lesson {index + 1}</h1>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{topic.title}</h2>
                            <p className="text-gray-600 mb-4 line-clamp-3">{topic.description}</p>
                        </div>
                        {topic.video && (
                            <video 
                                controls 
                                src={topic.video} 
                                className="w-full rounded-lg mb-4"
                            ></video>
                        )}
                        {/* Only show the "Open TaskBox" button for every 5th topic */}
                        {(index + 1) % 5 === 0 && (
                            <button 
                                className="bg-main text-white font-semibold py-2 px-4 rounded hover:bg-main-dark transition-colors w-full"
                                onClick={() => handleTaskBox(topic.id)}
                            >
                                Open TaskBox
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
