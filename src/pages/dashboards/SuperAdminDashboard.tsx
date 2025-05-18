
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, CalendarDays, Building, Users, Shield, BoxIcon, AlertCircle } from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-semibold">Super Admin Dashboard</h1>
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
            Platform Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Companies</p>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-xs text-green-600 mt-1">↑ 4 new this month</p>
              </div>
              <div className="h-12 w-12 bg-hrms-light rounded-full flex items-center justify-center">
                <Building className="h-6 w-6 text-hrms-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <h3 className="text-2xl font-bold">15,240</h3>
                <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
              </div>
              <div className="h-12 w-12 bg-hrms-light rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-hrms-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Alerts</p>
                <h3 className="text-2xl font-bold">7</h3>
                <p className="text-xs text-red-600 mt-1">↑ 3 new alerts</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Support Tickets</p>
                <h3 className="text-2xl font-bold">32</h3>
                <p className="text-xs text-amber-600 mt-1">↓ 5% from last week</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clients Distribution */}
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Client Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 border border-dashed border-gray-200 rounded-md flex items-center justify-center">
              <BarChart size={48} className="text-muted-foreground opacity-50" />
              <p className="ml-2 text-muted-foreground">Client Distribution Chart</p>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Subscription Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 border border-dashed border-gray-200 rounded-md flex items-center justify-center">
              <PieChart size={48} className="text-muted-foreground opacity-50" />
              <p className="ml-2 text-muted-foreground">Subscription Status Chart</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Companies */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "TechCorp Solutions", plan: "Enterprise", users: 230, status: "active" },
                { name: "GreenLeaf Industries", plan: "Business", users: 85, status: "active" },
                { name: "Blue Ocean Consulting", plan: "Professional", users: 45, status: "trial" },
                { name: "RedRock Technologies", plan: "Business", users: 120, status: "active" },
                { name: "Silverline Services", plan: "Professional", users: 30, status: "pending" },
              ].map((company, index) => (
                <div key={index} className="flex items-center justify-between pb-4 border-b last:border-b-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-md bg-hrms-light flex items-center justify-center text-hrms-primary font-bold mr-3">
                      {company.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{company.name}</p>
                      <p className="text-xs text-muted-foreground">{company.plan} • {company.users} users</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    company.status === 'active' ? 'bg-green-100 text-green-700' : 
                    company.status === 'trial' ? 'bg-blue-100 text-blue-700' : 
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">System Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New company registered", user: "System", time: "5 minutes ago" },
                { action: "Security patch deployed", user: "Admin Bot", time: "2 hours ago" },
                { action: "Database backup completed", user: "System", time: "5 hours ago" },
                { action: "New feature released", user: "Release Manager", time: "1 day ago" },
                { action: "Platform maintenance", user: "System Admin", time: "2 days ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-4 border-b last:border-b-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-hrms-light flex items-center justify-center text-hrms-primary flex-shrink-0 mt-1">
                    <BoxIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
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

export default SuperAdminDashboard;
