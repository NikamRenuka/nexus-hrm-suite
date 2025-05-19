
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  BarChart, Bar, 
  LineChart, Line, 
  PieChart, Pie, Cell, 
  ResponsiveContainer, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, Download } from 'lucide-react';

const SuperAdminReports: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  // Mock data for the charts
  const usersByCompanyData = [
    { name: 'Acme Corp', users: 245 },
    { name: 'Globex', users: 187 },
    { name: 'Stark Inc', users: 128 },
    { name: 'Wayne Ent', users: 95 },
    { name: 'Umbrella', users: 76 }
  ];

  const userRolesData = [
    { name: 'Employees', value: 1850 },
    { name: 'Managers', value: 420 },
    { name: 'HR', value: 180 },
    { name: 'Admins', value: 95 },
    { name: 'Super Admins', value: 12 }
  ];
  
  const growthData = [
    { month: 'Jan', companies: 145, users: 1850 },
    { month: 'Feb', companies: 152, users: 1950 },
    { month: 'Mar', companies: 165, users: 2120 },
    { month: 'Apr', companies: 172, users: 2250 },
    { month: 'May', companies: 184, users: 2390 },
    { month: 'Jun', companies: 200, users: 2520 },
    { month: 'Jul', companies: 220, users: 2600 },
    { month: 'Aug', companies: 232, users: 2680 },
    { month: 'Sep', companies: 248, users: 2750 }
  ];

  const securityAlertsData = [
    { name: 'Failed Logins', value: 28 },
    { name: 'New Location Logins', value: 15 },
    { name: 'Admin Role Changes', value: 7 },
    { name: 'Password Resets', value: 32 }
  ];

  const supportTicketsData = [
    { month: 'Jan', open: 23, resolved: 20 },
    { month: 'Feb', open: 28, resolved: 25 },
    { month: 'Mar', open: 20, resolved: 18 },
    { month: 'Apr', open: 27, resolved: 24 },
    { month: 'May', open: 18, resolved: 15 },
    { month: 'Jun', open: 24, resolved: 22 },
    { month: 'Jul', open: 15, resolved: 13 },
    { month: 'Aug', open: 19, resolved: 17 },
    { month: 'Sep', open: 16, resolved: 13 }
  ];
  
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

  const pieChartConfig = {
    'Employees': { color: '#8884d8' },
    'Managers': { color: '#82ca9d' },
    'HR': { color: '#ffc658' },
    'Admins': { color: '#ff8042' },
    'Super Admins': { color: '#0088fe' },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Platform Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive analytics and statistics across the entire platform.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 3 months</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users & Companies</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Companies
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
                <div className="h-[80px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={growthData.slice(-5)} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                      <Bar dataKey="companies" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <LineChartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,557</div>
                <p className="text-xs text-muted-foreground">+4.5% from last month</p>
                <div className="h-[80px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData.slice(-5)} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                      <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  User Roles Distribution
                </CardTitle>
                <PieChartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[120px]">
                  <ChartContainer
                    config={pieChartConfig}
                    className="h-[120px]"
                  >
                    <PieChart>
                      <Pie
                        data={userRolesData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={50}
                        paddingAngle={2}
                        dataKey="value"
                        label={false}
                      >
                        {userRolesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                      />
                    </PieChart>
                  </ChartContainer>
                </div>
                <div className="flex justify-center space-x-4 text-xs mt-2">
                  {userRolesData.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-1"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      {entry.name}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
                <CardDescription>Companies and users growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={growthData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="companies" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line yAxisId="right" type="monotone" dataKey="users" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>Open vs resolved tickets per month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={supportTicketsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="open" fill="#8884d8" />
                      <Bar dataKey="resolved" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Users by Company</CardTitle>
                <CardDescription>Distribution of users across top companies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={usersByCompanyData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="users" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>User Role Distribution</CardTitle>
                <CardDescription>Breakdown of users by their roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userRolesData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={130}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {userRolesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} users`, 'Count']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Alerts</CardTitle>
              <CardDescription>Distribution of security incidents by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={securityAlertsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#ff8042" name="Count" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="support" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Support Ticket Trends</CardTitle>
              <CardDescription>Open vs resolved tickets over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={supportTicketsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="open" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="resolved" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminReports;
