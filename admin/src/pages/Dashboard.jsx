import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Dashboard = ({ data, userCount = 500 }) => {
  const sampleData = [
    { course: 'AI & ML', purchases: 200 },
    { course: 'App Development', purchases: 150 },
    { course: 'Data Science (Python)', purchases: 180 },
    { course: 'Cyber Security', purchases: 120 },
    { course: 'Data Structures and Algorithm', purchases: 160 },
    { course: 'Full Stack Developer', purchases: 190 },
    { course: 'Data Analytics', purchases: 130 },
    { course: 'Cloud Computing', purchases: 170 },
    { course: 'UI/UX Design', purchases: 140 },
    { course: 'HR', purchases: 90 },
    { course: 'Digital Marketing', purchases: 110 },
    { course: 'Business Analytics', purchases: 95 },
    { course: 'Finance', purchases: 85 },
    { course: 'VLSI', purchases: 100 },
    { course: 'Embedded Systems', purchases: 75 },
    { course: 'IoT', purchases: 120 },
    { course: 'AutoCAD', purchases: 80 },
    { course: 'Fusion 360', purchases: 70 },
  ];

  return (
    <div className="bg-white rounded-lg p-6 m-4 font-poppins sm:md-0 md:ml-80 ">
      {/* Users Box */}
      <div className="flex items-center justify-between bg-green-100 rounded-lg p-4 mb-8 shadow-md">
        <h3 className="text-lg font-semibold text-green-700">Total Users</h3>
        <span className="text-3xl font-bold text-green-700">{userCount}</span>
      </div>

      {/* Course Purchases Chart */}
      <h2 className="text-2xl font-semibold text-primary mb-4">Course Purchases</h2>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart data={data || sampleData} layout="vertical" margin={{ left: 30, right: 30 }}>
          <XAxis type="number" />
          <YAxis
            dataKey="course"
            type="category"
            width={200}
            tick={{ fontSize: 14, fill: '#0D8267' }} // Custom color for Y-axis labels
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="purchases" fill="url(#primaryGradient)" name="Purchases" />
          <defs>
            {/* Gradient color fill for bars */}
            <linearGradient id="primaryGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0D8267" />
              <stop offset="100%" stopColor="#0D8267" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
