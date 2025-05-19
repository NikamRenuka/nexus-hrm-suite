
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Users, Lock, UnlockIcon, Eye, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const SecurityDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for security dashboard
  const securityScore = 85;
  const recentEvents = [
    { id: 1, event: 'Failed login attempt', user: 'john.doe@example.com', time: '10 minutes ago', severity: 'medium' },
    { id: 2, event: 'Password changed', user: 'admin@acme.com', time: '2 hours ago', severity: 'low' },
    { id: 3, event: 'Account locked', user: 'sarah.smith@globex.com', time: '3 hours ago', severity: 'high' },
    { id: 4, event: 'New admin user created', user: 'mike.johnson@stark.io', time: '5 hours ago', severity: 'medium' },
    { id: 5, event: 'Permission changes', user: 'admin@wayne.co', time: '1 day ago', severity: 'medium' }
  ];
  
  const vulnerabilities = [
    { id: 1, issue: 'Outdated password policy', risk: 'high', affected: 'All users', status: 'needs-action' },
    { id: 2, issue: 'Missing two-factor authentication', risk: 'high', affected: '43% of users', status: 'in-progress' },
    { id: 3, issue: 'Session timeout too long', risk: 'medium', affected: 'All users', status: 'needs-action' },
    { id: 4, issue: 'Weak password detected', risk: 'medium', affected: '12 users', status: 'needs-action' }
  ];
  
  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'high':
        return <Badge variant="destructive">{severity}</Badge>;
      case 'medium':
        return <Badge variant="secondary">{severity}</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };
  
  const getRiskBadge = (risk: string) => {
    switch(risk) {
      case 'high':
        return <Badge variant="destructive">{risk}</Badge>;
      case 'medium':
        return <Badge variant="secondary">{risk}</Badge>;
      default:
        return <Badge variant="outline">{risk}</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'needs-action':
        return <Badge variant="destructive">Needs action</Badge>;
      case 'in-progress':
        return <Badge variant="secondary">In progress</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Security Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage security across the platform.
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Shield className="mr-2 h-4 w-4" /> Security Audit
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityScore}/100</div>
            <Progress value={securityScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {securityScore >= 80 ? 'Good' : securityScore >= 60 ? 'Fair' : 'Poor'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+5 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">Active users right now</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MFA Adoption</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">57%</div>
            <Progress value={57} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Target: 100%
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Security Events</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Security Events</CardTitle>
                <CardDescription>Latest security-related activities across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.slice(0, 3).map(event => (
                    <div key={event.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{event.event}</p>
                        <p className="text-xs text-muted-foreground">{event.user}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(event.severity)}
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{event.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="mt-4 p-0">View all events</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Security Recommendations</CardTitle>
                <CardDescription>Suggested actions to improve security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Enable Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">43% of users don't have 2FA enabled</p>
                      <Button size="sm" className="mt-2">Enable for all</Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Update Password Policy</p>
                      <p className="text-xs text-muted-foreground">Current policy doesn't meet industry standards</p>
                      <Button size="sm" className="mt-2">Review policy</Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Reduce Session Timeout</p>
                      <p className="text-xs text-muted-foreground">Current timeout is 2 hours, recommended is 30 minutes</p>
                      <Button size="sm" className="mt-2">Adjust timeout</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Security Events Log</CardTitle>
              <CardDescription>Complete history of security-related activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-10 px-4 text-left font-medium">Event</th>
                      <th className="h-10 px-4 text-left font-medium">User</th>
                      <th className="h-10 px-4 text-left font-medium">Time</th>
                      <th className="h-10 px-4 text-left font-medium">Severity</th>
                      <th className="h-10 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEvents.map(event => (
                      <tr key={event.id} className="border-b">
                        <td className="p-4">{event.event}</td>
                        <td className="p-4">{event.user}</td>
                        <td className="p-4">{event.time}</td>
                        <td className="p-4">{getSeverityBadge(event.severity)}</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vulnerabilities">
          <Card>
            <CardHeader>
              <CardTitle>Security Vulnerabilities</CardTitle>
              <CardDescription>Detected security issues that need attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-10 px-4 text-left font-medium">Issue</th>
                      <th className="h-10 px-4 text-left font-medium">Risk Level</th>
                      <th className="h-10 px-4 text-left font-medium">Affected</th>
                      <th className="h-10 px-4 text-left font-medium">Status</th>
                      <th className="h-10 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vulnerabilities.map(vuln => (
                      <tr key={vuln.id} className="border-b">
                        <td className="p-4">{vuln.issue}</td>
                        <td className="p-4">{getRiskBadge(vuln.risk)}</td>
                        <td className="p-4">{vuln.affected}</td>
                        <td className="p-4">{getStatusBadge(vuln.status)}</td>
                        <td className="p-4">
                          <Button variant="outline" size="sm">Fix</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityDashboard;
