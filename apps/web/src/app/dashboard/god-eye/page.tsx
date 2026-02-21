"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "lucide-react"; // Wait, Badge is ui component? I don't have it. Use simple div.
// lucide-react doesn't have Badge.
import { Activity, User } from "lucide-react";
import { GodEyeMap } from "@/components/maps/god-eye-map";

// Mock data until backend is fully functional
const MOCK_USERS = [
  { id: "1", name: "Juan Pérez", role: "Técnico", department: "Mantenimiento", lat: 4.7110, lng: -74.0721, status: "active", lastUpdate: new Date().toISOString() },
  { id: "2", name: "Maria Garcia", role: "Supervisor", department: "Operaciones", lat: 4.6980, lng: -74.0500, status: "active", lastUpdate: new Date().toISOString() },
  { id: "3", name: "Carlos Ruiz", role: "Técnico", department: "Instalaciones", lat: 4.7250, lng: -74.0300, status: "inactive", lastUpdate: new Date().toISOString() },
];

export default function GodEyePage() {
  const [users, setUsers] = useState<any[]>(MOCK_USERS);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  // Poll for active users
  useEffect(() => {
    const interval = setInterval(() => {
      // In real implementation: fetch('/api/proxy/god-eye/active').then...
      // For now, simulate movement
      setUsers(prev => prev.map(u => {
        if (u.status === 'active') {
          return {
            ...u,
            lat: u.lat + (Math.random() - 0.5) * 0.001,
            lng: u.lng + (Math.random() - 0.5) * 0.001,
            lastUpdate: new Date().toISOString()
          };
        }
        return u;
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Subscribe to live tracking for selected user (SSE)
  useEffect(() => {
    if (!selectedUser) return;

    // const eventSource = new EventSource(`/api/proxy/god-eye/live/${selectedUser.id}`);
    // eventSource.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   // Update user position
    // };
    // return () => eventSource.close();
  }, [selectedUser]);

  return (
    <div className="flex h-full flex-col md:flex-row gap-4 h-[calc(100vh-8rem)]">
      {/* Map Area */}
      <div className="flex-1 rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden min-h-[400px]">
         <GodEyeMap
            users={users.filter(u => u.status === 'active')}
            onSelectUser={setSelectedUser}
            selectedUser={selectedUser}
         />
      </div>

      {/* Sidebar List */}
      <div className="w-full md:w-80 flex flex-col gap-4">
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              Actividad en Vivo
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-2">
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedUser?.id === user.id
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                      user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {user.department} • {user.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
