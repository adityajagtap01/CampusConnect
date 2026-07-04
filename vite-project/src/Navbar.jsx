import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from './services/atom';

const Navbar = () => {
  const navigate = useNavigate();
  const {logout}=useUserStore();
  const handleLogout = async() => {
    // Clear user session (example)
    await logout()
    localStorage.removeItem('token');
    navigate('/login');
  };

  const CustomButton = ({ onClick, children }) => (
    <button
      onClick={onClick}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
    >
      {children}
    </button>
  );

  return (
    <nav className="bg-black text-white p-4 shadow-lg ">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight">🚀 Company Portal</h1>
        <div className="flex space-x-8 items-center">
          <Link to="/" className="hover:underline text-lg font-medium transition duration-300 hover:text-gray-400">
            Home
          </Link>
          <Link to="/user/upload" className="hover:underline text-lg font-medium transition duration-300 hover:text-gray-400">
            Update Details
          </Link>
          <Link to="/tnp" className="hover:underline text-lg font-medium transition duration-300 hover:text-gray-400">
            TNP
          </Link>
          <CustomButton onClick={handleLogout}>Logout</CustomButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;