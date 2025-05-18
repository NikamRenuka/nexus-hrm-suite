
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, CalendarDays, Clock, BarChart, PieChart, DollarSign, AlertTriangle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <h3 className="text-2xl font-bold">245</h3>
                <p className="text-xs text-green-600 mt-1">↑ 12 new this month</p>
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
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
                <h3 className="text-2xl font-bold">18</h3>
                <p className="text-xs text-amber-600 mt-1">↑ 3 since yesterday</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Leave Today</p>
                <h3 className="text-2xl font-bold">7</h3>
                <p className="text-xs text-blue-600 mt-1">↓ 2 from yesterday</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CalendarDays className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Payroll Status</p>
                <h3 className="text-2xl font-bold">Ready</h3>
                <p className="text-xs text-green-600 mt-1">Due in 8 days</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Distribution */}
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 border border-dashed border-gray-200 rounded-md flex items-center justify-center">
              <BarChart size={48} className="text-muted-foreground opacity-50" />
              <p className="ml-2 text-muted-foreground">Department Distribution Chart</p>
            </div>
          </CardContent>
        </Card>

        {/* Employee Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Employee Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 border border-dashed border-gray-200 rounded-md flex items-center justify-center">
              <PieChart size={48} className="text-muted-foreground opacity-50" />
              <p className="ml-2 text-muted-foreground">Employee Status Chart</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Birthdays */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Upcoming Birthdays</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Alice Johnson", role: "UI Designer", date: "May 28", days: 3 },
                { name: "Michael Brown", role: "Software Engineer", date: "Jun 02", days: 8 },
                { name: "Sarah Davis", role: "Product Manager", date: "Jun 05", days: 11 },
                { name: "Robert Wilson", role: "QA Analyst", date: "Jun 10", days: 16 },
              ].map((employee, index) => (
                <div key={index} className="flex items-center justify-between pb-4 border-b last:border-b-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-hrms-light flex items-center justify-center text-hrms-primary font-bold mr-3">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{employee.name}</p>
                      <p className="text-xs text-muted-foreground">{employee.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{employee.date}</p>
                    <p className="text-xs text-muted-foreground">in {employee.days} days</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Compliance Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "EPF Submission", description: "Monthly EPF submission due", dueIn: "3 days", severity: "high" },
                { title: "Tax Documents", description: "Quarterly tax filing pending", dueIn: "8 days", severity: "medium" },
                { title: "Employee Reviews", description: "Performance reviews pending", dueIn: "15 days", severity: "low" },
                { title: "ESI Compliance", description: "ESI returns submission", dueIn: "5 days", severity: "medium" },
              ].map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 pb-4 border-b last:border-b-0 last:pb-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-600' : 
                    alert.severity === 'medium' ? 'bg-amber-100 text-amber-600' : 
                    'bg-green-100 text-green-600'
                  }`}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{alert.title}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        alert.severity === 'high' ? 'bg-red-100 text-red-700' : 
                        alert.severity === 'medium' ? 'bg-amber-100 text-amber-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        Due in {alert.dueIn}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
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

export default AdminDashboard;
