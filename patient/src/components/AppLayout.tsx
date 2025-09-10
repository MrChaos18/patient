import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Clear auth/session in future
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 flex items-center justify-between border-b border-border bg-card px-6">
        <div className="flex items-center gap-2">
          {/* Logo with blue circular background */}
          <div className="h-8 w-8 rounded-full flex items-center justify-center font-bold">
            <img
              src="logo.jpeg"
              alt="Patient Monitor Logo"
              className="h-6 w-6 object-cover"
            />
          </div>
          <h2 className="font-semibold text-lg">
            Patient Monitor{" "}
            <span className="text-muted-foreground">Healthcare System</span>
          </h2>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Log Out
        </Button>
      </header>

      {/* Page Content */}
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
};

export default AppLayout;
