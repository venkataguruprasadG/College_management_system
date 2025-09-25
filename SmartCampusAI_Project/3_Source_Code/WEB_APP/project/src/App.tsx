import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Colleges from './pages/Colleges';
import Courses from './pages/Courses';
import Assignments from './pages/Assignments';
import Analytics from './pages/Analytics';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

function App() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'colleges':
        return <Colleges />;
      case 'departments':
        return <div>Departments page coming soon...</div>;
      case 'courses':
        return <Courses />;
      case 'assignments':
        return <Assignments />;
      case 'attendance':
        return <div>Attendance page coming soon...</div>;
      case 'grades':
        return <div>Grades page coming soon...</div>;
      case 'users':
        return <div>User Management page coming soon...</div>;
      case 'analytics':
        return <Analytics />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="flex">
            <Sidebar
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              isOpen={sidebarOpen}
              setIsOpen={setSidebarOpen}
            />
            
            <div className="flex-1 flex flex-col min-h-screen">
              <Header isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
              
              <main className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">
                  {renderContent()}
                </div>
              </main>
            </div>
          </div>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;