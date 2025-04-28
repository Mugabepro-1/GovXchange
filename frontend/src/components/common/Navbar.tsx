import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path) ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Briefcase className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">JobSwap</span>
              </Link>
            </div>
            
            {/* Desktop navbar links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {isAuthenticated && user?.role === 'NORMALUSER' && (
                <>
                  <Link
                    to="/user-dashboard"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                      isActive('/user-dashboard') === 'text-primary-600'
                        ? 'border-primary-500'
                        : 'border-transparent'
                    } ${isActive('/user-dashboard')}`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/user-dashboard/profile"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                      isActive('/user-dashboard/profile') === 'text-primary-600'
                        ? 'border-primary-500'
                        : 'border-transparent'
                    } ${isActive('/user-dashboard/profile')}`}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/user-dashboard/swaps"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                      isActive('/user-dashboard/swaps') === 'text-primary-600'
                        ? 'border-primary-500'
                        : 'border-transparent'
                    } ${isActive('/user-dashboard/swaps')}`}
                  >
                    Swap Requests
                  </Link>
                </>
              )}
              
              {isAuthenticated && user?.role === 'ADMIN' && (
                <>
                  <Link
                    to="/admin-dashboard"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                      isActive('/admin-dashboard') === 'text-primary-600'
                        ? 'border-primary-500'
                        : 'border-transparent'
                    } ${isActive('/admin-dashboard')}`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin-dashboard/pending-swaps"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                      isActive('/admin-dashboard/pending-swaps') === 'text-primary-600'
                        ? 'border-primary-500'
                        : 'border-transparent'
                    } ${isActive('/admin-dashboard/pending-swaps')}`}
                  >
                    Pending Swaps
                  </Link>
                  <Link
                    to="/admin-dashboard/users"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                      isActive('/admin-dashboard/users') === 'text-primary-600'
                        ? 'border-primary-500'
                        : 'border-transparent'
                    } ${isActive('/admin-dashboard/users')}`}
                  >
                    Manage Users
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Desktop user menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center">
                <span className="text-sm text-gray-700 mr-4">
                  <User className="h-4 w-4 inline mr-1" />
                  {user?.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  icon={<LogOut className="h-4 w-4" />}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {isAuthenticated && user?.role === 'NORMALUSER' && (
            <>
              <Link
                to="/user-dashboard"
                className={`block pl-3 pr-4 py-2 border-l-4 ${
                  isActive('/user-dashboard') === 'text-primary-600'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-transparent'
                } ${isActive('/user-dashboard')} text-base font-medium`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/user-dashboard/profile"
                className={`block pl-3 pr-4 py-2 border-l-4 ${
                  isActive('/user-dashboard/profile') === 'text-primary-600'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-transparent'
                } ${isActive('/user-dashboard/profile')} text-base font-medium`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/user-dashboard/swaps"
                className={`block pl-3 pr-4 py-2 border-l-4 ${
                  isActive('/user-dashboard/swaps') === 'text-primary-600'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-transparent'
                } ${isActive('/user-dashboard/swaps')} text-base font-medium`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Swap Requests
              </Link>
            </>
          )}
          
          {isAuthenticated && user?.role === 'ADMIN' && (
            <>
              <Link
                to="/admin-dashboard"
                className={`block pl-3 pr-4 py-2 border-l-4 ${
                  isActive('/admin-dashboard') === 'text-primary-600'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-transparent'
                } ${isActive('/admin-dashboard')} text-base font-medium`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/admin-dashboard/pending-swaps"
                className={`block pl-3 pr-4 py-2 border-l-4 ${
                  isActive('/admin-dashboard/pending-swaps') === 'text-primary-600'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-transparent'
                } ${isActive('/admin-dashboard/pending-swaps')} text-base font-medium`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Pending Swaps
              </Link>
              <Link
                to="/admin-dashboard/users"
                className={`block pl-3 pr-4 py-2 border-l-4 ${
                  isActive('/admin-dashboard/users') === 'text-primary-600'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-transparent'
                } ${isActive('/admin-dashboard/users')} text-base font-medium`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Manage Users
              </Link>
            </>
          )}
          
          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className={`block pl-3 pr-4 py-2 border-l-4 ${
                  isActive('/login') === 'text-primary-600'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-transparent'
                } ${isActive('/login')} text-base font-medium`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`block pl-3 pr-4 py-2 border-l-4 ${
                  isActive('/register') === 'text-primary-600'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-transparent'
                } ${isActive('/register')} text-base font-medium`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile user menu */}
        {isAuthenticated && (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {user?.email}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user?.role === 'ADMIN' ? 'Administrator' : 'Normal User'}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign out
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;