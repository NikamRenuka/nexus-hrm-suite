
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Search, UserPlus, Filter, Download, MoreVertical } from 'lucide-react';
import { mockEmployees, mockDepartments, mockDesignations } from '@/lib/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const EmployeeManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter employees based on active tab and search query
  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'active' && employee.status === 'active') ||
      (activeTab === 'inactive' && employee.status === 'inactive') ||
      (activeTab === 'contract' && employee.type === 'contract');
    
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employee_code.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && (searchQuery === '' || matchesSearch);
  });

  // Get department name by ID
  const getDepartmentName = (departmentId: string) => {
    const department = mockDepartments.find(dep => dep.id === departmentId);
    return department ? department.name : 'Unknown';
  };

  // Get designation title by ID
  const getDesignationTitle = (designationId: string) => {
    const designation = mockDesignations.find(des => des.id === designationId);
    return designation ? designation.title : 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-semibold">Employee Management</h1>
        <Button className="hrms-button-primary">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Employee Directory</CardTitle>
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
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                <TabsTrigger value="contract">Contract</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search employees..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.slice(0, 10).map((employee, index) => (
                  <TableRow key={employee.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                          {employee.photo_url && (
                            <img 
                              src={employee.photo_url} 
                              alt={employee.name} 
                              className="w-full h-full object-cover" 
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">{employee.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.employee_code}</TableCell>
                    <TableCell>{getDepartmentName(employee.department_id)}</TableCell>
                    <TableCell>{getDesignationTitle(employee.designation_id)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        employee.type === 'full-time' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {employee.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        employee.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : employee.status === 'inactive'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {employee.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuItem>View Documents</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

export default EmployeeManagement;
