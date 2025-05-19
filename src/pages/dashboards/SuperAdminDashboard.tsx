
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowUpIcon, ArrowDownIcon, Building, Users, ShieldCheck, Clock, AlertTriangle, HeadsetHelp } from "lucide-react";

const SuperAdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
        <p className="text-muted-foreground">
          Welcome to the Super Admin Dashboard - Monitor and manage the entire platform
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUpIcon className="h-3 w-3 mr-1" /> +5.3%
              </span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18,492</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUpIcon className="h-3 w-3 mr-1" /> +8.2%
              </span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.98%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
            <HeadsetHelp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center">
                <ArrowUpIcon className="h-3 w-3 mr-1" /> +4
              </span> from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Frequently used management areas</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link to="/organization/companies">
              <Button variant="outline" className="w-full justify-start">
                <Building className="mr-2 h-4 w-4" />
                Companies
              </Button>
            </Link>
            <Link to="/organization/users">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Users
              </Button>
            </Link>
            <Link to="/security">
              <Button variant="outline" className="w-full justify-start">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Security
              </Button>
            </Link>
            <Link to="/support">
              <Button variant="outline" className="w-full justify-start">
                <HeadsetHelp className="mr-2 h-4 w-4" />
                Support
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="md:col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
            <CardDescription>Recent security events requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                <div>
                  <p className="text-sm font-medium">Multiple failed login attempts</p>
                  <p className="text-xs text-muted-foreground">5 attempts for user admin@acme.com</p>
                  <p className="text-xs text-muted-foreground">10 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                <div>
                  <p className="text-sm font-medium">Unusual login location</p>
                  <p className="text-xs text-muted-foreground">user.smith@globex.com logged in from new location</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                <div>
                  <p className="text-sm font-medium">Admin role assigned</p>
                  <p className="text-xs text-muted-foreground">New admin role for dave@wayne.co</p>
                  <p className="text-xs text-muted-foreground">Yesterday at 14:20</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                View All Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="companies">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        <TabsContent value="companies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Companies</CardTitle>
              <CardDescription>
                Recently added companies to the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground">
                  <div>Company</div>
                  <div>Industry</div>
                  <div>Added</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-3 py-2">
                    <div>TechStream Inc.</div>
                    <div>Technology</div>
                    <div>2 days ago</div>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <div>Green Fields Ltd.</div>
                    <div>Agriculture</div>
                    <div>3 days ago</div>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <div>Quantum Analytics</div>
                    <div>Finance</div>
                    <div>5 days ago</div>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <div>BlueSky Airlines</div>
                    <div>Transport</div>
                    <div>1 week ago</div>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <div>MediPro Health</div>
                    <div>Healthcare</div>
                    <div>1 week ago</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                  <Link to="/organization/companies">View All Companies</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>
                Recently registered users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground">
                  <div>User</div>
                  <div>Role</div>
                  <div>Company</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-3 py-2">
                    <div>John Doe</div>
                    <div>Admin</div>
                    <div>TechStream Inc.</div>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <div>Sarah Miller</div>
                    <div>HR</div>
                    <div>Green Fields Ltd.</div>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <div>Robert Johnson</div>
                    <div>Manager</div>
                    <div>Quantum Analytics</div>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <div>Emily Clark</div>
                    <div>Employee</div>
                    <div>BlueSky Airlines</div>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <div>Michael Brown</div>
                    <div>Admin</div>
                    <div>MediPro Health</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                  <Link to="/organization/users">View All Users</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Recent platform activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground">
                  <div>Activity</div>
                  <div>User</div>
                  <div>Time</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-3 py-2">
                    <div>User Login</div>
                    <div>admin@techstream.com</div>
                    <div>10 minutes ago</div>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <div>Password Changed</div>
                    <div>hr@greenfields.com</div>
                    <div>1 hour ago</div>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <div>Role Updated</div>
                    <div>robert@quantum.com</div>
                    <div>2 hours ago</div>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <div>User Created</div>
                    <div>emily@bluesky.com</div>
                    <div>3 hours ago</div>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <div>Company Settings Updated</div>
                    <div>admin@medipro.com</div>
                    <div>5 hours ago</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>
                Current system status and health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground">
                  <div>Service</div>
                  <div>Status</div>
                  <div>Response Time</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-3 py-2">
                    <div>API Server</div>
                    <div className="text-green-500">Operational</div>
                    <div>235ms</div>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <div>Database</div>
                    <div className="text-green-500">Operational</div>
                    <div>178ms</div>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <div>File Storage</div>
                    <div className="text-green-500">Operational</div>
                    <div>312ms</div>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <div>Email Service</div>
                    <div className="text-green-500">Operational</div>
                    <div>420ms</div>
                  </div>
                  <div className="grid grid-cols-3 py-2">
                    <div>Authentication</div>
                    <div className="text-green-500">Operational</div>
                    <div>195ms</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View System Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminDashboard;
