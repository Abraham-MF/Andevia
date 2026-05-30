import Link from "next/link";
import { Eye, ArrowUpRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils/formatDate";

interface ReporteRow {
  id: number;
  fechaCreacion: Date;
  nombreSolicitante: string;
  tipoUbicacion: string;
  estado: string;
  espacio?: {
    espacio: string;
    grupo: { nombre: string };
  } | null;
}

interface ReportsTableProps {
  reportes: ReporteRow[];
}

export function ReportsTable({ reportes }: ReportsTableProps) {
  if (reportes.length === 0) {
    return <EmptyState />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 h-9 pl-4">
            Fecha
          </TableHead>
          <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 h-9">
            Solicitante
          </TableHead>
          <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 h-9 hidden sm:table-cell">
            Tipo
          </TableHead>
          <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 h-9 hidden md:table-cell">
            Edificio / Espacio
          </TableHead>
          <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 h-9">
            Estado
          </TableHead>
          <TableHead className="w-12 h-9" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {reportes.map((r) => (
          <TableRow
            key={r.id}
            className="border-border hover:bg-muted/30 transition-colors group"
          >
            <TableCell className="text-[12px] text-muted-foreground whitespace-nowrap pl-4 py-3">
              {formatDate(r.fechaCreacion)}
            </TableCell>
            <TableCell className="py-3">
              <div className="flex items-center gap-2">
                <UserAvatar name={r.nombreSolicitante} size="sm" />
                <span className="text-[13px] font-medium text-foreground">
                  {r.nombreSolicitante}
                </span>
              </div>
            </TableCell>
            <TableCell className="py-3 hidden sm:table-cell">
              <span className="text-[12px] text-muted-foreground">
                {r.tipoUbicacion}
              </span>
            </TableCell>
            <TableCell className="py-3 hidden md:table-cell">
              <div className="text-[12px] leading-tight">
                <span className="font-medium text-foreground">
                  {r.espacio?.grupo.nombre}
                </span>
                {r.espacio?.espacio && (
                  <span className="text-muted-foreground">
                    {" "}/ {r.espacio.espacio}
                  </span>
                )}
              </div>
            </TableCell>
            <TableCell className="py-3">
              <StatusBadge estado={r.estado} />
            </TableCell>
            <TableCell className="py-3 pr-3">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
              >
                <Link href={`/reportes/${r.id}`}>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}