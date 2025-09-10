import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AddPatient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    condition: "",
    doctor: "",
    nurse: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age),
        }),
      });

      if (!res.ok) throw new Error("Failed to add patient");

      navigate("/"); // back to dashboard
    } catch (err) {
      console.error("Error adding patient:", err);
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Add Patient</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Patient Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 text-sm"
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 text-sm"
            />

            <input
              type="text"
              name="condition"
              placeholder="Condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
            />

            <input
              type="text"
              name="doctor"
              placeholder="Doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
            />

            <input
              type="text"
              name="nurse"
              placeholder="Nurse"
              value={formData.nurse}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
            />

            <Button type="submit" className="w-full">
              Save Patient
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPatient;
