import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, LogOut, Activity, Users, Settings, AlertTriangle } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const navigation = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Patients', url: '/patients', icon: Users },
  { title: 'Alerts', url: '/alerts', icon: AlertTriangle },
  { title: 'Monitoring', url: '/monitoring', icon: Activity },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function PatientMonitoringSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? 'bg-primary text-primary-foreground hover:bg-primary-hover' 
      : 'hover:bg-accent';

  return (
    <Sidebar className="border-r border-border bg-card">
      <SidebarContent>
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">Patient Monitor</h2>
              <p className="text-xs text-muted-foreground">Healthcare System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Actions */}
        <div className="mt-auto p-4 border-t border-border">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span className="ml-2">Log Out</span>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}