
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { BarChart, MessageSquare, Users, Database, Settings } from 'lucide-react';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="rounded-md bg-primary w-8 h-8 flex items-center justify-center text-white font-bold">
            HS
          </div>
          <div className="font-bold text-lg">Hire Smart</div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" className={({ isActive }) => 
                    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                  }>
                    <BarChart className="w-4 h-4" />
                    <span>Overview</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/candidates" className={({ isActive }) => 
                    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                  }>
                    <Users className="w-4 h-4" />
                    <span>Candidates</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/chats" className={({ isActive }) => 
                    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                  }>
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat Logs</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/bot" className={({ isActive }) => 
                    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                  }>
                    <Database className="w-4 h-4" />
                    <span>WhatsApp Bot</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/settings" className={({ isActive }) => 
                    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                  }>
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-4 py-2">
          <div className="text-xs text-muted-foreground">
            Hire Smart © {new Date().getFullYear()}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
