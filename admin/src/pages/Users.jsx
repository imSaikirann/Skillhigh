import React, { useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([
    { name: 'John Doe', email: 'johndoe@example.com', phone: '+1 (555) 123-4567', courseName: 'React Development', using: 'Yes' },
    { name: 'Jane Smith', email: 'janesmith@example.com', phone: '+1 (555) 987-6543', courseName: 'Node.js Mastery', using: 'No' },
    { name: 'Alice Johnson', email: 'alicej@example.com', phone: '+1 (555) 555-1234', courseName: 'Full Stack Bootcamp', using: 'Yes' },
  ]);

  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    courseName: '',
    using: 'Yes',
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setShowForm(false);
    setNewUser({ name: '', email: '', phone: '', courseName: '', using: 'Yes' });
  };

  return (
    <div className='container mx-auto p-6 px-6 sm:pl-80 font-poppins'>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Users</h1>
        <button onClick={() => setShowForm(true)} className="bg-main text-white px-4 py-2 rounded-md">
          Add New User
        </button>
      </header>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      
      <div className="relative overflow-x-auto p-8 max-h-96">
        <table className="w-full text-sm text-left bg-main text-white">
          <thead className="text-xs text-white uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Phone Number</th>
              <th scope="col" className="px-6 py-3">Course Name</th>
              <th scope="col" className="px-6 py-3">Using (Yes/No)</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="bg-white border-b text-black">
                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">{user.name}</th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">{user.courseName}</td>
                <td className="px-6 py-4">{user.using}</td>
              </tr>
            ))}
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
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full px-4 py-2 mb-3 border rounded-md"
                required
              />
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
                placeholder="Phone"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                className="w-full px-4 py-2 mb-3 border rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Course Name"
                value={newUser.courseName}
                onChange={(e) => setNewUser({ ...newUser, courseName: e.target.value })}
                className="w-full px-4 py-2 mb-3 border rounded-md"
                required
              />
              <select
                value={newUser.using}
                onChange={(e) => setNewUser({ ...newUser, using: e.target.value })}
                className="w-full px-4 py-2 mb-3 border rounded-md"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
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
