import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, User } from "lucide-react";

interface Patient {
  _id: string;
  name: string;
  age: number;
  condition: string;
  doctor: string;
  nurse: string;
  roomNumber: number | null;
}

interface RoomCardProps {
  roomNumber: number;
  patient?: Patient | null;
  hasAlert?: boolean;   // ✅ added
  onAssign: (patientId: string, roomNum: number) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  roomNumber,
  patient,
  hasAlert,
  onAssign,
}) => {
  const { data: unassignedPatients = [] } = useQuery<Patient[]>({
    queryKey: ["unassigned"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/patients/unassigned`
      );
      if (!res.ok) throw new Error("Failed to fetch unassigned patients");
      return res.json();
    },
  });

  const handleAssign = async (patientId: string) => {
    if (onAssign) {
      await onAssign(patientId, roomNumber);
    }
  };

  return (
    <Card
      className={`h-80 transition-all duration-200 hover:shadow-lg ${
        hasAlert ? "border-2 border-red-500" : "shadow-card"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Room {roomNumber}
          </CardTitle>
          {hasAlert && (
            <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />
          )}
        </div>
        <Badge>{patient ? "Occupied" : "Available"}</Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {patient ? (
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <User className="h-4 w-4 mr-2 text-primary" />
              <span className="font-medium">{patient.name}</span>
              <span className="text-muted-foreground ml-1">
                ({patient.age}y)
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Doctor: {patient.doctor}
            </p>
            <p className="text-xs text-muted-foreground">
              Nurse: {patient.nurse}
            </p>
            <p className="text-xs text-muted-foreground">
              Condition: {patient.condition}
            </p>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <select
              className="border rounded p-2 text-sm"
              defaultValue=""
              onChange={(e) => handleAssign(e.target.value)}
            >
              <option value="">-- Assign Patient --</option>
              {unassignedPatients.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} ({p.age}y)
                </option>
              ))}
            </select>
            <Button size="sm" disabled={unassignedPatients.length === 0}>
              Assign
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomCard;
