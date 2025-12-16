import { useState } from 'react';

const Merchandise = () => {
  const [merchandise, setMerchandise] = useState([
    {
      id: 1,
      name: 'Synapse T-Shirt',
      price: 500,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      imageUrl: '',
      available: true,
      description: 'Official Synapse fest t-shirt',
    },
    {
      id: 2,
      name: 'Synapse Hoodie',
      price: 1200,
      sizes: ['M', 'L', 'XL'],
      imageUrl: '',
      available: true,
      description: 'Premium quality hoodie',
    },
    {
      id: 3,
      name: 'Synapse Cap',
      price: 300,
      sizes: ['Free Size'],
      imageUrl: '',
      available: false,
      description: 'Stylish festival cap',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    sizes: [],
    description: '',
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingMerchandise, setEditingMerchandise] = useState(null);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Free Size'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.sizes.length === 0) {
      alert('Please select at least one size');
      return;
    }
    setMerchandise([
      ...merchandise,
      {
        id: Date.now(),
        ...formData,
        imageUrl: '',
        available: true,
      },
    ]);
    setFormData({ name: '', price: '', sizes: [], description: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this merchandise?')) {
      setMerchandise(merchandise.filter((m) => m.id !== id));
    }
  };

  const toggleAvailability = (id) => {
    setMerchandise(
      merchandise.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  const openEditModal = (item) => {
    setEditingMerchandise({ ...item });
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setEditingMerchandise(null);
    setIsEditOpen(false);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    if (editingMerchandise.sizes.length === 0) {
      alert('Please select at least one size');
      return;
    }
    setMerchandise(
      merchandise.map((item) =>
        item.id === editingMerchandise.id ? editingMerchandise : item
      )
    );
    closeEditModal();
  };

  const toggleSize = (size, isEditing = false) => {
    if (isEditing) {
      const currentSizes = editingMerchandise.sizes;
      const newSizes = currentSizes.includes(size)
        ? currentSizes.filter((s) => s !== size)
        : [...currentSizes, size];
      setEditingMerchandise({ ...editingMerchandise, sizes: newSizes });
    } else {
      const currentSizes = formData.sizes;
      const newSizes = currentSizes.includes(size)
        ? currentSizes.filter((s) => s !== size)
        : [...currentSizes, size];
      setFormData({ ...formData, sizes: newSizes });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Merchandise Management
      </h1>

      {/* Add Merchandise Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Merchandise</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Synapse T-Shirt"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Product price"
              required
            />
          </div>

          {/* Sizes Selection */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Sizes (Select multiple)
            </label>
            <div className="flex flex-wrap gap-2">
              {allSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-2 rounded-lg border-2 transition ${
                    formData.sizes.includes(size)
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Selected: {formData.sizes.join(', ') || 'None'}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows="3"
              placeholder="Product details, material, design info, etc."
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Merchandise
            </button>
          </div>
        </form>
      </div>

      {/* Merchandise Grid */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">All Merchandise</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {merchandise.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              {/* Availability Toggle */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <button
                  onClick={() => toggleAvailability(item.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    item.available ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      item.available ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${
                  item.available
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {item.available ? '✓ In Stock' : '✗ Out of Stock'}
              </span>

              <div className="space-y-2 mb-4">
                <p className="text-2xl font-bold text-indigo-600">₹{item.price}</p>
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-1">Available Sizes:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-2">
                    📝 {item.description}
                  </p>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openEditModal(item)}
                  className="flex-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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
      {isEditOpen && editingMerchandise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
              <h3 className="text-lg font-semibold">Edit Merchandise</h3>
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
                  Product Name
                </label>
                <input
                  type="text"
                  value={editingMerchandise.name}
                  onChange={(e) =>
                    setEditingMerchandise({
                      ...editingMerchandise,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={editingMerchandise.price}
                  onChange={(e) =>
                    setEditingMerchandise({
                      ...editingMerchandise,
                      price: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Sizes Selection in Edit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size, true)}
                      className={`px-4 py-2 rounded-lg border-2 transition ${
                        editingMerchandise.sizes.includes(size)
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {editingMerchandise.sizes.join(', ') || 'None'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editingMerchandise.description}
                  onChange={(e) =>
                    setEditingMerchandise({
                      ...editingMerchandise,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                />
              </div>

              {/* Availability Toggle in Modal */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-sm font-medium text-gray-700">
                  Stock Status
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setEditingMerchandise({
                      ...editingMerchandise,
                      available: !editingMerchandise.available,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    editingMerchandise.available ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      editingMerchandise.available
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
                <span
                  className={`text-xs ${
                    editingMerchandise.available
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {editingMerchandise.available ? 'In Stock' : 'Out of Stock'}
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

export default Merchandise;
