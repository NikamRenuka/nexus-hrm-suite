import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import LeaveManagement from "./pages/LeaveManagement";
import PayrollManagement from "./pages/PayrollManagement";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import SuperAdminLayout from "./components/layout/SuperAdminLayout";
import OrganizationLayout from "./components/layout/OrganizationLayout";

// Super Admin Pages
import Companies from "./pages/organization/Companies";
import Clients from "./pages/organization/Clients";
import OrganizationUsers from "./pages/organization/OrganizationUsers";
import SecurityDashboard from "./pages/security/SecurityDashboard";
import ApplicationManagement from "./pages/applications/ApplicationManagement";
import SupportServices from "./pages/support/SupportServices";
import SuperAdminSettings from "./pages/settings/SuperAdminSettings";
import SuperAdminReports from "./pages/reports/SuperAdminReports";

// Admin Pages
import EmployeeList from "./pages/employees/EmployeeList";
import Departments from "./pages/employees/Departments";
import Documents from "./pages/employees/Documents";
import SalaryStructure from "./pages/payroll/SalaryStructure";
import SalaryGeneration from "./pages/payroll/SalaryGeneration";
import BankAdvice from "./pages/payroll/BankAdvice";
import LeaveRequests from "./pages/leave/LeaveRequests";
import Holidays from "./pages/leave/Holidays";
import LeavePolicies from "./pages/leave/LeavePolicies";
import Reimbursements from "./pages/expenses/Reimbursements";
import ExpenseCategories from "./pages/expenses/ExpenseCategories";
import GoalsKPIs from "./pages/performance/GoalsKPIs";
import Appraisals from "./pages/performance/Appraisals";
import AttendanceRules from "./pages/workflow/AttendanceRules";
import ApprovalFlows from "./pages/workflow/ApprovalFlows";
import AdminReports from "./pages/reports/AdminReports";
import AdminSettings from "./pages/settings/AdminSettings";

// HR Pages
import Onboarding from "./pages/employees/Onboarding";
import AttendanceManagement from "./pages/attendance/AttendanceManagement";
import SalaryPreview from "./pages/payroll/SalaryPreview";
import PaySlips from "./pages/payroll/PaySlips";
import Reviews from "./pages/performance/Reviews";
import Feedback from "./pages/performance/Feedback";
import LeaveAttendanceApprovals from "./pages/workflow/LeaveAttendanceApprovals";
import HRReports from "./pages/reports/HRReports";
import JobPosts from "./pages/recruitment/JobPosts";
import Candidates from "./pages/recruitment/Candidates";
import Interviews from "./pages/recruitment/Interviews";

// Manager Pages
import TeamOverview from "./pages/team/TeamOverview";
import TeamAttendance from "./pages/team/TeamAttendance";
import TeamLeaves from "./pages/team/TeamLeaves";
import TeamExpenses from "./pages/team/TeamExpenses";
import Approvals from "./pages/leave/Approvals";
import CalendarView from "./pages/leave/CalendarView";
import TeamGoals from "./pages/performance/TeamGoals";
import AttendanceOverrides from "./pages/workflow/AttendanceOverrides";
import ManagerReports from "./pages/reports/ManagerReports";
import Notifications from "./pages/notifications/Notifications";

// Employee Pages
import MyProfile from "./pages/profile/MyProfile";
import MyAttendance from "./pages/attendance/MyAttendance";
import ApplyLeave from "./pages/leave/ApplyLeave";
import LeaveBalance from "./pages/leave/LeaveBalance";
import MySalarySlip from "./pages/payroll/MySalarySlip";
import TaxDeclarations from "./pages/payroll/TaxDeclarations";
import ApplyReimbursement from "./pages/expenses/ApplyReimbursement";
import ViewStatus from "./pages/expenses/ViewStatus";
import MyGoals from "./pages/performance/MyGoals";
import RequestsApprovals from "./pages/workflow/RequestsApprovals";
import AttendanceHistory from "./pages/reports/AttendanceHistory";
import LeaveSummary from "./pages/reports/LeaveSummary";
import EmployeeAttendance from "./pages/employees/EmployeeAttendance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/" element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeManagement />} />
            <Route path="/leave" element={<LeaveManagement />} />
            <Route path="/payroll" element={<PayrollManagement />} />
            
            {/* Super Admin Dashboard */}
            <Route path="/super-admin" element={<SuperAdminLayout />} />
            
            {/* Organization Management Routes */}
            <Route path="/organization" element={<OrganizationLayout />}>
              <Route path="/organization/companies" element={<Companies />} />
              <Route path="/organization/clients" element={<Clients />} />
              <Route path="/organization/users" element={<OrganizationUsers />} />
            </Route>
            
            {/* Other Super Admin Routes */}
            <Route path="/security" element={<SecurityDashboard />} />
            <Route path="/applications" element={<ApplicationManagement />} />
            <Route path="/support" element={<SupportServices />} />
            <Route path="/super-admin/settings" element={<SuperAdminSettings />} />
            <Route path="/super-admin/reports" element={<SuperAdminReports />} />
            
            {/* Admin Routes */}
            <Route path="/employees/list" element={<EmployeeList />} />
            <Route path="/employees/departments" element={<Departments />} />
            <Route path="/employees/documents" element={<Documents />} />
            <Route path="/employees/attendance" element={<EmployeeAttendance />} />
            <Route path="/payroll/structure" element={<SalaryStructure />} />
            <Route path="/payroll/generation" element={<SalaryGeneration />} />
            <Route path="/payroll/bank-advice" element={<BankAdvice />} />
            <Route path="/leave/requests" element={<LeaveRequests />} />
            <Route path="/leave/holidays" element={<Holidays />} />
            <Route path="/leave/policies" element={<LeavePolicies />} />
            <Route path="/expenses/reimbursements" element={<Reimbursements />} />
            <Route path="/expenses/categories" element={<ExpenseCategories />} />
            <Route path="/performance/goals" element={<GoalsKPIs />} />
            <Route path="/performance/appraisals" element={<Appraisals />} />
            <Route path="/workflow/attendance-rules" element={<AttendanceRules />} />
            <Route path="/workflow/approval-flows" element={<ApprovalFlows />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            
            {/* HR Routes */}
            <Route path="/employees/onboarding" element={<Onboarding />} />
            <Route path="/attendance/management" element={<AttendanceManagement />} />
            <Route path="/payroll/preview" element={<SalaryPreview />} />
            <Route path="/payroll/payslips" element={<PaySlips />} />
            <Route path="/performance/reviews" element={<Reviews />} />
            <Route path="/performance/feedback" element={<Feedback />} />
            <Route path="/workflow/leave-approvals" element={<LeaveAttendanceApprovals />} />
            <Route path="/hr/reports" element={<HRReports />} />
            <Route path="/recruitment/jobs" element={<JobPosts />} />
            <Route path="/recruitment/candidates" element={<Candidates />} />
            <Route path="/recruitment/interviews" element={<Interviews />} />
            
            {/* Manager Routes */}
            <Route path="/team/overview" element={<TeamOverview />} />
            <Route path="/team/attendance" element={<TeamAttendance />} />
            <Route path="/team/leaves" element={<TeamLeaves />} />
            <Route path="/team/expenses" element={<TeamExpenses />} />
            <Route path="/leave/approvals" element={<Approvals />} />
            <Route path="/leave/calendar" element={<CalendarView />} />
            <Route path="/performance/team-goals" element={<TeamGoals />} />
            <Route path="/workflow/overrides" element={<AttendanceOverrides />} />
            <Route path="/manager/reports" element={<ManagerReports />} />
            <Route path="/notifications" element={<Notifications />} />
            
            {/* Employee Routes */}
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/attendance/my" element={<MyAttendance />} />
            <Route path="/leave/apply" element={<ApplyLeave />} />
            <Route path="/leave/balance" element={<LeaveBalance />} />
            <Route path="/payroll/my-salary" element={<MySalarySlip />} />
            <Route path="/payroll/tax" element={<TaxDeclarations />} />
            <Route path="/expenses/apply" element={<ApplyReimbursement />} />
            <Route path="/expenses/status" element={<ViewStatus />} />
            <Route path="/performance/my-goals" element={<MyGoals />} />
            <Route path="/workflow/requests" element={<RequestsApprovals />} />
            <Route path="/reports/attendance" element={<AttendanceHistory />} />
            <Route path="/reports/leave" element={<LeaveSummary />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
