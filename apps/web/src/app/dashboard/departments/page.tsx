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
import { Plus } from "lucide-react";

export default function DepartmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Departamentos</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Departamento
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Mantenimiento</TableCell>
              <TableCell>Reparación y mantenimiento de equipos</TableCell>
              <TableCell>Pedro Sanchez</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">Editar</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Operaciones</TableCell>
              <TableCell>Logística y ejecución</TableCell>
              <TableCell>Maria Garcia</TableCell>
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
