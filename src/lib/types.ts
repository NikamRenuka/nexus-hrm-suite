
// User role types
export type UserRole = 'super_admin' | 'admin' | 'hr' | 'manager' | 'employee';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company_id?: string;
  employee_id?: string;
}

// Company interface
export interface Company {
  id: string;
  name: string;
  industry: string;
  logo_url?: string;
  status: 'active' | 'inactive';
}

// Department interface
export interface Department {
  id: string;
  name: string;
  company_id: string;
  description?: string;
}

// Designation interface
export interface Designation {
  id: string;
  title: string;
  department_id: string;
  level: number;
}

// Employee interface
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dob?: string;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  photo_url?: string;
  employee_code: string;
  type: 'full-time' | 'contract';
  department_id: string;
  designation_id: string;
  manager_id?: string;
  joining_date: string;
  status: 'active' | 'inactive' | 'resigned';
  company_id: string;
}

// Attendance record interface
export interface AttendanceRecord {
  id: string;
  employee_id: string;
  date: string;
  check_in_time?: string;
  check_out_time?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  method: 'manual' | 'geo' | 'qr' | 'ai';
  marked_by?: string; // employee_id of the person who marked attendance
  status: 'present' | 'absent' | 'late' | 'half-day';
}

// Leave request interface
export interface LeaveRequest {
  id: string;
  employee_id: string;
  leave_type: 'sick' | 'casual' | 'annual' | 'wfh' | 'other';
  start_date: string;
  end_date: string;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  applied_on: string;
  approved_by?: string;
}

// Dashboard stats interface
export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  onLeaveToday: number;
  newJoinees: number; // Last 30 days
  pendingLeaves: number;
  upcomingBirthdays: number;
}

// Sidebar navigation item interface
export interface SidebarItem {
  name: string;
  path: string;
  icon: string;
  children?: {
    name: string;
    path: string;
  }[];
  roles: UserRole[];
}

// Salary interface
export interface Salary {
  id: string;
  employee_id: string;
  month: number;
  year: number;
  gross_salary: number;
  net_salary: number;
  deductions: {
    tax?: number;
    pf?: number;
    esi?: number;
    other?: number;
  };
  status: 'processed' | 'paid';
}

// Salary component interface
export interface SalaryComponent {
  id: string;
  name: string;
  type: 'earning' | 'deduction';
  is_taxable: boolean;
  is_percentage: boolean;
  value: number; // either percentage or fixed amount
}

// Navigation routes grouped by role
export interface NavigationRoutes {
  [key: string]: SidebarItem[];
}
