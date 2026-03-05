import { useQuery } from "@tanstack/react-query";
import { FiClock, FiActivity, FiRefreshCw, FiInfo, FiUser } from "react-icons/fi";
import { mockApiService } from "@services/mockApiService";

export default function AuditLogs() {
    const { data: logs = [], isLoading, refetch, isFetching } = useQuery({
        queryKey: ['admin', 'logs'],
        queryFn: mockApiService.getLogs
    });

    const formatTimestamp = (ts) => {
        const date = new Date(ts);
        return date.toLocaleString();
    };

    if (isLoading) return <div className="p-20 text-center animate-pulse text-[var(--theme-text-muted)] font-black uppercase tracking-widest text-xs">RECOVERING SYSTEM TELEMETRY...</div>;

    return (
        <div className="animate-[fadeIn_0.5s_ease-out]">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-black/20"><FiActivity size={22} /></div>
                    <div>
                        <h1 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">Security & Audit</h1>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">Immutable Activity Log // Real-time Monitoring</p>
                    </div>
                </div>
                <button
                    onClick={() => refetch()}
                    className="admin-btn-secondary flex items-center gap-2 group border-neutral-200"
                >
                    <FiRefreshCw size={14} className={`${isFetching ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
                    <span>RE-SYNC LOGS</span>
                </button>
            </div>

            <div className="admin-list-card !rounded-[3rem] border-neutral-100 overflow-hidden shadow-sm">
                <div className="admin-list-header !px-12 !py-8 bg-neutral-50/50 border-b border-neutral-100">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                        <FiActivity size={14} className="text-indigo-600" /> System Entry Activity Stream
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="admin-table !border-none">
                        <thead>
                            <tr className="bg-neutral-50/30">
                                <th className="pl-12 !py-6">TIME SIGNAL</th>
                                <th>OPERATION</th>
                                <th>DATA PAYLOAD</th>
                                <th className="pr-12 text-right">ADMIN ENTITY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length === 0 ? (
                                <tr><td colSpan="4" className="text-center py-32 text-neutral-300 font-black uppercase tracking-[0.3em] text-[10px] italic opacity-40">No Activity Logs Found in Registry</td></tr>
                            ) : logs.map(log => (
                                <tr key={log.id} className="group hover:bg-neutral-50/50 transition-colors border-b border-neutral-50 last:border-0">
                                    <td className="pl-12 !py-5">
                                        <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400 opacity-60">
                                            <FiClock size={10} /> {formatTimestamp(log.timestamp)}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.1em]
                                            ${log.action.includes('Delete') ? 'bg-red-50 text-red-600 border border-red-100' :
                                                log.action.includes('Create') ? 'bg-green-50 text-green-600 border border-green-100' :
                                                    'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-start gap-2 max-w-lg">
                                            <FiInfo size={12} className="mt-0.5 text-neutral-300 shrink-0" />
                                            <span className="text-xs text-neutral-500 font-medium leading-relaxed">{log.details}</span>
                                        </div>
                                    </td>
                                    <td className="pr-12 !py-5">
                                        <div className="flex items-center gap-2 justify-end">
                                            <div className="w-7 h-7 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center text-[10px]">
                                                <FiUser size={12} />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-700">{log.user}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

