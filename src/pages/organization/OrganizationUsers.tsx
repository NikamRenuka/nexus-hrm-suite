
import React, { useState } from 'react';
import { Users, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import UserTable from '@/components/organization/UserTable';
import AddUserDialog from '@/components/organization/AddUserDialog';
import EditUserDialog from '@/components/organization/EditUserDialog';
import DeleteUserDialog from '@/components/organization/DeleteUserDialog';
import { User, MOCK_USERS } from '@/types/organization';

const OrganizationUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'employee',
    company: '',
    isActive: true,
  });

  // Mock companies for the select dropdown
  const companies = ['Acme Corporation', 'Globex Industries', 'Stark Innovations', 'Wayne Enterprises', 'Umbrella Corp'];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    const id = Math.random().toString(36).substring(7);
    const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    
    const userToAdd = {
      id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as 'super_admin' | 'admin' | 'hr' | 'manager' | 'employee',
      company: newUser.company,
      lastLogin: currentDate,
      isActive: newUser.isActive
    };
    
    setUsers([...users, userToAdd]);
    setIsAddDialogOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: 'employee',
      company: '',
      isActive: true,
    });
    
    toast({
      title: "User added",
      description: `${userToAdd.name} has been added successfully.`,
    });
  };

  const handleEditUser = () => {
    if (!selectedUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id ? selectedUser : user
    );
    
    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    setSelectedUser(null);
    
    toast({
      title: "User updated",
      description: `${selectedUser.name}'s information has been updated.`,
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
      description: `${selectedUser.name} has been removed from the system.`,
    });
    
    setSelectedUser(null);
  };

  const toggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    );
    
    setUsers(updatedUsers);
    
    const user = users.find(user => user.id === userId);
    if (user) {
      toast({
        title: user.isActive ? "User deactivated" : "User activated",
        description: `${user.name} has been ${user.isActive ? 'deactivated' : 'activated'}.`,
      });
    }
  };

  const openEditDialog = (user: User) => {
    setSelectedUser({...user});
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Platform Users</CardTitle>
          <div className="flex items-center">
            <Search className="h-4 w-4 mr-2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="w-full max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <UserTable 
            users={filteredUsers} 
            onEditUser={openEditDialog} 
            onDeleteUser={openDeleteDialog}
            onToggleStatus={toggleUserStatus}
          />
        </CardContent>
      </Card>

      <AddUserDialog 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        newUser={newUser}
        setNewUser={setNewUser}
        onAddUser={handleAddUser}
        companies={companies}
      />

      <EditUserDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        onEditUser={handleEditUser}
        companies={companies}
      />

      <DeleteUserDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        selectedUser={selectedUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export default OrganizationUsers;
