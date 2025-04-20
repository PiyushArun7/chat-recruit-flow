
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CandidateStatusPieChartProps {
  qualified: number;
  disqualified: number;
  pending: number;
}

export function CandidateStatusPieChart({ 
  qualified, 
  disqualified, 
  pending 
}: CandidateStatusPieChartProps) {
  
  const data = [
    { name: 'Qualified', value: qualified, color: '#10b981' },
    { name: 'Disqualified', value: disqualified, color: '#ef4444' },
    { name: 'Pending', value: pending, color: '#f59e0b' }
  ].filter(item => item.value > 0);

  if (data.length === 0) {
    data.push({ name: 'No Data', value: 1, color: '#d1d5db' });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Candidate Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Candidates']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
