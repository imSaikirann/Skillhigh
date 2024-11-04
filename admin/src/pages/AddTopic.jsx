import React, { useState, useContext } from 'react';
import axios from '../auth/axiosConfig';
import { AppContext } from '../store/StoreContext';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';

export default function AddTopic() {
    const { courseId } = useParams(); 
    console.log(courseId)
    const { setLoading, loading } = useContext(AppContext);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        video: null,
    });
    const [videoName, setVideoName] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
            setVideoName(files[0].name);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('video', formData.video);

        setLoading(true); 

        try {
            const response = await axios.post(`/api/v1/topic/createTopic/${courseId}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setAlertMessage(response.data.message);
            setAlertVisible(true);

            setFormData({
                title: '',
                description: '',
                video: null,
            });
            setVideoName('');

        } catch (error) {
            console.log(error)
            setAlertMessage(error.response?.data?.message || "Error while adding topic.");
            setAlertVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const handleAlertClose = () => {
        setAlertVisible(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg font-poppins">
            <Alert 
                message={alertMessage} 
                isVisible={alertVisible} 
                onClose={handleAlertClose} 
            />
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Topic</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Topic Title */}
                <div>
                    <label className="block text-gray-600 font-medium mb-1" htmlFor="title">
                        Topic Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-600"
                    />
                </div>

                {/* Topic Description */}
                <div>
                    <label className="block text-gray-600 font-medium mb-1" htmlFor="description">
                        Topic Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-600"
                    ></textarea>
                </div>

                {/* Video Upload */}
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Upload Video</label>
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="video"
                            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-green-100 border-gray-300 hover:bg-green-200 transition duration-200"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <p className="mb-2 text-sm text-black">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-black">MP4, AVI (Max 1GB)</p>
                            </div>
                            <input
                                id="video"
                                type="file"
                                name="video"
                                accept="video/*"
                                onChange={handleChange}
                                className="hidden"
                            />
                        </label>
                        {videoName && (
                            <div className="ml-4 mt-2">
                                <p className="text-sm text-gray-600">
                                    Selected File: <span className="font-semibold">{videoName}</span>
                                </p>
                                <p className="text-xs text-gray-500">Ensure it's the correct file.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-main text-white font-semibold py-2 rounded-md transition duration-200 hover:bg-green-600"
                    >
                        {!loading ? "Add Topic" : <Spinner />}
                    </button>
                </div>
            </form>
        </div>
    );
}
