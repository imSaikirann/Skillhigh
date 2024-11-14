import React, { useState, useEffect } from 'react';
import axios from '../auth/axiosConfig';
import { useParams } from 'react-router-dom';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ project: '' });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState('');
  const { courseId } = useParams();

  // Fetch projects by course ID
  const fetchProjectsByCourse = async (courseId) => {
    try {
      const response = await axios.get('/api/v1/course/getAllCourse', {
        params: { courseId },
      });
      const courseData = response.data.find(course => course.id === courseId);
      setProjects(courseData ? courseData.projects : []);
    } catch (error) {
      setError('Error fetching projects for the course');
    }
  };

  // Add or update project
  const addOrUpdateProject = async () => {
    try {
      if (isEditing && selectedProject) {
        const response = await axios.put(`/api/v1/project/updateProject/${selectedProject.id}`, { project: newProject.project });
        setProjects(projects.map(proj => (proj.id === selectedProject.id ? response.data : proj)));
      } else {
        const response = await axios.post(`/api/v1/project/addProject/${courseId}`, { project: newProject.project });
        setProjects([...projects, response.data]);
      }
      setNewProject({ project: '' });
      setShowModal(false);
      setIsEditing(false);
    } catch (error) {
      setError(isEditing ? 'Error updating project' : 'Error adding project');
    }
  };

  // Delete project
  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`/api/v1/project/deleteProject/${projectId}`);
      setProjects(projects.filter(proj => proj.id !== projectId));
    } catch (error) {
      setError('Error deleting project');
    }
  };

  // Open edit modal
  const openEditModal = (project) => {
    setSelectedProject(project);
    setNewProject({ project: project.project });
    setIsEditing(true);
    setShowModal(true);
  };

  // Handle input changes for new project
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  // Fetch projects on course ID change
  useEffect(() => {
    fetchProjectsByCourse(courseId);
  }, [courseId]);

  return (
    <div className="container mx-auto p-6 px-6 sm:pl-80 font-poppins">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
            setNewProject({ project: '' });
          }}
          className="bg-main text-white px-4 py-2 rounded-md "
        >
          Add New Project
        </button>
      </header>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* List of Projects */}
      <div className="grid grid-cols-1 gap-4 mt-4">
        {projects.map((project) => (
          <div key={project.id} className="p-6 border rounded-md shadow-md ">
            <h3 className="text-xl font-medium">{project.project}</h3>
            <div className="mt-2">
              <button
                onClick={() => openEditModal(project)}
                className="text-blue-500 hover:underline mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProject(project.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit Project' : 'Add New Project'}
            </h2>
            <textarea
              name="project"
              placeholder="Project Description"
              value={newProject.project}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={addOrUpdateProject}
                className="bg-main text-white px-4 py-2 rounded-md mr-2 "
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
