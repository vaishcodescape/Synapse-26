import { useNavigate } from 'react-router-dom';

const Header = ({ toggleMobileMenu }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        {/* Mobile: Hamburger + Title */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Admin Dashboard</h2>
        </div>

        {/* Desktop: Title only */}
        <h2 className="hidden lg:block text-xl font-semibold text-gray-800">Admin Dashboard</h2>

        {/* User Info & Logout - Both Mobile & Desktop */}
        <div className="flex items-center gap-2 lg:gap-4">
          <span className="hidden sm:inline text-sm lg:text-base text-gray-600">Admin User</span>
          <button
            onClick={handleLogout}
            className="px-3 py-2 lg:px-4 text-sm lg:text-base bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
