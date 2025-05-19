
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Building, Shield, Settings, BarChart, Headset, AppWindow } from 'lucide-react';

const SuperAdminLayout: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  const sections = [
    { 
      path: '/organization', 
      label: 'Organization', 
      icon: Building,
      description: 'Manage companies, clients, and users.'
    },
    { 
      path: '/security', 
      label: 'Security', 
      icon: Shield,
      description: 'Monitor system security and access controls.'
    },
    { 
      path: '/applications', 
      label: 'Applications', 
      icon: AppWindow,
      description: 'Manage system applications and integrations.'
    },
    { 
      path: '/support', 
      label: 'Support', 
      icon: Headset,
      description: 'Provide support for platform clients.'
    },
    { 
      path: '/super-admin/reports', 
      label: 'Reports', 
      icon: BarChart,
      description: 'View and generate system-wide reports.'
    },
    { 
      path: '/super-admin/settings', 
      label: 'Settings', 
      icon: Settings,
      description: 'Configure system-wide settings.'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage all aspects of the platform across all organizations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className={`p-4 border rounded-lg hover:shadow transition-shadow ${
              isActive(section.path) ? 'border-primary bg-primary/5' : ''
            }`}
          >
            <div className="flex items-center">
              <section.icon className="h-5 w-5 mr-2 text-primary" />
              <span className="font-medium">{section.label}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {section.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdminLayout;
