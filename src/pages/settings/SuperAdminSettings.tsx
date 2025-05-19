
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Globe, 
  Shield, 
  Bell, 
  Mail, 
  Database, 
  Server, 
  CreditCard, 
  RefreshCcw, 
  Save 
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Separator } from '@/components/ui/separator';

const generalSettingsSchema = z.object({
  platformName: z.string().min(2, { message: "Platform name is required" }),
  companyName: z.string().min(2, { message: "Company name is required" }),
  supportEmail: z.string().email({ message: "Invalid email address" }),
  contactPhone: z.string().optional(),
  favicon: z.string().optional(),
  logo: z.string().optional(),
});

const securitySettingsSchema = z.object({
  passwordPolicy: z.enum(['low', 'medium', 'high', 'custom']),
  minPasswordLength: z.number().int().min(6),
  requireSpecialChars: z.boolean(),
  requireNumbers: z.boolean(),
  requireUppercase: z.boolean(),
  mfaEnabled: z.boolean(),
  sessionTimeout: z.number().int().min(5),
  maxLoginAttempts: z.number().int().min(3).max(10),
});

const emailSettingsSchema = z.object({
  smtpServer: z.string().min(2, { message: "SMTP server is required" }),
  smtpPort: z.number().int().min(1).max(65535),
  smtpUsername: z.string().min(2, { message: "SMTP username is required" }),
  smtpPassword: z.string().min(1, { message: "SMTP password is required" }),
  senderEmail: z.string().email({ message: "Invalid sender email" }),
  senderName: z.string().min(2, { message: "Sender name is required" }),
  enableSSL: z.boolean(),
});

const SuperAdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  // General Settings Form
  const generalForm = useForm<z.infer<typeof generalSettingsSchema>>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      platformName: 'HR Management System',
      companyName: 'Tech Solutions Inc.',
      supportEmail: 'support@hrsystem.com',
      contactPhone: '+1 (555) 123-4567',
      favicon: '',
      logo: '',
    },
  });

  const onGeneralSubmit = (data: z.infer<typeof generalSettingsSchema>) => {
    toast({
      title: "General settings updated",
      description: "Your general settings have been saved successfully.",
    });
    console.log('General Settings:', data);
  };

  // Security Settings Form
  const securityForm = useForm<z.infer<typeof securitySettingsSchema>>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      passwordPolicy: 'medium',
      minPasswordLength: 8,
      requireSpecialChars: true,
      requireNumbers: true,
      requireUppercase: true,
      mfaEnabled: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
    },
  });

  const onSecuritySubmit = (data: z.infer<typeof securitySettingsSchema>) => {
    toast({
      title: "Security settings updated",
      description: "Your security settings have been saved successfully.",
    });
    console.log('Security Settings:', data);
  };

  // Email Settings Form
  const emailForm = useForm<z.infer<typeof emailSettingsSchema>>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      smtpServer: 'smtp.example.com',
      smtpPort: 587,
      smtpUsername: 'notifications@example.com',
      smtpPassword: '••••••••••••',
      senderEmail: 'notifications@example.com',
      senderName: 'HR System Notifications',
      enableSSL: true,
    },
  });

  const onEmailSubmit = (data: z.infer<typeof emailSettingsSchema>) => {
    toast({
      title: "Email settings updated",
      description: "Your email settings have been saved successfully.",
    });
    console.log('Email Settings:', data);
  };

  // Test Email Function
  const handleTestEmail = () => {
    toast({
      title: "Test email sent",
      description: "A test email has been sent to the configured address.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-muted-foreground">
          Manage global settings and configurations for the entire platform.
        </p>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 sm:grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Configure basic platform information and branding.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form id="generalSettingsForm" onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-4">
                  <FormField
                    control={generalForm.control}
                    name="platformName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The name displayed throughout the platform.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={generalForm.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The name of your organization.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={generalForm.control}
                      name="supportEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Support Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  <h3 className="text-lg font-medium">Branding</h3>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={generalForm.control}
                      name="logo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo URL</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://example.com/logo.png" />
                          </FormControl>
                          <FormDescription>
                            URL to your company logo (recommended size: 180x40px)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="favicon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Favicon URL</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://example.com/favicon.ico" />
                          </FormControl>
                          <FormDescription>
                            URL to your favicon (recommended size: 32x32px)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" form="generalSettingsForm" className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security policies and authentication settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...securityForm}>
                <form id="securitySettingsForm" onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-4">
                  <FormField
                    control={securityForm.control}
                    name="passwordPolicy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Policy</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a policy" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low Security</SelectItem>
                            <SelectItem value="medium">Medium Security</SelectItem>
                            <SelectItem value="high">High Security</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose a predefined policy or customize your own.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={securityForm.control}
                      name="minPasswordLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Password Length</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="maxLoginAttempts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Failed Login Attempts</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <FormField
                      control={securityForm.control}
                      name="requireSpecialChars"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Special Characters</FormLabel>
                            <FormDescription>
                              Require special characters in passwords
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="requireNumbers"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Numbers</FormLabel>
                            <FormDescription>
                              Require numbers in passwords
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="requireUppercase"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Uppercase</FormLabel>
                            <FormDescription>
                              Require uppercase letters in passwords
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <FormField
                    control={securityForm.control}
                    name="mfaEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Multi-factor Authentication</FormLabel>
                          <FormDescription>
                            Require MFA for all users in the platform
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={securityForm.control}
                    name="sessionTimeout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Session Timeout (minutes)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value))} 
                          />
                        </FormControl>
                        <FormDescription>
                          How long users can remain inactive before being logged out
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" form="securitySettingsForm" className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Email Settings */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Email Configuration
              </CardTitle>
              <CardDescription>
                Configure email server settings for system notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...emailForm}>
                <form id="emailSettingsForm" onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={emailForm.control}
                      name="smtpServer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SMTP Server</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailForm.control}
                      name="smtpPort"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SMTP Port</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={emailForm.control}
                      name="smtpUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SMTP Username</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailForm.control}
                      name="smtpPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SMTP Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={emailForm.control}
                      name="senderEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sender Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailForm.control}
                      name="senderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sender Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={emailForm.control}
                    name="enableSSL"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Enable SSL/TLS</FormLabel>
                          <FormDescription>
                            Use secure connection for email sending
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4 flex justify-between">
              <Button variant="outline" onClick={handleTestEmail}>
                <Mail className="mr-2 h-4 w-4" />
                Send Test Email
              </Button>
              <Button type="submit" form="emailSettingsForm">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Database Settings */}
        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Database Management
              </CardTitle>
              <CardDescription>
                Manage database connections and maintenance tasks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Database Status</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-md border p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Connection Status</div>
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                      <span className="font-medium">Connected</span>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Database Size</div>
                    <div className="font-medium">2.8 GB</div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Last Backup</div>
                    <div className="font-medium">Today at 03:00 AM</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Maintenance</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-md border p-4 space-y-4">
                    <div>
                      <div className="font-medium">Database Backup</div>
                      <p className="text-sm text-muted-foreground">Create a full backup of the database</p>
                    </div>
                    <Button variant="outline">
                      <Server className="mr-2 h-4 w-4" />
                      Create Backup
                    </Button>
                  </div>
                  
                  <div className="rounded-md border p-4 space-y-4">
                    <div>
                      <div className="font-medium">Database Optimization</div>
                      <p className="text-sm text-muted-foreground">Optimize tables and indexes</p>
                    </div>
                    <Button variant="outline">
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      Optimize Now
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Connection Information</h3>
                <div className="rounded-md border p-4 space-y-2">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="font-medium">Host</div>
                    <div className="col-span-2">db.example.com</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="font-medium">Database Name</div>
                    <div className="col-span-2">hr_system_production</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="font-medium">Engine</div>
                    <div className="col-span-2">MongoDB 6.0</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Billing Information
              </CardTitle>
              <CardDescription>
                Manage subscription and payment details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Current Subscription</h3>
                <div className="rounded-md border p-4">
                  <div className="flex justify-between mb-4">
                    <div>
                      <div className="text-xl font-bold">Enterprise Plan</div>
                      <div className="text-sm text-muted-foreground">Unlimited companies and users</div>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Next billing date</div>
                      <div>June 15, 2023</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Amount</div>
                      <div>$1,999.00 / month</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Payment method</div>
                      <div>VISA ending in 4242</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">Update Payment Method</Button>
                    <Button variant="outline" size="sm">View Invoices</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Billing Information</h3>
                <div className="rounded-md border p-4 space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Company</div>
                    <div className="col-span-2">Tech Solutions Inc.</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Address</div>
                    <div className="col-span-2">123 Business Ave, Suite 100<br />San Francisco, CA 94107</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Tax ID / VAT</div>
                    <div className="col-span-2">US123456789</div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">Update Billing Information</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminSettings;
