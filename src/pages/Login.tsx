
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side - login form */}
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
        <LoginForm />
      </div>
      
      {/* Right side - branding/illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-hrms-primary flex-col items-center justify-center relative p-12">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-6">HRMS System</h1>
          <p className="text-lg mb-8 text-white/80">
            Complete human resources management solution for your organization
          </p>
          
          <div className="grid grid-cols-2 gap-6 mt-12">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium text-xl mb-2">Employee Management</h3>
              <p className="text-white/70 text-sm">
                Track and manage your organization's workforce efficiently
              </p>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium text-xl mb-2">Attendance & Leave</h3>
              <p className="text-white/70 text-sm">
                Monitor attendance and manage leave applications
              </p>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium text-xl mb-2">Payroll Management</h3>
              <p className="text-white/70 text-sm">
                Automate salary calculations and generate payslips
              </p>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium text-xl mb-2">Performance Reviews</h3>
              <p className="text-white/70 text-sm">
                Set goals and conduct performance appraisals
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
