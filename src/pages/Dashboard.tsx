
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DashboardStats, 
  AttendanceSummary, 
  QuickActions, 
  RecentActivity 
} from '@/components/dashboard/DashboardCards';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <select
            className="border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-hrms-primary/20 text-sm"
          >
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month" selected>This Month</option>
            <option value="this_year">This Year</option>
          </select>
          <button className="hrms-button-primary">
            Export Reports
          </button>
        </div>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="hrms-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for chart */}
            <div className="h-64 border border-dashed border-gray-200 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Department Distribution Chart</p>
            </div>
          </CardContent>
        </Card>

        <AttendanceSummary />
        
        <QuickActions />
        
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hrms-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-12 h-12 bg-hrms-light rounded-md flex flex-col items-center justify-center text-hrms-primary">
                  <span className="text-xs font-medium">MAY</span>
                  <span className="text-lg font-bold">24</span>
                </div>
                <div>
                  <h4 className="font-medium">Company Anniversary</h4>
                  <p className="text-sm text-muted-foreground">All day event</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-12 h-12 bg-hrms-light rounded-md flex flex-col items-center justify-center text-hrms-primary">
                  <span className="text-xs font-medium">MAY</span>
                  <span className="text-lg font-bold">28</span>
                </div>
                <div>
                  <h4 className="font-medium">Team Meeting</h4>
                  <p className="text-sm text-muted-foreground">10:00 AM - 11:30 AM</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-hrms-light rounded-md flex flex-col items-center justify-center text-hrms-primary">
                  <span className="text-xs font-medium">JUN</span>
                  <span className="text-lg font-bold">01</span>
                </div>
                <div>
                  <h4 className="font-medium">Monthly Review</h4>
                  <p className="text-sm text-muted-foreground">02:00 PM - 04:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hrms-card">
          <CardHeader>
            <CardTitle className="text-lg font-medium">New Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                    <img 
                      src={`https://ui-avatars.com/api/?name=User+${index + 1}`} 
                      alt={`User ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Employee {index + 1}</h4>
                    <p className="text-sm text-muted-foreground">
                      Software Engineer • Joined {index + 1} day{index > 0 ? 's' : ''} ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
