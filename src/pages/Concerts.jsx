import { useState } from 'react';

const Concerts = () => {
  const [concerts, setConcerts] = useState([
    {
      id: 1,
      name: 'Night 1 - EDM Night',
      date: '2025-12-22',
      venue: 'Main Ground',
      timing: '7:00 PM - 11:00 PM',
    },
    {
      id: 2,
      name: 'Night 2 - Rock Night',
      date: '2025-12-23',
      venue: 'Main Ground',
      timing: '7:00 PM - 11:00 PM',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    venue: '',
    timing: '',
  });

  // Edit modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    date: '',
    venue: '',
    timing: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setConcerts([...concerts, { id: Date.now(), ...formData }]);
    setFormData({ name: '', date: '', venue: '', timing: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      setConcerts(concerts.filter((c) => c.id !== id));
    }
  };

  const handleEditClick = (concert) => {
    setEditingId(concert.id);
    setEditData({
      name: concert.name,
      date: concert.date,
      venue: concert.venue,
      timing: concert.timing,
    });
    setIsEditOpen(true);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    setConcerts((prev) =>
      prev.map((c) =>
        c.id === editingId ? { ...c, ...editData } : c
      )
    );
    setIsEditOpen(false);
    setEditingId(null);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditingId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Concert Nights</h1>

      {/* Add Concert Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Concert Night</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Concert Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Night 1 - EDM Night"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue
            </label>
            <input
              type="text"
              value={formData.venue}
              onChange={(e) =>
                setFormData({ ...formData, venue: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timing
            </label>
            <input
              type="text"
              value={formData.timing}
              onChange={(e) =>
                setFormData({ ...formData, timing: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 7:00 PM - 11:00 PM"
              required
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Concert Night
            </button>
          </div>
        </form>
      </div>

      {/* Concerts List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">All Concert Nights</h2>
        </div>
        <div className="p-6 space-y-4">
          {concerts.map((concert) => (
            <div
              key={concert.id}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {concert.name}
                  </h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>📅 {concert.date}</p>
                    <p>📍 {concert.venue}</p>
                    <p>🕐 {concert.timing}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(concert)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(concert.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 relative">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Edit Concert Night</h2>
              <button
                onClick={handleEditClose}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Body / Form */}
            <form onSubmit={handleEditSave} className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Concert Name
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={editData.date}
                  onChange={(e) =>
                    setEditData({ ...editData, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Venue
                </label>
                <input
                  type="text"
                  value={editData.venue}
                  onChange={(e) =>
                    setEditData({ ...editData, venue: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timing
                </label>
                <input
                  type="text"
                  value={editData.timing}
                  onChange={(e) =>
                    setEditData({ ...editData, timing: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 7:00 PM - 11:00 PM"
                  required
                />
              </div>

              {/* Footer buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleEditClose}
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

export default Concerts;
