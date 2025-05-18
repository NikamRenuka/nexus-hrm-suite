
import { User, Employee, Department, Designation, AttendanceRecord, LeaveRequest, DashboardStats, NavigationRoutes, Company, Salary } from "./types";
import { 
  Users, Building2, CalendarDays, BarChart3, FileText, Settings,
  UserPlus, UserCog, Briefcase, CircleDollarSign, Calendar, ClipboardList,
  LineChart, Shield, Layout, HelpCircle, Building
} from "lucide-react";

// Mock user
export const mockUser: User = {
  id: "user1",
  name: "John Doe",
  email: "john@example.com",
  role: "hr",
  avatar: "https://ui-avatars.com/api/?name=John+Doe",
  company_id: "comp1"
};

// Mock companies
export const mockCompanies: Company[] = [
  {
    id: "comp1",
    name: "Acme Corporation",
    industry: "Technology",
    logo_url: "https://ui-avatars.com/api/?name=Acme+Corp&background=7E69AB&color=fff",
    status: "active"
  },
  {
    id: "comp2",
    name: "Globex Industries",
    industry: "Manufacturing",
    logo_url: "https://ui-avatars.com/api/?name=Globex&background=6E59A5&color=fff",
    status: "active"
  }
];

// Mock departments
export const mockDepartments: Department[] = [
  {
    id: "dept1",
    name: "Engineering",
    company_id: "comp1",
    description: "Software Engineering Department"
  },
  {
    id: "dept2",
    name: "Human Resources",
    company_id: "comp1",
    description: "HR Department"
  },
  {
    id: "dept3",
    name: "Finance",
    company_id: "comp1",
    description: "Finance Department"
  },
  {
    id: "dept4",
    name: "Marketing",
    company_id: "comp1",
    description: "Marketing Department"
  }
];

// Mock designations
export const mockDesignations: Designation[] = [
  {
    id: "desig1",
    title: "Senior Software Engineer",
    department_id: "dept1",
    level: 3
  },
  {
    id: "desig2",
    title: "HR Manager",
    department_id: "dept2",
    level: 3
  },
  {
    id: "desig3",
    title: "Financial Analyst",
    department_id: "dept3",
    level: 2
  },
  {
    id: "desig4",
    title: "Marketing Specialist",
    department_id: "dept4",
    level: 2
  }
];

// Mock employees
export const mockEmployees: Employee[] = Array.from({ length: 20 }, (_, i) => ({
  id: `emp${i + 1}`,
  name: `Employee ${i + 1}`,
  email: `employee${i + 1}@example.com`,
  phone: `+1234567890${i}`,
  dob: `1990-01-${(i % 28) + 1}`,
  gender: i % 3 === 0 ? 'male' : i % 3 === 1 ? 'female' : 'other',
  photo_url: `https://ui-avatars.com/api/?name=Employee+${i + 1}`,
  employee_code: `EMP00${i + 1}`,
  type: i % 3 === 0 ? 'contract' : 'full-time',
  department_id: mockDepartments[i % mockDepartments.length].id,
  designation_id: mockDesignations[i % mockDesignations.length].id,
  manager_id: i > 4 ? `emp${(i % 4) + 1}` : undefined,
  joining_date: `2023-${(i % 12) + 1}-01`,
  status: i % 10 === 0 ? 'inactive' : i % 15 === 0 ? 'resigned' : 'active',
  company_id: "comp1"
}));

// Mock attendance records for today
const today = new Date().toISOString().split('T')[0];
export const mockAttendanceRecords: AttendanceRecord[] = mockEmployees.map((emp, i) => ({
  id: `att${i + 1}`,
  employee_id: emp.id,
  date: today,
  check_in_time: i % 10 !== 0 ? `09:${(i % 59).toString().padStart(2, '0')}:00` : undefined,
  check_out_time: i % 10 !== 0 && i % 15 !== 0 ? `18:${(i % 59).toString().padStart(2, '0')}:00` : undefined,
  location: {
    latitude: 37.7749 + (Math.random() - 0.5) * 0.01,
    longitude: -122.4194 + (Math.random() - 0.5) * 0.01
  },
  method: i % 4 === 0 ? 'manual' : i % 4 === 1 ? 'geo' : i % 4 === 2 ? 'qr' : 'ai',
  marked_by: i % 10 === 0 ? `emp${(i % 5) + 1}` : emp.id,
  status: i % 10 === 0 ? 'absent' : i % 15 === 0 ? 'half-day' : i % 7 === 0 ? 'late' : 'present'
}));

// Mock leave requests
export const mockLeaveRequests: LeaveRequest[] = Array.from({ length: 15 }, (_, i) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + (i % 10));
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + (i % 3) + 1);
  
  return {
    id: `leave${i + 1}`,
    employee_id: mockEmployees[i % mockEmployees.length].id,
    leave_type: i % 5 === 0 ? 'sick' : i % 5 === 1 ? 'casual' : i % 5 === 2 ? 'annual' : i % 5 === 3 ? 'wfh' : 'other',
    start_date: startDate.toISOString().split('T')[0],
    end_date: endDate.toISOString().split('T')[0],
    reason: `Leave reason ${i + 1}`,
    status: i % 3 === 0 ? 'pending' : i % 3 === 1 ? 'approved' : 'rejected',
    applied_on: new Date(Date.now() - (i * 86400000)).toISOString().split('T')[0],
    approved_by: i % 3 === 1 ? `emp${(i % 4) + 1}` : undefined
  };
});

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  totalEmployees: mockEmployees.length,
  activeEmployees: mockEmployees.filter(emp => emp.status === 'active').length,
  onLeaveToday: mockAttendanceRecords.filter(att => att.status === 'absent').length,
  newJoinees: mockEmployees.filter(emp => {
    const joinDate = new Date(emp.joining_date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return joinDate >= thirtyDaysAgo;
  }).length,
  pendingLeaves: mockLeaveRequests.filter(leave => leave.status === 'pending').length,
  upcomingBirthdays: mockEmployees.filter(emp => {
    if (!emp.dob) return false;
    const today = new Date();
    const dob = new Date(emp.dob);
    
    // Set birth date to current year
    const birthThisYear = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    
    // Check if birthday is within the next 7 days
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);
    
    return birthThisYear >= today && birthThisYear <= sevenDaysFromNow;
  }).length
};

// Mock salaries
export const mockSalaries: Salary[] = mockEmployees.map((emp, i) => ({
  id: `salary${i + 1}`,
  employee_id: emp.id,
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  gross_salary: 50000 + (i * 1000),
  net_salary: 40000 + (i * 800),
  deductions: {
    tax: 5000 + (i * 100),
    pf: 3000,
    esi: 1000,
    other: 1000,
  },
  status: i % 3 === 0 ? 'processed' : 'paid'
}));

// Navigation routes based on user roles
export const navRoutes: NavigationRoutes = {
  super_admin: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "Layout",
      roles: ["super_admin"]
    },
    {
      name: "Organization Management",
      path: "/organizations",
      icon: "Building",
      roles: ["super_admin"],
      children: [
        { name: "Companies", path: "/organizations/companies" },
        { name: "Clients", path: "/organizations/clients" },
        { name: "Users", path: "/organizations/users" },
      ]
    },
    {
      name: "Security",
      path: "/security",
      icon: "Shield",
      roles: ["super_admin"]
    },
    {
      name: "Applications",
      path: "/applications",
      icon: "Briefcase",
      roles: ["super_admin"]
    },
    {
      name: "Support Services",
      path: "/support",
      icon: "HelpCircle",
      roles: ["super_admin"]
    },
    {
      name: "Reports",
      path: "/reports",
      icon: "BarChart3",
      roles: ["super_admin"]
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "Settings",
      roles: ["super_admin"]
    }
  ],
  
  admin: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "Layout",
      roles: ["admin"]
    },
    {
      name: "Employee Management",
      path: "/employees",
      icon: "Users",
      roles: ["admin"],
      children: [
        { name: "Employees", path: "/employees" },
        { name: "Departments", path: "/departments" },
        { name: "Documents", path: "/employee-documents" },
      ]
    },
    {
      name: "Payroll",
      path: "/payroll",
      icon: "CircleDollarSign",
      roles: ["admin"],
      children: [
        { name: "Salary Structure", path: "/payroll/structure" },
        { name: "Salary Generation", path: "/payroll/generate" },
        { name: "Bank Advice", path: "/payroll/bank" },
      ]
    },
    {
      name: "Leave Management",
      path: "/leave",
      icon: "CalendarDays",
      roles: ["admin"],
      children: [
        { name: "Leave Requests", path: "/leave/requests" },
        { name: "Holidays", path: "/leave/holidays" },
        { name: "Leave Policies", path: "/leave/policies" },
      ]
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: "FileText",
      roles: ["admin"],
      children: [
        { name: "Reimbursements", path: "/expenses/reimbursements" },
        { name: "Categories", path: "/expenses/categories" },
      ]
    },
    {
      name: "Performance",
      path: "/performance",
      icon: "LineChart",
      roles: ["admin"],
      children: [
        { name: "Goals & KPIs", path: "/performance/goals" },
        { name: "Appraisals", path: "/performance/appraisals" },
      ]
    },
    {
      name: "Workflow",
      path: "/workflow",
      icon: "ClipboardList",
      roles: ["admin"],
      children: [
        { name: "Attendance Rules", path: "/workflow/attendance" },
        { name: "Approval Flows", path: "/workflow/approvals" },
      ]
    },
    {
      name: "Reports",
      path: "/reports",
      icon: "BarChart3",
      roles: ["admin"]
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "Settings",
      roles: ["admin"],
      children: [
        { name: "Statutory Components", path: "/settings/statutory" },
        { name: "Salary Components", path: "/settings/salary" },
        { name: "Work Locations", path: "/settings/locations" },
        { name: "Taxes", path: "/settings/taxes" },
      ]
    }
  ],
  
  hr: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "Layout",
      roles: ["hr"]
    },
    {
      name: "Employee Management",
      path: "/employees",
      icon: "Users",
      roles: ["hr"],
      children: [
        { name: "Onboarding", path: "/employees/onboarding" },
        { name: "Attendance", path: "/employees/attendance" },
        { name: "Leave Requests", path: "/employees/leave" },
        { name: "Documents", path: "/employees/documents" },
      ]
    },
    {
      name: "Payroll",
      path: "/payroll",
      icon: "CircleDollarSign",
      roles: ["hr"],
      children: [
        { name: "Salary Preview", path: "/payroll/preview" },
        { name: "Pay Slips", path: "/payroll/slips" },
      ]
    },
    {
      name: "Leave Management",
      path: "/leave",
      icon: "CalendarDays",
      roles: ["hr"]
    },
    {
      name: "Performance",
      path: "/performance",
      icon: "LineChart",
      roles: ["hr"],
      children: [
        { name: "Reviews", path: "/performance/reviews" },
        { name: "Feedback", path: "/performance/feedback" },
      ]
    },
    {
      name: "Workflow",
      path: "/workflow",
      icon: "ClipboardList",
      roles: ["hr"],
      children: [
        { name: "Leave & Attendance", path: "/workflow/leave" },
      ]
    },
    {
      name: "Reports",
      path: "/reports",
      icon: "BarChart3",
      roles: ["hr"]
    },
    {
      name: "Recruitment",
      path: "/recruitment",
      icon: "UserPlus",
      roles: ["hr"],
      children: [
        { name: "Job Posts", path: "/recruitment/jobs" },
        { name: "Candidates", path: "/recruitment/candidates" },
        { name: "Interviews", path: "/recruitment/interviews" },
      ]
    }
  ],
  
  manager: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "Layout",
      roles: ["manager"]
    },
    {
      name: "Team Overview",
      path: "/team",
      icon: "Users",
      roles: ["manager"],
      children: [
        { name: "Team Attendance", path: "/team/attendance" },
        { name: "Team Leaves", path: "/team/leaves" },
        { name: "Team Expenses", path: "/team/expenses" },
      ]
    },
    {
      name: "Leave Management",
      path: "/leave",
      icon: "CalendarDays",
      roles: ["manager"],
      children: [
        { name: "Approvals", path: "/leave/approvals" },
        { name: "Calendar View", path: "/leave/calendar" },
      ]
    },
    {
      name: "Performance",
      path: "/performance",
      icon: "LineChart",
      roles: ["manager"],
      children: [
        { name: "Team Goals", path: "/performance/goals" },
        { name: "Appraisals", path: "/performance/appraisals" },
      ]
    },
    {
      name: "Workflow",
      path: "/workflow",
      icon: "ClipboardList",
      roles: ["manager"],
      children: [
        { name: "Attendance Overrides", path: "/workflow/attendance" },
      ]
    },
    {
      name: "Reports",
      path: "/reports",
      icon: "BarChart3",
      roles: ["manager"]
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: "Bell",
      roles: ["manager"]
    }
  ],
  
  employee: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "Layout",
      roles: ["employee"]
    },
    {
      name: "My Profile",
      path: "/profile",
      icon: "UserCog",
      roles: ["employee"]
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: "Calendar",
      roles: ["employee"]
    },
    {
      name: "Leave",
      path: "/leave",
      icon: "CalendarDays",
      roles: ["employee"],
      children: [
        { name: "Apply Leave", path: "/leave/apply" },
        { name: "Leave Balance", path: "/leave/balance" },
      ]
    },
    {
      name: "Payroll",
      path: "/payroll",
      icon: "CircleDollarSign",
      roles: ["employee"],
      children: [
        { name: "Salary Slip", path: "/payroll/slip" },
        { name: "Tax Declarations", path: "/payroll/tax" },
      ]
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: "FileText",
      roles: ["employee"],
      children: [
        { name: "Apply Reimbursement", path: "/expenses/apply" },
        { name: "View Status", path: "/expenses/status" },
      ]
    },
    {
      name: "Performance",
      path: "/performance",
      icon: "LineChart",
      roles: ["employee"],
      children: [
        { name: "My Goals", path: "/performance/goals" },
        { name: "My Feedback", path: "/performance/feedback" },
      ]
    },
    {
      name: "Reports",
      path: "/reports",
      icon: "BarChart3",
      roles: ["employee"],
      children: [
        { name: "Attendance History", path: "/reports/attendance" },
        { name: "Leave Summary", path: "/reports/leave" },
      ]
    }
  ]
};

// Icons mapping
export const iconMapping: { [key: string]: any } = {
  Layout,
  Users,
  User: Users,
  Building,
  Shield,
  Briefcase,
  HelpCircle,
  BarChart3,
  Settings,
  CircleDollarSign,
  CalendarDays,
  FileText,
  LineChart,
  ClipboardList,
  Bell: HelpCircle,
  UserCog,
  Calendar,
  UserPlus,
};
