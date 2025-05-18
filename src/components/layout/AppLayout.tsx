
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const AppLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  
  // Close sidebar on mobile when route changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main content area */}
      <div 
        className="flex-1 flex flex-col transition-all duration-300"
        style={{
          marginLeft: isSidebarOpen ? (window.innerWidth >= 1024 ? '16rem' : '0') : '0',
        }}
      >
        {/* Header */}
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
