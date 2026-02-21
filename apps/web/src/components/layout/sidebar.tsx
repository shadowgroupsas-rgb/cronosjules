"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Eye,
  Clock,
  Users,
  Building2,
  MapPin,
  FileText,
  Settings,
  Bell
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Ojo de Dios",
    icon: Eye,
    href: "/dashboard/god-eye",
    color: "text-emerald-500",
  },
  {
    label: "Horas Extras",
    icon: Clock,
    href: "/dashboard/overtime",
    color: "text-violet-500",
  },
  {
    label: "Empleados",
    icon: Users,
    href: "/dashboard/employees",
    color: "text-pink-700",
  },
  {
    label: "Departamentos",
    icon: Building2,
    href: "/dashboard/departments",
    color: "text-orange-700",
  },
  {
    label: "Zonas",
    icon: MapPin,
    href: "/dashboard/zones",
    color: "text-green-700",
  },
  {
    label: "Reportes",
    icon: FileText,
    href: "/dashboard/reports",
    color: "text-blue-700",
  },
  {
    label: "Notificaciones",
    icon: Bell,
    href: "/dashboard/notifications",
    color: "text-yellow-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            {/* Logo placeholder */}
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-bold">C</div>
          </div>
          <h1 className="text-2xl font-bold">
            CRONOS
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <Link
            href="/dashboard/settings"
            className={cn(
            "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
            pathname === "/dashboard/settings" ? "text-white bg-white/10" : "text-zinc-400"
            )}
        >
            <div className="flex items-center flex-1">
            <Settings className="h-5 w-5 mr-3 text-gray-400" />
            Configuración
            </div>
        </Link>
      </div>
    </div>
  );
}
