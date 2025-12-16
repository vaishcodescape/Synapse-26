import { useState } from 'react';

const Concerts = () => {
  const [concerts, setConcerts] = useState([
    { id: 1, name: 'Night 1 - EDM Night', date: '2025-12-22', venue: 'Main Ground', timing: '7:00 PM - 11:00 PM' },
    { id: 2, name: 'Night 2 - Rock Night', date: '2025-12-23', venue: 'Main Ground', timing: '7:00 PM - 11:00 PM' },
  ]);

  const [formData, setFormData] = useState({
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
      setConcerts(concerts.filter(c => c.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Concert Nights</h1>
      
      {/* Add Concert Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Concert Night</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Concert Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Night 1 - EDM Night"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
            <input
              type="text"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timing</label>
            <input
              type="text"
              value={formData.timing}
              onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
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
            <div key={concert.id} className="border rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{concert.name}</h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>📅 {concert.date}</p>
                    <p>📍 {concert.venue}</p>
                    <p>🕐 {concert.timing}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
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
    </div>
  );
};

export default Concerts;
