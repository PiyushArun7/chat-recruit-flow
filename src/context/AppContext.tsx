
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Candidate, BotStatus, ChatLog, RecruitmentFlow, FAQ, DashboardStats } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface AppContextType {
  candidates: Candidate[];
  botStatus: BotStatus;
  chatLogs: ChatLog[];
  recruitmentFlow: RecruitmentFlow;
  faqs: FAQ[];
  dashboardStats: DashboardStats;
  setCandidates: (candidates: Candidate[]) => void;
  setBotStatus: (status: BotStatus) => void;
  setChatLogs: (logs: ChatLog[]) => void;
  setRecruitmentFlow: (flow: RecruitmentFlow) => void;
  setFaqs: (faqs: FAQ[]) => void;
  connectBot: () => Promise<void>;
  disconnectBot: () => Promise<void>;
  refreshQRCode: () => Promise<void>;
  selectedCandidateId: string | null;
  setSelectedCandidateId: (id: string | null) => void;
}

const initialStats: DashboardStats = {
  totalCandidates: 0,
  qualifiedCandidates: 0,
  disqualifiedCandidates: 0,
  pendingCandidates: 0,
  recentMessages: 0
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [botStatus, setBotStatus] = useState<BotStatus>({ isConnected: false });
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [recruitmentFlow, setRecruitmentFlow] = useState<RecruitmentFlow>({ steps: [] });
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>(initialStats);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  // Calculate dashboard stats whenever candidates or chatLogs change
  useEffect(() => {
    const stats: DashboardStats = {
      totalCandidates: candidates.length,
      qualifiedCandidates: candidates.filter(c => c.status === 'qualified').length,
      disqualifiedCandidates: candidates.filter(c => c.status === 'disqualified').length,
      pendingCandidates: candidates.filter(c => c.status === 'pending').length,
      recentMessages: chatLogs.reduce((sum, log) => sum + log.messages.length, 0)
    };
    setDashboardStats(stats);
  }, [candidates, chatLogs]);

  // Mock functions for now - these would be connected to your API in production
  const connectBot = async () => {
    try {
      setBotStatus({ isConnected: false, isStartingUp: true });
      // This would be an API call in production
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate getting a QR code
      setBotStatus({ 
        isConnected: false, 
        isStartingUp: false,
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=whatsapp-mock-connection'
      });
      
      toast({
        title: "WhatsApp Bot Status",
        description: "Scan QR code to connect WhatsApp",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to initialize WhatsApp connection",
      });
      setBotStatus({ isConnected: false });
    }
  };

  const disconnectBot = async () => {
    try {
      // This would be an API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBotStatus({ isConnected: false });
      toast({
        title: "WhatsApp Bot Status",
        description: "Bot disconnected successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Disconnection Error",
        description: "Failed to disconnect WhatsApp bot",
      });
    }
  };

  const refreshQRCode = async () => {
    try {
      // This would be an API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBotStatus({
        ...botStatus,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=whatsapp-new-code-${Date.now()}`
      });
      toast({
        title: "QR Code Refreshed",
        description: "New QR code generated for WhatsApp connection",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "QR Code Error",
        description: "Failed to refresh QR code",
      });
    }
  };

  // Mock sample data for demonstration
  useEffect(() => {
    // Mock candidates
    const mockCandidates: Candidate[] = [
      {
        id: '1',
        phone: '918765432101',
        company: 'ABC Finance',
        ctc: '4.5 LPA',
        product: 'Home Loan',
        experience: '3 years',
        status: 'qualified',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        phone: '917654321098',
        company: 'XYZ Housing',
        ctc: '6.2 LPA',
        product: 'Mortgage Loan',
        experience: '4 years',
        status: 'disqualified',
        disqualificationReason: 'CTC above 6 LPA',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '3',
        phone: '919876543210',
        company: 'LMN Bank',
        ctc: '3.8 LPA',
        product: 'LAP',
        experience: '2.5 years',
        status: 'qualified',
        createdAt: new Date(Date.now() - 172800000).toISOString()
      },
      {
        id: '4',
        phone: '916789012345',
        prevCompany: 'PQR Finance',
        ctc: '3.2 LPA',
        product: 'Home Loan',
        experience: '1.5 years',
        status: 'disqualified',
        disqualificationReason: 'Experience below 2 years',
        createdAt: new Date(Date.now() - 259200000).toISOString()
      },
    ];
    setCandidates(mockCandidates);

    // Mock chat logs
    const mockChatLogs: ChatLog[] = [
      {
        candidateId: '1',
        messages: [
          { sender: 'bot', message: 'Are you interested?', timestamp: new Date(Date.now() - 3600000).toISOString(), step: 'interest' },
          { sender: 'user', message: 'Yes, I am interested', timestamp: new Date(Date.now() - 3500000).toISOString() },
          { sender: 'bot', message: 'Currently in which company are you working?', timestamp: new Date(Date.now() - 3400000).toISOString(), step: 'company' },
          { sender: 'user', message: 'ABC Finance', timestamp: new Date(Date.now() - 3300000).toISOString() },
        ]
      },
      {
        candidateId: '2',
        messages: [
          { sender: 'bot', message: 'Are you interested?', timestamp: new Date(Date.now() - 86400000).toISOString(), step: 'interest' },
          { sender: 'user', message: 'Yes', timestamp: new Date(Date.now() - 86300000).toISOString() },
          { sender: 'bot', message: 'Currently in which company are you working?', timestamp: new Date(Date.now() - 86200000).toISOString(), step: 'company' },
          { sender: 'user', message: 'XYZ Housing', timestamp: new Date(Date.now() - 86100000).toISOString() },
        ]
      }
    ];
    setChatLogs(mockChatLogs);

    // Mock recruitment flow
    const mockRecruitmentFlow: RecruitmentFlow = {
      steps: [
        { id: '1', step: 'interest', match: 'yes|interested|haan|ha|bilkul|ok|okay|sure|ready|zaroor|kyun nahi|main interested hoon|done', ask: 'Are you interested?' },
        { id: '2', step: 'company', match: '', ask: 'Currently in which company are you working?' },
        { id: '3', step: 'prev_company', match: '', ask: 'Okay, which was your previous company?' },
        { id: '4', step: 'notice', match: '', ask: 'Ok and your notice period?' },
        { id: '5', step: 'ctc', match: '', ask: 'Ok, What\'s your current CTC?' },
        { id: '6', step: 'product', match: '', ask: 'Ok, Which product are you currently handling?' },
        { id: '7', step: 'experience', match: '', ask: 'How many years of experience in this product?' },
        { id: '8', step: 'cv', match: '', ask: 'Kindly forward me your CV.' }
      ]
    };
    setRecruitmentFlow(mockRecruitmentFlow);

    // Mock FAQs
    const mockFaqs: FAQ[] = [
      { key: 'ctc', response: 'The CTC depends on your experience and interview performance.' },
      { key: 'profile', response: 'The role is for Sales/Relationship Manager in Home Loan, LAP and Mortgage Loan.' },
      { key: 'location', response: 'The job is for the Kota branch of Shubham Housing Finance.' },
      { key: 'company', response: 'The company is Shubham Housing Finance.' },
      { key: 'work from home', response: 'Currently, the role requires working from the office at the branch location.' }
    ];
    setFaqs(mockFaqs);
  }, []);

  return (
    <AppContext.Provider value={{
      candidates,
      botStatus,
      chatLogs,
      recruitmentFlow,
      faqs,
      dashboardStats,
      setCandidates,
      setBotStatus,
      setChatLogs,
      setRecruitmentFlow,
      setFaqs,
      connectBot,
      disconnectBot,
      refreshQRCode,
      selectedCandidateId,
      setSelectedCandidateId
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
