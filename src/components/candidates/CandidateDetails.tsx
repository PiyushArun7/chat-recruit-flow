
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Candidate } from '@/types';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface CandidateDetailsProps {
  candidate: Candidate | null;
}

export function CandidateDetails({ candidate }: CandidateDetailsProps) {
  if (!candidate) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8 text-muted-foreground">
            Select a candidate to view details
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Candidate Details</CardTitle>
          <Badge 
            variant={
              candidate.status === 'qualified' ? 'default' :
              candidate.status === 'disqualified' ? 'destructive' : 'outline'
            }
          >
            {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <div className="text-sm font-medium">Phone Number</div>
          <div className="text-base">+{candidate.phone}</div>
        </div>
        
        {candidate.company && (
          <div className="grid gap-2">
            <div className="text-sm font-medium">Current Company</div>
            <div className="text-base">{candidate.company}</div>
          </div>
        )}
        
        {candidate.prevCompany && (
          <div className="grid gap-2">
            <div className="text-sm font-medium">Previous Company</div>
            <div className="text-base">{candidate.prevCompany}</div>
          </div>
        )}
        
        {candidate.noticePeriod && (
          <div className="grid gap-2">
            <div className="text-sm font-medium">Notice Period</div>
            <div className="text-base">{candidate.noticePeriod}</div>
          </div>
        )}
        
        {candidate.ctc && (
          <div className="grid gap-2">
            <div className="text-sm font-medium">Current CTC</div>
            <div className="text-base">{candidate.ctc}</div>
          </div>
        )}
        
        {candidate.product && (
          <div className="grid gap-2">
            <div className="text-sm font-medium">Product</div>
            <div className="text-base">{candidate.product}</div>
          </div>
        )}
        
        {candidate.experience && (
          <div className="grid gap-2">
            <div className="text-sm font-medium">Experience</div>
            <div className="text-base">{candidate.experience}</div>
          </div>
        )}
        
        {candidate.disqualificationReason && (
          <div className="grid gap-2">
            <div className="text-sm font-medium text-red-500">Disqualification Reason</div>
            <div className="text-base text-red-500">{candidate.disqualificationReason}</div>
          </div>
        )}
        
        <div className="grid gap-2">
          <div className="text-sm font-medium">Submitted</div>
          <div className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(candidate.createdAt), { addSuffix: true })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
