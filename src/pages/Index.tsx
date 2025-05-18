
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Users,
  CalendarDays,
  CircleDollarSign,
  BarChart3,
  Clock,
  Building,
  ChevronRight,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-hrms-primary text-white flex items-center justify-center font-bold text-xl">
                HR
              </div>
              <span className="ml-3 font-bold text-xl">HRMS System</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="font-medium text-gray-500 hover:text-gray-900">Login</Link>
              <Button className="hrms-button-primary">
                Sign Up
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-hrms-light to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-hrms-primary">
              Modern HR Management System
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              A comprehensive solution for all your human resource needs - from employee management to payroll processing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/login">
                <Button className="hrms-button-primary text-lg py-6 px-8">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" className="border-hrms-primary text-hrms-primary hover:bg-hrms-primary hover:text-white text-lg py-6 px-8">
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive HR platform covers all aspects of workforce management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-hrms-light text-hrms-primary rounded-md flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Employee Management</h3>
              <p className="text-gray-600">
                Efficiently manage employee data, documents, departments, and designations in one place.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Employee profiles & documents</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Department & designation mapping</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Employee onboarding workflow</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-hrms-light text-hrms-primary rounded-md flex items-center justify-center mb-4">
                <CalendarDays size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Attendance & Leave</h3>
              <p className="text-gray-600">
                Track attendance and manage leave applications with automated workflows and approvals.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>AI-powered face authentication</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Geolocation-based check-ins</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Automated leave approval workflow</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-hrms-light text-hrms-primary rounded-md flex items-center justify-center mb-4">
                <CircleDollarSign size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Payroll Management</h3>
              <p className="text-gray-600">
                Automate salary calculations, generate payslips, and manage tax deductions efficiently.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Automated salary calculations</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Tax and statutory deductions</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Digital payslips & bank integrations</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-hrms-light text-hrms-primary rounded-md flex items-center justify-center mb-4">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Management</h3>
              <p className="text-gray-600">
                Set goals, conduct reviews, and track employee performance metrics.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Goal setting & tracking</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Performance reviews & feedback</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Performance analytics & reports</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-hrms-light text-hrms-primary rounded-md flex items-center justify-center mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recruitment & Onboarding</h3>
              <p className="text-gray-600">
                Streamline your hiring process from job posting to employee onboarding.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Job postings & applicant tracking</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Interview scheduling</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Digital onboarding workflow</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-hrms-light text-hrms-primary rounded-md flex items-center justify-center mb-4">
                <Building size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-tenancy & Security</h3>
              <p className="text-gray-600">
                Secure, multi-tenant architecture with role-based access controls and data isolation.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Role-based access control</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Data isolation between companies</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Audit logs & security monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-hrms-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your HR operations?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
              Join thousands of companies that use our HRMS platform to streamline their HR processes and improve employee experience.
            </p>
            <Link to="/login">
              <Button className="bg-white text-hrms-primary hover:bg-gray-100 text-lg py-6 px-8">
                Get Started Today
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-md bg-hrms-primary text-white flex items-center justify-center font-bold text-xl">
                  HR
                </div>
                <span className="ml-3 font-bold text-xl text-white">HRMS</span>
              </div>
              <p className="text-sm text-gray-400">
                A comprehensive human resource management system for modern organizations.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
                <li><a href="#" className="hover:text-white">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Legal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400 text-center">
            <p>&copy; 2025 HRMS System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
