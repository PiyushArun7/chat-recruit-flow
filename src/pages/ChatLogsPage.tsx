
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { CandidatesList } from '@/components/candidates/CandidatesList';
import { ChatView } from '@/components/chats/ChatView';
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent } from '@/components/ui/card';

const ChatLogsContent = () => {
  const { id } = useParams<{ id?: string }>();
  const { 
    candidates, 
    chatLogs,
    selectedCandidateId, 
    setSelectedCandidateId 
  } = useAppContext();

  // If an ID is provided in the URL, select that candidate
  useEffect(() => {
    if (id && id !== selectedCandidateId) {
      setSelectedCandidateId(id);
    }
  }, [id, selectedCandidateId, setSelectedCandidateId]);
  
  const selectedCandidate = selectedCandidateId
    ? candidates.find(c => c.id === selectedCandidateId) || null
    : null;
  
  const selectedChatLog = selectedCandidateId
    ? chatLogs.find(log => log.candidateId === selectedCandidateId) || null
    : null;
  
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight">Chat Logs</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CandidatesList 
            candidates={candidates} 
            onSelect={setSelectedCandidateId}
            selectedCandidateId={selectedCandidateId}
          />
        </div>
        <div className="lg:col-span-2">
          <ChatView 
            chatLog={selectedChatLog} 
            candidatePhone={selectedCandidate?.phone}
          />
        </div>
      </div>
    </div>
  );
};

const ChatLogsPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <ChatLogsContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ChatLogsPage;
