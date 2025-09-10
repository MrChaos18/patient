// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AlertPanel from "@/components/AlertPanel";
import { Button } from "@/components/ui/button";

const AlertsContainer = () => {
  const queryClient = useQueryClient();

  // Fetch alerts
  const { data: alerts = [] } = useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {q
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/alerts`);
      if (!res.ok) throw new Error("Failed to fetch alerts");
      return res.json();
    },
    refetchInterval: 5000,
  });

  // Acknowledge alert
export const acknowledgeAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { acknowledged: true },
      { new: true }
    );
    if (!alert) return res.status(404).json({ message: "Alert not found" });
    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  // Create dummy alert
  const createAlertMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/alerts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomNumber: 101,
          patientName: "John Doe",
          type: "critical",
          message: "Dummy alert for testing",
        }),
      });
      if (!res.ok) throw new Error("Failed to create alert");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["alerts"] }),
  });

  return (
    <div className="space-y-4">
      <Button
        onClick={() => createAlertMutation.mutate()}
        className="w-full"
        disabled={createAlertMutation.isPending}
      >
        Create Dummy Alert
      </Button>

      <AlertPanel
        alerts={alerts}
        onAcknowledge={(id) => acknowledgeMutation.mutate(id)}
      />
    </div>
  );
};

export default AlertsContainer;
