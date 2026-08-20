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
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="text-green-700" size={20} />
        <h3 className="text-lg font-semibold text-slate-700">Alert Log</h3>
      </div>
      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.id} className="flex justify-between items-start border-b border-slate-100 pb-2 last:border-0">
            <p className="text-sm text-slate-600">{entry.message}</p>
            <span className="text-xs text-slate-400 whitespace-nowrap ml-3">{timeAgo(entry.timestamp)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertLog;