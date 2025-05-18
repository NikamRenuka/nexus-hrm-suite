
import React, { useState } from 'react';
import { Bell, Search, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { mockUser } from '@/lib/mockData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const user = mockUser;
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  });

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 md:px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="hrms-icon-button lg:hidden"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        <div className="hidden md:block">
          <h2 className="text-xl font-medium">
            {greeting}, <span className="text-hrms-primary">{user.name}</span>
          </h2>
          <p className="text-sm text-gray-500">Logged in as {user.role.replace('_', ' ').toUpperCase()}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden md:block">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-hrms-primary/20 w-40 lg:w-64"
          />
        </div>

        <Button variant="ghost" size="icon" className="hrms-icon-button relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative p-0 h-auto border-0">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Help</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
