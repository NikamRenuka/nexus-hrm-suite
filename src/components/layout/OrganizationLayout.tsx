
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const OrganizationLayout: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const links = [
    { path: '/organization/companies', label: 'Companies' },
    { path: '/organization/clients', label: 'Clients' },
    { path: '/organization/users', label: 'Users' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Organization Management</h1>
        <p className="text-muted-foreground">
          Manage companies, clients, and system users across the platform.
        </p>
      </div>
      
      <div className="border-b">
        <nav className="flex space-x-4">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 text-sm font-medium ${isActive(link.path) 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-muted-foreground hover:text-foreground'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default OrganizationLayout;
