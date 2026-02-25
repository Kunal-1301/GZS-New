import { useState } from 'react';

const INITIAL_ACCOUNTS = [
    { id: 1, platform: 'Steam', username: 'khalidominates', connected: true, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png' },
    { id: 2, platform: 'Riot Games', username: 'Khali#1234', connected: true, logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Riot_Games_logo.svg/512px-Riot_Games_logo.svg.png' },
    { id: 3, platform: 'Xbox Live', username: null, connected: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/512px-Xbox_one_logo.svg.png' },
    { id: 4, platform: 'PlayStation Network', username: null, connected: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/512px-PlayStation_logo.svg.png' },
    { id: 5, platform: 'Discord', username: null, connected: false, logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Discord_logo.svg/512px-Discord_logo.svg.png' },
];

export default function LinkedAccounts() {
    const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
    const [modal, setModal] = useState({ show: false, account: null, action: null });

    const handleAction = (account, action) => {
        setModal({ show: true, account, action });
    };

    const confirmAction = () => {
        if (modal.action === 'connect') {
            setAccounts(accts => accts.map(a => a.id === modal.account.id ? { ...a, connected: true, username: 'mockuser#999' } : a));
        } else {
            setAccounts(accts => accts.map(a => a.id === modal.account.id ? { ...a, connected: false, username: null } : a));
        }
        setModal({ show: false, account: null, action: null });
    };

    return (
        <div className="flex flex-col gap-10 font-inter">
            <section>
                <h3 className="text-base font-black uppercase tracking-widest text-pr-text mb-2 border-b border-pr-border pb-3">
                    Linked Accounts
                </h3>
                <p className="text-xs text-pr-text-muted leading-relaxed mb-6">
                    Connect your gaming accounts to unlock cross-platform features, import your game library, and sync tournament stats.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {accounts.map(acc => (
                        <div key={acc.id} className="border border-pr-border rounded-xl bg-pr-surface p-5 flex flex-col items-center text-center shadow-sm relative overflow-hidden transition-all hover:border-pr-primary/50">
                            {acc.connected && (
                                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" title="Connected" />
                            )}

                            <div className="w-14 h-14 bg-white rounded-full p-2.5 mb-4 shadow-sm border border-pr-border">
                                <img src={acc.logo} alt={acc.platform} className="w-full h-full object-contain opacity-80" />
                            </div>

                            <h4 className="text-sm font-black uppercase tracking-widest text-pr-text mb-1">
                                {acc.platform}
                            </h4>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-pr-text-muted mb-4 h-4">
                                {acc.connected ? acc.username : 'Not Connected'}
                            </p>

                            <button
                                onClick={() => handleAction(acc, acc.connected ? 'disconnect' : 'connect')}
                                className={`w-full py-2.5 text-xs font-black uppercase tracking-widest rounded-lg transition-colors shadow-sm ${acc.connected
                                        ? 'bg-pr-card border border-pr-border text-red-500 hover:bg-red-50 hover:border-red-200'
                                        : 'bg-pr-primary text-white hover:bg-pr-primary-dark'
                                    }`}
                            >
                                {acc.connected ? 'Disconnect' : 'Connect'}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal */}
            {modal.show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-pr-card border border-pr-border w-full max-w-sm rounded-xl shadow-2xl flex flex-col overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-pr-border bg-pr-surface">
                            <h2 className="text-[13px] font-black uppercase tracking-widest text-[#a6d8e8] text-pr-primary">
                                {modal.action === 'connect' ? 'Connect Account' : 'Disconnect Account'}
                            </h2>
                            <button onClick={() => setModal({ show: false, account: null, action: null })} className="text-pr-text-muted hover:text-pr-text transition-colors">
                                ✕
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-pr-text-muted leading-relaxed mb-6 text-center">
                                Are you sure you want to {modal.action} your <strong className="text-pr-text font-black">{modal.account.platform}</strong> account
                                {modal.action === 'disconnect' && ' from GzoneSphere? Some features requires active connection.'}
                                {modal.action === 'connect' && ' to GzoneSphere? You will be redirected to the provider to authenticate.'}
                            </p>
                            <div className="flex gap-4">
                                <button onClick={() => setModal({ show: false, account: null, action: null })} className="flex-1 px-4 py-3 bg-white border border-pr-border hover:bg-gray-50 text-pr-text text-xs font-black uppercase tracking-widest rounded-lg transition-colors shadow-sm">
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmAction}
                                    className={`flex-1 px-4 py-3 text-white text-xs font-black uppercase tracking-widest rounded-lg transition-colors shadow-sm ${modal.action === 'disconnect' ? 'bg-red-600 hover:bg-red-700' : 'bg-pr-primary hover:bg-pr-primary-dark'
                                        }`}
                                >
                                    {modal.action === 'connect' ? 'Connect' : 'Disconnect'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
