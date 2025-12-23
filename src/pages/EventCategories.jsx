import { useState } from 'react';

const EventCategories = () => {
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: 'Technical', 
      description: 'Coding, Robotics, Hackathons', 
      eventCount: 5,
      imageUrl: '',
    },
    { 
      id: 2, 
      name: 'Cultural', 
      description: 'Dance, Music, Drama', 
      eventCount: 4,
      imageUrl: '',
    },
    { 
      id: 3, 
      name: 'Sports', 
      description: 'Gaming, E-sports', 
      eventCount: 3,
      imageUrl: '',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [previewImage, setPreviewImage] = useState(null); // local preview
  const [editingId, setEditingId] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreviewImage(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setCategories(categories.map(cat =>
        cat.id === editingId
          ? { ...cat, ...formData, imageUrl: previewImage || cat.imageUrl }
          : cat
      ));
      setEditingId(null);
    } else {
      setCategories([
        ...categories,
        {
          id: Date.now(),
          ...formData,
          eventCount: 0,
          imageUrl: previewImage || '',
        },
      ]);
    }

    setFormData({ name: '', description: '' });
    setPreviewImage(null);
    // optionally clear file input using ref if you want
  };

  const handleEdit = (category) => {
    setFormData({ name: category.name, description: category.description });
    setPreviewImage(category.imageUrl || null);
    setEditingId(category.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', description: '' });
    setPreviewImage(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Event Categories</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Edit Category' : 'Add New Category'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  required
                />
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100
                    border border-gray-300 rounded-lg cursor-pointer"
                />
                {previewImage && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Preview:</p>
                    <img
                      src={previewImage}
                      alt="Category preview"
                      className="h-24 w-24 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                {editingId ? 'Update Category' : 'Add Category'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">All Categories</h2>
            </div>
            <div className="p-6 space-y-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="border rounded-lg p-4 hover:shadow-md transition flex gap-4"
                >
                  {/* Image thumbnail */}
                  {category.imageUrl ? (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="h-16 w-16 rounded-md object-cover border"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-400 border">
                      No Image
                    </div>
                  )}

                  <div className="flex-1 flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {category.description}
                      </p>
                      <p className="text-sm text-indigo-600 mt-2">
                        {category.eventCount} events
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {categories.length === 0 && (
                <p className="text-sm text-gray-500">No categories yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCategories;
