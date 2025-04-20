
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const SettingsContent = () => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
              <CardDescription>
                Configure your admin and notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="admin-phone">Admin Phone Number</Label>
                <Input id="admin-phone" placeholder="916200083509" defaultValue="916200083509" />
                <p className="text-sm text-muted-foreground">
                  Admin will receive notifications about new candidates
                </p>
              </div>
              
              <Separator />
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Candidate Notifications</Label>
                  <Switch id="notifications" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when new candidates are processed
                </p>
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="error-notifications">Error Notifications</Label>
                  <Switch id="error-notifications" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about system errors
                </p>
              </div>
              
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recruitment" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recruitment Criteria</CardTitle>
              <CardDescription>
                Configure candidate qualification criteria
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="min-experience">Minimum Experience (Years)</Label>
                  <Input id="min-experience" type="number" defaultValue="2" min="0" step="0.5" />
                </div>
                
                <div>
                  <Label htmlFor="max-notice">Maximum Notice Period (Days)</Label>
                  <Input id="max-notice" type="number" defaultValue="60" min="0" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="ctc-range">CTC Range (LPA)</Label>
                  <div className="flex items-center gap-2">
                    <Input id="min-ctc" type="number" defaultValue="1" min="0" step="0.1" />
                    <span>to</span>
                    <Input id="max-ctc" type="number" defaultValue="6" min="0" step="0.1" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="allowed-products">Allowed Products</Label>
                  <Textarea
                    id="allowed-products"
                    className="min-h-20"
                    defaultValue="home loan, housing loan, hl, loan against property, lap, mortgage loan, ghar ka loan, home finance, loan housing"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Comma separated list of product keywords
                  </p>
                </div>
                
                <Button>Save Criteria</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="whatsapp" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Bot Settings</CardTitle>
              <CardDescription>
                Configure your WhatsApp bot behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="start-messages">Initial Messages</Label>
                <Textarea
                  id="start-messages"
                  className="min-h-32"
                  defaultValue="Hello! This is Shubham Housing Finance.\n\nWe are looking for experienced professionals in Home Loan, LAP and Mortgage Loan.\n\nAre you interested?"
                />
                <p className="text-sm text-muted-foreground">
                  Messages sent when initiating a conversation (one per line)
                </p>
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-connect">Auto-reconnect on disconnect</Label>
                  <Switch id="auto-connect" defaultChecked />
                </div>
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <Switch id="debug-mode" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enable detailed logging for the WhatsApp bot
                </p>
              </div>
              
              <Button>Save WhatsApp Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Configure data storage and backups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="supabase-sync">Supabase Synchronization</Label>
                  <Switch id="supabase-sync" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Sync candidate data with Supabase database
                </p>
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="local-backup">Local File Backup</Label>
                  <Switch id="local-backup" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Keep a local backup of candidate data in candidates.json
                </p>
              </div>
              
              <div className="grid gap-2">
                <Label>Data Export</Label>
                <div className="flex flex-col md:flex-row gap-2">
                  <Button variant="outline" className="w-full md:w-auto">Export Candidates</Button>
                  <Button variant="outline" className="w-full md:w-auto">Export Chat Logs</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-2">
                <Label className="text-destructive">Danger Zone</Label>
                <div className="flex flex-col md:flex-row gap-2">
                  <Button variant="destructive" className="w-full md:w-auto">Clear Chat Logs</Button>
                  <Button variant="destructive" className="w-full md:w-auto">Reset All Data</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <SettingsContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SettingsPage;
