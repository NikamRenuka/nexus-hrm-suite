
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
import { mockSalaries, mockEmployees } from '@/lib/mockData';
import { Calendar, Download, FileText, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PayrollManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('current');
  
  // Get employee name by ID
  const getEmployeeName = (employeeId: string) => {
    const employee = mockEmployees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Unknown';
  };

  // Get month name
  const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber);
    return date.toLocaleString('default', { month: 'long' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-semibold">Payroll Management</h1>
        <div className="flex items-center space-x-2">
          <Button className="hrms-button-outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Payment History
          </Button>
          <Button className="hrms-button-primary">
            <FileText className="mr-2 h-4 w-4" />
            Run Payroll
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <div className="text-sm text-muted-foreground mb-1">Total Payroll</div>
              <div className="text-2xl font-bold">₹8,75,000</div>
              <div className="text-xs text-muted-foreground mt-1">May 2025</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <div className="text-sm text-muted-foreground mb-1">Total Employees</div>
              <div className="text-2xl font-bold">20</div>
              <div className="text-xs text-green-600 mt-1">+2 from last month</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <div className="text-sm text-muted-foreground mb-1">Avg. Salary</div>
              <div className="text-2xl font-bold">₹43,750</div>
              <div className="text-xs text-muted-foreground mt-1">Per employee</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <div className="text-sm text-muted-foreground mb-1">Payroll Status</div>
              <div className="text-2xl font-bold text-amber-600">Processing</div>
              <div className="text-xs text-muted-foreground mt-1">May 2025</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Salary Records</CardTitle>
          <CardDescription>View and manage employee salaries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <Tabs 
              defaultValue="current" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full sm:w-auto"
            >
              <TabsList>
                <TabsTrigger value="current">Current Month</TabsTrigger>
                <TabsTrigger value="previous">Previous Month</TabsTrigger>
                <TabsTrigger value="all">All Records</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search employees..." className="pl-8" />
              </div>
              <Select defaultValue="may">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="may">May 2025</SelectItem>
                  <SelectItem value="apr">Apr 2025</SelectItem>
                  <SelectItem value="mar">Mar 2025</SelectItem>
                </SelectContent>
              </Select>
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
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Gross Salary</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSalaries.slice(0, 10).map((salary, index) => (
                  <TableRow key={salary.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {getEmployeeName(salary.employee_id)}
                    </TableCell>
                    <TableCell>
                      {mockEmployees.find(emp => emp.id === salary.employee_id)?.employee_code || 'N/A'}
                    </TableCell>
                    <TableCell>{getMonthName(salary.month)} {salary.year}</TableCell>
                    <TableCell>₹{salary.gross_salary.toLocaleString()}</TableCell>
                    <TableCell>
                      ₹{Object.values(salary.deductions).reduce((total, value) => total + value, 0).toLocaleString()}
                    </TableCell>
                    <TableCell>₹{salary.net_salary.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          salary.status === 'paid' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                          'bg-amber-100 text-amber-800 hover:bg-amber-100'
                        }
                      >
                        {salary.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-3 w-3" />
                        Payslip
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Payroll Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-amber-500 pl-4">
                <h4 className="font-medium">Salary Processing</h4>
                <p className="text-sm text-muted-foreground">May 2025 • Due in 2 days</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium">Tax Deductions</h4>
                <p className="text-sm text-muted-foreground">May 2025 • Due in 4 days</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-medium">Salary Disbursement</h4>
                <p className="text-sm text-muted-foreground">May 2025 • Due in 7 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payroll Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Basic Salary</span>
                <span className="font-medium">₹5,25,000</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Allowances</span>
                <span className="font-medium">₹3,50,000</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Deductions</span>
                <span className="font-medium">₹1,75,000</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">₹87,500</span>
              </div>
              
              <div className="flex justify-between items-center font-medium text-lg">
                <span>Net Payable</span>
                <span className="text-hrms-primary">₹6,12,500</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PayrollManagement;
