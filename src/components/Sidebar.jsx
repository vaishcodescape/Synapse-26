import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();

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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-indigo-600 text-white transition-transform duration-300 ease-in-out z-50
          w-64
          lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-indigo-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎉</span>
            <h2 className="text-2xl font-bold">Synapse</h2>
          </div>
          <button
            onClick={closeMobileMenu}
            className="lg:hidden text-white hover:bg-indigo-700 p-2 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 overflow-y-auto h-[calc(100vh-160px)]">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                location.pathname === item.path
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-100 hover:bg-indigo-500'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-indigo-500">
          <button
            onClick={() => {
              localStorage.removeItem('isAuthenticated');
              window.location.href = '/login';
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;


// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const Sidebar = () => {
//   const location = useLocation();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const menuItems = [
//     { path: '/dashboard', icon: '📊', label: 'Dashboard' },
//     { path: '/events/categories', icon: '📁', label: 'Event Categories' },
//     { path: '/events', icon: '🎪', label: 'Events' },
//     { path: '/registrations', icon: '📝', label: 'Event Registrations' },
//     { path: '/users', icon: '👥', label: 'Users' },
//     { path: '/sponsors', icon: '🤝', label: 'Sponsors' },
//     { path: '/accommodation', icon: '🏨', label: 'Accommodation' },
//     { path: '/concerts', icon: '🎵', label: 'Concert Nights' },
//     { path: '/concerts/artists', icon: '🎤', label: 'Artists' },
//     { path: '/merchandise', icon: '👕', label: 'Merchandise' },
//     { path: '/merchandise/orders', icon: '🛒', label: 'Merchandise Orders' },
//   ];

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <>
//       {/* Mobile Header with Hamburger */}
//       <div className="lg:hidden fixed top-0 left-0 right-0 bg-indigo-600 text-white z-50 px-4 py-3 flex items-center justify-between shadow-lg">
//         <div className="flex items-center gap-2">
//           <span className="text-2xl">🎉</span>
//           <h2 className="text-xl font-bold">Synapse Admin</h2>
//         </div>
//         <button
//           onClick={toggleMobileMenu}
//           className="text-white focus:outline-none"
//           aria-label="Toggle menu"
//         >
//           {isMobileMenuOpen ? (
//             // Close Icon (X)
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           ) : (
//             // Hamburger Icon (Three Lines)
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* Overlay for Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={closeMobileMenu}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed top-0 left-0 h-screen bg-indigo-600 text-white transition-transform duration-300 ease-in-out z-50
//           w-64
//           lg:translate-x-0
//           ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
//         `}
//       >
//         {/* Sidebar Header - Hidden on Mobile (shown in top bar) */}
//         <div className="hidden lg:block p-6 border-b border-indigo-500">
//           <div className="flex items-center gap-2">
//             <span className="text-3xl">🎉</span>
//             <h2 className="text-2xl font-bold">Synapse Admin</h2>
//           </div>
//         </div>

//         {/* Mobile Header Inside Sidebar */}
//         <div className="lg:hidden p-6 border-b border-indigo-500 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <span className="text-3xl">🎉</span>
//             <h2 className="text-2xl font-bold">Synapse Admin</h2>
//           </div>
//           <button
//             onClick={closeMobileMenu}
//             className="text-white focus:outline-none"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Menu Items */}
//         <nav className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
//           {menuItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               onClick={closeMobileMenu}
//               className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
//                 location.pathname === item.path
//                   ? 'bg-indigo-700 text-white'
//                   : 'text-indigo-100 hover:bg-indigo-500'
//               }`}
//             >
//               <span className="text-xl">{item.icon}</span>
//               <span className="font-medium">{item.label}</span>
//             </Link>
//           ))}
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;
