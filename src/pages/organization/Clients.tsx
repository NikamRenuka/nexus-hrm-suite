
import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  CheckCircle, 
  XCircle 
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
import { toast } from '@/hooks/use-toast';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  joinedDate: string;
}

const MOCK_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    company: 'Acme Corporation',
    email: 'john.smith@acme.com',
    phone: '(123) 456-7890',
    status: 'active',
    joinedDate: '2023-03-15'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    company: 'Globex Industries',
    email: 'sarah.j@globex.com',
    phone: '(234) 567-8901',
    status: 'active',
    joinedDate: '2023-04-22'
  },
  {
    id: '3',
    name: 'Michael Brown',
    company: 'Stark Innovations',
    email: 'michael@stark.io',
    phone: '(345) 678-9012',
    status: 'active',
    joinedDate: '2023-05-10'
  },
  {
    id: '4',
    name: 'Jessica Taylor',
    company: 'Wayne Enterprises',
    email: 'jessica@wayne.co',
    phone: '(456) 789-0123',
    status: 'inactive',
    joinedDate: '2023-01-05'
  },
  {
    id: '5',
    name: 'Robert Wilson',
    company: 'Umbrella Corp',
    email: 'robert@umbrella.org',
    phone: '(567) 890-1234',
    status: 'active',
    joinedDate: '2023-02-18'
  }
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
    company: '',
    email: '',
    phone: '',
    status: 'active',
  });

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    const id = Math.random().toString(36).substring(7);
    const currentDate = new Date().toISOString().split('T')[0];
    
    const clientToAdd = {
      id,
      name: newClient.name,
      company: newClient.company,
      email: newClient.email,
      phone: newClient.phone,
      status: newClient.status as 'active' | 'inactive',
      joinedDate: currentDate
    };
    
    setClients([...clients, clientToAdd]);
    setIsAddDialogOpen(false);
    setNewClient({
      name: '',
      company: '',
      email: '',
      phone: '',
      status: 'active',
    });
    
    toast({
      title: "Client added",
      description: `${clientToAdd.name} has been added successfully.`,
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
      description: `${selectedClient.name} has been updated successfully.`,
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
      title: "Client deleted",
      description: `${selectedClient.name} has been removed from the system.`,
    });
    
    setSelectedClient(null);
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
        <h1 className="text-2xl font-bold tracking-tight">Client Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Platform Clients</CardTitle>
          <div className="flex items-center">
            <Search className="h-4 w-4 mr-2 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              className="w-full max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 px-4 py-3 bg-muted/50 text-sm font-medium">
              <div className="col-span-2">Client</div>
              <div>Company</div>
              <div>Phone</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>
            <div className="divide-y">
              {filteredClients.map((client) => (
                <div key={client.id} className="grid grid-cols-6 px-4 py-3 items-center">
                  <div className="col-span-2 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3">
                      {client.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground">{client.email}</div>
                    </div>
                  </div>
                  <div>{client.company}</div>
                  <div>{client.phone}</div>
                  <div>
                    <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                      {client.status}
                    </Badge>
                  </div>
                  <div className="text-right">
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
                        <DropdownMenuItem onClick={() => openDeleteDialog(client)} className="text-red-600">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              
              {filteredClients.length === 0 && (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  No clients found matching your search.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Client Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Add a new client to the platform. All fields are required.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name">Client Name</Label>
              <Input
                id="name"
                value={newClient.name}
                onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                placeholder="Enter client name"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={newClient.company}
                onChange={(e) => setNewClient({...newClient, company: e.target.value})}
                placeholder="Enter client's company"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                placeholder="client@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={newClient.phone}
                onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                placeholder="(123) 456-7890"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newClient.status}
                onChange={(e) => setNewClient({...newClient, status: e.target.value as 'active' | 'inactive'})}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddClient}>Add Client</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Client Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>
              Make changes to the client information.
            </DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-name">Client Name</Label>
                <Input
                  id="edit-name"
                  value={selectedClient.name}
                  onChange={(e) => setSelectedClient({...selectedClient, name: e.target.value})}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-company">Company</Label>
                <Input
                  id="edit-company"
                  value={selectedClient.company}
                  onChange={(e) => setSelectedClient({...selectedClient, company: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedClient.email}
                  onChange={(e) => setSelectedClient({...selectedClient, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  value={selectedClient.phone}
                  onChange={(e) => setSelectedClient({...selectedClient, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedClient.status}
                  onChange={(e) => setSelectedClient({...selectedClient, status: e.target.value as 'active' | 'inactive'})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
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
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this client? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="py-4">
              <p className="mb-2">You are about to delete:</p>
              <div className="p-4 rounded-md bg-muted">
                <p className="font-medium">{selectedClient.name}</p>
                <p className="text-sm text-muted-foreground">{selectedClient.email} • {selectedClient.company}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteClient}>Delete Client</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;
