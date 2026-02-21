"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ZonesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Geocercas</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Zona
        </Button>
      </div>

      <div className="rounded-md border border-dashed p-8 text-center">
        <p className="text-muted-foreground">Mapa de editor de zonas en construcción.</p>
      </div>
    </div>
  );
}
