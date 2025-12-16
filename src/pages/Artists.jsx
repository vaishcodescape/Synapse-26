import { useState } from 'react';

const Artists = () => {
  const [artists, setArtists] = useState([
    { 
      id: 1, 
      name: 'DJ Shadow', 
      concertNight: 'Night 1 - EDM Night', 
      genre: 'EDM', 
      revealDate: '2025-12-18',
      bio: 'International EDM artist'
    },
    { 
      id: 2, 
      name: 'The Rock Band', 
      concertNight: 'Night 2 - Rock Night', 
      genre: 'Rock', 
      revealDate: '2025-12-20',
      bio: 'Famous rock band from India'
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    concertNight: 'Night 1 - EDM Night',
    genre: '',
    revealDate: '',
    bio: '',
  });

  const concerts = ['Night 1 - EDM Night', 'Night 2 - Rock Night'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setArtists([...artists, { id: Date.now(), ...formData }]);
    setFormData({ name: '', concertNight: 'Night 1 - EDM Night', genre: '', revealDate: '', bio: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      setArtists(artists.filter(a => a.id !== id));
    }
  };

  const isRevealed = (revealDate) => {
    return new Date(revealDate) <= new Date();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Artists Management</h1>
      
      {/* Add Artist Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Artist</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Artist Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Concert Night</label>
            <select
              value={formData.concertNight}
              onChange={(e) => setFormData({ ...formData, concertNight: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {concerts.map(concert => <option key={concert}>{concert}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
            <input
              type="text"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., EDM, Rock, Pop"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reveal Date</label>
            <input
              type="date"
              value={formData.revealDate}
              onChange={(e) => setFormData({ ...formData, revealDate: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Artist Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows="3"
              placeholder="Artist biography..."
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Artist
            </button>
          </div>
        </form>
      </div>

      {/* Artists List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">All Artists</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Artist</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Concert Night</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Genre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reveal Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {artists.map((artist) => (
                <tr key={artist.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{artist.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{artist.concertNight}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{artist.genre}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{artist.revealDate}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      isRevealed(artist.revealDate)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {isRevealed(artist.revealDate) ? '👁️ Visible' : '🔒 Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDelete(artist.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Artists;
