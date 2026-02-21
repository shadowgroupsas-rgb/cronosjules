"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Perfil de Empresa</CardTitle>
            <CardDescription>
              Información general de la organización.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" defaultValue="Copower Energy Solutions" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Guardar Cambios</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
            <CardDescription>
              Configurar alertas automáticas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="email" className="rounded border-gray-300" defaultChecked />
              <Label htmlFor="email">Email por horas extras</Label>
            </div>
             <div className="flex items-center space-x-2">
              <input type="checkbox" id="push" className="rounded border-gray-300" defaultChecked />
              <Label htmlFor="push">Push notifications al móvil</Label>
            </div>
          </CardContent>
          <CardFooter>
             <Button variant="outline">Configurar Integraciones</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
