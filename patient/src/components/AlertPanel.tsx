import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, CheckCircle } from "lucide-react";

interface Alert {
  id: string;
  roomNumber: number;
  patientName: string;
  type: "critical" | "warning" | "info";
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

interface AlertPanelProps {
  alerts: Alert[];
  onAcknowledge?: (alertId: string) => void;
}

const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, onAcknowledge }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-info" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-gradient-alert text-destructive-foreground";
      case "warning":
        return "bg-gradient-warning text-warning-foreground";
      default:
        return "bg-gradient-primary text-info-foreground";
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ✅ Only show alerts that are NOT acknowledged
  const activeAlerts = alerts.filter((a) => !a.acknowledged);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
          Active Alerts ({activeAlerts.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {activeAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mb-2 text-success" />
            <p>No active alerts</p>
            <p className="text-sm">All patients stable</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 rounded-lg border bg-card border-destructive/20 shadow-sm"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getAlertIcon(alert.type)}
                    <Badge className={getAlertBadge(alert.type)}>
                      Room {alert.roomNumber}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(alert.timestamp)}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="font-medium text-sm">{alert.patientName}</p>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                </div>

                {onAcknowledge && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full hover:bg-success hover:text-success-foreground"
                    onClick={() => onAcknowledge(alert.id)}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Acknowledge
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertPanel;
