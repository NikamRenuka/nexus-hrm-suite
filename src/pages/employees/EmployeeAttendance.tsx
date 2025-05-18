
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Clock, Check, Calendar as CalendarIcon } from 'lucide-react';

const EmployeeAttendance: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState("may");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("daily");
  
  // Mock data for attendance records
  const attendanceRecords = [
    { id: 1, name: "John Doe", department: "Engineering", date: "2025-05-18", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "present", hours: "9h" },
    { id: 2, name: "Jane Smith", department: "Marketing", date: "2025-05-18", checkIn: "09:15 AM", checkOut: "05:45 PM", status: "present", hours: "8.5h" },
    { id: 3, name: "Robert Brown", department: "HR", date: "2025-05-18", checkIn: "10:00 AM", checkOut: "06:30 PM", status: "late", hours: "8.5h" },
    { id: 4, name: "Emily Davis", department: "Finance", date: "2025-05-18", checkIn: "08:45 AM", checkOut: "05:30 PM", status: "present", hours: "8.75h" },
    { id: 5, name: "Michael Wilson", department: "Sales", date: "2025-05-18", checkIn: "-", checkOut: "-", status: "absent", hours: "0h" },
  ];
  
  // Filter records based on search term
  const filteredRecords = attendanceRecords.filter(
    record => record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              record.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "present":
        return <Badge className="bg-green-500 hover:bg-green-600">Present</Badge>;
      case "late":
        return <Badge variant="warning">Late</Badge>;
      case "absent":
        return <Badge variant="destructive">Absent</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employee Attendance</h1>
        <Button>
          <Clock className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-2/3">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Attendance Overview</CardTitle>
              <div className="flex items-center gap-2">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jan">January</SelectItem>
                    <SelectItem value="feb">February</SelectItem>
                    <SelectItem value="mar">March</SelectItem>
                    <SelectItem value="apr">April</SelectItem>
                    <SelectItem value="may">May</SelectItem>
                    <SelectItem value="jun">June</SelectItem>
                    <SelectItem value="jul">July</SelectItem>
                    <SelectItem value="aug">August</SelectItem>
                    <SelectItem value="sep">September</SelectItem>
                    <SelectItem value="oct">October</SelectItem>
                    <SelectItem value="nov">November</SelectItem>
                    <SelectItem value="dec">December</SelectItem>
                  </SelectContent>
                </Select>
                <CalendarIcon className="h-4 w-4" />
              </div>
            </div>
            <CardDescription>
              Monitor daily attendance and hours worked.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-muted-foreground">Present (85%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm text-muted-foreground">Late (10%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-muted-foreground">Absent (5%)</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md">
              {/* Placeholder for attendance chart - in a real app, use recharts */}
              <div className="h-64 flex items-center justify-center bg-muted/20">
                <p className="text-muted-foreground">Attendance chart visualization would appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted/20 rounded-md">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-full">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <span>Total Employees</span>
              </div>
              <span className="font-bold">120</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-muted/20 rounded-md">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Check className="h-5 w-5 text-blue-600" />
                </div>
                <span>Present Today</span>
              </div>
              <span className="font-bold">102</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-muted/20 rounded-md">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <span>On Leave</span>
              </div>
              <span className="font-bold">8</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-muted/20 rounded-md">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-100 rounded-full">
                  <Calendar className="h-5 w-5 text-red-600" />
                </div>
                <span>Absent</span>
              </div>
              <span className="font-bold">10</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>Attendance Records</CardTitle>
            <div className="flex gap-2">
              <Input 
                placeholder="Search employee or department..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64"
              />
              <Button variant="outline">
                Export
              </Button>
            </div>
          </div>
          <Tabs defaultValue="daily" value={currentTab} onValueChange={setCurrentTab}>
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-3 text-left font-medium">Employee</th>
                    <th className="p-3 text-left font-medium">Department</th>
                    <th className="p-3 text-left font-medium">Date</th>
                    <th className="p-3 text-left font-medium">Check In</th>
                    <th className="p-3 text-left font-medium">Check Out</th>
                    <th className="p-3 text-left font-medium">Status</th>
                    <th className="p-3 text-left font-medium">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="border-t">
                      <td className="p-3">{record.name}</td>
                      <td className="p-3">{record.department}</td>
                      <td className="p-3">{record.date}</td>
                      <td className="p-3">{record.checkIn}</td>
                      <td className="p-3">{record.checkOut}</td>
                      <td className="p-3">{getStatusBadge(record.status)}</td>
                      <td className="p-3">{record.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredRecords.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">
                No attendance records found matching your search.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeAttendance;
