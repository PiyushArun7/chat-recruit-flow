import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BotStatus } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface BotStatusCardProps {
  status: BotStatus;
  onConnect: () => void;
  onDisconnect: () => void;
  onRefreshQR: () => void;
}

export function BotStatusCard({
  status,
  onConnect,
  onDisconnect,
  onRefreshQR
}: BotStatusCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted">
        <CardTitle className="text-lg font-medium">WhatsApp Bot Status</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          {status.isConnected ? (
            <div className="flex items-center space-x-2 text-green-500">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="font-medium">Connected</span>
            </div>
          ) : status.isStartingUp ? (
            <div className="flex items-center space-x-2 text-amber-500">
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-medium">Initializing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-red-500">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="font-medium">Disconnected</span>
            </div>
          )}
          
          {status.qrCode && !status.isConnected && (
            <div className="my-4 p-4 bg-white rounded-lg border">
              <img 
                src={`data:image/png;base64,${status.qrCode}`} 
                alt="WhatsApp QR Code" 
                className="w-48 h-48"
              />
              <p className="text-xs text-center mt-2 text-muted-foreground">
                Scan with WhatsApp to connect
              </p>
            </div>
          )}
          
          {status.lastActive && (
            <p className="text-sm text-muted-foreground">
              Last active: {formatDistanceToNow(new Date(status.lastActive), { addSuffix: true })}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 pt-2 pb-6">
        {status.isConnected ? (
          <Button variant="destructive" onClick={onDisconnect}>
            Disconnect
          </Button>
        ) : status.qrCode ? (
          <Button variant="outline" onClick={onRefreshQR}>
            Refresh QR Code
          </Button>
        ) : (
          <Button onClick={onConnect} disabled={status.isStartingUp}>
            Connect WhatsApp
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
