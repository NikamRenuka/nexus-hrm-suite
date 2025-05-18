
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockUser } from '@/lib/mockData';
import { UserRole } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('hr');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      if (email && password) {
        // In a real app, you would validate credentials with Supabase here
        
        // For testing purposes, we'll save the selected role in localStorage
        const testUser = {
          ...mockUser,
          role: role,
          email: email
        };
        
        localStorage.setItem('hrmsUser', JSON.stringify(testUser));
        
        // Show success toast
        toast({
          title: "Login successful",
          description: `Welcome ${testUser.name}, you are logged in as ${role.replace('_', ' ').toUpperCase()}`,
        });
        
        navigate('/dashboard');
      } else {
        setError('Please enter both email and password');
      }
      setIsLoading(false);
    }, 1000);
  };

  // Sample test credentials for each role
  const testCredentials = {
    super_admin: { email: 'superadmin@example.com', password: 'password' },
    admin: { email: 'admin@example.com', password: 'password' },
    hr: { email: 'hr@example.com', password: 'password' },
    manager: { email: 'manager@example.com', password: 'password' },
    employee: { email: 'employee@example.com', password: 'password' },
  };

  // Auto-fill credentials based on selected role
  const fillCredentials = (selectedRole: UserRole) => {
    setEmail(testCredentials[selectedRole].email);
    setPassword(testCredentials[selectedRole].password);
  };

  // Update credentials when role changes
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole;
    setRole(newRole);
    fillCredentials(newRole);
  };

  return (
    <Card className="w-full max-w-md shadow-lg animate-fade-in">
      <CardHeader className="space-y-1 text-center">
        <div className="w-12 h-12 bg-hrms-primary rounded-lg mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
          HR
        </div>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button variant="link" size="sm" className="px-0 text-xs text-hrms-primary">
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Login as (Demo only)</Label>
            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
              className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-hrms-primary/20"
            >
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">
              {error}
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-hrms-primary hover:bg-hrms-accent"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        
        <div className="text-center text-sm space-y-2">
          <p className="text-muted-foreground">Demo access by role:</p>
          <div className="grid grid-cols-1 gap-1 text-xs">
            {Object.entries(testCredentials).map(([role, cred]) => (
              <div key={role} className="p-1 rounded bg-gray-50 flex justify-between">
                <span className="font-medium">{role.replace('_', ' ')}:</span>
                <span>{cred.email}</span>
              </div>
            ))}
            <p className="mt-2 text-muted-foreground">Use password: "password" for all accounts</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
