
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import {
  AlertCircle,
  CheckCircle,
  Save,
  Send,
  Shield,
  Building,
  Mail,
  CreditCard,
  Database,
  Settings,
  Lock,
} from 'lucide-react';

interface SettingCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const SuperAdminSettings: React.FC = () => {
  // Define setting categories
  const categories: SettingCategory[] = [
    { id: 'general', name: 'General', icon: <Settings className="h-4 w-4 mr-2" /> },
    { id: 'security', name: 'Security', icon: <Shield className="h-4 w-4 mr-2" /> },
    { id: 'email', name: 'Email', icon: <Mail className="h-4 w-4 mr-2" /> },
    { id: 'company', name: 'Company', icon: <Building className="h-4 w-4 mr-2" /> },
    { id: 'database', name: 'Database', icon: <Database className="h-4 w-4 mr-2" /> },
    { id: 'billing', name: 'Billing', icon: <CreditCard className="h-4 w-4 mr-2" /> },
  ];

  // State for general settings
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'HR Management System',
    supportEmail: 'support@hrsystem.com',
    contactPhone: '+1 (555) 123-4567',
    logoUrl: '',
    faviconUrl: '',
  });

  // State for security settings
  const [securitySettings, setSecuritySettings] = useState({
    passwordPolicy: 'medium',
    minPasswordLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    mfaEnabled: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
  });

  // State for email settings
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.example.com',
    smtpPort: 587,
    smtpUsername: 'notifications@hrsystem.com',
    smtpPassword: '********',
    senderEmail: 'noreply@hrsystem.com',
    senderName: 'HR System Notifications',
    enableSSL: true,
  });

  // State for email test
  const [emailTestStatus, setEmailTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  // State for company settings
  const [companySettings, setCompanySettings] = useState({
    defaultTimezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    defaultLanguage: 'en-US',
    weekStartsOn: 'monday',
  });

  // State for database settings
  const [databaseSettings, setDatabaseSettings] = useState({
    backupFrequency: 'daily',
    backupRetentionDays: 30,
    dbHost: 'db.example.com',
    dbName: 'hrms_production',
    autoVacuum: true,
    logQueries: false,
  });

  // State for billing settings
  const [billingSettings, setBillingSettings] = useState({
    billingCycle: 'monthly',
    currencyCode: 'USD',
    taxRate: 0,
    invoicePrefix: 'INV-',
    gracePaymentDays: 7,
    autoSuspend: true,
  });

  // Save settings handler
  const handleSaveSettings = (settingType: string) => {
    // In a real application, this would call an API to save settings
    toast({
      title: 'Settings saved',
      description: `${settingType} settings have been updated successfully.`,
    });
  };

  // Test email configuration
  const handleTestEmail = () => {
    setEmailTestStatus('testing');
    
    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      if (success) {
        setEmailTestStatus('success');
        toast({
          title: 'Email test successful',
          description: 'The test email was sent successfully.'
        });
      } else {
        setEmailTestStatus('error');
        toast({
          title: 'Email test failed',
          description: 'Could not send test email. Please check your configuration.',
          variant: 'destructive'
        });
      }
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setEmailTestStatus('idle');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">
          Configure platform-wide settings and parameters
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center">
              {category.icon}
              <span>{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic configuration settings for the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input 
                    id="platformName" 
                    value={generalSettings.platformName}
                    onChange={(e) => setGeneralSettings({...generalSettings, platformName: e.target.value})} 
                  />
                  <p className="text-sm text-muted-foreground">The name of the platform shown throughout the application</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input 
                    id="supportEmail" 
                    type="email" 
                    value={generalSettings.supportEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})} 
                  />
                  <p className="text-sm text-muted-foreground">Email address for support inquiries</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input 
                    id="contactPhone" 
                    value={generalSettings.contactPhone}
                    onChange={(e) => setGeneralSettings({...generalSettings, contactPhone: e.target.value})} 
                  />
                  <p className="text-sm text-muted-foreground">Support phone number</p>
                </div>
              </div>

              <Separator className="my-4" />

              <h3 className="text-lg font-medium">Branding</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input 
                    id="logoUrl" 
                    value={generalSettings.logoUrl}
                    onChange={(e) => setGeneralSettings({...generalSettings, logoUrl: e.target.value})} 
                    placeholder="https://example.com/logo.png" 
                  />
                  <p className="text-sm text-muted-foreground">URL to your platform logo</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faviconUrl">Favicon URL</Label>
                  <Input 
                    id="faviconUrl" 
                    value={generalSettings.faviconUrl}
                    onChange={(e) => setGeneralSettings({...generalSettings, faviconUrl: e.target.value})}
                    placeholder="https://example.com/favicon.ico" 
                  />
                  <p className="text-sm text-muted-foreground">URL to your platform favicon</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings('General')}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security policies and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password Policy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="passwordPolicy">Password Complexity</Label>
                    <select 
                      id="passwordPolicy"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={securitySettings.passwordPolicy}
                      onChange={(e) => setSecuritySettings({...securitySettings, passwordPolicy: e.target.value})}
                    >
                      <option value="low">Low (Letters only)</option>
                      <option value="medium">Medium (Letters + Numbers)</option>
                      <option value="high">High (Letters + Numbers + Special)</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minPasswordLength">Minimum Password Length</Label>
                    <Input 
                      id="minPasswordLength" 
                      type="number"
                      min="6"
                      max="32" 
                      value={securitySettings.minPasswordLength}
                      onChange={(e) => setSecuritySettings({...securitySettings, minPasswordLength: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="requireSpecialChars" 
                      checked={securitySettings.requireSpecialChars}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requireSpecialChars: checked})}
                    />
                    <Label htmlFor="requireSpecialChars">Require Special Characters</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="requireNumbers" 
                      checked={securitySettings.requireNumbers}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requireNumbers: checked})}
                    />
                    <Label htmlFor="requireNumbers">Require Numbers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="requireUppercase" 
                      checked={securitySettings.requireUppercase}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requireUppercase: checked})}
                    />
                    <Label htmlFor="requireUppercase">Require Uppercase Letters</Label>
                  </div>
                </div>

                <Separator className="my-4" />

                <h3 className="text-lg font-medium">Authentication</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="mfaEnabled">Multi-Factor Authentication</Label>
                      <Switch 
                        id="mfaEnabled" 
                        checked={securitySettings.mfaEnabled}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, mfaEnabled: checked})}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Require users to use 2FA for authentication</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="sessionTimeout" 
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Maximum Login Attempts</Label>
                  <Input 
                    id="maxLoginAttempts" 
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: parseInt(e.target.value)})}
                  />
                  <p className="text-sm text-muted-foreground">Number of failed login attempts before account lockout</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings('Security')}>
                <Lock className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                Configure email delivery settings for system notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input 
                    id="smtpServer" 
                    value={emailSettings.smtpServer}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpServer: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input 
                    id="smtpPort" 
                    type="number"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPort: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input 
                    id="smtpUsername" 
                    value={emailSettings.smtpUsername}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input 
                    id="smtpPassword" 
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderEmail">Sender Email</Label>
                  <Input 
                    id="senderEmail" 
                    type="email"
                    value={emailSettings.senderEmail}
                    onChange={(e) => setEmailSettings({...emailSettings, senderEmail: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderName">Sender Name</Label>
                  <Input 
                    id="senderName"
                    value={emailSettings.senderName}
                    onChange={(e) => setEmailSettings({...emailSettings, senderName: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch 
                  id="enableSSL" 
                  checked={emailSettings.enableSSL}
                  onCheckedChange={(checked) => setEmailSettings({...emailSettings, enableSSL: checked})}
                />
                <Label htmlFor="enableSSL">Enable SSL/TLS</Label>
              </div>

              <div className="border rounded-md p-4 bg-muted/30">
                <h4 className="font-medium mb-2">Test Email Configuration</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Send a test email to verify your configuration is working correctly
                </p>
                <div className="flex items-center">
                  <Button 
                    onClick={handleTestEmail}
                    disabled={emailTestStatus === 'testing'}
                    variant="outline"
                  >
                    {emailTestStatus === 'testing' ? (
                      <>Testing...</>
                    ) : emailTestStatus === 'success' ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        Test Successful
                      </>
                    ) : emailTestStatus === 'error' ? (
                      <>
                        <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                        Test Failed
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Test Email
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings('Email')}>
                <Save className="h-4 w-4 mr-2" />
                Save Email Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Company Settings */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Settings</CardTitle>
              <CardDescription>
                Configure default settings for companies in the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultTimezone">Default Timezone</Label>
                  <select 
                    id="defaultTimezone"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={companySettings.defaultTimezone}
                    onChange={(e) => setCompanySettings({...companySettings, defaultTimezone: e.target.value})}
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Central European Time (CET)</option>
                    <option value="Asia/Tokyo">Japan (JST)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <select 
                    id="dateFormat"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={companySettings.dateFormat}
                    onChange={(e) => setCompanySettings({...companySettings, dateFormat: e.target.value})}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeFormat">Time Format</Label>
                  <select 
                    id="timeFormat"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={companySettings.timeFormat}
                    onChange={(e) => setCompanySettings({...companySettings, timeFormat: e.target.value})}
                  >
                    <option value="12h">12 Hour (AM/PM)</option>
                    <option value="24h">24 Hour</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <select 
                    id="defaultLanguage"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={companySettings.defaultLanguage}
                    onChange={(e) => setCompanySettings({...companySettings, defaultLanguage: e.target.value})}
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="fr-FR">French</option>
                    <option value="de-DE">German</option>
                    <option value="es-ES">Spanish</option>
                    <option value="ja-JP">Japanese</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weekStartsOn">Week Starts On</Label>
                  <select 
                    id="weekStartsOn"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={companySettings.weekStartsOn}
                    onChange={(e) => setCompanySettings({...companySettings, weekStartsOn: e.target.value})}
                  >
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="saturday">Saturday</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings('Company')}>
                <Building className="h-4 w-4 mr-2" />
                Save Company Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Database Settings */}
        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Database Settings</CardTitle>
              <CardDescription>
                Configure database and backup settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dbHost">Database Host</Label>
                  <Input 
                    id="dbHost" 
                    value={databaseSettings.dbHost}
                    onChange={(e) => setDatabaseSettings({...databaseSettings, dbHost: e.target.value})}
                  />
                  <p className="text-sm text-muted-foreground">Hostname or IP of database server</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dbName">Database Name</Label>
                  <Input 
                    id="dbName" 
                    value={databaseSettings.dbName}
                    onChange={(e) => setDatabaseSettings({...databaseSettings, dbName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <select 
                    id="backupFrequency"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={databaseSettings.backupFrequency}
                    onChange={(e) => setDatabaseSettings({...databaseSettings, backupFrequency: e.target.value})}
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupRetentionDays">Backup Retention (days)</Label>
                  <Input 
                    id="backupRetentionDays" 
                    type="number"
                    value={databaseSettings.backupRetentionDays}
                    onChange={(e) => setDatabaseSettings({...databaseSettings, backupRetentionDays: parseInt(e.target.value)})}
                  />
                  <p className="text-sm text-muted-foreground">Number of days to keep backups</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="autoVacuum" 
                    checked={databaseSettings.autoVacuum}
                    onCheckedChange={(checked) => setDatabaseSettings({...databaseSettings, autoVacuum: checked})}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="autoVacuum">Auto Vacuum</Label>
                    <p className="text-sm text-muted-foreground">Automatically clean up deleted records</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="logQueries" 
                    checked={databaseSettings.logQueries}
                    onCheckedChange={(checked) => setDatabaseSettings({...databaseSettings, logQueries: checked})}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="logQueries">Log Queries</Label>
                    <p className="text-sm text-muted-foreground">Log all database queries for debugging</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-md bg-yellow-50 text-yellow-800">
                <h4 className="font-medium mb-2 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Database Configuration Warning
                </h4>
                <p className="text-sm mb-0">
                  Changes to the database configuration require a server restart to take effect.
                  Please schedule maintenance time before making changes.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings('Database')}>
                <Database className="h-4 w-4 mr-2" />
                Save Database Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
              <CardDescription>
                Configure billing and invoice settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="billingCycle">Default Billing Cycle</Label>
                  <select 
                    id="billingCycle"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={billingSettings.billingCycle}
                    onChange={(e) => setBillingSettings({...billingSettings, billingCycle: e.target.value})}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currencyCode">Currency</Label>
                  <select 
                    id="currencyCode"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={billingSettings.currencyCode}
                    onChange={(e) => setBillingSettings({...billingSettings, currencyCode: e.target.value})}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="AUD">AUD ($)</option>
                    <option value="CAD">CAD ($)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                  <Input 
                    id="taxRate" 
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={billingSettings.taxRate}
                    onChange={(e) => setBillingSettings({...billingSettings, taxRate: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoicePrefix">Invoice Number Prefix</Label>
                  <Input 
                    id="invoicePrefix" 
                    value={billingSettings.invoicePrefix}
                    onChange={(e) => setBillingSettings({...billingSettings, invoicePrefix: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gracePaymentDays">Payment Grace Period (days)</Label>
                  <Input 
                    id="gracePaymentDays" 
                    type="number"
                    min="0"
                    value={billingSettings.gracePaymentDays}
                    onChange={(e) => setBillingSettings({...billingSettings, gracePaymentDays: parseInt(e.target.value)})}
                  />
                  <p className="text-sm text-muted-foreground">Days allowed after invoice due date before penalties</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Switch 
                  id="autoSuspend" 
                  checked={billingSettings.autoSuspend}
                  onCheckedChange={(checked) => setBillingSettings({...billingSettings, autoSuspend: checked})}
                />
                <div className="space-y-1">
                  <Label htmlFor="autoSuspend">Auto-suspend Overdue Accounts</Label>
                  <p className="text-sm text-muted-foreground">Automatically suspend accounts with overdue payments</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings('Billing')}>
                <CreditCard className="h-4 w-4 mr-2" />
                Save Billing Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminSettings;
