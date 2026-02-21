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
import { Download, Filter } from "lucide-react";

export default function OvertimePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Horas Extras</h1>
        <div className="flex items-center gap-2">
            <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
            </Button>
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar
            </Button>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empleado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Entrada</TableHead>
              <TableHead>Salida</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Zona</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Juan Pérez</TableCell>
              <TableCell>20/05/2026</TableCell>
              <TableCell>18:00</TableCell>
              <TableCell>22:30</TableCell>
              <TableCell>4.5h</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  Completado
                </span>
              </TableCell>
              <TableCell>Zona Norte</TableCell>
            </TableRow>
             <TableRow>
              <TableCell className="font-medium">Carlos Ruiz</TableCell>
              <TableCell>20/05/2026</TableCell>
              <TableCell>19:00</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                  En curso
                </span>
              </TableCell>
              <TableCell>Zona Sur</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
