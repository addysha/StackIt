import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getMemoryAlerts, getMemoryDashboard, getMemoryIntegrations } from "@/lib/memory-store";

export default function DashboardPage() {
  return (
    <DashboardShell
      initialDashboard={getMemoryDashboard()}
      initialIntegrations={getMemoryIntegrations()}
      initialAlerts={getMemoryAlerts()}
    />
  );
}
