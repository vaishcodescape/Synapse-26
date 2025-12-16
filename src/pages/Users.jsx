import { useState } from 'react';

const Users = () => {
  const [users] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      phone: '9876543210', 
      college: 'ABC College', 
      regDate: '2025-12-01',
      events: ['Hackathon 2025', 'Dance Battle']
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      phone: '9876543211', 
      college: 'XYZ University', 
      regDate: '2025-12-02',
      events: ['Coding Competition']
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      email: 'mike@example.com', 
      phone: '9876543212', 
      college: 'DEF Institute', 
      regDate: '2025-12-03',
      events: ['Hackathon 2025', 'Robotics Workshop', 'Gaming Tournament']
    },
    { 
      id: 4, 
      name: 'Sarah Williams', 
      email: 'sarah@example.com', 
      phone: '9876543213', 
      college: 'GHI College', 
      regDate: '2025-12-04',
      events: ['Dance Battle']
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [eventFilter, setEventFilter] = useState('All Events');

  // Get unique events from all users
  const allEvents = ['All Events', ...new Set(users.flatMap(user => user.events))];

  // Filter users by search term and event
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.college.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEvent = eventFilter === 'All Events' || user.events.includes(eventFilter);
    
    return matchesSearch && matchesEvent;
  });

  // Download CSV function
  const downloadCSV = () => {
    // CSV headers
    const headers = ['Name', 'Email', 'Phone', 'College', 'Registration Date', 'Events Registered'];
    
    // CSV rows
    const rows = filteredUsers.map(user => [
      user.name,
      user.email,
      user.phone,
      user.college,
      user.regDate,
      `"${user.events.join(', ')}"` // Wrap in quotes for CSV format
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `users_${eventFilter.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Users Management</h1>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Users
            </label>
            <input
              type="text"
              placeholder="Search by name, email, or college..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Event Filter Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Event
            </label>
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {allEvents.map((event, idx) => (
                <option key={idx} value={event}>
                  {event}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || eventFilter !== 'All Events') && (
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
                Search: "{searchTerm}"
              </span>
            )}
            {eventFilter !== 'All Events' && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                Event: {eventFilter}
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm('');
                setEventFilter('All Events');
              }}
              className="text-red-600 hover:text-red-800 ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            All Users ({filteredUsers.length})
            {eventFilter !== 'All Events' && (
              <span className="text-sm text-gray-500 ml-2">
                - Registered in "{eventFilter}"
              </span>
            )}
          </h2>
          <button
            onClick={downloadCSV}
            disabled={filteredUsers.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span>📥</span>
            Download CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">College</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registration Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Events</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No users found matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.college}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.regDate}</td>
                    <td className="px-6 py-4 text-sm text-indigo-600">{user.events.length}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 mb-4">
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>College:</strong> {selectedUser.college}</p>
              <p><strong>Registration Date:</strong> {selectedUser.regDate}</p>
            </div>
            <div className="mb-4">
              <strong>Registered Events ({selectedUser.events.length}):</strong>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                {selectedUser.events.map((event, idx) => (
                  <li key={idx}>{event}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setSelectedUser(null)}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;


// import { useState } from 'react';

// const Users = () => {
//   const [users] = useState([
//     { 
//       id: 1, 
//       name: 'John Doe', 
//       email: 'john@example.com', 
//       phone: '9876543210', 
//       college: 'ABC College', 
//       regDate: '2025-12-01',
//       events: ['Hackathon 2025', 'Dance Battle']
//     },
//     { 
//       id: 2, 
//       name: 'Jane Smith', 
//       email: 'jane@example.com', 
//       phone: '9876543211', 
//       college: 'XYZ University', 
//       regDate: '2025-12-02',
//       events: ['Coding Competition']
//     },
//     { 
//       id: 3, 
//       name: 'Mike Johnson', 
//       email: 'mike@example.com', 
//       phone: '9876543212', 
//       college: 'DEF Institute', 
//       regDate: '2025-12-03',
//       events: ['Hackathon 2025', 'Robotics Workshop', 'Gaming Tournament']
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.college.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Users Management</h1>
      
//       {/* Search */}
//       <div className="bg-white rounded-lg shadow p-6 mb-6">
//         <input
//           type="text"
//           placeholder="Search by name, email, or college..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       {/* Users Table */}
//       <div className="bg-white rounded-lg shadow">
//         <div className="p-6 border-b">
//           <h2 className="text-xl font-semibold">All Users ({filteredUsers.length})</h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">College</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registration Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Events</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredUsers.map((user) => (
//                 <tr key={user.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
//                   <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
//                   <td className="px-6 py-4 text-sm text-gray-500">{user.phone}</td>
//                   <td className="px-6 py-4 text-sm text-gray-500">{user.college}</td>
//                   <td className="px-6 py-4 text-sm text-gray-500">{user.regDate}</td>
//                   <td className="px-6 py-4 text-sm text-indigo-600">{user.events.length}</td>
//                   <td className="px-6 py-4 text-sm">
//                     <button
//                       onClick={() => setSelectedUser(user)}
//                       className="text-indigo-600 hover:text-indigo-800"
//                     >
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* User Details Modal */}
//       {selectedUser && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h3 className="text-xl font-semibold mb-4">{selectedUser.name}</h3>
//             <div className="space-y-2 mb-4">
//               <p><strong>Email:</strong> {selectedUser.email}</p>
//               <p><strong>Phone:</strong> {selectedUser.phone}</p>
//               <p><strong>College:</strong> {selectedUser.college}</p>
//               <p><strong>Registration Date:</strong> {selectedUser.regDate}</p>
//             </div>
//             <div className="mb-4">
//               <strong>Registered Events:</strong>
//               <ul className="list-disc list-inside mt-2 text-gray-700">
//                 {selectedUser.events.map((event, idx) => (
//                   <li key={idx}>{event}</li>
//                 ))}
//               </ul>
//             </div>
//             <button
//               onClick={() => setSelectedUser(null)}
//               className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Users;
