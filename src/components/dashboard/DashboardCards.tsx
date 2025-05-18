
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  UserCheck,
  CalendarX,
  UserPlus,
  CalendarClock,
  Cake
} from 'lucide-react';
import { mockDashboardStats } from '@/lib/mockData';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description?: string;
  colorClass?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  colorClass = "bg-blue-500",
}) => {
  return (
    <Card className="hrms-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          </div>
          <div className={`${colorClass} p-2 rounded-lg text-white`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const DashboardStats: React.FC = () => {
  const stats = mockDashboardStats;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Total Employees"
        value={stats.totalEmployees}
        icon={<Users size={24} />}
        colorClass="bg-hrms-primary"
      />
      <StatCard
        title="Active Employees"
        value={stats.activeEmployees}
        icon={<UserCheck size={24} />}
        colorClass="bg-green-500"
        description={`${Math.round((stats.activeEmployees / stats.totalEmployees) * 100)}% of total`}
      />
      <StatCard
        title="On Leave Today"
        value={stats.onLeaveToday}
        icon={<CalendarX size={24} />}
        colorClass="bg-amber-500"
      />
      <StatCard
        title="New Joiners"
        value={stats.newJoinees}
        icon={<UserPlus size={24} />}
        colorClass="bg-cyan-500"
        description="Last 30 days"
      />
      <StatCard
        title="Pending Leave Requests"
        value={stats.pendingLeaves}
        icon={<CalendarClock size={24} />}
        colorClass="bg-orange-500"
      />
      <StatCard
        title="Upcoming Birthdays"
        value={stats.upcomingBirthdays}
        icon={<Cake size={24} />}
        colorClass="bg-pink-500"
        description="Next 7 days"
      />
    </div>
  );
};

export const AttendanceSummary: React.FC = () => {
  return (
    <Card className="hrms-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Today's Attendance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Present</span>
            <span className="font-medium">85%</span>
          </div>
          <Progress value={85} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Late</span>
            <span className="font-medium">8%</span>
          </div>
          <Progress value={8} className="h-2 bg-muted" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Absent</span>
            <span className="font-medium">7%</span>
          </div>
          <Progress value={7} className="h-2 bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
};

export const QuickActions: React.FC = () => {
  const actions = [
    { title: "Add Employee", icon: <UserPlus size={20} />, path: "/employees/add" },
    { title: "Leave Requests", icon: <CalendarClock size={20} />, path: "/leave/requests" },
    { title: "Run Payroll", icon: <Users size={20} />, path: "/payroll/run" },
    { title: "View Reports", icon: <Users size={20} />, path: "/reports" }
  ];
  
  return (
    <Card className="hrms-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="p-4 border rounded-md flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-hrms-light rounded-full text-hrms-primary">
              {action.icon}
            </div>
            <span className="text-sm font-medium">{action.title}</span>
          </button>
        ))}
      </CardContent>
    </Card>
  );
};

export const RecentActivity: React.FC = () => {
  const activities = [
    { title: "John Doe marked attendance", time: "10:15 AM", type: "attendance" },
    { title: "Jane Smith applied for leave", time: "Yesterday", type: "leave" },
    { title: "Alan Walker approved a leave request", time: "Yesterday", type: "approval" },
    { title: "Payroll generated for April", time: "2 days ago", type: "payroll" },
    { title: "New employee onboarded", time: "3 days ago", type: "employee" }
  ];
  
  return (
    <Card className="hrms-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
            <div className="w-1 h-1 bg-hrms-primary rounded-full mt-2"></div>
            <div>
              <p className="text-sm">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
