
export interface Candidate {
  id: string;
  name?: string;
  phone: string;
  company?: string;
  prevCompany?: string;
  noticePeriod?: string;
  ctc?: string;
  product?: string;
  experience?: string;
  status: 'qualified' | 'disqualified' | 'pending';
  createdAt: string;
  disqualificationReason?: string;
}

export interface ChatMessage {
  sender: 'bot' | 'user';
  message: string;
  timestamp: string;
  step?: string;
}

export interface ChatLog {
  candidateId: string;
  messages: ChatMessage[];
}

export interface BotStatus {
  isConnected: boolean;
  lastActive?: string;
  qrCode?: string;
  isStartingUp?: boolean;
}

export interface RecruitmentFlow {
  steps: FlowStep[];
}

export interface FlowStep {
  id: string;
  step: string;
  match?: string;
  ask: string;
}

export interface FAQ {
  key: string;
  response: string;
}

export interface DashboardStats {
  totalCandidates: number;
  qualifiedCandidates: number;
  disqualifiedCandidates: number;
  pendingCandidates: number;
  recentMessages: number;
}
