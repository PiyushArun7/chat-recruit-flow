
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { StatCard } from '@/components/dashboard/StatCard';
import { CandidateStatusPieChart } from '@/components/dashboard/CandidateStatusPieChart';
import { RecentActivityList } from '@/components/dashboard/RecentActivityList';
import { useAppContext } from '@/context/AppContext';
import { BarChart, Users, Bot, MessageSquare } from 'lucide-react';

const Dashboard = () => {
  const { dashboardStats, candidates, chatLogs } = useAppContext();
  
  // Mock recent activities based on actual data
  const recentActivities = React.useMemo(() => {
    const activities = [];
    
    // Add candidate activities
    candidates.forEach(candidate => {
      activities.push({
        id: `candidate-${candidate.id}`,
        type: 'new_candidate',
        title: `New Candidate: +${candidate.phone}`,
        description: `Status: ${candidate.status}`,
        timestamp: candidate.createdAt
      });
    });
    
    // Add message activities from chat logs
    chatLogs.forEach(log => {
      const lastMessage = log.messages[log.messages.length - 1];
      if (lastMessage) {
        const candidate = candidates.find(c => c.id === log.candidateId);
        activities.push({
          id: `message-${log.candidateId}-${lastMessage.timestamp}`,
          type: 'message',
          title: `New Message from ${candidate ? '+' + candidate.phone : 'Candidate'}`,
          description: lastMessage.sender === 'user' ? lastMessage.message : 'Bot replied',
          timestamp: lastMessage.timestamp
        });
      }
    });
    
    // Sort by timestamp (most recent first)
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);
  }, [candidates, chatLogs]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Candidates" 
          value={dashboardStats.totalCandidates} 
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard 
          title="Qualified" 
          value={dashboardStats.qualifiedCandidates} 
          icon={<Users className="h-4 w-4" />}
          trend="neutral"
          trendValue={`${Math.round((dashboardStats.qualifiedCandidates / (dashboardStats.totalCandidates || 1)) * 100)}% of total`}
        />
        <StatCard 
          title="Disqualified" 
          value={dashboardStats.disqualifiedCandidates} 
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard 
          title="Recent Messages" 
          value={dashboardStats.recentMessages} 
          icon={<MessageSquare className="h-4 w-4" />}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CandidateStatusPieChart 
          qualified={dashboardStats.qualifiedCandidates}
          disqualified={dashboardStats.disqualifiedCandidates}
          pending={dashboardStats.pendingCandidates}
        />
        <RecentActivityList activities={recentActivities} />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <Dashboard />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
