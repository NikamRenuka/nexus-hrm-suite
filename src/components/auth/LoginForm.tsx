
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
        navigate('/dashboard');
      } else {
        setError('Please enter both email and password');
      }
      setIsLoading(false);
    }, 1000);
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
              onChange={(e) => setRole(e.target.value as UserRole)}
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
        
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Demo access: hr@example.com / password</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
