import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import RoomCard from "@/components/RoomCard";
import AlertPanel from "@/components/AlertPanel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Patient {
  _id: string;
  name: string;
  age: number;
  condition: string;
  doctor: string;
  nurse: string;
  roomNumber: number | null;
}

interface Alert {
  _id: string;
  roomNumber: number;
  patientName: string;
  type: "critical" | "warning" | "info";
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

const Dashboard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // ✅ Fetch all patients
  const { data: patients = [], isLoading: loadingPatients } = useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/patients`);
      if (!res.ok) throw new Error("Failed to fetch patients");
      return res.json();
    },
  });

  // ✅ Fetch alerts
  const { data: alerts = [], isLoading: loadingAlerts } = useQuery<Alert[]>({
    queryKey: ["alerts"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/alerts`);
      if (!res.ok) throw new Error("Failed to fetch alerts");
      return res.json();
    },
    refetchInterval: 5000, // auto-refresh alerts
  });

  // ✅ Mutation for assigning patients
  const assignMutation = useMutation({
    mutationFn: async ({
      patientId,
      roomNumber,
    }: {
      patientId: string;
      roomNumber: number;
    }) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/patients/assign`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patientId, roomNumber }),
        }
      );
      if (!res.ok) throw new Error("Failed to assign patient");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["unassigned"] });
    },
  });

  // ✅ Mutation for acknowledging alerts
  const acknowledgeMutation = useMutation({
    mutationFn: async (alertId: string) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/alerts/${alertId}/acknowledge`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error("Failed to acknowledge alert");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    },
  });

  if (loadingPatients || loadingAlerts) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-4 gap-6">
      {/* Rooms */}
      <div className="col-span-3">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Patient Dashboard</h1>
          <Button onClick={() => navigate("/add-patient")}>+ Add Patient</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((roomNumber) => {
            const patient = patients.find((p) => p.roomNumber === roomNumber);

            // ✅ Show red border if any unacknowledged alert exists for this room
            const hasAlert = alerts.some(
              (a) => a.roomNumber === roomNumber && !a.acknowledged
            );

            return (
              <RoomCard
                key={roomNumber}
                roomNumber={roomNumber}
                patient={patient}
                hasAlert={hasAlert}
                onAssign={(patientId, roomNum) =>
                  assignMutation.mutateAsync({ patientId, roomNumber: roomNum })
                }
              />
            );
          })}
        </div>
      </div>

      {/* Alerts Panel */}
      <div className="col-span-1">
        <AlertPanel
          alerts={alerts.map((a) => ({
            id: a._id,
            roomNumber: a.roomNumber,
            patientName: a.patientName,
            type: a.type,
            message: a.message,
            timestamp: new Date(a.timestamp),
            acknowledged: a.acknowledged,
          }))}
          onAcknowledge={(id) => acknowledgeMutation.mutate(id)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
