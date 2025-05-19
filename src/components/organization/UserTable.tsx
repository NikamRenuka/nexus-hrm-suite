
import React from 'react';
import { 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Shield, 
  X as XCircle 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from '@/types/organization';
import { getRoleBadgeVariant } from '@/utils/badgeUtils';

interface UserTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onToggleStatus: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ 
  users, 
  onEditUser, 
  onDeleteUser, 
  onToggleStatus 
}) => {
  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-7 px-4 py-3 bg-muted/50 text-sm font-medium">
        <div className="col-span-2">User</div>
        <div>Role</div>
        <div>Company</div>
        <div>Last Login</div>
        <div>Status</div>
        <div className="text-right">Actions</div>
      </div>
      <div className="divide-y">
        {users.map((user) => (
          <div key={user.id} className="grid grid-cols-7 px-4 py-3 items-center">
            <div className="col-span-2 flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
              </div>
            </div>
            <div>
              <Badge variant={getRoleBadgeVariant(user.role)}>
                {user.role.replace('_', ' ')}
              </Badge>
            </div>
            <div>{user.company}</div>
            <div>{user.lastLogin}</div>
            <div>
              <Badge variant={user.isActive ? 'default' : 'secondary'}>
                {user.isActive ? 'Active' : 'Inactive'}
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
                  <DropdownMenuItem onClick={() => onEditUser(user)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onToggleStatus(user.id)}>
                    {user.isActive ? (
                      <>
                        <XCircle className="h-4 w-4 mr-2" />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Activate
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDeleteUser(user)} className="text-red-600">
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
        
        {users.length === 0 && (
          <div className="px-4 py-8 text-center text-muted-foreground">
            No users found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
