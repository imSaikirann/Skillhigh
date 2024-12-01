import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../auth/axiosConfig";
import Spinner from "../components/Spinner";

export default function Courses() {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // For modal
  const [showModal, setShowModal] = useState(false); // Modal visibility

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/api/v1/department/departments/${departmentId}`);
        setCourses(response.data.department.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [departmentId]);

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`/api/v1/course/deleteCourse/${courseId}`);
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEdit = (course) => {
    setSelectedCourse(course); // Load course data into modal
    setShowModal(true); // Show the modal
  };

  const closeModal = () => {
    setShowModal(false); // Hide modal
    setSelectedCourse(null); // Clear selected course
  };

  const handleSaveChanges = async (updatedCourse) => {
    try {
      await axios.put(`/api/v1/course/updateCourse/${updatedCourse.id}`, updatedCourse);
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === updatedCourse.id ? { ...course, ...updatedCourse } : course
        )
      );
      alert("Course updated successfully!");
      closeModal();
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course. Please try again.");
    }
  };

  return (
    <div className="p-8 sm:pl-80 font-poppins">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Courses</h1>
        <button
          className="bg-main text-white font-semibold py-2 px-4 rounded"
          onClick={() => navigate(`/dashboard/addcourses/${departmentId}`)}
        >
          Add New Course
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="max-w-sm rounded overflow-hidden shadow-sm bg-main bg-opacity-5 relative">
              <img
                className="w-full h-auto object-cover"
                src={course.courseThumbnail}
                alt={course.courseName}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{course.courseName}</div>
                <p className="text-gray-700 text-base">
                  {course.courseDescription.length > 100
                    ? `${course.courseDescription.slice(0, 97)}...`
                    : course.courseDescription}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2 space-x-2">
                <button
                  className="bg-main text-white font-semibold py-2 px-4 rounded"
                  onClick={() => navigate(`/dashboard/topics/${course.id}`)}
                >
                  View Details
                </button>
                <button
                  className="bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No courses found for this department.</p>
        )}
      </div>
      {showModal && (
        <EditCourseModal
          course={selectedCourse}
          onClose={closeModal}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
}

function EditCourseModal({ course, onClose, onSave }) {
  const [formData, setFormData] = useState(course);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="courseName" className="block text-gray-700 font-semibold mb-2">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-main"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="courseDescription" className="block text-gray-700 font-semibold mb-2">
              Course Description
            </label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-main"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="courseThumbnail" className="block text-gray-700 font-semibold mb-2">
              Course Thumbnail URL
            </label>
            <input
              type="text"
              id="courseThumbnail"
              name="courseThumbnail"
              value={formData.courseThumbnail}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-main"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-main text-white py-2 px-4 rounded font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
