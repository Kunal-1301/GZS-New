import { useState } from 'react';

export default function Subscriptions() {
    const [showCancelModal, setShowCancelModal] = useState(false);

    return (
        <div className="flex flex-col gap-10 font-inter">
            {/* Current Subscription */}
            <section>
                <h3 className="pr-section-title">
                    Current Plan
                </h3>

                <div className="bg-pr-surface border border-pr-text shadow-sm rounded-xl p-6 lg:p-8 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-pr-primary" />

                    <div className="ml-4">
                        <span className="inline-block px-3 py-1 bg-pr-primary/20 text-pr-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-3 shadow-inner">
                            PRO SUBSCRIBER
                        </span>
                        <h4 className="text-2xl font-black uppercase tracking-tight text-pr-text mb-2">
                            GzoneSphere Elite Pass
                        </h4>
                        <p className="text-sm font-medium text-pr-text-muted mb-4 max-w-lg">
                            Unlimited tournament entries, premium profile badge, priority support, and exclusive partner discounts.
                        </p>
                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-pr-text-muted">
                            <span>Next Billing: <strong className="text-pr-text">Oct 15, 2026</strong></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-pr-border" />
                            <span>Cost: <strong className="text-pr-text">$9.99 / mo</strong></span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
                        <button className="pr-btn-primary w-full py-3.5 shadow-md hover:-translate-y-0.5">
                            Upgrade to Annual
                        </button>
                        <button
                            onClick={() => setShowCancelModal(true)}
                            className="pr-btn-danger w-full"
                        >
                            Cancel Subscription
                        </button>
                    </div>
                </div>
            </section>

            {/* Payment Method */}
            <section>
                <h3 className="pr-section-title">
                    Payment Method
                </h3>
                <div className="border border-pr-border rounded-xl bg-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-9 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
                            <span className="font-black text-blue-900 italic tracking-tighter">VISA</span>
                        </div>
                        <div>
                            <p className="text-sm font-black text-pr-text tracking-widest uppercase">
                                •••• •••• •••• 4242
                            </p>
                            <p className="text-[10px] font-bold text-pr-text-muted uppercase tracking-wider">
                                Expires 12/28
                            </p>
                        </div>
                    </div>
                    <button className="mt-4 sm:mt-0 text-pr-primary text-xs font-black uppercase tracking-widest hover:underline hover:text-pr-primary-dark">
                        Update Payment Method
                    </button>
                </div>
            </section>

            {/* Billing History */}
            <section>
                <h3 className="pr-section-title">
                    Billing History
                </h3>
                <div className="border border-pr-border rounded-xl bg-white overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-pr-surface text-[10px] font-black uppercase tracking-widest text-pr-text-muted border-b border-pr-border">
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4 text-right">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {[
                                { date: 'Sep 15, 2026', desc: 'Elite Pass - Monthly', amount: '$9.99' },
                                { date: 'Aug 15, 2026', desc: 'Elite Pass - Monthly', amount: '$9.99' },
                                { date: 'Jul 15, 2026', desc: 'Elite Pass - Monthly', amount: '$9.99' },
                            ].map((row, idx) => (
                                <tr key={idx} className="border-b border-pr-border last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-pr-text">{row.date}</td>
                                    <td className="px-6 py-4 text-pr-text-muted">{row.desc}</td>
                                    <td className="px-6 py-4 font-bold text-pr-text">{row.amount}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[10px] font-bold font-black text-pr-primary uppercase tracking-widest hover:underline">
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Cancel Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-pr-card border border-pr-border w-full max-w-lg rounded-xl shadow-2xl flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-pr-border bg-pr-surface flex justify-between items-center">
                            <h2 className="text-[13px] font-black uppercase tracking-widest text-red-600">
                                Cancel Subscription
                            </h2>
                            <button onClick={() => setShowCancelModal(false)} className="text-pr-text-muted hover:text-pr-text transition-colors text-lg">
                                ✕
                            </button>
                        </div>
                        <div className="p-8">
                            <h3 className="text-lg font-black uppercase tracking-tight text-pr-text mb-3">
                                Wait! Before you go...
                            </h3>
                            <p className="text-sm text-pr-text-muted leading-relaxed mb-8">
                                If you cancel now, you'll lose access to unlimited tournaments, priority support, and your Elite profile badge at the end of your current billing cycle on <strong className="text-pr-text">Oct 15, 2026</strong>. Add-ons like tournament boosts will also be forfeited.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowCancelModal(false)}
                                    className="flex-1 px-4 py-3 bg-pr-primary hover:bg-pr-primary-dark text-white text-xs font-black uppercase tracking-widest rounded-lg transition-colors shadow-sm"
                                >
                                    Keep Subscription
                                </button>
                                <button
                                    className="flex-1 px-4 py-3 border border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 text-xs font-black uppercase tracking-widest rounded-lg transition-colors shadow-sm"
                                    onClick={() => {
                                        alert('Subscription cancelled successfully.');
                                        setShowCancelModal(false);
                                    }}
                                >
                                    Confirm Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
