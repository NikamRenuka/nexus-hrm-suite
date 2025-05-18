
import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash,
  UserPlus,
  Mail,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/hooks/use-toast';

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: 'active' | 'pending' | 'blocked';
  lastActive: string;
  permissions: string[];
}

const MOCK_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@acme.com',
    company: 'Acme Corporation',
    role: 'Admin',
    status: 'active',
    lastActive: '2023-10-15',
    permissions: ['full_access', 'billing', 'user_management']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@globex.com',
    company: 'Globex Industries',
    role: 'HR Manager',
    status: 'active',
    lastActive: '2023-10-18',
    permissions: ['hr_module', 'payroll', 'reports']
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.j@stark.io',
    company: 'Stark Innovations',
    role: 'Admin',
    status: 'active',
    lastActive: '2023-10-12',
    permissions: ['full_access', 'user_management']
  },
  {
    id: '4',
    name: 'Emily Clark',
    email: 'emily.c@wayne.co',
    company: 'Wayne Enterprises',
    role: 'Finance Manager',
    status: 'pending',
    lastActive: '-',
    permissions: ['payroll', 'billing']
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.b@umbrella.org',
    company: 'Umbrella Corp',
    role: 'Admin',
    status: 'blocked',
    lastActive: '2023-09-30',
    permissions: ['full_access']
  }
];

const roleOptions = ['Admin', 'HR Manager', 'Finance Manager', 'Department Head'];

const permissionOptions = [
  { id: 'full_access', label: 'Full Access' },
  { id: 'user_management', label: 'User Management' },
  { id: 'hr_module', label: 'HR Module' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'reports', label: 'Reports' },
  { id: 'billing', label: 'Billing & Subscription' }
];

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Admin',
    status: 'pending',
    permissions: ['user_management']
  });
  const [activeTab, setActiveTab] = useState('all');

  const filteredClients = clients.filter(client => {
    // Filter by search term
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && client.status === 'active';
    if (activeTab === 'pending') return matchesSearch && client.status === 'pending';
    if (activeTab === 'blocked') return matchesSearch && client.status === 'blocked';
    
    return matchesSearch;
  });

  const handleAddClient = () => {
    const id = Math.random().toString(36).substring(7);
    
    const clientToAdd = {
      id,
      name: newClient.name,
      email: newClient.email,
      company: newClient.company,
      role: newClient.role,
      status: newClient.status as 'active' | 'pending' | 'blocked',
      lastActive: '-',
      permissions: newClient.permissions
    };
    
    setClients([...clients, clientToAdd]);
    setIsAddDialogOpen(false);
    setNewClient({
      name: '',
      email: '',
      company: '',
      role: 'Admin',
      status: 'pending',
      permissions: ['user_management']
    });
    
    toast({
      title: "Client added",
      description: `${clientToAdd.name} has been added as ${clientToAdd.role}.`,
    });
  };

  const handleEditClient = () => {
    if (!selectedClient) return;
    
    const updatedClients = clients.map(client => 
      client.id === selectedClient.id ? selectedClient : client
    );
    
    setClients(updatedClients);
    setIsEditDialogOpen(false);
    setSelectedClient(null);
    
    toast({
      title: "Client updated",
      description: `${selectedClient.name}'s information has been updated.`,
    });
  };

  const handleDeleteClient = () => {
    if (!selectedClient) return;
    
    const updatedClients = clients.filter(client => 
      client.id !== selectedClient.id
    );
    
    setClients(updatedClients);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Client removed",
      description: `${selectedClient.name} has been removed from the platform.`,
    });
    
    setSelectedClient(null);
  };

  const handleResendInvitation = (client: Client) => {
    toast({
      title: "Invitation resent",
      description: `Invitation has been resent to ${client.email}.`,
    });
  };

  const togglePermission = (permission: string) => {
    if (!newClient) return;
    
    setNewClient(prev => {
      const permissions = [...prev.permissions];
      if (permissions.includes(permission)) {
        return {...prev, permissions: permissions.filter(p => p !== permission)};
      } else {
        return {...prev, permissions: [...permissions, permission]};
      }
    });
  };

  const togglePermissionForEdit = (permission: string) => {
    if (!selectedClient) return;
    
    const permissions = [...selectedClient.permissions];
    if (permissions.includes(permission)) {
      setSelectedClient({...selectedClient, permissions: permissions.filter(p => p !== permission)});
    } else {
      setSelectedClient({...selectedClient, permissions: [...permissions, permission]});
    }
  };

  const openEditDialog = (client: Client) => {
    setSelectedClient({...client});
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Client Accounts</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Client Management</CardTitle>
          <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
            <div className="flex items-center w-full max-w-sm">
              <Search className="h-4 w-4 mr-2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="blocked">Blocked</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="hidden md:grid grid-cols-7 px-4 py-3 bg-muted/50 text-sm font-medium">
              <div className="col-span-2">Name / Email</div>
              <div>Company</div>
              <div>Role</div>
              <div>Status</div>
              <div>Last Active</div>
              <div className="text-right">Actions</div>
            </div>
            <div className="divide-y">
              {filteredClients.map((client) => (
                <div key={client.id} className="grid grid-cols-1 md:grid-cols-7 px-4 py-3 items-center gap-y-2 md:gap-y-0">
                  <div className="col-span-2 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3 flex-shrink-0">
                      {client.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground">{client.email}</div>
                    </div>
                  </div>
                  <div className="md:hidden font-medium text-sm text-muted-foreground">Company</div>
                  <div>{client.company}</div>
                  
                  <div className="md:hidden font-medium text-sm text-muted-foreground">Role</div>
                  <div>{client.role}</div>
                  
                  <div className="md:hidden font-medium text-sm text-muted-foreground">Status</div>
                  <div>
                    <Badge 
                      variant={
                        client.status === 'active' ? 'default' : 
                        client.status === 'pending' ? 'secondary' : 
                        'destructive'
                      }
                    >
                      {client.status}
                    </Badge>
                  </div>
                  
                  <div className="md:hidden font-medium text-sm text-muted-foreground">Last Active</div>
                  <div>{client.lastActive}</div>
                  
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(client)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        {client.status === 'pending' && (
                          <DropdownMenuItem onClick={() => handleResendInvitation(client)}>
                            <Mail className="h-4 w-4 mr-2" />
                            Resend Invitation
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => openDeleteDialog(client)} className="text-red-600">
                          <Trash className="h-4 w-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              
              {filteredClients.length === 0 && (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  No clients found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Client Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Add a new client account to provide access to the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  placeholder="email@example.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={newClient.company}
                  onChange={(e) => setNewClient({...newClient, company: e.target.value})}
                  placeholder="Select company"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newClient.role}
                  onChange={(e) => setNewClient({...newClient, role: e.target.value})}
                >
                  {roleOptions.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label>Permissions</Label>
                <p className="text-sm text-muted-foreground">Select the permissions for this client account.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {permissionOptions.map(permission => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`perm-${permission.id}`}
                      checked={newClient.permissions.includes(permission.id)}
                      onChange={() => togglePermission(permission.id)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label 
                      htmlFor={`perm-${permission.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {permission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddClient}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Client Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>
              Update client account details and permissions.
            </DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedClient.name}
                    onChange={(e) => setSelectedClient({...selectedClient, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email Address</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={selectedClient.email}
                    onChange={(e) => setSelectedClient({...selectedClient, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-company">Company</Label>
                  <Input
                    id="edit-company"
                    value={selectedClient.company}
                    onChange={(e) => setSelectedClient({...selectedClient, company: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <select
                    id="edit-role"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedClient.role}
                    onChange={(e) => setSelectedClient({...selectedClient, role: e.target.value})}
                  >
                    {roleOptions.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedClient.status}
                  onChange={(e) => setSelectedClient({...selectedClient, status: e.target.value as 'active' | 'pending' | 'blocked'})}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Permissions</Label>
                  <p className="text-sm text-muted-foreground">Update the permissions for this client account.</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {permissionOptions.map(permission => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`edit-perm-${permission.id}`}
                        checked={selectedClient.permissions.includes(permission.id)}
                        onChange={() => togglePermissionForEdit(permission.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label 
                        htmlFor={`edit-perm-${permission.id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {permission.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditClient}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Client Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remove Client</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this client account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="py-4">
              <p className="mb-2">You are about to remove:</p>
              <div className="p-4 rounded-md bg-muted">
                <p className="font-medium">{selectedClient.name}</p>
                <p className="text-sm text-muted-foreground">{selectedClient.email}</p>
                <p className="text-sm text-muted-foreground">{selectedClient.company} • {selectedClient.role}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteClient}>
              <Trash className="h-4 w-4 mr-2" />
              Remove Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;
