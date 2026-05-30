import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  trend,
}: StatsCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card px-5 py-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 min-w-0">
          <p className="text-[12px] font-medium text-muted-foreground leading-none">
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight text-foreground tabular-nums">
            {value}
          </p>
          {description && (
            <p className="text-[11px] text-muted-foreground/70">{description}</p>
          )}
          {trend && (
            <div
              className={cn(
                "inline-flex items-center gap-1 text-[11px] font-semibold rounded-full px-2 py-0.5",
                trend.positive !== false
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-destructive/10 text-destructive"
              )}
            >
              {trend.positive !== false ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {trend.value > 0 ? "+" : ""}
              {trend.value}% {trend.label}
            </div>
          )}
        </div>

        <div
          className={cn(
            "flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl ring-1",
            iconBg,
            iconColor.replace("text-", "ring-").replace(/(-\d+)?$/, "/20")
          )}
        >
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
      </div>
    </div>
  );
}