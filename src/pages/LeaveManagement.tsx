
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { 
  Calendar as CalendarIcon, 
  CheckCircle, 
  Clock, 
  Filter, 
  PlusCircle, 
  Search, 
  XCircle 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockLeaveRequests, mockEmployees } from '@/lib/mockData';
import { format } from 'date-fns';

const LeaveManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter leave requests based on active tab
  const filteredLeaveRequests = mockLeaveRequests.filter(leave => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return leave.status === 'pending';
    if (activeTab === 'approved') return leave.status === 'approved';
    if (activeTab === 'rejected') return leave.status === 'rejected';
    return true;
  });

  // Get employee name by ID
  const getEmployeeName = (employeeId: string) => {
    const employee = mockEmployees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Unknown';
  };

  // Get leave duration in days
  const getLeaveDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-semibold">Leave Management</h1>
        <div className="flex items-center space-x-2">
          <Button className="hrms-button-outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
          <Button className="hrms-button-primary">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Leave Request
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-hrms-primary">15</div>
              <p className="text-sm text-muted-foreground mt-1">Pending Requests</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-green-600">42</div>
              <p className="text-sm text-muted-foreground mt-1">Approved This Month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-red-600">7</div>
              <p className="text-sm text-muted-foreground mt-1">Rejected This Month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-amber-600">3</div>
              <p className="text-sm text-muted-foreground mt-1">Employees on Leave Today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>View and manage leave applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <Tabs 
              defaultValue="all" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full sm:w-auto"
            >
              <TabsList>
                <TabsTrigger value="all">All Requests</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search requests..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeaveRequests.map((leave, index) => (
                  <TableRow key={leave.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{getEmployeeName(leave.employee_id)}</p>
                        <p className="text-xs text-muted-foreground">Applied on: {leave.applied_on}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {leave.leave_type.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{getLeaveDuration(leave.start_date, leave.end_date)} days</TableCell>
                    <TableCell>
                      {format(new Date(leave.start_date), 'dd MMM yyyy')} - 
                      {format(new Date(leave.end_date), 'dd MMM yyyy')}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          leave.status === 'approved' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                          leave.status === 'rejected' ? 'bg-red-100 text-red-800 hover:bg-red-100' :
                          'bg-amber-100 text-amber-800 hover:bg-amber-100'
                        }
                      >
                        {leave.status === 'pending' ? (
                          <Clock className="mr-1 h-3 w-3" />
                        ) : leave.status === 'approved' ? (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        ) : (
                          <XCircle className="mr-1 h-3 w-3" />
                        )}
                        <span className="capitalize">{leave.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {leave.status === 'pending' ? (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100">
                            <XCircle className="mr-1 h-3 w-3" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveManagement;
