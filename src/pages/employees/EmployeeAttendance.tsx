
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Download, FileText, Filter } from "lucide-react";

const EmployeeAttendance: React.FC = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  // Mock data for the attendance records
  const attendanceData = [
    { id: 1, name: "John Doe", date: "2023-05-10", checkIn: "09:00 AM", checkOut: "05:30 PM", status: "Present", hours: "8.5" },
    { id: 2, name: "Jane Smith", date: "2023-05-10", checkIn: "09:15 AM", checkOut: "05:45 PM", status: "Present", hours: "8.5" },
    { id: 3, name: "Robert Johnson", date: "2023-05-10", checkIn: "--", checkOut: "--", status: "Absent", hours: "0" },
    { id: 4, name: "Emily Davis", date: "2023-05-10", checkIn: "09:30 AM", checkOut: "04:00 PM", status: "Half Day", hours: "6.5" },
    { id: 5, name: "Michael Wilson", date: "2023-05-10", checkIn: "08:45 AM", checkOut: "05:15 PM", status: "Present", hours: "8.5" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Employee Attendance</h1>
          <p className="text-muted-foreground">
            View and manage employee attendance records
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter size={16} />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download size={16} />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">From</span>
                <span>{date?.from ? format(date.from, "PPP") : "Select date"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">To</span>
                <span>{date?.to ? format(date.to, "PPP") : "Select date"}</span>
              </div>
              <Button className="w-full mt-2">Apply Filter</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="present">Present</TabsTrigger>
                <TabsTrigger value="absent">Absent</TabsTrigger>
                <TabsTrigger value="late">Late</TabsTrigger>
                <TabsTrigger value="half-day">Half Day</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Check In</TableHead>
                        <TableHead>Check Out</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendanceData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{item.checkIn}</TableCell>
                          <TableCell>{item.checkOut}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                item.status === "Present"
                                  ? "default"
                                  : item.status === "Absent"
                                  ? "destructive"
                                  : item.status === "Half Day"
                                  ? "outline"
                                  : "secondary"
                              }
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.hours}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <FileText size={16} />
                              <span className="sr-only">View Details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="present">
                <p className="text-center py-8 text-muted-foreground">
                  Filtered view for present employees will appear here
                </p>
              </TabsContent>

              <TabsContent value="absent">
                <p className="text-center py-8 text-muted-foreground">
                  Filtered view for absent employees will appear here
                </p>
              </TabsContent>

              <TabsContent value="late">
                <p className="text-center py-8 text-muted-foreground">
                  Filtered view for late employees will appear here
                </p>
              </TabsContent>

              <TabsContent value="half-day">
                <p className="text-center py-8 text-muted-foreground">
                  Filtered view for half day employees will appear here
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
