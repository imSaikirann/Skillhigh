import React, { useState, useEffect } from 'react';
import axios from '../auth/axiosConfig';
import { FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';  

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);  
    try {
      const response = await axios.get('/api/v1/department/getDepartments');
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
    setLoading(false);  // End loading
  };

  const handleAddDepartmentClick = () => {
    setIsEditing(false);
    setDepartmentName('');
    setDescription('');
    setShowFormModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateDepartment(editId, departmentName, description);
    } else {
      await addDepartment(departmentName, description);
    }
    setShowFormModal(false);
    fetchDepartments();
  };

  const addDepartment = async (departmentName, description) => {
    try {
      await axios.post('/api/v1/department/addDepartments', { departmentName, description });
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  const updateDepartment = async (id, departmentName, description) => {
    try {
      await axios.put(`/api/v1/department/updateDepartments/${id}`, { departmentName, description });
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  const deleteDepartment = async () => {
    try {
      await axios.delete(`/api/v1/department/deleteDepartments/${selectedDepartment.id}`);
      fetchDepartments();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const handleEdit = (department) => {
    setIsEditing(true);
    setEditId(department.id);
    setDepartmentName(department.departmentName);
    setDescription(department.description);
    setShowFormModal(true);
    setDropdownVisible(null);
  };

  const handleDeleteConfirm = (department) => {
    setSelectedDepartment(department);
    setShowDeleteConfirm(true);
    setDropdownVisible(null);
  };

  const toggleDropdown = (departmentId) => {
    setDropdownVisible(dropdownVisible === departmentId ? null : departmentId);
  };

  const handleTopics = (departmentId) => {
    navigate(`/dashboard/courses/${departmentId}`);
  };

  return (
    <div className="container mx-auto p-8 pl-0 sm:pl-80 font-poppins">
      <h1 className="text-4xl font-bold text-center mb-8 text-main">Manage Departments</h1>

      <button
        onClick={handleAddDepartmentClick}
        className="bg-main text-white py-2 px-4 rounded-lg font-semibold fixed top-40 right-8 sm:top-14 sm:right-14"
      >
        Add Department
      </button>

      {loading ? (  // Show spinner when loading
        <Spinner />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-24 sm:mt-0">
          {departments.map((department) => (
            <div
              key={department.id}
              className="bg-white shadow-xl rounded-lg p-6 border border-gray-200 relative"
            >
              <h3 className="text-xl font-semibold text-main">{department.departmentName}</h3>
              <p className="text-gray-600 mt-2">{department.description}</p>
              <button className="bg-main px-4 py-2 rounded-md mt-4 text-white" onClick={() => handleTopics(department.id)}>
                View courses
              </button>
              <div className="absolute top-4 right-4">
                <FaEllipsisV
                  onClick={() => toggleDropdown(department.id)}
                  className="text-gray-500 cursor-pointer"
                />
                {dropdownVisible === department.id && (
                  <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <button
                      onClick={() => handleEdit(department)}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteConfirm(department)}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Department Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4">
              {isEditing ? 'Edit Department' : 'Add New Department'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-medium mb-1">Department Name</label>
                <input
                  type="text"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                  rows="3"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="py-2 px-4 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="py-2 px-4 bg-main text-white rounded">
                  {isEditing ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this department?</p>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="py-2 px-4 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={deleteDepartment}
                className="py-2 px-4 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
