
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, CalendarDays, FileText, BarChart, CheckCircle, XCircle } from 'lucide-react';

const ManagerDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-semibold">Manager Dashboard</h1>
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
            Team Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Team Members</p>
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-xs text-green-600 mt-1">↑ 2 new this month</p>
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
                <p className="text-sm text-muted-foreground">Present Today</p>
                <h3 className="text-2xl font-bold">9</h3>
                <p className="text-xs text-muted-foreground mt-1">75% attendance</p>
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
                <p className="text-sm text-muted-foreground">On Leave</p>
                <h3 className="text-2xl font-bold">3</h3>
                <p className="text-xs text-muted-foreground mt-1">25% of team</p>
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
                <h3 className="text-2xl font-bold">4</h3>
                <p className="text-xs text-red-600 mt-1">↑ 2 new requests</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Team Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="text-sm text-muted-foreground">
                    <th className="pb-3 text-left font-medium">Name</th>
                    <th className="pb-3 text-left font-medium">Status</th>
                    <th className="pb-3 text-left font-medium">Check-in</th>
                    <th className="pb-3 text-left font-medium">Check-out</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "John Smith", status: "present", checkIn: "09:02 AM", checkOut: "06:15 PM" },
                    { name: "Emily Davis", status: "present", checkIn: "08:45 AM", checkOut: "05:30 PM" },
                    { name: "Michael Brown", status: "late", checkIn: "10:15 AM", checkOut: "06:30 PM" },
                    { name: "Jessica Wilson", status: "absent", checkIn: "-", checkOut: "-" },
                    { name: "David Miller", status: "present", checkIn: "09:05 AM", checkOut: "06:00 PM" },
                    { name: "Sarah Johnson", status: "leave", checkIn: "-", checkOut: "-" },
                  ].map((employee, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-hrms-light flex items-center justify-center text-hrms-primary font-bold text-sm mr-2">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium text-sm">{employee.name}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                          employee.status === 'present' ? 'bg-green-100 text-green-700' : 
                          employee.status === 'late' ? 'bg-amber-100 text-amber-700' : 
                          employee.status === 'leave' ? 'bg-blue-100 text-blue-700' : 
                          'bg-red-100 text-red-700'
                        }`}>
                          {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 text-sm">{employee.checkIn}</td>
                      <td className="py-3 text-sm">{employee.checkOut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", type: "Leave", subtype: "Sick Leave", duration: "May 28 - May 30", status: "pending" },
                { name: "Michael Chen", type: "Leave", subtype: "Annual Leave", duration: "Jun 10 - Jun 15", status: "pending" },
                { name: "David Wilson", type: "Timesheet", subtype: "Overtime", duration: "May 24, 2 hours", status: "pending" },
                { name: "Emily Davis", type: "Reimbursement", subtype: "Travel", duration: "$250", status: "pending" },
              ].map((request, index) => (
                <div key={index} className="flex items-start justify-between pb-4 border-b last:border-b-0 last:pb-0">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-hrms-light flex items-center justify-center text-hrms-primary font-bold text-sm mt-1">
                      {request.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{request.name}</p>
                      <p className="text-xs text-muted-foreground">{request.type} - {request.subtype}</p>
                      <p className="text-xs text-muted-foreground mt-1">{request.duration}</p>
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
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 border border-dashed border-gray-200 rounded-md flex items-center justify-center">
              <BarChart size={48} className="text-muted-foreground opacity-50" />
              <p className="ml-2 text-muted-foreground">Team Performance Chart</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboard;
