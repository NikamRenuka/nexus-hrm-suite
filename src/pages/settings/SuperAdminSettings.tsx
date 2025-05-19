
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Settings, Lock, Bell, Shield, Globe, Mail, Cloud, Users } from 'lucide-react';

const SuperAdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [generalSettings, setGeneralSettings] = useState({
    systemName: 'HRMS Platform',
    contactEmail: 'admin@hrmsplatform.com',
    supportPhone: '+1 (555) 123-4567',
    defaultLanguage: 'en',
    defaultTimezone: 'UTC',
    maintenanceMode: false,
    systemAnnouncement: '',
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    passwordExpiry: '90',
    passwordMinLength: '8',
    passwordRequireSpecial: true,
    passwordRequireNumbers: true,
    passwordRequireUppercase: true,
    mfaRequired: false,
    sessionTimeout: '30',
    maxLoginAttempts: '5',
  });
  
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.example.com',
    smtpPort: '587',
    smtpUser: 'notifications@example.com',
    smtpPassword: '',
    senderName: 'HRMS Platform',
    senderEmail: 'notifications@example.com',
    enableSSL: true,
  });
  
  const handleGeneralSettingsSave = () => {
    // Would handle API call here
    toast({
      title: "Settings saved",
      description: "General settings have been updated successfully.",
    });
  };
  
  const handleSecuritySettingsSave = () => {
    // Would handle API call here
    toast({
      title: "Security settings saved",
      description: "Security settings have been updated successfully.",
    });
  };
  
  const handleEmailSettingsSave = () => {
    // Would handle API call here
    toast({
      title: "Email settings saved",
      description: "Email settings have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">
          Configure platform-wide system settings
        </p>
      </div>
      
      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </TabsTrigger>
          <TabsTrigger value="storage">
            <Cloud className="h-4 w-4 mr-2" />
            Storage
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic system settings and defaults.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systemName">System Name</Label>
                  <Input 
                    id="systemName" 
                    value={generalSettings.systemName}
                    onChange={(e) => setGeneralSettings({...generalSettings, systemName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input 
                    id="contactEmail" 
                    type="email" 
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Support Phone</Label>
                  <Input 
                    id="supportPhone" 
                    value={generalSettings.supportPhone}
                    onChange={(e) => setGeneralSettings({...generalSettings, supportPhone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <Select 
                    value={generalSettings.defaultLanguage}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, defaultLanguage: value})}
                  >
                    <SelectTrigger id="defaultLanguage">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultTimezone">Default Timezone</Label>
                  <Select 
                    value={generalSettings.defaultTimezone}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, defaultTimezone: value})}
                  >
                    <SelectTrigger id="defaultTimezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch 
                    id="maintenanceMode"
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, maintenanceMode: checked})}
                  />
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="systemAnnouncement">System-wide Announcement</Label>
                <Textarea 
                  id="systemAnnouncement"
                  placeholder="Enter announcement text to display to all users."
                  value={generalSettings.systemAnnouncement}
                  onChange={(e) => setGeneralSettings({...generalSettings, systemAnnouncement: e.target.value})}
                  className="min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground">
                  This message will be displayed to all users at the top of their dashboard.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGeneralSettingsSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure platform security and authentication settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input 
                    id="passwordExpiry" 
                    type="number"
                    value={securitySettings.passwordExpiry}
                    onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: e.target.value})}
                  />
                  <p className="text-sm text-muted-foreground">
                    Number of days until password expires. Set to 0 to disable.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input 
                    id="passwordMinLength" 
                    type="number"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="passwordRequireSpecial"
                      checked={securitySettings.passwordRequireSpecial}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, passwordRequireSpecial: checked})}
                    />
                    <Label htmlFor="passwordRequireSpecial">Require Special Characters</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="passwordRequireNumbers"
                      checked={securitySettings.passwordRequireNumbers}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, passwordRequireNumbers: checked})}
                    />
                    <Label htmlFor="passwordRequireNumbers">Require Numbers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="passwordRequireUppercase"
                      checked={securitySettings.passwordRequireUppercase}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, passwordRequireUppercase: checked})}
                    />
                    <Label htmlFor="passwordRequireUppercase">Require Uppercase Letters</Label>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="mfaRequired"
                      checked={securitySettings.mfaRequired}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, mfaRequired: checked})}
                    />
                    <Label htmlFor="mfaRequired">Require Multi-Factor Authentication</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="sessionTimeout" 
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input 
                      id="maxLoginAttempts" 
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">API Security</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiRateLimit">API Rate Limit (requests/minute)</Label>
                    <Input id="apiRateLimit" type="number" defaultValue="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apiKeyExpiry">API Key Expiry (days)</Label>
                    <Input id="apiKeyExpiry" type="number" defaultValue="365" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSecuritySettingsSave}>Save Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure email server settings and notification templates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input 
                    id="smtpHost"
                    value={emailSettings.smtpHost}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input 
                    id="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">SMTP Username</Label>
                  <Input 
                    id="smtpUser"
                    value={emailSettings.smtpUser}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpUser: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input 
                    id="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                    placeholder="******"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="senderName">Sender Name</Label>
                  <Input 
                    id="senderName"
                    value={emailSettings.senderName}
                    onChange={(e) => setEmailSettings({...emailSettings, senderName: e.target.value})}
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
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enableSSL"
                  checked={emailSettings.enableSSL}
                  onCheckedChange={(checked) => setEmailSettings({...emailSettings, enableSSL: checked})}
                />
                <Label htmlFor="enableSSL">Enable SSL/TLS</Label>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Email Templates</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Welcome Email</p>
                      <p className="text-sm text-muted-foreground">Sent to new users upon registration</p>
                    </div>
                    <Button variant="outline" size="sm">Edit Template</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Password Reset</p>
                      <p className="text-sm text-muted-foreground">Sent when users request password reset</p>
                    </div>
                    <Button variant="outline" size="sm">Edit Template</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Account Verification</p>
                      <p className="text-sm text-muted-foreground">Sent to verify user email addresses</p>
                    </div>
                    <Button variant="outline" size="sm">Edit Template</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex space-x-2">
                <Button onClick={handleEmailSettingsSave}>Save Email Settings</Button>
                <Button variant="outline">Send Test Email</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Storage Settings */}
        <TabsContent value="storage">
          <Card>
            <CardHeader>
              <CardTitle>Storage Settings</CardTitle>
              <CardDescription>
                Configure file storage and document management settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storageProvider">Storage Provider</Label>
                <Select defaultValue="local">
                  <SelectTrigger id="storageProvider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local Storage</SelectItem>
                    <SelectItem value="s3">Amazon S3</SelectItem>
                    <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                    <SelectItem value="azure">Azure Blob Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="border p-4 rounded-md bg-muted/50">
                <h3 className="font-medium mb-2">Local Storage Configuration</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="storagePath">Storage Path</Label>
                    <Input id="storagePath" defaultValue="/var/www/storage/uploads" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                      <Input id="maxFileSize" type="number" defaultValue="10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allowedFileTypes">Allowed File Types</Label>
                      <Input id="allowedFileTypes" defaultValue=".jpg,.png,.pdf,.doc,.docx,.xls,.xlsx" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="documentRetention">Document Retention Period (days)</Label>
                  <Input id="documentRetention" type="number" defaultValue="365" />
                  <p className="text-sm text-muted-foreground">
                    Number of days to keep deleted documents. Set to 0 for immediate deletion.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storageQuota">Storage Quota per Company (GB)</Label>
                  <Input id="storageQuota" type="number" defaultValue="5" />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="enableCompression" defaultChecked />
                <Label htmlFor="enableCompression">Enable File Compression</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="enableEncryption" defaultChecked />
                <Label htmlFor="enableEncryption">Enable File Encryption</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Storage Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminSettings;
