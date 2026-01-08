import { useState } from 'react';

const Events = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Hackathon 2025',
      category: 'Technical',
      date: '2025-12-20',
      time: '10:00', // NEW
      rulebookLink: 'https://drive.google.com/...',
      imageUrl: '',
      registrationOpen: true,
      freeForDau: true, // DAU students free for this event
      venue: 'Auditorium A', // NEW
      participationCategories: {
        solo: { enabled: true, fee: 100 },
        duet: { enabled: true, fee: 200 },
        group: { enabled: false, fee: 500, minParticipants: 3, maxParticipants: 8 }, // Fixed team fee
      },
    },
    {
      id: 2,
      name: 'Dance Battle',
      category: 'Cultural',
      date: '2025-12-21',
      time: '18:30', // NEW
      rulebookLink: 'https://drive.google.com/...',
      imageUrl: '',
      registrationOpen: false,
      freeForDau: false, // normal charges for everyone
      venue: 'Main Stage', // NEW
      participationCategories: {
        solo: { enabled: true, fee: 150 },
        duet: { enabled: true, fee: 250 },
        group: { enabled: true, fee: 800, minParticipants: 4, maxParticipants: 10 }, // Fixed team fee
      },
    },
  ]);

  // Add form (top)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Technical',
    date: '',
    time: '', // NEW
    rulebookLink: '',
    description: '',
    venue: '', // NEW
  });

  // Edit modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const categories = ['Technical', 'Cultural', 'Sports'];

  // Add new event (simple)
  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents([
      ...events,
      {
        id: Date.now(),
        ...formData, // includes venue + time
        imageUrl: '',
        registrationOpen: true,
        freeForDau: false, // default: not free for DAU
        participationCategories: {
          solo: { enabled: false, fee: 0 },
          duet: { enabled: false, fee: 0 },
          group: { enabled: false, fee: 0, minParticipants: 3, maxParticipants: 8 },
        },
      },
    ]);
    setFormData({
      name: '',
      category: 'Technical',
      date: '',
      time: '', // reset
      rulebookLink: '',
      description: '',
      venue: '', // reset
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      setEvents(events.filter((e) => e.id !== id));
    }
  };

  const toggleRegistration = (id) => {
    setEvents(
      events.map((event) =>
        event.id === id
          ? { ...event, registrationOpen: !event.registrationOpen }
          : event
      )
    );
  };

  // Open edit modal
  const openEditModal = (event) => {
    setEditingEvent({ ...event }); // copy
    setIsEditOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingEvent(null);
    setIsEditOpen(false);
  };

  // Handle edit modal field changes
  const handleEditChange = (field, value) => {
    setEditingEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle participation category checkbox toggle
  const handleParticipationToggle = (type) => {
    setEditingEvent((prev) => ({
      ...prev,
      participationCategories: {
        ...prev.participationCategories,
        [type]: {
          ...prev.participationCategories[type],
          enabled: !prev.participationCategories[type].enabled,
        },
      },
    }));
  };

  // Handle participation fee change (fixed fee for all)
  const handleParticipationFeeChange = (type, fee) => {
    setEditingEvent((prev) => ({
      ...prev,
      participationCategories: {
        ...prev.participationCategories,
        [type]: {
          ...prev.participationCategories[type],
          fee: Number(fee), // Fixed fee for solo, duet, AND group (team)
        },
      },
    }));
  };

  // Handle group min/max participants change
  const handleGroupParticipantsChange = (field, value) => {
    setEditingEvent((prev) => ({
      ...prev,
      participationCategories: {
        ...prev.participationCategories,
        group: {
          ...prev.participationCategories.group,
          [field]: Number(value),
        },
      },
    }));
  };

  // Save changes from modal
  const handleEditSave = (e) => {
    e.preventDefault();
    setEvents((prev) =>
      prev.map((ev) => (ev.id === editingEvent.id ? editingEvent : ev))
    );
    closeEditModal();
  };

  // Get enabled categories for display
  const getEnabledCategories = (participationCategories, freeForDau) => {
    const enabled = [];
    if (participationCategories.solo.enabled)
      enabled.push(`Solo (₹${participationCategories.solo.fee})`);
    if (participationCategories.duet.enabled)
      enabled.push(`Duet (₹${participationCategories.duet.fee})`);
    if (participationCategories.group.enabled)
      enabled.push(
        `Group ${participationCategories.group.minParticipants}-${participationCategories.group.maxParticipants} (₹${participationCategories.group.fee} fixed)`
      );
    const base = enabled.length > 0 ? enabled.join(', ') : 'None';
    return freeForDau ? `${base} | DAU: Free` : base;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Events Management</h1>

      {/* Add Event Form (basic) */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
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

          {/* NEW Time field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* NEW Venue field */}
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
              placeholder="Auditorium A, Ground, etc."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Picture
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rulebook Google Drive Link
            </label>
            <input
              type="url"
              value={formData.rulebookLink}
              onChange={(e) =>
                setFormData({ ...formData, rulebookLink: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="https://drive.google.com/file/d/..."
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
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">All Events</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Registration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                {/* NEW Time column */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Time
                </th>
                {/* NEW Venue column */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Venue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Rulebook
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Participation Options
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  {/* Registration toggle */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleRegistration(event.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        event.registrationOpen ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          event.registrationOpen
                            ? 'translate-x-6'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span
                      className={`ml-2 text-xs ${
                        event.registrationOpen
                          ? 'text-green-600'
                          : 'text-gray-500'
                      }`}
                    >
                      {event.registrationOpen ? 'Open' : 'Closed'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-900">
                    {event.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {event.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {event.date}
                  </td>

                  {/* NEW Time cell */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {event.time}
                  </td>

                  {/* NEW Venue cell */}
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {event.venue}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {event.rulebookLink && (
                      <a
                        href={event.rulebookLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        View Rulebook
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {getEnabledCategories(
                      event.participationCategories,
                      event.freeForDau
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(event)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
              <h3 className="text-lg font-semibold">Edit Event</h3>
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
                  Event Name
                </label>
                <input
                  type="text"
                  value={editingEvent.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={editingEvent.category}
                    onChange={(e) =>
                      handleEditChange('category', e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => handleEditChange('date', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* NEW Time in edit modal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={editingEvent.time || ''}
                  onChange={(e) => handleEditChange('time', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* NEW Venue in edit modal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue
                </label>
                <input
                  type="text"
                  value={editingEvent.venue || ''}
                  onChange={(e) => handleEditChange('venue', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Auditorium A, Ground, etc."
                  required
                />
              </div>

              {/* Participation Categories with Checkboxes */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Participation Categories & Fees
                </h4>
                <p className="text-xs text-gray-500 mb-3">
                  Select allowed participation types and set their fixed registration fees.
                </p>

                {/* Solo */}
                <div className="flex items-center gap-4 mb-3 pb-3 border-b">
                  <input
                    type="checkbox"
                    id="solo"
                    checked={editingEvent.participationCategories.solo.enabled}
                    onChange={() => handleParticipationToggle('solo')}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <label
                    htmlFor="solo"
                    className="text-sm font-medium text-gray-700 w-32"
                  >
                    Solo (1 person)
                  </label>
                  {editingEvent.participationCategories.solo.enabled && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Fixed Fee:</span>
                      <input
                        type="number"
                        value={editingEvent.participationCategories.solo.fee}
                        onChange={(e) =>
                          handleParticipationFeeChange('solo', e.target.value)
                        }
                        className="w-24 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        min={0}
                      />
                      <span className="text-sm text-gray-600">₹</span>
                    </div>
                  )}
                </div>

                {/* Duet */}
                <div className="flex items-center gap-4 mb-3 pb-3 border-b">
                  <input
                    type="checkbox"
                    id="duet"
                    checked={editingEvent.participationCategories.duet.enabled}
                    onChange={() => handleParticipationToggle('duet')}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <label
                    htmlFor="duet"
                    className="text-sm font-medium text-gray-700 w-32"
                  >
                    Duet (2 persons)
                  </label>
                  {editingEvent.participationCategories.duet.enabled && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Fixed Fee:</span>
                      <input
                        type="number"
                        value={editingEvent.participationCategories.duet.fee}
                        onChange={(e) =>
                          handleParticipationFeeChange('duet', e.target.value)
                        }
                        className="w-24 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        min={0}
                      />
                      <span className="text-sm text-gray-600">₹</span>
                    </div>
                  )}
                </div>

                {/* Group/Team */}
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="group"
                    checked={editingEvent.participationCategories.group.enabled}
                    onChange={() => handleParticipationToggle('group')}
                    className="w-4 h-4 text-indigo-600 mt-1"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="group"
                      className="text-sm font-medium text-gray-700 block mb-2"
                    >
                      Team (Custom Range)
                    </label>
                    {editingEvent.participationCategories.group.enabled && (
                      <div className="bg-white border rounded-lg p-3 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">
                              Min Participants
                            </label>
                            <input
                              type="number"
                              value={
                                editingEvent.participationCategories.group
                                  .minParticipants
                              }
                              onChange={(e) =>
                                handleGroupParticipantsChange(
                                  'minParticipants',
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-1 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                              min={3}
                              max={
                                editingEvent.participationCategories.group
                                  .maxParticipants
                              }
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">
                              Max Participants
                            </label>
                            <input
                              type="number"
                              value={
                                editingEvent.participationCategories.group
                                  .maxParticipants
                              }
                              onChange={(e) =>
                                handleGroupParticipantsChange(
                                  'maxParticipants',
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-1 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                              min={
                                editingEvent.participationCategories.group
                                  .minParticipants
                              }
                              max={20}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            Fixed Team Fee:
                          </span>
                          <input
                            type="number"
                            value={
                              editingEvent.participationCategories.group.fee
                            }
                            onChange={(e) =>
                              handleParticipationFeeChange('group', e.target.value)
                            }
                            className="w-24 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            min={0}
                          />
                          <span className="text-sm text-gray-600">₹</span>
                        </div>
                        <p className="text-xs text-gray-500 italic">
                          Dropdown will show{' '}
                          {
                            editingEvent.participationCategories.group
                              .minParticipants
                          }{' '}
                          to{' '}
                          {
                            editingEvent.participationCategories.group
                              .maxParticipants
                          }{' '}
                          participants. <strong>Fee is FIXED regardless of team size.</strong>
                        </p>
                        <p className="text-xs text-green-600">
                          Example: Team of{' '}
                          {
                            editingEvent.participationCategories.group
                              .minParticipants
                          }
                          -
                          {
                            editingEvent.participationCategories.group
                              .maxParticipants
                          }{' '}
                          = ₹
                          {editingEvent.participationCategories.group.fee} (fixed)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Rulebook + Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rulebook Google Drive Link
                </label>
                <input
                  type="url"
                  value={editingEvent.rulebookLink}
                  onChange={(e) =>
                    handleEditChange('rulebookLink', e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://drive.google.com/file/d/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editingEvent.description || ''}
                  onChange={(e) =>
                    handleEditChange('description', e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                />
              </div>

              {/* Registration Toggle inside modal */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-sm font-medium text-gray-700">
                  Allow Registrations
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleEditChange(
                      'registrationOpen',
                      !editingEvent.registrationOpen
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    editingEvent.registrationOpen
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      editingEvent.registrationOpen
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
                <span
                  className={`text-xs ${
                    editingEvent.registrationOpen
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}
                >
                  {editingEvent.registrationOpen ? 'Open' : 'Closed'}
                </span>
              </div>

              {/* Free for DAU toggle */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-sm font-medium text-gray-700">
                  Free for DAU Students (@dau.ac.in)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleEditChange('freeForDau', !editingEvent.freeForDau)
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    editingEvent.freeForDau ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      editingEvent.freeForDau
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
                <span
                  className={`text-xs ${
                    editingEvent.freeForDau
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}
                >
                  {editingEvent.freeForDau ? 'DAU Free' : 'Normal Charges'}
                </span>
              </div>

              {/* Buttons */}
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

export default Events;
