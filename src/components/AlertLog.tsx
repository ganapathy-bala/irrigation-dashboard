import { Bell } from "lucide-react";
import type { AlertLogEntry } from "../types/sensor";

interface AlertLogProps {
  entries: AlertLogEntry[];
}

function timeAgo(timestamp: number): string {
  const minutes = Math.floor((Date.now() - timestamp) / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

function AlertLog({ entries }: AlertLogProps) {
  return (
    <div className="bg-[#131826] border border-emerald-500/20 rounded-2xl p-5 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="text-emerald-400" size={20} />
        <h3 className="text-lg font-semibold text-slate-200">Alert Log</h3>
      </div>
      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.id} className="flex justify-between items-start border-b border-slate-800 pb-2 last:border-0">
            <p className="text-sm text-slate-300">{entry.message}</p>
            <span className="text-xs text-slate-500 whitespace-nowrap ml-3">{timeAgo(entry.timestamp)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertLog;