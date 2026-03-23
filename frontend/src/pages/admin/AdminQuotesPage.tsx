import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import styles from './AdminQuotesPage.module.scss';

type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'rejected';

interface Quote {
  id: string;
  show_id: string | null;
  status: QuoteStatus;
  notes: string | null;
  show: { name: string; code: string | null } | null;
}

const STATUS_META: Record<QuoteStatus, { label: string; bg: string; color: string; border: string }> = {
  draft:    { label: 'Draft',    bg: '#f5f5f3', color: '#6b7280', border: '#e5e5e3' },
  sent:     { label: 'Sent',     bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
  accepted: { label: 'Accepted', bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
  rejected: { label: 'Rejected', bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
};

const TABS = ['all', 'draft', 'sent', 'accepted', 'rejected'] as const;
type Tab = typeof TABS[number];

function parseNotes(notes: string | null) {
  try { return JSON.parse(notes || '{}'); } catch { return {}; }
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes]   = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]         = useState<Tab>('all');
  const [error, setError]     = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('quotes')
      .select('*, show:shows(name, code)')
      .order('id', { ascending: false });
    if (error) setError(error.message);
    setQuotes((data as Quote[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: QuoteStatus) => {
    await supabase.from('quotes').update({ status }).eq('id', id);
    load();
  };

  const filtered = tab === 'all' ? quotes : quotes.filter(q => q.status === tab);
  const count = (t: Tab) => t === 'all' ? quotes.length : quotes.filter(q => q.status === t).length;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Quotes</h1>
      </div>

      <div className={styles.tabs}>
        {TABS.map(t => (
          <button
            key={t}
            className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
            <span className={`${styles.tabCount} ${tab === t ? styles.tabCountActive : ''}`}>{count(t)}</span>
          </button>
        ))}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {loading ? (
        <div className={styles.loading}><div className={styles.spinner} /></div>
      ) : filtered.length === 0 ? (
        <div className={styles.empty}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>No {tab === 'all' ? '' : tab} quotes yet</p>
          <span>Submitted quotes from the website will appear here.</span>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Ref</th>
                <th>Show</th>
                <th>Contact</th>
                <th>Freight</th>
                <th>Est. Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(q => {
                const parsed  = parseNotes(q.notes);
                const contact = parsed.contact || null;
                const meta    = STATUS_META[q.status] ?? STATUS_META.draft;
                const freightLabel = [
                  parsed.freightIn  && 'In',
                  parsed.freightOut && 'Out',
                ].filter(Boolean).join(' + ') || '—';

                return (
                  <tr key={q.id}>
                    <td><span className={styles.quoteRef}>#{String(q.id).slice(0, 8)}</span></td>

                    <td>
                      <span className={styles.showName}>{q.show?.name ?? '—'}</span>
                      {q.show?.code && <span className={styles.showCode}>{q.show.code}</span>}
                    </td>

                    <td>
                      {contact ? (
                        <div className={styles.contact}>
                          <span className={styles.contactName}>{contact.name}</span>
                          {contact.company && <span className={styles.contactCompany}>{contact.company}</span>}
                          {contact.email && (
                            <a href={`mailto:${contact.email}`} className={styles.contactEmail}>{contact.email}</a>
                          )}
                          {contact.phone && <span className={styles.contactPhone}>{contact.phone}</span>}
                        </div>
                      ) : <span className={styles.muted}>—</span>}
                    </td>

                    <td><span className={styles.freightLabel}>{freightLabel}</span></td>

                    <td>
                      <span className={styles.total}>
                        {parsed.totalPrice != null ? `$${parsed.totalPrice}` : '—'}
                      </span>
                    </td>

                    <td>
                      <span className={styles.statusBadge} style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}>
                        {meta.label}
                      </span>
                    </td>

                    <td>
                      <div className={styles.actions}>
                        {q.status === 'draft' && (
                          <button className={styles.actionBtn} onClick={() => updateStatus(q.id, 'sent')}>Mark Sent</button>
                        )}
                        {(q.status === 'draft' || q.status === 'sent') && (
                          <button className={`${styles.actionBtn} ${styles.actionBtnAccept}`} onClick={() => updateStatus(q.id, 'accepted')}>Accept</button>
                        )}
                        {q.status !== 'rejected' && q.status !== 'accepted' && (
                          <button className={`${styles.actionBtn} ${styles.actionBtnReject}`} onClick={() => updateStatus(q.id, 'rejected')}>Reject</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
