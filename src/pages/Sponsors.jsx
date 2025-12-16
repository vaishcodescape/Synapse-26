import { useState } from 'react';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([
    { id: 1, name: 'Tech Corp', tier: 'Platinum', website: 'https://techcorp.com', logoUrl: '' },
    { id: 2, name: 'Innovation Labs', tier: 'Gold', website: 'https://innovlabs.com', logoUrl: '' },
    { id: 3, name: 'Start Hub', tier: 'Silver', website: 'https://starthub.com', logoUrl: '' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    tier: 'Platinum',
    customTier: '',
    website: '',
  });

  // Edit modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState(null);

  const tiers = ['Platinum', 'Gold', 'Silver', 'Bronze', 'Other'];
  const predefinedTiers = ['Platinum', 'Gold', 'Silver', 'Bronze'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalTier = formData.tier === 'Other' ? formData.customTier : formData.tier;
    setSponsors([...sponsors, { 
      id: Date.now(), 
      name: formData.name,
      tier: finalTier,
      website: formData.website,
      logoUrl: '' 
    }]);
    setFormData({ name: '', tier: 'Platinum', customTier: '', website: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this sponsor?')) {
      setSponsors(sponsors.filter(s => s.id !== id));
    }
  };

  // Open edit modal
  const openEditModal = (sponsor) => {
    // Check if tier is a predefined one or custom
    const isCustomTier = !predefinedTiers.includes(sponsor.tier);
    
    setEditingSponsor({
      ...sponsor,
      tier: isCustomTier ? 'Other' : sponsor.tier,
      customTier: isCustomTier ? sponsor.tier : '',
    });
    setIsEditOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingSponsor(null);
    setIsEditOpen(false);
  };

  // Handle edit save
  const handleEditSave = (e) => {
    e.preventDefault();
    const finalTier = editingSponsor.tier === 'Other' ? editingSponsor.customTier : editingSponsor.tier;
    
    setSponsors(sponsors.map(sponsor =>
      sponsor.id === editingSponsor.id
        ? { ...sponsor, name: editingSponsor.name, tier: finalTier, website: editingSponsor.website }
        : sponsor
    ));
    closeEditModal();
  };

  const getTierColor = (tier) => {
    const colors = {
      Platinum: 'bg-gray-200 text-gray-800',
      Gold: 'bg-yellow-100 text-yellow-800',
      Silver: 'bg-gray-100 text-gray-700',
      Bronze: 'bg-orange-100 text-orange-800',
    };
    return colors[tier] || 'bg-blue-100 text-blue-800'; // Default for custom tiers
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Sponsors Management</h1>
      
      {/* Add Sponsor Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Sponsor</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sponsor Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tier</label>
            <select
              value={formData.tier}
              onChange={(e) => setFormData({ ...formData, tier: e.target.value, customTier: '' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {tiers.map(tier => <option key={tier}>{tier}</option>)}
            </select>
          </div>
          
          {/* Custom Tier Input - Only shows when "Other" is selected */}
          {formData.tier === 'Other' && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom Tier Name</label>
              <input
                type="text"
                value={formData.customTier}
                onChange={(e) => setFormData({ ...formData, customTier: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter custom tier name (e.g., Diamond, Supporter)"
                required
              />
            </div>
          )}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="https://example.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo Upload</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Sponsor
            </button>
          </div>
        </form>
      </div>

      {/* Sponsors Grid */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">All Sponsors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">{sponsor.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTierColor(sponsor.tier)}`}>
                  {sponsor.tier}
                </span>
              </div>
              {sponsor.website && (
                <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline block mb-3">
                  {sponsor.website}
                </a>
              )}
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => openEditModal(sponsor)}
                  className="flex-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(sponsor.id)}
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
      {isEditOpen && editingSponsor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Edit Sponsor</h3>
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
                  Sponsor Name
                </label>
                <input
                  type="text"
                  value={editingSponsor.name}
                  onChange={(e) =>
                    setEditingSponsor({ ...editingSponsor, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tier
                </label>
                <select
                  value={editingSponsor.tier}
                  onChange={(e) =>
                    setEditingSponsor({ ...editingSponsor, tier: e.target.value, customTier: '' })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  {tiers.map((tier) => (
                    <option key={tier}>{tier}</option>
                  ))}
                </select>
              </div>

              {/* Custom Tier Input for Edit */}
              {editingSponsor.tier === 'Other' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Tier Name
                  </label>
                  <input
                    type="text"
                    value={editingSponsor.customTier}
                    onChange={(e) =>
                      setEditingSponsor({ ...editingSponsor, customTier: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter custom tier name"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={editingSponsor.website}
                  onChange={(e) =>
                    setEditingSponsor({ ...editingSponsor, website: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Upload
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
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

export default Sponsors;



// import { useState } from 'react';

// const Sponsors = () => {
//   const [sponsors, setSponsors] = useState([
//     { id: 1, name: 'Tech Corp', tier: 'Platinum', website: 'https://techcorp.com', logoUrl: '' },
//     { id: 2, name: 'Innovation Labs', tier: 'Gold', website: 'https://innovlabs.com', logoUrl: '' },
//     { id: 3, name: 'Start Hub', tier: 'Silver', website: 'https://starthub.com', logoUrl: '' },
//   ]);

//   const [formData, setFormData] = useState({
//     name: '',
//     tier: 'Platinum',
//     website: '',
//     description: '',
//   });

//   const tiers = ['Platinum', 'Gold', 'Silver', 'Bronze'];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSponsors([...sponsors, { id: Date.now(), ...formData, logoUrl: '' }]);
//     setFormData({ name: '', tier: 'Platinum', website: '', description: '' });
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure?')) {
//       setSponsors(sponsors.filter(s => s.id !== id));
//     }
//   };

//   const getTierColor = (tier) => {
//     const colors = {
//       Platinum: 'bg-gray-200 text-gray-800',
//       Gold: 'bg-yellow-100 text-yellow-800',
//       Silver: 'bg-gray-100 text-gray-700',
//       Bronze: 'bg-orange-100 text-orange-800',
//     };
//     return colors[tier] || 'bg-gray-100';
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Sponsors Management</h1>
      
//       {/* Add Sponsor Form */}
//       <div className="bg-white rounded-lg shadow p-6 mb-6">
//         <h2 className="text-xl font-semibold mb-4">Add New Sponsor</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Sponsor Name</label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Tier</label>
//             <select
//               value={formData.tier}
//               onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//             >
//               {tiers.map(tier => <option key={tier}>{tier}</option>)}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
//             <input
//               type="url"
//               value={formData.website}
//               onChange={(e) => setFormData({ ...formData, website: e.target.value })}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//               placeholder="https://example.com"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Logo Upload</label>
//             <input
//               type="file"
//               accept="image/*"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
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
//               Add Sponsor
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Sponsors Grid */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-xl font-semibold mb-4">All Sponsors</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {sponsors.map((sponsor) => (
//             <div key={sponsor.id} className="border rounded-lg p-4 hover:shadow-lg transition">
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="text-lg font-semibold">{sponsor.name}</h3>
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTierColor(sponsor.tier)}`}>
//                   {sponsor.tier}
//                 </span>
//               </div>
//               {sponsor.website && (
//                 <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline block mb-3">
//                   {sponsor.website}
//                 </a>
//               )}
//               <div className="flex gap-2 mt-4">
//                 <button className="flex-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(sponsor.id)}
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

// export default Sponsors;
