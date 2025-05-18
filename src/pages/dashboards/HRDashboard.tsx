
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CalendarDays, Clock, UserPlus, FileText, PieChart, XCircle, CheckCircle } from 'lucide-react';

const HRDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-semibold">HR Dashboard</h1>
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

      {/* HR Quick Actions */}
      <Card className="bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x">
            <div className="p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-12 h-12 bg-hrms-light rounded-full mx-auto flex items-center justify-center mb-3">
                <UserPlus className="h-6 w-6 text-hrms-primary" />
              </div>
              <h4 className="font-medium text-sm">Add Employee</h4>
              <p className="text-xs text-muted-foreground mt-1">Onboard new staff</p>
            </div>
            
            <div className="p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-12 h-12 bg-hrms-light rounded-full mx-auto flex items-center justify-center mb-3">
                <CalendarDays className="h-6 w-6 text-hrms-primary" />
              </div>
              <h4 className="font-medium text-sm">Manage Leaves</h4>
              <p className="text-xs text-muted-foreground mt-1">4 pending requests</p>
            </div>
            
            <div className="p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-12 h-12 bg-hrms-light rounded-full mx-auto flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-hrms-primary" />
              </div>
              <h4 className="font-medium text-sm">Process Payroll</h4>
              <p className="text-xs text-muted-foreground mt-1">Run monthly payroll</p>
            </div>
            
            <div className="p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-12 h-12 bg-hrms-light rounded-full mx-auto flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-hrms-primary" />
              </div>
              <h4 className="font-medium text-sm">Attendance</h4>
              <p className="text-xs text-muted-foreground mt-1">Today's overview</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* HR Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <h3 className="text-2xl font-bold">148</h3>
                <p className="text-xs text-green-600 mt-1">↑ 4 new this month</p>
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
                <p className="text-sm text-muted-foreground">Today's Attendance</p>
                <h3 className="text-2xl font-bold">92%</h3>
                <p className="text-xs text-green-600 mt-1">↑ 3% above average</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
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
                <p className="text-xs text-muted-foreground mt-1">4.7% of workforce</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <CalendarDays className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-xs text-amber-600 mt-1">↑ 3 new requests</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Attendance Overview */}
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Today's Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="text-sm text-muted-foreground">
                    <th className="pb-3 text-left font-medium">Department</th>
                    <th className="pb-3 text-left font-medium">Present</th>
                    <th className="pb-3 text-left font-medium">Absent</th>
                    <th className="pb-3 text-left font-medium">Leave</th>
                    <th className="pb-3 text-left font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { department: "IT Department", present: 25, absent: 2, leave: 3, total: 30 },
                    { department: "Finance", present: 18, absent: 1, leave: 1, total: 20 },
                    { department: "Marketing", present: 12, absent: 0, leave: 0, total: 12 },
                    { department: "HR", present: 7, absent: 0, leave: 1, total: 8 },
                    { department: "Operations", present: 32, absent: 3, leave: 2, total: 37 },
                    { department: "Sales", present: 38, absent: 2, leave: 1, total: 41 },
                  ].map((dept, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3 font-medium text-sm">{dept.department}</td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <span className="text-sm text-green-600 font-medium">{dept.present}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            ({Math.round((dept.present / dept.total) * 100)}%)
                          </span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <span className="text-sm text-red-600 font-medium">{dept.absent}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            ({Math.round((dept.absent / dept.total) * 100)}%)
                          </span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <span className="text-sm text-amber-600 font-medium">{dept.leave}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            ({Math.round((dept.leave / dept.total) * 100)}%)
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-sm font-medium">{dept.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Employee Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 border border-dashed border-gray-200 rounded-md flex items-center justify-center">
              <PieChart size={48} className="text-muted-foreground opacity-50" />
              <p className="ml-2 text-muted-foreground">Department Distribution Chart</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Pending Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "John Smith", department: "IT Department", type: "Sick Leave", days: "3 days", from: "May 25" },
                { name: "Sarah Johnson", department: "Finance", type: "Annual Leave", days: "5 days", from: "Jun 10" },
                { name: "Michael Chen", department: "Sales", type: "Personal Leave", days: "1 day", from: "May 28" },
                { name: "Emily Brown", department: "Marketing", type: "Annual Leave", days: "2 days", from: "Jun 01" },
              ].map((leave, index) => (
                <div key={index} className="flex items-start justify-between pb-4 border-b last:border-b-0 last:pb-0">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-hrms-light flex items-center justify-center text-hrms-primary font-bold text-sm mt-1">
                      {leave.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{leave.name}</p>
                      <p className="text-xs text-muted-foreground">{leave.department}</p>
                      <p className="text-xs mt-1">
                        {leave.type} • {leave.days} • From {leave.from}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-md bg-green-100 hover:bg-green-200 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-md bg-red-100 hover:bg-red-200 text-red-600">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Hires */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent Hires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Jessica Williams", role: "Senior Developer", department: "IT", joinedOn: "May 15, 2023" },
                { name: "Ryan Thomas", role: "Sales Executive", department: "Sales", joinedOn: "May 10, 2023" },
                { name: "Lisa Johnson", role: "Marketing Specialist", department: "Marketing", joinedOn: "May 02, 2023" },
                { name: "David Singh", role: "Financial Analyst", department: "Finance", joinedOn: "April 28, 2023" },
              ].map((employee, index) => (
                <div key={index} className="flex items-center justify-between pb-4 border-b last:border-b-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-hrms-light flex items-center justify-center text-hrms-primary font-bold mr-3">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{employee.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {employee.role} • {employee.department}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Joined on</p>
                    <p className="text-sm">{employee.joinedOn}</p>
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

export default HRDashboard;
