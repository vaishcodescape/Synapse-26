import { useState } from 'react';

const Accommodation = () => {
  const [accommodations, setAccommodations] = useState([
    { 
      id: 1, 
      type: 'Deluxe Package', 
      price: 5000, 
      startDate: '2025-12-20',
      endDate: '2025-12-24',
      available: true,
      description: '4 days accommodation with meals'
    },
    { 
      id: 2, 
      type: 'Standard Package', 
      price: 3000, 
      startDate: '2025-12-21',
      endDate: '2025-12-23',
      available: true,
      description: '3 days accommodation'
    },
    { 
      id: 3, 
      type: 'Budget Package', 
      price: 1500, 
      startDate: '2025-12-22',
      endDate: '2025-12-24',
      available: false,
      description: '2 days basic accommodation'
    },
  ]);

  const [formData, setFormData] = useState({
    type: '',
    price: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  // Edit modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingAccommodation, setEditingAccommodation] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAccommodations([...accommodations, { 
      id: Date.now(), 
      ...formData,
      available: true 
    }]);
    setFormData({ type: '', price: '', startDate: '', endDate: '', description: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this accommodation?')) {
      setAccommodations(accommodations.filter(a => a.id !== id));
    }
  };

  // Toggle availability
  const toggleAvailability = (id) => {
    setAccommodations(
      accommodations.map((acc) =>
        acc.id === id ? { ...acc, available: !acc.available } : acc
      )
    );
  };

  // Open edit modal
  const openEditModal = (accommodation) => {
    setEditingAccommodation({ ...accommodation });
    setIsEditOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingAccommodation(null);
    setIsEditOpen(false);
  };

  // Handle edit save
  const handleEditSave = (e) => {
    e.preventDefault();
    setAccommodations(
      accommodations.map((acc) =>
        acc.id === editingAccommodation.id ? editingAccommodation : acc
      )
    );
    closeEditModal();
  };

  // Calculate duration in days
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Accommodation Management</h1>
      
      {/* Add Accommodation Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Accommodation Package</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Package Name</label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Deluxe Package"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Price (₹)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Total package price"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              min={formData.startDate}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows="3"
              placeholder="Package details, amenities, meals included, etc."
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Accommodation Package
            </button>
          </div>
        </form>
      </div>

      {/* Accommodations List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">All Accommodation Packages</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {accommodations.map((acc) => (
            <div key={acc.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              {/* Availability Toggle */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800">{acc.type}</h3>
                <button
                  onClick={() => toggleAvailability(acc.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    acc.available ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      acc.available ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${
                  acc.available
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {acc.available ? '✓ Available' : '✗ Full'}
              </span>

              <div className="space-y-2 mb-4">
                <p className="text-2xl font-bold text-indigo-600">
                  ₹{acc.price}
                </p>
                <div className="text-sm text-gray-600">
                  <p>📅 {acc.startDate} to {acc.endDate}</p>
                  <p className="text-indigo-600 font-medium">
                    Duration: {calculateDuration(acc.startDate, acc.endDate)} days
                  </p>
                </div>
                {acc.description && (
                  <p className="text-sm text-gray-600 mt-2">
                    📝 {acc.description}
                  </p>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openEditModal(acc)}
                  className="flex-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(acc.id)}
                  className="flex-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && editingAccommodation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Edit Accommodation Package</h3>
              <button
                onClick={closeEditModal}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleEditSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Name
                </label>
                <input
                  type="text"
                  value={editingAccommodation.type}
                  onChange={(e) =>
                    setEditingAccommodation({ ...editingAccommodation, type: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Price (₹)
                </label>
                <input
                  type="number"
                  value={editingAccommodation.price}
                  onChange={(e) =>
                    setEditingAccommodation({ ...editingAccommodation, price: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={editingAccommodation.startDate}
                    onChange={(e) =>
                      setEditingAccommodation({ ...editingAccommodation, startDate: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={editingAccommodation.endDate}
                    onChange={(e) =>
                      setEditingAccommodation({ ...editingAccommodation, endDate: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    min={editingAccommodation.startDate}
                    required
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-indigo-600 font-medium">
                  Duration: {calculateDuration(editingAccommodation.startDate, editingAccommodation.endDate)} days
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editingAccommodation.description}
                  onChange={(e) =>
                    setEditingAccommodation({ ...editingAccommodation, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Package details, amenities, meals included, etc."
                />
              </div>

              {/* Availability Toggle in Modal */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-sm font-medium text-gray-700">
                  Availability Status
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setEditingAccommodation({
                      ...editingAccommodation,
                      available: !editingAccommodation.available,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    editingAccommodation.available ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      editingAccommodation.available ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span
                  className={`text-xs ${
                    editingAccommodation.available ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {editingAccommodation.available ? 'Available' : 'Full'}
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accommodation;


// import { useState } from 'react';

// const Accommodation = () => {
//   const [accommodations, setAccommodations] = useState([
//     { id: 1, type: 'Deluxe Room', price: 2000, capacity: 2, amenities: 'AC, WiFi, Breakfast' },
//     { id: 2, type: 'Standard Room', price: 1500, capacity: 2, amenities: 'WiFi, Breakfast' },
//     { id: 3, type: 'Dormitory', price: 500, capacity: 6, amenities: 'Shared Bathroom' },
//   ]);

//   const [formData, setFormData] = useState({
//     type: '',
//     price: '',
//     capacity: '',
//     amenities: '',
//     description: '',
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setAccommodations([...accommodations, { id: Date.now(), ...formData }]);
//     setFormData({ type: '', price: '', capacity: '', amenities: '', description: '' });
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure?')) {
//       setAccommodations(accommodations.filter(a => a.id !== id));
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Accommodation Types</h1>
      
//       {/* Add Accommodation Form */}
//       <div className="bg-white rounded-lg shadow p-6 mb-6">
//         <h2 className="text-xl font-semibold mb-4">Add New Accommodation Type</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Type Name</label>
//             <input
//               type="text"
//               value={formData.type}
//               onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//               placeholder="e.g., Deluxe Room"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹ per night)</label>
//             <input
//               type="number"
//               value={formData.price}
//               onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Capacity (persons)</label>
//             <input
//               type="number"
//               value={formData.capacity}
//               onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
//             <input
//               type="text"
//               value={formData.amenities}
//               onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//               placeholder="e.g., AC, WiFi, Breakfast"
//             />
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//               rows="3"
//             />
//           </div>
//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//             >
//               Add Accommodation Type
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Accommodations List */}
//       <div className="bg-white rounded-lg shadow">
//         <div className="p-6 border-b">
//           <h2 className="text-xl font-semibold">All Accommodation Types</h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//           {accommodations.map((acc) => (
//             <div key={acc.id} className="border rounded-lg p-4 hover:shadow-lg transition">
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">{acc.type}</h3>
//               <div className="space-y-2 mb-4">
//                 <p className="text-2xl font-bold text-indigo-600">₹{acc.price} <span className="text-sm text-gray-500">/ night</span></p>
//                 <p className="text-sm text-gray-600">👥 Capacity: {acc.capacity} persons</p>
//                 <p className="text-sm text-gray-600">✨ {acc.amenities}</p>
//               </div>
//               <div className="flex gap-2">
//                 <button className="flex-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(acc.id)}
//                   className="flex-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Accommodation;
