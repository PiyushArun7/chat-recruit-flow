
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Candidate } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface CandidatesListProps {
  candidates: Candidate[];
  onSelect: (candidateId: string) => void;
  selectedCandidateId: string | null;
}

export function CandidatesList({
  candidates,
  onSelect,
  selectedCandidateId
}: CandidatesListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = 
      candidate.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.product?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      candidate.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewChat = (candidateId: string) => {
    navigate(`/chats/${candidateId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Candidates</CardTitle>
        <div className="flex flex-col md:flex-row gap-2 mt-2">
          <Input
            placeholder="Search by phone, company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="disqualified">Disqualified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate, index) => (
              <React.Fragment key={candidate.id}>
                <div 
                  className={`p-3 rounded-md cursor-pointer hover:bg-muted transition-colors ${
                    selectedCandidateId === candidate.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => onSelect(candidate.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">+{candidate.phone}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {candidate.company || candidate.prevCompany ? 
                          `Company: ${candidate.company || candidate.prevCompany}` : 
                          'Company: Not specified'}
                      </div>
                      {candidate.product && (
                        <div className="text-sm text-muted-foreground">
                          Product: {candidate.product}
                        </div>
                      )}
                      {candidate.experience && (
                        <div className="text-sm text-muted-foreground">
                          Experience: {candidate.experience}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge 
                        variant={
                          candidate.status === 'qualified' ? 'default' :
                          candidate.status === 'disqualified' ? 'destructive' : 'outline'
                        }
                        className="ml-2"
                      >
                        {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(candidate.createdAt), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                  
                  {candidate.disqualificationReason && (
                    <div className="mt-2 text-sm text-red-500">
                      Reason: {candidate.disqualificationReason}
                    </div>
                  )}
                  
                  <div className="mt-3 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewChat(candidate.id);
                      }}
                    >
                      View Chat
                    </Button>
                  </div>
                </div>
                {index < filteredCandidates.length - 1 && <Separator />}
              </React.Fragment>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No candidates found matching your filters
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
