
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CalendarDays, FileText, DollarSign, PieChart, CheckCircle } from 'lucide-react';

const EmployeeDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-semibold">Employee Dashboard</h1>
      </div>

      {/* Today's Quick Actions */}
      <Card className="bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x">
            <div className="p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-12 h-12 bg-hrms-light rounded-full mx-auto flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-hrms-primary" />
              </div>
              <h4 className="font-medium text-sm">Clock In</h4>
              <p className="text-xs text-muted-foreground mt-1">Mark attendance</p>
            </div>
            
            <div className="p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-12 h-12 bg-hrms-light rounded-full mx-auto flex items-center justify-center mb-3">
                <CalendarDays className="h-6 w-6 text-hrms-primary" />
              </div>
              <h4 className="font-medium text-sm">Apply Leave</h4>
              <p className="text-xs text-muted-foreground mt-1">Request time off</p>
            </div>
            
            <div className="p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-12 h-12 bg-hrms-light rounded-full mx-auto flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-hrms-primary" />
              </div>
              <h4 className="font-medium text-sm">View Payslip</h4>
              <p className="text-xs text-muted-foreground mt-1">Latest salary details</p>
            </div>
            
            <div className="p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="w-12 h-12 bg-hrms-light rounded-full mx-auto flex items-center justify-center mb-3">
                <CheckCircle className="h-6 w-6 text-hrms-primary" />
              </div>
              <h4 className="font-medium text-sm">My Tasks</h4>
              <p className="text-xs text-muted-foreground mt-1">3 pending items</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attendance</p>
                <h3 className="text-2xl font-bold">96%</h3>
                <p className="text-xs text-green-600 mt-1">↑ 2% from last month</p>
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
                <p className="text-sm text-muted-foreground">Leave Balance</p>
                <h3 className="text-2xl font-bold">12 days</h3>
                <p className="text-xs text-muted-foreground mt-1">Annual leave remaining</p>
              </div>
              <div className="h-12 w-12 bg-hrms-light rounded-full flex items-center justify-center">
                <CalendarDays className="h-6 w-6 text-hrms-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Payday</p>
                <h3 className="text-2xl font-bold">May 30</h3>
                <p className="text-xs text-muted-foreground mt-1">8 days remaining</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Tasks</p>
                <h3 className="text-2xl font-bold">3</h3>
                <p className="text-xs text-amber-600 mt-1">↓ 2 from yesterday</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave Summary */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Leave History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="text-sm text-muted-foreground">
                    <th className="pb-3 text-left font-medium">Type</th>
                    <th className="pb-3 text-left font-medium">From</th>
                    <th className="pb-3 text-left font-medium">To</th>
                    <th className="pb-3 text-left font-medium">Days</th>
                    <th className="pb-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "Sick Leave", from: "Apr 12, 2023", to: "Apr 14, 2023", days: 3, status: "approved" },
                    { type: "Annual Leave", from: "Mar 01, 2023", to: "Mar 05, 2023", days: 5, status: "approved" },
                    { type: "Work From Home", from: "Feb 15, 2023", to: "Feb 15, 2023", days: 1, status: "approved" },
                    { type: "Casual Leave", from: "Jan 25, 2023", to: "Jan 26, 2023", days: 2, status: "rejected" },
                  ].map((leave, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3 font-medium text-sm">{leave.type}</td>
                      <td className="py-3 text-sm">{leave.from}</td>
                      <td className="py-3 text-sm">{leave.to}</td>
                      <td className="py-3 text-sm">{leave.days}</td>
                      <td className="py-3">
                        <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                          leave.status === 'approved' ? 'bg-green-100 text-green-700' : 
                          leave.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                          'bg-red-100 text-red-700'
                        }`}>
                          {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Leave Balance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Leave Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Annual Leave</span>
                  <span className="text-sm font-medium">12/20</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Sick Leave</span>
                  <span className="text-sm font-medium">4/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Casual Leave</span>
                  <span className="text-sm font-medium">2/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              <div className="h-32 border border-dashed border-gray-200 rounded-md mt-4 flex items-center justify-center">
                <PieChart size={36} className="text-muted-foreground opacity-50" />
                <p className="ml-2 text-sm text-muted-foreground">Leave Distribution Chart</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Holidays */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Upcoming Holidays</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Memorial Day", date: "May 27, 2023", days: 5 },
                { name: "Independence Day", date: "July 4, 2023", days: 43 },
                { name: "Labor Day", date: "September 2, 2023", days: 103 },
                { name: "Thanksgiving", date: "November 28, 2023", days: 190 },
              ].map((holiday, index) => (
                <div key={index} className="flex items-center justify-between pb-4 border-b last:border-b-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-hrms-light rounded-md flex flex-col items-center justify-center text-hrms-primary mr-3">
                      <span className="text-xs">
                        {holiday.date.split(',')[0].split(' ')[0].substring(0, 3).toUpperCase()}
                      </span>
                      <span className="font-bold">
                        {holiday.date.split(',')[0].split(' ')[1]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{holiday.name}</p>
                      <p className="text-xs text-muted-foreground">{holiday.date}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">
                      in {holiday.days} days
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Payslip Generated", message: "Your April 2023 payslip has been generated.", time: "2 days ago", type: "payroll" },
                { title: "Leave Approved", message: "Your leave request has been approved by your manager.", time: "1 week ago", type: "leave" },
                { title: "New Announcement", message: "Company picnic scheduled for next month. Please RSVP.", time: "2 weeks ago", type: "announcement" },
                { title: "Training Invitation", message: "You've been invited to 'Leadership Skills' training.", time: "3 weeks ago", type: "training" },
              ].map((notification, index) => (
                <div key={index} className="flex items-start space-x-3 pb-4 border-b last:border-b-0 last:pb-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                    notification.type === 'payroll' ? 'bg-green-100 text-green-600' : 
                    notification.type === 'leave' ? 'bg-blue-100 text-blue-600' : 
                    notification.type === 'announcement' ? 'bg-amber-100 text-amber-600' : 
                    'bg-purple-100 text-purple-600'
                  }`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
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

export default EmployeeDashboard;
