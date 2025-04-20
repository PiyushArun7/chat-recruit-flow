
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { BotStatusCard } from '@/components/bot/BotStatusCard';
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const BotContent = () => {
  const { 
    botStatus, 
    connectBot, 
    disconnectBot, 
    refreshQRCode,
    recruitmentFlow,
    faqs
  } = useAppContext();
  
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight">WhatsApp Bot</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BotStatusCard 
          status={botStatus}
          onConnect={connectBot}
          onDisconnect={disconnectBot}
          onRefreshQR={refreshQRCode}
        />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div className="text-sm font-medium">Send Test Message</div>
              <div className="flex flex-col md:flex-row gap-2">
                <Input placeholder="Phone Number" />
                <Button className="shrink-0">Send Test</Button>
              </div>
            </div>
            
            <div className="grid gap-2">
              <div className="text-sm font-medium">Import Phone Numbers</div>
              <div className="flex flex-col md:flex-row gap-2">
                <Textarea placeholder="One number per line" className="min-h-20" />
                <Button className="shrink-0 self-start">Import</Button>
              </div>
            </div>
            
            <div className="grid gap-2">
              <div className="text-sm font-medium">Bot Logs</div>
              <Button className="shrink-0 w-full md:w-auto">Download Logs</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="flow">
        <TabsList>
          <TabsTrigger value="flow">Recruitment Flow</TabsTrigger>
          <TabsTrigger value="faq">FAQ Responses</TabsTrigger>
        </TabsList>
        <TabsContent value="flow" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Chat Flow Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Step</TableHead>
                    <TableHead>Match Pattern</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recruitmentFlow.steps.map((step) => (
                    <TableRow key={step.id}>
                      <TableCell className="font-medium">{step.step}</TableCell>
                      <TableCell>{step.match || '—'}</TableCell>
                      <TableCell>{step.ask}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="faq" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">FAQ Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Response</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faqs.map((faq, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{faq.key}</TableCell>
                      <TableCell>{faq.response}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const BotPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <BotContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default BotPage;
