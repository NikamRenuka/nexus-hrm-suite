
import React, { useState } from 'react';
import { 
  UserCog, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  ShieldCheck,
  Lock,
  Unlock,
  Check,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem, 
  SelectGroup,
  SelectLabel
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface OrganizationUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'hr' | 'manager' | 'employee';
  companyId: string;
  companyName: string;
  status: 'active' | 'inactive' | 'locked';
  lastLogin?: string;
  isMFA: boolean;
}

interface Company {
  id: string;
  name: string;
}

const MOCK_COMPANIES: Company[] = [
  { id: 'comp1', name: 'Acme Corporation' },
  { id: 'comp2', name: 'Globex Industries' },
  { id: 'comp3', name: 'Stark Innovations' },
  { id: 'comp4', name: 'Wayne Enterprises' },
  { id: 'comp5', name: 'Umbrella Corp' }
];

const MOCK_USERS: OrganizationUser[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@acme.com',
    role: 'admin',
    companyId: 'comp1',
    companyName: 'Acme Corporation',
    status: 'active',
    lastLogin: '2023-10-18 10:25 AM',
    isMFA: true
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@globex.com',
    role: 'hr',
    companyId: 'comp2',
    companyName: 'Globex Industries',
    status: 'active',
    lastLogin: '2023-10-18 09:15 AM',
    isMFA: false
  },
  {
    id: '3',
    name: 'David Miller',
    email: 'david.m@stark.io',
    role: 'manager',
    companyId: 'comp3',
    companyName: 'Stark Innovations',
    status: 'active',
    lastLogin: '2023-10-17 04:30 PM',
    isMFA: true
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.w@wayne.co',
    role: 'employee',
    companyId: 'comp4',
    companyName: 'Wayne Enterprises',
    status: 'locked',
    lastLogin: '2023-10-10 11:45 AM',
    isMFA: false
  },
  {
    id: '5',
    name: 'Patricia Garcia',
    email: 'patricia.g@umbrella.org',
    role: 'admin',
    companyId: 'comp5',
    companyName: 'Umbrella Corp',
    status: 'inactive',
    isMFA: false
  }
];

const OrganizationUsers: React.FC = () => {
  const [users, setUsers] = useState<OrganizationUser[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState<string>('all');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<OrganizationUser | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'employee' as 'admin' | 'hr' | 'manager' | 'employee',
    companyId: '',
    status: 'active' as 'active' | 'inactive' | 'locked',
    isMFA: false
  });

  const filteredUsers = users.filter(user => {
    // Filter by search term
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by company
    const matchesCompany = selectedCompanyFilter === 'all' || user.companyId === selectedCompanyFilter;
    
    // Filter by role
    const matchesRole = selectedRoleFilter === 'all' || user.role === selectedRoleFilter;
    
    return matchesSearch && matchesCompany && matchesRole;
  });

  const handleAddUser = () => {
    const id = Math.random().toString(36).substring(7);
    const companyName = MOCK_COMPANIES.find(c => c.id === newUser.companyId)?.name || '';
    
    const userToAdd: OrganizationUser = {
      id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      companyId: newUser.companyId,
      companyName,
      status: newUser.status,
      isMFA: newUser.isMFA
    };
    
    setUsers([...users, userToAdd]);
    setIsAddDialogOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: 'employee',
      companyId: '',
      status: 'active',
      isMFA: false
    });
    
    toast({
      title: "User added",
      description: `${userToAdd.name} has been added as ${userToAdd.role} at ${companyName}.`,
    });
  };

  const handleEditUser = () => {
    if (!selectedUser) return;
    
    // Update company name if companyId changed
    let updatedUser = {...selectedUser};
    if (selectedUser.companyId !== updatedUser.companyId) {
      const companyName = MOCK_COMPANIES.find(c => c.id === updatedUser.companyId)?.name || '';
      updatedUser = {...updatedUser, companyName};
    }
    
    const updatedUsers = users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    );
    
    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    setSelectedUser(null);
    
    toast({
      title: "User updated",
      description: `${updatedUser.name}'s information has been updated.`,
    });
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    const updatedUsers = users.filter(user => 
      user.id !== selectedUser.id
    );
    
    setUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "User deleted",
      description: `${selectedUser.name} has been deleted from the system.`,
    });
    
    setSelectedUser(null);
  };

  const handleResetPassword = () => {
    if (!selectedUser) return;
    
    setIsResetPasswordDialogOpen(false);
    
    toast({
      title: "Password reset link sent",
      description: `A password reset link has been sent to ${selectedUser.email}.`,
    });
    
    setSelectedUser(null);
  };

  const handleToggleUserStatus = (user: OrganizationUser) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    
    const updatedUsers = users.map(u => 
      u.id === user.id ? {...u, status: newStatus as 'active' | 'inactive' | 'locked'} : u
    );
    
    setUsers(updatedUsers);
    
    toast({
      title: `User ${newStatus === 'active' ? 'activated' : 'deactivated'}`,
      description: `${user.name} has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`,
    });
  };

  const handleUnlockUser = (user: OrganizationUser) => {
    const updatedUsers = users.map(u => 
      u.id === user.id ? {...u, status: 'active' as const} : u
    );
    
    setUsers(updatedUsers);
    
    toast({
      title: "User unlocked",
      description: `${user.name}'s account has been unlocked.`,
    });
  };

  const handleToggleMFA = (user: OrganizationUser) => {
    const updatedUsers = users.map(u => 
      u.id === user.id ? {...u, isMFA: !u.isMFA} : u
    );
    
    setUsers(updatedUsers);
    
    toast({
      title: `MFA ${!user.isMFA ? 'Enabled' : 'Disabled'}`,
      description: `Multi-factor authentication has been ${!user.isMFA ? 'enabled' : 'disabled'} for ${user.name}.`,
    });
  };

  const openEditDialog = (user: OrganizationUser) => {
    setSelectedUser({...user});
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (user: OrganizationUser) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const openResetPasswordDialog = (user: OrganizationUser) => {
    setSelectedUser(user);
    setIsResetPasswordDialogOpen(true);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'hr': return 'warning';
      case 'manager': return 'secondary';
      default: return 'outline';
    }
  };

  const getRoleLabel = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Organization Users</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Users Management</CardTitle>
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center w-full md:w-1/3">
              <Search className="h-4 w-4 mr-2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-2/3">
              <Select value={selectedCompanyFilter} onValueChange={setSelectedCompanyFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {MOCK_COMPANIES.map(company => (
                    <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedRoleFilter} onValueChange={setSelectedRoleFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="hidden md:grid grid-cols-12 px-4 py-3 bg-muted/50 text-sm font-medium">
              <div className="col-span-3">Name / Email</div>
              <div className="col-span-2">Company</div>
              <div className="col-span-1">Role</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2">Last Login</div>
              <div className="col-span-1">MFA</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            <div className="divide-y">
              {filteredUsers.map((user) => (
                <div key={user.id} className="grid grid-cols-1 md:grid-cols-12 px-4 py-3 items-center gap-y-2 md:gap-y-0">
                  <div className="col-span-3 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3 flex-shrink-0">
                      {user.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>

                  <div className="md:hidden font-medium text-sm text-muted-foreground">Company</div>
                  <div className="col-span-2">{user.companyName}</div>
                  
                  <div className="md:hidden font-medium text-sm text-muted-foreground">Role</div>
                  <div className="col-span-1">
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </div>
                  
                  <div className="md:hidden font-medium text-sm text-muted-foreground">Status</div>
                  <div className="col-span-1">
                    <Badge variant={
                      user.status === 'active' ? 'default' : 
                      user.status === 'inactive' ? 'secondary' : 
                      'outline'
                    }>
                      {user.status}
                    </Badge>
                  </div>
                  
                  <div className="md:hidden font-medium text-sm text-muted-foreground">Last Login</div>
                  <div className="col-span-2">
                    {user.lastLogin || 'Never logged in'}
                  </div>
                  
                  <div className="md:hidden font-medium text-sm text-muted-foreground">MFA</div>
                  <div className="col-span-1">
                    {user.isMFA ? 
                      <Check className="h-5 w-5 text-green-500" /> : 
                      <X className="h-5 w-5 text-red-500" />
                    }
                  </div>
                  
                  <div className="col-span-2 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(user)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openResetPasswordDialog(user)}>
                          <Lock className="h-4 w-4 mr-2" />
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleMFA(user)}>
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          {user.isMFA ? 'Disable MFA' : 'Enable MFA'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === 'locked' ? (
                          <DropdownMenuItem onClick={() => handleUnlockUser(user)}>
                            <Unlock className="h-4 w-4 mr-2" />
                            Unlock Account
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleToggleUserStatus(user)}>
                            {user.status === 'active' ? (
                              <>
                                <X className="h-4 w-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => openDeleteDialog(user)}
                          className="text-red-600"
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              
              {filteredUsers.length === 0 && (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  No users found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Add a new user to the organization. They will receive an email to set their password.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="email@example.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Select 
                  value={newUser.companyId} 
                  onValueChange={(value) => setNewUser({...newUser, companyId: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Companies</SelectLabel>
                      {MOCK_COMPANIES.map(company => (
                        <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={newUser.role} 
                  onValueChange={(value: 'admin' | 'hr' | 'manager' | 'employee') => 
                    setNewUser({...newUser, role: value})
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newUser.status} 
                  onValueChange={(value: 'active' | 'inactive' | 'locked') => 
                    setNewUser({...newUser, status: value})
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end space-x-2">
                <input
                  type="checkbox"
                  id="mfa"
                  checked={newUser.isMFA}
                  onChange={(e) => setNewUser({...newUser, isMFA: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="mfa">Require Multi-Factor Authentication</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddUser}>
              <UserCog className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user details and permissions.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email Address</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-company">Company</Label>
                  <Select 
                    value={selectedUser.companyId} 
                    onValueChange={(value) => setSelectedUser({...selectedUser, companyId: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Companies</SelectLabel>
                        {MOCK_COMPANIES.map(company => (
                          <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select 
                    value={selectedUser.role} 
                    onValueChange={(value: 'admin' | 'hr' | 'manager' | 'employee') => 
                      setSelectedUser({...selectedUser, role: value})
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    value={selectedUser.status} 
                    onValueChange={(value: 'active' | 'inactive' | 'locked') => 
                      setSelectedUser({...selectedUser, status: value})
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="locked">Locked</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end space-x-2">
                  <input
                    type="checkbox"
                    id="edit-mfa"
                    checked={selectedUser.isMFA}
                    onChange={(e) => setSelectedUser({...selectedUser, isMFA: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="edit-mfa">Require Multi-Factor Authentication</Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <p className="mb-2">You are about to delete:</p>
              <div className="p-4 rounded-md bg-muted">
                <p className="font-medium">{selectedUser.name}</p>
                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                <p className="text-sm text-muted-foreground">{selectedUser.companyName} • {selectedUser.role}</p>
              </div>
              <div className="mt-4 text-amber-600 text-sm flex items-start">
                <ShieldCheck className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <p>Deleting this user will remove all of their account data and access permissions. Consider deactivating their account instead if you might need to restore access in the future.</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              <Trash className="h-4 w-4 mr-2" />
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Send a password reset link to this user.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <p className="mb-2">You are about to send a password reset email to:</p>
              <div className="p-4 rounded-md bg-muted">
                <p className="font-medium">{selectedUser.name}</p>
                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
              </div>
              <div className="mt-4 text-sm">
                <p>The user will receive a secure link to set a new password. The current password will no longer work after this action.</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetPasswordDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleResetPassword}>
              <Lock className="h-4 w-4 mr-2" />
              Send Reset Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizationUsers;
