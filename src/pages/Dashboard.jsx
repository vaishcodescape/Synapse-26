import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats] = useState({
    totalEvents: 12,
    totalRegistrations: 456,
    totalUsers: 234,
    totalSponsors: 8,
  });

  const [recentRegistrations] = useState([
    { id: 1, userName: 'John Doe', event: 'Coding Competition', date: '2025-12-14' },
    { id: 2, userName: 'Jane Smith', event: 'Dance Battle', date: '2025-12-14' },
    { id: 3, userName: 'Mike Johnson', event: 'Robotics Workshop', date: '2025-12-13' },
    { id: 4, userName: 'Sarah Williams', event: 'Gaming Tournament', date: '2025-12-13' },
    { id: 5, userName: 'Tom Brown', event: 'Art Exhibition', date: '2025-12-12' },
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Events</p>
              <p className="text-3xl font-bold text-indigo-600">{stats.totalEvents}</p>
            </div>
            <div className="text-4xl">🎪</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Registrations</p>
              <p className="text-3xl font-bold text-green-600">{stats.totalRegistrations}</p>
            </div>
            <div className="text-4xl">📝</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Sponsors</p>
              <p className="text-3xl font-bold text-purple-600">{stats.totalSponsors}</p>
            </div>
            <div className="text-4xl">🤝</div>
          </div>
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Recent Registrations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentRegistrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{reg.userName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{reg.event}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{reg.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
