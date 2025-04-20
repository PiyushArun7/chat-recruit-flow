
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Separator } from '@/components/ui/separator';

interface Activity {
  id: string;
  type: 'new_candidate' | 'status_change' | 'message';
  title: string;
  description: string;
  timestamp: string;
}

interface RecentActivityListProps {
  activities: Activity[];
}

export function RecentActivityList({ activities }: RecentActivityListProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity, i) => (
            <React.Fragment key={activity.id}>
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{activity.title}</div>
                  <div className="text-sm text-muted-foreground">{activity.description}</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </div>
              </div>
              {i < activities.length - 1 && <Separator />}
            </React.Fragment>
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">No recent activity</div>
        )}
      </CardContent>
    </Card>
  );
}
