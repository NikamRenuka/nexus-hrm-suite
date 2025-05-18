
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockUser } from '@/lib/mockData';
import { navRoutes, iconMapping } from '@/lib/mockData';
import { SidebarItem } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const user = mockUser;
  
  // Get routes for current user role
  const routes = navRoutes[user.role as keyof typeof navRoutes] || [];
  
  // Track expanded menu items
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (name: string) => {
    setExpanded(current => 
      current.includes(name) 
        ? current.filter(item => item !== name) 
        : [...current, name]
    );
  };

  // Check if a route is active
  const isRouteActive = (path: string) => {
    return location.pathname === path ||
      location.pathname.startsWith(`${path}/`);
  };

  // Render sidebar items
  const renderNavItem = (item: SidebarItem) => {
    const isActive = isRouteActive(item.path);
    const isExpandable = item.children && item.children.length > 0;
    const isExpanded = expanded.includes(item.name);
    const Icon = iconMapping[item.icon] || iconMapping.Layout;

    return (
      <div key={item.path} className="mb-1">
        <div
          className={cn(
            "hrms-sidebar-link cursor-pointer",
            isActive && !isExpandable && "hrms-sidebar-link-active"
          )}
          onClick={() => isExpandable ? toggleExpand(item.name) : null}
        >
          <Link 
            to={isExpandable ? "#" : item.path}
            className="flex items-center w-full"
            onClick={(e) => {
              if (isExpandable) {
                e.preventDefault();
              }
            }}
          >
            <Icon className="h-5 w-5 mr-2" />
            <span className="flex-1">{item.name}</span>
            {isExpandable && (
              <div className="ml-auto">
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
            )}
          </Link>
        </div>

        {/* Render children if expanded */}
        {isExpandable && isExpanded && (
          <div className="pl-8 mt-1 space-y-1">
            {item.children?.map((child) => (
              <Link 
                key={child.path}
                to={child.path}
                className={cn(
                  "hrms-sidebar-link text-sm",
                  isRouteActive(child.path) && "hrms-sidebar-link-active"
                )}
              >
                <span>{child.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside 
      className={cn(
        "fixed top-0 left-0 h-full bg-hrms-primary text-white z-30 transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-0 lg:w-16",
        "overflow-hidden"
      )}
    >
      <div className="flex items-center justify-between p-4 h-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-white text-hrms-primary flex items-center justify-center font-bold">
            HR
          </div>
          {isOpen && <span className="font-semibold text-lg">HRMS</span>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {routes.map(renderNavItem)}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10 mt-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start text-white hover:bg-white/10 hover:text-white"
        >
          <LogOut size={18} className="mr-2" />
          {isOpen && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
