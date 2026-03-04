import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiGrid, FiArrowLeft } from 'react-icons/fi';
import BracketGenerator from '../components/BracketGenerator';
import { mockApiService } from '../../../public/services/mockApiService';

export default function EsportsBrackets() {
    const [view, setView] = useState('list'); // 'list' or 'generate'
    const [brackets, setBrackets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await mockApiService.getAllBrackets();
            setBrackets(data);
            setLoading(false);
        };
        load();
    }, []);

    const handleNewBracket = async (bracketData) => {
        const newBracket = await mockApiService.addBracket(bracketData);
        setBrackets([newBracket, ...brackets]);
        setView('list');
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this bracket?")) return;
        await mockApiService.deleteBracket(id);
        setBrackets(prev => prev.filter(b => b.id !== id));
    };

    if (loading) return <div className="p-20 text-center animate-pulse text-xs font-black tracking-widest opacity-40">LOADING BRACKETS...</div>;

    if (view === 'generate') {
        return (
            <div>
                <div className="mb-8">
                    <button
                        onClick={() => setView('list')}
                        className="flex items-center gap-2 text-xs font-bold text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-colors"
                    >
                        <FiArrowLeft /> BACK TO BRACKETS
                    </button>
                    <h1 className="admin-page-title mt-4 mb-0">BRACKET GENERATOR</h1>
                </div>
                <BracketGenerator onGenerate={handleNewBracket} />
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="admin-page-title mb-0">BRACKETS & MATCHES</h1>
                <button
                    onClick={() => setView('generate')}
                    className="admin-btn-primary"
                >
                    <FiPlus size={13} /> GENERATE BRACKET
                </button>
            </div>

            <div className="admin-list-card">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>#</th><th>Bracket Name</th><th>Event</th><th>Type</th>
                                <th>Size</th><th>Status</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brackets.map(row => (
                                <tr key={row.id}>
                                    <td className="text-[var(--theme-text-muted)] text-xs">{row.id}</td>
                                    <td className="font-semibold text-[var(--theme-text)] underline decoration-[var(--theme-primary)] decoration-2">{row.name}</td>
                                    <td className="text-xs">{row.event || 'Local Event'}</td>
                                    <td className="text-xs">{row.type}</td>
                                    <td>{row.size}</td>
                                    <td>
                                        <span className={`admin-badge ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-500'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button className="admin-action-btn" title="Edit Matches"><FiGrid size={13} /></button>
                                            <button className="admin-action-btn" title="Settings"><FiEdit2 size={13} /></button>
                                            <button
                                                className="admin-action-btn delete"
                                                onClick={() => handleDelete(row.id)}
                                            >
                                                <FiTrash2 size={13} />
                                            </button>
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
