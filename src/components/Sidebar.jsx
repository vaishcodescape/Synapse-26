import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/events/categories', icon: '📁', label: 'Event Categories' },
    { path: '/events', icon: '🎪', label: 'Events' },
    { path: '/registrations', icon: '📝', label: 'Event Registrations' },
    { path: '/users', icon: '👥', label: 'Users' },
    { path: '/sponsors', icon: '🤝', label: 'Sponsors' },
    { path: '/accommodation', icon: '🏨', label: 'Accommodation' },
    { path: '/concerts', icon: '🎵', label: 'Concert Nights' },
    { path: '/concerts/artists', icon: '🎤', label: 'Artists' },
    { path: '/merchandise', icon: '👕', label: 'Merchandise' },
  { path: '/merchandise/orders', icon: '🛒', label: 'Merchandise Orders' },

  ];

  return (
    <div className="w-64 bg-black text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold">SYNAPSE</h1>
        <p className="text-sm text-indigo-300">Admin Panel</p>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition ${
                isActive ? 'bg-gray-800 text-white border-l-4 border-indigo-400' : ''
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
