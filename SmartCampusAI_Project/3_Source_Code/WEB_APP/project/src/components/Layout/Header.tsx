import React from 'react';
import { Menu, Sun, Moon, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { sampleUsers } from '../../contexts/AuthContext';

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isOpen, setIsOpen }) => {
  const { user, logout, login } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const switchUser = () => {
    const currentIndex = sampleUsers.findIndex(u => u.id === user?.id);
    const nextIndex = (currentIndex + 1) % sampleUsers.length;
    login(sampleUsers[nextIndex]);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
          >
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Welcome back, {user?.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {user?.role} Dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          <button
            onClick={switchUser}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Switch User (Demo)"
          >
            <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
              Switch User
            </span>
          </button>

          <div className="flex items-center space-x-3">
            {user?.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            )}
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;