
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { CandidatesList } from '@/components/candidates/CandidatesList';
import { CandidateDetails } from '@/components/candidates/CandidateDetails';
import { useAppContext } from '@/context/AppContext';

const CandidatesContent = () => {
  const { candidates, selectedCandidateId, setSelectedCandidateId } = useAppContext();
  
  const selectedCandidate = selectedCandidateId
    ? candidates.find(c => c.id === selectedCandidateId) || null
    : null;
  
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight">Candidates</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CandidatesList 
            candidates={candidates} 
            onSelect={setSelectedCandidateId}
            selectedCandidateId={selectedCandidateId}
          />
        </div>
        <div className="lg:col-span-1">
          <CandidateDetails candidate={selectedCandidate} />
        </div>
      </div>
    </div>
  );
};

const CandidatesPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <CandidatesContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CandidatesPage;
