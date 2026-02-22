"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Activity } from "lucide-react";
import { GodEyeMap } from "@/components/maps/god-eye-map";

export default function GodEyePage() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  // Poll for active users list
  useEffect(() => {
    const fetchActive = async () => {
        try {
            const res = await fetch('/api/proxy/god-eye/active');
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    fetchActive();
    const interval = setInterval(fetchActive, 10000);
    return () => clearInterval(interval);
  }, []);

  // Subscribe to live tracking (SSE)
  useEffect(() => {
    // Connect to "all" channel to receive updates for everyone
    const eventSource = new EventSource('/api/proxy/god-eye/live/all');

    eventSource.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'heartbeat') return;

        const data = message.data || message; // Handle wrapping

        // Update user position in list if user exists
        setUsers(prevUsers => {
            return prevUsers.map(user => {
                // Assuming the recordId maps to user, or the backend emits userId.
                // For this demo, let's assume if we have a match by some criteria (e.g. tracking active), update.
                // Or simplified: if 'data.recordId' matches active record.

                // Since we don't have recordId in the user list from getActive() stub yet,
                // let's blindly update the first user for visual confirmation if ID matches.
                // In a real app, `getActive` returns `overtimeRecordId`.

                // Mock update logic:
                if (data.lat && data.lng) {
                     // Check if this update belongs to this user (needs ID match)
                     // For now, if we receive an update, update the user with ID 1 for demo purposes if no ID present
                     if (user.id === "1" || user.id === data.userId) {
                         return { ...user, lat: data.lat, lng: data.lng };
                     }
                }
                return user;
            });
        });
      } catch (e) {
        console.error("SSE Parse Error", e);
      }
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-8rem)]">
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
                      {user.role}
                    </p>
                  </div>
                </div>
              ))}
              {users.length === 0 && (
                <div className="text-center p-4 text-muted-foreground">
                    Cargando empleados...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
