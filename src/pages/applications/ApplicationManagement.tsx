
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusIcon, ArrowUpDown, Settings, Search, MoreHorizontal, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface Application {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'inactive' | 'maintenance';
  version: string;
  lastUpdated: string;
}

const mockApplications: Application[] = [
  {
    id: '1',
    name: 'HR Core',
    description: 'Main HR platform functionality',
    category: 'Core',
    status: 'active',
    version: '3.5.2',
    lastUpdated: '2023-10-15',
  },
  {
    id: '2',
    name: 'Payroll Module',
    description: 'Salary processing and payslips',
    category: 'Finance',
    status: 'active',
    version: '2.1.0',
    lastUpdated: '2023-09-28',
  },
  {
    id: '3',
    name: 'Recruitment Portal',
    description: 'Job postings and applicant tracking',
    category: 'Recruitment',
    status: 'maintenance',
    version: '1.8.3',
    lastUpdated: '2023-10-10',
  },
  {
    id: '4',
    name: 'Learning Management',
    description: 'Employee training and development',
    category: 'Training',
    status: 'active',
    version: '2.0.5',
    lastUpdated: '2023-10-05',
  },
  {
    id: '5',
    name: 'Analytics Dashboard',
    description: 'HR metrics and reporting',
    category: 'Reporting',
    status: 'inactive',
    version: '0.9.1',
    lastUpdated: '2023-08-22',
  },
];

const ApplicationManagement: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [newApp, setNewApp] = useState({
    name: '',
    description: '',
    category: '',
    status: 'inactive' as 'active' | 'inactive' | 'maintenance',
    version: '1.0.0',
  });

  // Filter applications based on search term and status
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddApp = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const newAppWithId = {
      id: Math.random().toString(36).substr(2, 9),
      ...newApp,
      lastUpdated: currentDate
    };
    
    setApplications([...applications, newAppWithId]);
    setIsAddDialogOpen(false);
    setNewApp({
      name: '',
      description: '',
      category: '',
      status: 'inactive',
      version: '1.0.0',
    });
    
    toast({
      title: "Application added",
      description: `${newApp.name} has been added successfully.`,
    });
  };

  const handleEditApp = () => {
    if (!selectedApp) return;
    
    const updatedApps = applications.map(app => 
      app.id === selectedApp.id ? selectedApp : app
    );
    
    setApplications(updatedApps);
    setIsEditDialogOpen(false);
    setSelectedApp(null);
    
    toast({
      title: "Application updated",
      description: `${selectedApp.name} has been updated successfully.`,
    });
  };

  const handleUpdateStatus = (app: Application, newStatus: 'active' | 'inactive' | 'maintenance') => {
    const updatedApps = applications.map(a => 
      a.id === app.id ? {...a, status: newStatus} : a
    );
    
    setApplications(updatedApps);
    
    toast({
      title: "Status updated",
      description: `${app.name} status changed to ${newStatus}.`,
    });
  };

  const openEditDialog = (app: Application) => {
    setSelectedApp({...app});
    setIsEditDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'maintenance':
        return <Badge variant="outline">Maintenance</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Application Management</h1>
          <p className="text-muted-foreground">
            Manage all platform applications and modules
          </p>
        </div>
        <Button className="mt-4 sm:mt-0" onClick={() => setIsAddDialogOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Application
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Platform Applications</CardTitle>
          <CardDescription>All applications available in the system</CardDescription>
          
          <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
            <div className="flex items-center flex-1">
              <Search className="h-4 w-4 mr-2 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button 
                variant={filterStatus === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('active')}
              >
                Active
              </Button>
              <Button 
                variant={filterStatus === 'maintenance' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('maintenance')}
              >
                Maintenance
              </Button>
              <Button 
                variant={filterStatus === 'inactive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('inactive')}
              >
                Inactive
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 p-4 border-b bg-muted/50 text-sm font-medium">
              <div className="col-span-3">Name</div>
              <div className="col-span-3">Category</div>
              <div className="col-span-2">Version</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            <div className="divide-y">
              {filteredApplications.map((app) => (
                <div key={app.id} className="grid grid-cols-12 p-4 items-center">
                  <div className="col-span-3">
                    <div className="font-medium">{app.name}</div>
                    <div className="text-sm text-muted-foreground">{app.description}</div>
                  </div>
                  <div className="col-span-3">{app.category}</div>
                  <div className="col-span-2">v{app.version}</div>
                  <div className="col-span-2">{getStatusBadge(app.status)}</div>
                  <div className="col-span-2 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(app)}>
                          <Settings className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        {app.status !== 'active' && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(app, 'active')}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Set Active
                          </DropdownMenuItem>
                        )}
                        {app.status !== 'maintenance' && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(app, 'maintenance')}>
                            <Settings className="h-4 w-4 mr-2" />
                            Set Maintenance
                          </DropdownMenuItem>
                        )}
                        {app.status !== 'inactive' && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(app, 'inactive')}>
                            <XCircle className="h-4 w-4 mr-2" />
                            Set Inactive
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              {filteredApplications.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  No applications found matching your search.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Application Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Application</DialogTitle>
            <DialogDescription>
              Add a new application to the platform. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Application Name</Label>
              <Input
                id="name"
                value={newApp.name}
                onChange={(e) => setNewApp({...newApp, name: e.target.value})}
                placeholder="Enter application name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newApp.description}
                onChange={(e) => setNewApp({...newApp, description: e.target.value})}
                placeholder="Short description of the application"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newApp.category}
                  onChange={(e) => setNewApp({...newApp, category: e.target.value})}
                  placeholder="e.g., Core, Reporting"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  value={newApp.version}
                  onChange={(e) => setNewApp({...newApp, version: e.target.value})}
                  placeholder="e.g., 1.0.0"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Initial Status</Label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newApp.status}
                onChange={(e) => setNewApp({...newApp, status: e.target.value as 'active' | 'inactive' | 'maintenance'})}
              >
                <option value="inactive">Inactive</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddApp}>Add Application</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Application Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Application</DialogTitle>
            <DialogDescription>
              Update the application details.
            </DialogDescription>
          </DialogHeader>
          {selectedApp && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Application Name</Label>
                <Input
                  id="edit-name"
                  value={selectedApp.name}
                  onChange={(e) => setSelectedApp({...selectedApp, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={selectedApp.description}
                  onChange={(e) => setSelectedApp({...selectedApp, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Input
                    id="edit-category"
                    value={selectedApp.category}
                    onChange={(e) => setSelectedApp({...selectedApp, category: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-version">Version</Label>
                  <Input
                    id="edit-version"
                    value={selectedApp.version}
                    onChange={(e) => setSelectedApp({...selectedApp, version: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedApp.status}
                  onChange={(e) => setSelectedApp({...selectedApp, status: e.target.value as 'active' | 'inactive' | 'maintenance'})}
                >
                  <option value="inactive">Inactive</option>
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditApp}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationManagement;
