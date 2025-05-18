
import React, { useState } from 'react';
import { 
  Building, 
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

interface Company {
  id: string;
  name: string;
  industry: string;
  email: string;
  employees: number;
  subscription: string;
  status: 'active' | 'inactive';
  joinedDate: string;
}

const MOCK_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    industry: 'Technology',
    email: 'contact@acme.com',
    employees: 250,
    subscription: 'Enterprise',
    status: 'active',
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Globex Industries',
    industry: 'Manufacturing',
    email: 'info@globex.com',
    employees: 520,
    subscription: 'Business',
    status: 'active',
    joinedDate: '2023-03-22'
  },
  {
    id: '3',
    name: 'Stark Innovations',
    industry: 'Technology',
    email: 'hello@stark.io',
    employees: 75,
    subscription: 'Professional',
    status: 'active',
    joinedDate: '2023-05-10'
  },
  {
    id: '4',
    name: 'Wayne Enterprises',
    industry: 'Finance',
    email: 'contact@wayne.co',
    employees: 135,
    subscription: 'Business',
    status: 'inactive',
    joinedDate: '2022-11-05'
  },
  {
    id: '5',
    name: 'Umbrella Corp',
    industry: 'Healthcare',
    email: 'info@umbrella.org',
    employees: 310,
    subscription: 'Enterprise',
    status: 'active',
    joinedDate: '2023-02-18'
  }
];

const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [newCompany, setNewCompany] = useState({
    name: '',
    industry: '',
    email: '',
    employees: 0,
    subscription: 'Professional',
    status: 'active',
  });

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCompany = () => {
    const id = Math.random().toString(36).substring(7);
    const currentDate = new Date().toISOString().split('T')[0];
    
    const companyToAdd = {
      id,
      name: newCompany.name,
      industry: newCompany.industry,
      email: newCompany.email,
      employees: newCompany.employees,
      subscription: newCompany.subscription,
      status: newCompany.status as 'active' | 'inactive',
      joinedDate: currentDate
    };
    
    setCompanies([...companies, companyToAdd]);
    setIsAddDialogOpen(false);
    setNewCompany({
      name: '',
      industry: '',
      email: '',
      employees: 0,
      subscription: 'Professional',
      status: 'active',
    });
    
    toast({
      title: "Company added",
      description: `${companyToAdd.name} has been added successfully.`,
    });
  };

  const handleEditCompany = () => {
    if (!selectedCompany) return;
    
    const updatedCompanies = companies.map(company => 
      company.id === selectedCompany.id ? selectedCompany : company
    );
    
    setCompanies(updatedCompanies);
    setIsEditDialogOpen(false);
    setSelectedCompany(null);
    
    toast({
      title: "Company updated",
      description: `${selectedCompany.name} has been updated successfully.`,
    });
  };

  const handleDeleteCompany = () => {
    if (!selectedCompany) return;
    
    const updatedCompanies = companies.filter(company => 
      company.id !== selectedCompany.id
    );
    
    setCompanies(updatedCompanies);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Company deleted",
      description: `${selectedCompany.name} has been removed from the platform.`,
    });
    
    setSelectedCompany(null);
  };

  const openEditDialog = (company: Company) => {
    setSelectedCompany({...company});
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (company: Company) => {
    setSelectedCompany(company);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Companies Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Company
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Platform Companies</CardTitle>
          <div className="flex items-center">
            <Search className="h-4 w-4 mr-2 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              className="w-full max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-7 px-4 py-3 bg-muted/50 text-sm font-medium">
              <div className="col-span-2">Company</div>
              <div>Industry</div>
              <div>Employees</div>
              <div>Subscription</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>
            <div className="divide-y">
              {filteredCompanies.map((company) => (
                <div key={company.id} className="grid grid-cols-7 px-4 py-3 items-center">
                  <div className="col-span-2 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3">
                      {company.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{company.name}</div>
                      <div className="text-sm text-muted-foreground">{company.email}</div>
                    </div>
                  </div>
                  <div>{company.industry}</div>
                  <div>{company.employees}</div>
                  <div>{company.subscription}</div>
                  <div>
                    <Badge variant={company.status === 'active' ? 'default' : 'secondary'}>
                      {company.status}
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
                        <DropdownMenuItem onClick={() => openEditDialog(company)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDeleteDialog(company)} className="text-red-600">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              
              {filteredCompanies.length === 0 && (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  No companies found matching your search.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Company Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Company</DialogTitle>
            <DialogDescription>
              Add a new company to the platform. All fields are required.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                value={newCompany.name}
                onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={newCompany.industry}
                onChange={(e) => setNewCompany({...newCompany, industry: e.target.value})}
                placeholder="e.g. Technology"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                type="email"
                value={newCompany.email}
                onChange={(e) => setNewCompany({...newCompany, email: e.target.value})}
                placeholder="contact@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employees">Employees</Label>
              <Input
                id="employees"
                type="number"
                value={newCompany.employees.toString()}
                onChange={(e) => setNewCompany({...newCompany, employees: parseInt(e.target.value) || 0})}
                placeholder="Number of employees"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subscription">Subscription</Label>
              <select
                id="subscription"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newCompany.subscription}
                onChange={(e) => setNewCompany({...newCompany, subscription: e.target.value})}
              >
                <option value="Professional">Professional</option>
                <option value="Business">Business</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newCompany.status}
                onChange={(e) => setNewCompany({...newCompany, status: e.target.value as 'active' | 'inactive'})}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCompany}>Add Company</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Company Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Company</DialogTitle>
            <DialogDescription>
              Make changes to the company information.
            </DialogDescription>
          </DialogHeader>
          {selectedCompany && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-name">Company Name</Label>
                <Input
                  id="edit-name"
                  value={selectedCompany.name}
                  onChange={(e) => setSelectedCompany({...selectedCompany, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-industry">Industry</Label>
                <Input
                  id="edit-industry"
                  value={selectedCompany.industry}
                  onChange={(e) => setSelectedCompany({...selectedCompany, industry: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Contact Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedCompany.email}
                  onChange={(e) => setSelectedCompany({...selectedCompany, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-employees">Employees</Label>
                <Input
                  id="edit-employees"
                  type="number"
                  value={selectedCompany.employees.toString()}
                  onChange={(e) => setSelectedCompany({...selectedCompany, employees: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-subscription">Subscription</Label>
                <select
                  id="edit-subscription"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedCompany.subscription}
                  onChange={(e) => setSelectedCompany({...selectedCompany, subscription: e.target.value})}
                >
                  <option value="Professional">Professional</option>
                  <option value="Business">Business</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedCompany.status}
                  onChange={(e) => setSelectedCompany({...selectedCompany, status: e.target.value as 'active' | 'inactive'})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditCompany}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Company Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this company? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedCompany && (
            <div className="py-4">
              <p className="mb-2">You are about to delete:</p>
              <div className="p-4 rounded-md bg-muted">
                <p className="font-medium">{selectedCompany.name}</p>
                <p className="text-sm text-muted-foreground">{selectedCompany.industry} • {selectedCompany.employees} employees</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteCompany}>Delete Company</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Companies;
