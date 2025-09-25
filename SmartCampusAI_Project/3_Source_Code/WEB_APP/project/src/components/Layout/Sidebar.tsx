import React from 'react';
import { 
  Home, 
  Users, 
  BookOpen, 
  GraduationCap, 
  ClipboardList,
  Calendar,
  Bell,
  Settings,
  Building2,
  BarChart3,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem, isOpen, setIsOpen }) => {
  const { user } = useAuth();

  const getMenuItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'notifications', label: 'Notifications', icon: Bell }
    ];

    const adminItems = [
      { id: 'colleges', label: 'Colleges', icon: Building2 },
      { id: 'departments', label: 'Departments', icon: GraduationCap },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'users', label: 'User Management', icon: Users }
    ];

    const staffItems = [
      { id: 'courses', label: 'My Courses', icon: BookOpen },
      { id: 'assignments', label: 'Assignments', icon: ClipboardList },
      { id: 'attendance', label: 'Attendance', icon: Calendar }
    ];

    const studentItems = [
      { id: 'courses', label: 'My Courses', icon: BookOpen },
      { id: 'assignments', label: 'Assignments', icon: ClipboardList },
      { id: 'grades', label: 'Grades', icon: BarChart3 }
    ];

    let items = [...commonItems];
    
    if (user?.role === 'admin') {
      items.push(...adminItems);
    } else if (user?.role === 'staff') {
      items.push(...staffItems);
    } else if (user?.role === 'student') {
      items.push(...studentItems);
    }

    items.push({ id: 'settings', label: 'Settings', icon: Settings });

    return items;
  };

  const menuItems = getMenuItems();

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:shadow-none
      `}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            EduManage
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200
                  ${activeItem === item.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;