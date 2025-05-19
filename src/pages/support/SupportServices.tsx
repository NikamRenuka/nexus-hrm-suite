
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeadsetHelp, Search, Filter, MessageSquare, CheckCircle, Clock, AlertCircle, MoreHorizontal, UserPlus } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  company: string;
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  messages: number;
}

const mockTickets: SupportTicket[] = [
  {
    id: 'TICK-1001',
    subject: 'Cannot access payroll module',
    description: 'Users are unable to access the payroll processing module since the latest update.',
    company: 'Acme Corporation',
    status: 'new',
    priority: 'high',
    createdAt: '2023-10-18 09:23',
    updatedAt: '2023-10-18 09:23',
    messages: 3,
  },
  {
    id: 'TICK-1002',
    subject: 'Error when generating reports',
    description: 'Error message appears when trying to generate monthly attendance reports.',
    company: 'Globex Industries',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2023-10-17 14:35',
    updatedAt: '2023-10-18 10:15',
    assignedTo: 'Sarah Johnson',
    messages: 5,
  },
  {
    id: 'TICK-1003',
    subject: 'New feature request: Time tracking',
    description: 'Request to add a time tracking feature for remote employees.',
    company: 'Wayne Enterprises',
    status: 'in-progress',
    priority: 'low',
    createdAt: '2023-10-15 11:20',
    updatedAt: '2023-10-17 16:45',
    assignedTo: 'Michael Brown',
    messages: 8,
  },
  {
    id: 'TICK-1004',
    subject: 'System downtime during payroll processing',
    description: 'System became unresponsive during the monthly payroll processing cycle.',
    company: 'Stark Innovations',
    status: 'resolved',
    priority: 'urgent',
    createdAt: '2023-10-16 08:10',
    updatedAt: '2023-10-16 12:30',
    assignedTo: 'Sarah Johnson',
    messages: 6,
  },
  {
    id: 'TICK-1005',
    subject: 'Integration with accounting software',
    description: 'Need help setting up the integration with QuickBooks.',
    company: 'Umbrella Corp',
    status: 'closed',
    priority: 'medium',
    createdAt: '2023-10-14 09:45',
    updatedAt: '2023-10-15 14:20',
    assignedTo: 'David Miller',
    messages: 4,
  },
];

const supportAgents = [
  { id: '1', name: 'Sarah Johnson' },
  { id: '2', name: 'David Miller' },
  { id: '3', name: 'Michael Brown' },
  { id: '4', name: 'Emily Wilson' },
];

const SupportServices: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Filter tickets based on search term, active tab, and priority
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'open' && (ticket.status === 'new' || ticket.status === 'in-progress')) ||
                      (activeTab === 'resolved' && (ticket.status === 'resolved' || ticket.status === 'closed'));
    
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesTab && matchesPriority;
  });

  const handleAssignTicket = (ticketId: string, agentId: string, agentName: string) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          assignedTo: agentName,
          status: ticket.status === 'new' ? 'in-progress' as const : ticket.status,
          updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
        };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    
    toast({
      title: "Ticket assigned",
      description: `Ticket ${ticketId} assigned to ${agentName}.`,
    });
  };

  const handleChangeStatus = (ticketId: string, newStatus: 'new' | 'in-progress' | 'resolved' | 'closed') => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          status: newStatus,
          updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
        };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    
    toast({
      title: "Status updated",
      description: `Ticket ${ticketId} status changed to ${newStatus}.`,
    });
  };

  const handleChangePriority = (ticketId: string, newPriority: 'low' | 'medium' | 'high' | 'urgent') => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          priority: newPriority,
          updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
        };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    
    toast({
      title: "Priority updated",
      description: `Ticket ${ticketId} priority changed to ${newPriority}.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'closed':
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="secondary">New</Badge>;
      case 'in-progress':
        return <Badge variant="default">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="outline">Resolved</Badge>;
      case 'closed':
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>;
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Support Services</h1>
          <p className="text-muted-foreground">
            Manage support tickets and client requests
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <HeadsetHelp className="mr-2 h-4 w-4" /> New Support Request
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Manage and respond to client support requests</CardDescription>
            </div>
            
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute top-3 left-3 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="p-2">
                    <p className="text-sm font-medium mb-1">Filter by priority:</p>
                    <div className="grid gap-1">
                      <Button 
                        variant={priorityFilter === 'all' ? 'default' : 'outline'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setPriorityFilter('all')}
                      >
                        All
                      </Button>
                      <Button 
                        variant={priorityFilter === 'urgent' ? 'default' : 'outline'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setPriorityFilter('urgent')}
                      >
                        Urgent
                      </Button>
                      <Button 
                        variant={priorityFilter === 'high' ? 'default' : 'outline'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setPriorityFilter('high')}
                      >
                        High
                      </Button>
                      <Button 
                        variant={priorityFilter === 'medium' ? 'default' : 'outline'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setPriorityFilter('medium')}
                      >
                        Medium
                      </Button>
                      <Button 
                        variant={priorityFilter === 'low' ? 'default' : 'outline'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setPriorityFilter('low')}
                      >
                        Low
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Tickets</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 text-sm">
                  <th className="p-3 text-left font-medium">Ticket</th>
                  <th className="p-3 text-left font-medium">Company</th>
                  <th className="p-3 text-left font-medium">Status</th>
                  <th className="p-3 text-left font-medium">Priority</th>
                  <th className="p-3 text-left font-medium">Assigned To</th>
                  <th className="p-3 text-left font-medium">Updated</th>
                  <th className="p-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-muted/50">
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{ticket.subject}</span>
                        <span className="text-xs text-muted-foreground">{ticket.id}</span>
                      </div>
                    </td>
                    <td className="p-3">{ticket.company}</td>
                    <td className="p-3">{getStatusBadge(ticket.status)}</td>
                    <td className="p-3">{getPriorityBadge(ticket.priority)}</td>
                    <td className="p-3">
                      {ticket.assignedTo || <span className="text-muted-foreground">Unassigned</span>}
                    </td>
                    <td className="p-3">
                      <span className="text-sm">{ticket.updatedAt}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            
                            {/* Assign to agent */}
                            <DropdownMenuItem>
                              <div className="flex items-center">
                                <UserPlus className="h-4 w-4 mr-2" />
                                <span>Assign to</span>
                              </div>
                            </DropdownMenuItem>
                            {supportAgents.map(agent => (
                              <DropdownMenuItem 
                                key={agent.id}
                                onSelect={() => handleAssignTicket(ticket.id, agent.id, agent.name)}
                                className="pl-8"
                              >
                                {agent.name}
                              </DropdownMenuItem>
                            ))}
                            
                            <DropdownMenuSeparator />
                            
                            {/* Status changes */}
                            {ticket.status !== 'new' && (
                              <DropdownMenuItem onSelect={() => handleChangeStatus(ticket.id, 'new')}>
                                <Clock className="h-4 w-4 mr-2 text-blue-500" />
                                Set as New
                              </DropdownMenuItem>
                            )}
                            {ticket.status !== 'in-progress' && (
                              <DropdownMenuItem onSelect={() => handleChangeStatus(ticket.id, 'in-progress')}>
                                <Clock className="h-4 w-4 mr-2 text-amber-500" />
                                Set In Progress
                              </DropdownMenuItem>
                            )}
                            {ticket.status !== 'resolved' && (
                              <DropdownMenuItem onSelect={() => handleChangeStatus(ticket.id, 'resolved')}>
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                Mark Resolved
                              </DropdownMenuItem>
                            )}
                            {ticket.status !== 'closed' && (
                              <DropdownMenuItem onSelect={() => handleChangeStatus(ticket.id, 'closed')}>
                                <CheckCircle className="h-4 w-4 mr-2 text-gray-500" />
                                Close Ticket
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuSeparator />
                            
                            {/* Priority changes */}
                            <DropdownMenuItem>
                              <div className="flex items-center">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                <span>Set Priority</span>
                              </div>
                            </DropdownMenuItem>
                            {ticket.priority !== 'urgent' && (
                              <DropdownMenuItem 
                                onSelect={() => handleChangePriority(ticket.id, 'urgent')}
                                className="pl-8"
                              >
                                Urgent
                              </DropdownMenuItem>
                            )}
                            {ticket.priority !== 'high' && (
                              <DropdownMenuItem 
                                onSelect={() => handleChangePriority(ticket.id, 'high')}
                                className="pl-8"
                              >
                                High
                              </DropdownMenuItem>
                            )}
                            {ticket.priority !== 'medium' && (
                              <DropdownMenuItem 
                                onSelect={() => handleChangePriority(ticket.id, 'medium')}
                                className="pl-8"
                              >
                                Medium
                              </DropdownMenuItem>
                            )}
                            {ticket.priority !== 'low' && (
                              <DropdownMenuItem 
                                onSelect={() => handleChangePriority(ticket.id, 'low')}
                                className="pl-8"
                              >
                                Low
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTickets.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-muted-foreground">
                      No tickets found matching your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredTickets.length} of {tickets.length} tickets
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ticket Summary</CardTitle>
            <CardDescription>Overview of support tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span>New</span>
                </div>
                <span className="font-bold">
                  {tickets.filter(t => t.status === 'new').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                  <span>In Progress</span>
                </div>
                <span className="font-bold">
                  {tickets.filter(t => t.status === 'in-progress').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Resolved</span>
                </div>
                <span className="font-bold">
                  {tickets.filter(t => t.status === 'resolved').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                  <span>Closed</span>
                </div>
                <span className="font-bold">
                  {tickets.filter(t => t.status === 'closed').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Priority Breakdown</CardTitle>
            <CardDescription>Tickets by priority level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
                  <span>Urgent</span>
                </div>
                <span className="font-bold">
                  {tickets.filter(t => t.priority === 'urgent').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <span>High</span>
                </div>
                <span className="font-bold">
                  {tickets.filter(t => t.priority === 'high').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
                  <span>Medium</span>
                </div>
                <span className="font-bold">
                  {tickets.filter(t => t.priority === 'medium').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <span>Low</span>
                </div>
                <span className="font-bold">
                  {tickets.filter(t => t.priority === 'low').length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Companies</CardTitle>
            <CardDescription>Companies with most tickets</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Simple count of tickets per company */}
            {Object.entries(
              tickets.reduce((acc, ticket) => {
                acc[ticket.company] = (acc[ticket.company] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            )
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([company, count], index) => (
                <div key={company} className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold mr-2">
                      {index + 1}
                    </div>
                    <span>{company}</span>
                  </div>
                  <span className="font-bold">{count}</span>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportServices;
