
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SuperAdminDashboard from './dashboards/SuperAdminDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import HRDashboard from './dashboards/HRDashboard';
import ManagerDashboard from './dashboards/ManagerDashboard';
import EmployeeDashboard from './dashboards/EmployeeDashboard';
import { UserRole } from '@/lib/types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get user role from either query params (for testing) or from localStorage
  const queryParams = new URLSearchParams(location.search);
  const testRole = queryParams.get('role') as UserRole | null;
  
  // Retrieve user from localStorage or use default role
  const userStr = localStorage.getItem('hrmsUser');
  const user = userStr ? JSON.parse(userStr) : { role: testRole || 'hr' };
  
  // Redirect super_admin to the super admin dashboard
  useEffect(() => {
    if (user.role === 'super_admin' && location.pathname === '/dashboard') {
      navigate('/super-admin');
    }
  }, [user.role, location.pathname, navigate]);
  
  // Render dashboard based on user role
  const renderDashboard = () => {
    switch (user.role) {
      case 'super_admin':
        return <SuperAdminDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'hr':
        return <HRDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      case 'employee':
        return <EmployeeDashboard />;
      default:
        return <HRDashboard />; // Default to HR dashboard
    }
  };

  return renderDashboard();
};

export default Dashboard;
