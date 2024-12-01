import React, { useState, useEffect } from 'react';
import axios from '../auth/axiosConfig';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    orderId: '',
    phone: '',
    courseName: '',
    amount: "",
    using: 'NO',
  });

  // Fetch users from the API
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get('/api/v1/purchaseCourse/purchases');
        console.log(res.data);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []); 

  // Fetch courses from the API
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await axios.get('/api/v1/course/getAllCourse');
        console.log(res.data);
        setCourses(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  }, []); 

  // Filter users based on search input
  const filteredUsers = users.filter(
    (user) =>
      user.courseName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Handle adding a new user
  const handleAddUser = async () => {
    try {
      // Send the new user data to the backend
      const response = await axios.post('/api/v1/purchaseCourse/purchaseFromSales', {
        email: newUser.email,
        courseId: newUser.courseName, 
        orderId: newUser.orderId, 
        amount: parseFloat(newUser.amount),
        phone: newUser.phone,
      });

      if (response.status === 201) {
       
        setUsers([...users, {
          email: newUser.email,
          phoneNumber: newUser.phone,
          courseName: newUser.courseName,
          price: newUser.amount, 
   
        }]);

        // Reset form and hide modal
        setShowForm(false);
        setNewUser({
          email: '',
          orderId: '',
          phone: '',
          courseName: '',
          amount: "",

        });
      } else {
        console.error("Unexpected response:", response.data);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 px-6 sm:pl-80 font-poppins">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Users</h1>
        <button onClick={() => setShowForm(true)} className="bg-main text-white px-4 py-2 rounded-md">
          Add New User
        </button>
      </header>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {/* Users Table */}
      <div className="relative overflow-x-auto p-8 max-h-96">
        <table className="w-full text-sm text-left bg-main text-white">
          <thead className="text-xs text-white uppercase">
            <tr>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone Number</th>
              <th className="px-6 py-3">Course Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Using (Yes/No)</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index} className="bg-white border-b text-black">
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phoneNumber}</td>
                  <td className="px-6 py-4">{user.courseName}</td>
                  <td className="px-6 py-4">{user.price}</td>
                  <td className="px-6 py-4">{user.using ? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add New User Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full px-4 py-2 mb-3 border rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Order Id"
                value={newUser.orderId}
                onChange={(e) => setNewUser({ ...newUser, orderId: e.target.value })}
                className="w-full px-4 py-2 mb-3 border rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                className="w-full px-4 py-2 mb-3 border rounded-md"
                required
              />
              
              {/* Course Selection Dropdown */}
              <select
                value={newUser.courseName}
                onChange={(e) => setNewUser({ ...newUser, courseName: e.target.value })}
                className="w-full px-4 py-2 mb-3 border rounded-md"
                required
              >
                <option value="">Select Course</option>
                {courses && courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.courseName}
                  </option>
                ))}
              </select>

            
              {/* Using Select */}
              <select
                value={newUser.amount}
                onChange={(e) => setNewUser({ ...newUser, amount: e.target.value })}
                className="w-full px-4 py-2 mb-3 border rounded-md"
              >
                <option value="4500">4500</option>
                <option value="6500">6500</option>
              </select>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 mr-2 rounded-md border"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-main text-white px-4 py-2 rounded-md">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
