
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'hr' | 'manager' | 'employee';
  company: string;
  lastLogin: string;
  isActive: boolean;
}

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@acme.com',
    role: 'admin',
    company: 'Acme Corporation',
    lastLogin: '2023-05-18 09:23:12',
    isActive: true
  },
  {
    id: '2',
    name: 'Sarah Miller',
    email: 'hr@globex.com',
    role: 'hr',
    company: 'Globex Industries',
    lastLogin: '2023-05-17 14:45:30',
    isActive: true
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'manager@stark.io',
    role: 'manager',
    company: 'Stark Innovations',
    lastLogin: '2023-05-16 08:12:55',
    isActive: true
  },
  {
    id: '4',
    name: 'Emily Clark',
    email: 'employee@wayne.co',
    role: 'employee',
    company: 'Wayne Enterprises',
    lastLogin: '2023-05-15 17:30:22',
    isActive: false
  },
  {
    id: '5',
    name: 'System Administrator',
    email: 'superadmin@system.com',
    role: 'super_admin',
    company: 'System Admin',
    lastLogin: '2023-05-18 11:05:45',
    isActive: true
  }
];
