"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Empleados</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Empleado
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar empleados..."
              className="pl-8"
            />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Juan Pérez</TableCell>
              <TableCell>juan@cronos.com</TableCell>
              <TableCell>Técnico</TableCell>
              <TableCell>Mantenimiento</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Activo
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">Editar</Button>
              </TableCell>
            </TableRow>
             <TableRow>
              <TableCell className="font-medium">Maria Garcia</TableCell>
              <TableCell>maria@cronos.com</TableCell>
              <TableCell>Supervisor</TableCell>
              <TableCell>Operaciones</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Activo
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">Editar</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
