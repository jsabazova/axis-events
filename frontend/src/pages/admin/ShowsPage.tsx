import { useState, useEffect, useCallback } from 'react';
import styles from './ShowsPage.module.scss';
import { supabase } from '../../lib/supabase';

type ShowStatus = 'draft' | 'active' | 'completed';

interface Show {
  id: string;
  name: string;
  code: string;
  status: ShowStatus;
  vc_name: string;
  vc_phone: string;
  vc_email: string;
  organiser_name: string;
  venue_name: string;
  venue_address: string;
  dock: string;
  door: string;
  dropoff: string;
  forklift: boolean;
  bdouble: boolean;
  semi: boolean;
  show_start: string;
  show_end: string;
  show_start_time: string;
  show_end_time: string;
  bump_in_start: string;
  bump_in_end: string;
  bump_out_start: string;
  bump_out_end: string;
  provider: string;
  rate_card_name: string;
  notes: string;
  created_at: string;
}

type ShowFormData = Omit<Show, 'id' | 'created_at'>;

const STATUSES: ShowStatus[] = ['draft', 'active', 'completed'];

const EMPTY_FORM: ShowFormData = {
  name: '', code: '', status: 'draft',
  organiser_name: '', vc_name: '', vc_phone: '', vc_email: '',
  venue_name: '', venue_address: '', dock: '', door: '', dropoff: '',
  forklift: false, bdouble: false, semi: false,
  show_start: '', show_end: '', show_start_time: '', show_end_time: '',
  bump_in_start: '', bump_in_end: '',
  bump_out_start: '', bump_out_end: '',
  provider: '', rate_card_name: '', notes: '',
};

interface Toast { id: number; msg: string; type: 'success' | 'error' }

const STATUS_META: Record<ShowStatus, { label: string; bg: string; text: string; border: string }> = {
  draft:     { label: 'Draft',     bg: 'rgba(245,158,11,0.12)', text: '#92400e', border: 'rgba(245,158,11,0.28)' },
  active:    { label: 'Active',    bg: 'rgba(0,192,90,0.10)',   text: '#007a35', border: 'rgba(0,192,90,0.22)'   },
  completed: { label: 'Completed', bg: '#f5f5f3',               text: '#6b7280', border: '#e0e0de'               },
};

function fmtDate(d: string | null | undefined) {
  if (!d) return '—';
  const parsed = new Date(d);
  if (isNaN(parsed.getTime())) return d;
  return parsed.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

function fmtDateRange(start: string, end: string) {
  if (!start && !end) return '—';
  if (!end) return fmtDate(start);
  return `${fmtDate(start)} – ${fmtDate(end)}`;
}

type ActiveTab = 'all' | ShowStatus;

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function ShowsPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [formOpen, setFormOpen] = useState(false);
  const [detailShow, setDetailShow] = useState<Show | null>(null);
  const [editShow, setEditShow] = useState<Show | null>(null);

  const [form, setForm] = useState<ShowFormData>({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const toast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('shows')
      .select('*')
      .order('show_start', { ascending: true });
    if (err) { setError(err.message); setLoading(false); return; }
    setShows((data ?? []) as Show[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const counts: Record<ActiveTab, number> = {
    all: shows.length,
    draft: shows.filter(s => s.status === 'draft').length,
    active: shows.filter(s => s.status === 'active').length,
    completed: shows.filter(s => s.status === 'completed').length,
  };

  const filtered = shows.filter(s => {
    const matchTab = activeTab === 'all' || s.status === activeTab;
    const q = search.toLowerCase();
    const matchSearch = (
      s.name?.toLowerCase().includes(q) ||
      s.code?.toLowerCase().includes(q) ||
      s.organiser_name?.toLowerCase().includes(q) ||
      s.venue_name?.toLowerCase().includes(q)
    );
    return matchTab && matchSearch;
  });

  const openCreate = () => {
    setEditShow(null);
    setForm({ ...EMPTY_FORM });
    setFormOpen(true);
  };

  const openEdit = (show: Show) => {
    setEditShow(show);
    const f: ShowFormData = { ...EMPTY_FORM };
    (Object.keys(EMPTY_FORM) as (keyof ShowFormData)[]).forEach(k => {
      const val = (show as unknown as Record<string, unknown>)[k];
      if (val !== undefined && val !== null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (f as any)[k] = val;
      }
    });
    setForm(f);
    setFormOpen(true);
    setDetailShow(null);
  };

  const handleSave = async (saveStatus: ShowStatus) => {
    if (!form.name.trim()) return toast('Show name is required', 'error');
    setSaving(true);
    const payload = { ...form, status: saveStatus };

    if (editShow) {
      const { error: err } = await supabase.from('shows').update(payload).eq('id', editShow.id);
      if (err) { toast(err.message, 'error'); setSaving(false); return; }
      toast('Show updated');
    } else {
      const { error: err } = await supabase.from('shows').insert(payload);
      if (err) { toast(err.message, 'error'); setSaving(false); return; }
      toast('Show created');
    }
    setSaving(false);
    setFormOpen(false);
    load();
  };

  const handleDelete = async (id: string) => {
    const { error: err } = await supabase.from('shows').delete().eq('id', id);
    if (err) { toast(err.message, 'error'); return; }
    toast('Show deleted');
    setDetailShow(null);
    setConfirmDeleteId(null);
    load();
  };

  const setField = <K extends keyof ShowFormData>(key: K, val: ShowFormData[K]) =>
    setForm(f => ({ ...f, [key]: val }));

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Shows</h1>
          <p className={styles.pageSub}>{shows.length} show{shows.length !== 1 ? 's' : ''} total</p>
        </div>
        <button className={styles.btnGreen} onClick={openCreate}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
          New Show
        </button>
      </div>

      <div className={styles.tabRow}>
        {(['all', ...STATUSES] as ActiveTab[]).map(t => (
          <button
            key={t}
            className={`${styles.tab} ${activeTab === t ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t === 'all' ? 'All' : STATUS_META[t as ShowStatus].label}
            <span className={`${styles.tabCount} ${activeTab === t ? styles.tabCountActive : ''}`}>
              {counts[t]}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.controlRow}>
        <div className={styles.searchWrap}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="8.5" cy="8.5" r="5.5" /><path d="M14.5 14.5L18 18" />
          </svg>
          <input
            className={styles.searchInput}
            placeholder="Search by name, code, organiser, venue..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && <div className={styles.spinner} />}
      {error && <div className={styles.empty} style={{ color: '#ef4444' }}>{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className={styles.empty}>
          {search || activeTab !== 'all' ? 'No shows match your filters.' : 'No shows yet. Create your first one.'}
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.listTable}>
            <thead>
              <tr>
                <th className={styles.listTh}>Show</th>
                <th className={styles.listTh}>Organiser</th>
                <th className={styles.listTh}>Venue</th>
                <th className={styles.listTh}>Show Dates</th>
                <th className={styles.listTh}>Bump In</th>
                <th className={styles.listTh}>Bump Out</th>
                <th className={styles.listTh}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(show => (
                <tr key={show.id} className={styles.listTr} onClick={() => setDetailShow(show)}>
                  <td className={styles.listTd}>
                    <div className={styles.showName}>{show.name}</div>
                    {show.code && <div className={styles.showCode}>{show.code}</div>}
                  </td>
                  <td className={styles.listTd} style={{ color: show.organiser_name ? '#111214' : '#b0b0b0' }}>
                    {show.organiser_name || '—'}
                  </td>
                  <td className={styles.listTd} style={{ color: show.venue_name ? '#111214' : '#b0b0b0' }}>
                    {show.venue_name || '—'}
                  </td>
                  <td className={styles.listTd} style={{ fontSize: 12.5, color: '#6b7280' }}>
                    {fmtDateRange(show.show_start, show.show_end)}
                  </td>
                  <td className={styles.listTd} style={{ fontSize: 12.5, color: '#6b7280' }}>
                    {fmtDateRange(show.bump_in_start, show.bump_in_end)}
                  </td>
                  <td className={styles.listTd} style={{ fontSize: 12.5, color: '#6b7280' }}>
                    {fmtDateRange(show.bump_out_start, show.bump_out_end)}
                  </td>
                  <td className={styles.listTd}>
                    <span
                      className={styles.statusBadge}
                      style={{
                        background: STATUS_META[show.status]?.bg ?? '#f5f5f3',
                        color: STATUS_META[show.status]?.text ?? '#6b7280',
                        border: `1px solid ${STATUS_META[show.status]?.border ?? '#e0e0de'}`,
                      }}
                    >
                      {STATUS_META[show.status]?.label ?? show.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── DETAIL MODAL ── */}
      {detailShow && (
        <div className={styles.overlay} onClick={() => { setDetailShow(null); setConfirmDeleteId(null); }}>
          <div className={styles.wideModal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <div style={{ flex: 1 }} className={styles.modalTitle}>{detailShow.name}</div>
              <span
                className={styles.statusBadge}
                style={{
                  background: STATUS_META[detailShow.status]?.bg ?? '#f5f5f3',
                  color: STATUS_META[detailShow.status]?.text ?? '#6b7280',
                  border: `1px solid ${STATUS_META[detailShow.status]?.border ?? '#e0e0de'}`,
                }}
              >
                {STATUS_META[detailShow.status]?.label}
              </span>
              {detailShow.code && (
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#b0b0b0', letterSpacing: '0.06em' }}>
                  {detailShow.code}
                </span>
              )}
              <button className={styles.btnOutline} onClick={() => openEdit(detailShow)}>Edit</button>
              <button className={styles.btnDanger} onClick={() => setConfirmDeleteId(detailShow.id)}>Delete</button>
            </div>

            <div className={styles.modalBody}>
              {confirmDeleteId === detailShow.id && (
                <div className={styles.confirmBox}>
                  <div className={styles.confirmText}>
                    Delete <strong>{detailShow.name}</strong>? This cannot be undone.
                  </div>
                  <div className={styles.confirmActions}>
                    <button className={styles.btnDanger} onClick={() => handleDelete(detailShow.id)}>Yes, delete</button>
                    <button className={styles.btnOutline} onClick={() => setConfirmDeleteId(null)}>Cancel</button>
                  </div>
                </div>
              )}

              <div className={styles.infoCardsGrid}>
                <div className={styles.infoCard}>
                  <div className={styles.infoCardTitle}>Show Info</div>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Organiser</div>
                      <div className={styles.infoValue}>{detailShow.organiser_name || '—'}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Contact</div>
                      <div className={styles.infoValue}>{detailShow.vc_name || '—'}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Phone</div>
                      <div className={styles.infoValue}>{detailShow.vc_phone || '—'}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Email</div>
                      <div className={styles.infoValue}>{detailShow.vc_email || '—'}</div>
                    </div>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoCardTitle}>Venue</div>
                  <div className={styles.badgeRow}>
                    <span className={`${styles.vehicleBadge} ${detailShow.forklift ? styles.vehicleBadgeOk : ''}`}>
                      Forklift {detailShow.forklift ? '✓' : '✗'}
                    </span>
                    <span className={`${styles.vehicleBadge} ${detailShow.bdouble ? styles.vehicleBadgeOk : ''}`}>
                      B-Double {detailShow.bdouble ? '✓' : '✗'}
                    </span>
                    <span className={`${styles.vehicleBadge} ${detailShow.semi ? styles.vehicleBadgeOk : ''}`}>
                      Semi {detailShow.semi ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem} style={{ gridColumn: 'span 2' }}>
                      <div className={styles.infoLabel}>Venue Name</div>
                      <div className={styles.infoValue}>{detailShow.venue_name || '—'}</div>
                    </div>
                    <div className={styles.infoItem} style={{ gridColumn: 'span 2' }}>
                      <div className={styles.infoLabel}>Address</div>
                      <div className={styles.infoValue}>{detailShow.venue_address || '—'}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Dock / Area</div>
                      <div className={styles.infoValue}>{detailShow.dock || '—'}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Door / Gate</div>
                      <div className={styles.infoValue}>{detailShow.door || '—'}</div>
                    </div>
                    {detailShow.dropoff && (
                      <div className={styles.infoItem} style={{ gridColumn: 'span 2' }}>
                        <div className={styles.infoLabel}>Drop-off Instructions</div>
                        <div className={styles.infoValue} style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{detailShow.dropoff}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoCardTitle}>Show Dates</div>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Open</div>
                      <div className={styles.infoValue}>
                        {fmtDate(detailShow.show_start)}
                        {detailShow.show_start_time && (
                          <span style={{ color: '#6b7280', fontSize: 12, marginLeft: 5 }}>
                            {detailShow.show_start_time}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Close</div>
                      <div className={styles.infoValue}>
                        {fmtDate(detailShow.show_end)}
                        {detailShow.show_end_time && (
                          <span style={{ color: '#6b7280', fontSize: 12, marginLeft: 5 }}>
                            {detailShow.show_end_time}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoCardTitle}>Bump Dates</div>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Bump In</div>
                      <div className={styles.infoValue}>{fmtDateRange(detailShow.bump_in_start, detailShow.bump_in_end)}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Bump Out</div>
                      <div className={styles.infoValue}>{fmtDateRange(detailShow.bump_out_start, detailShow.bump_out_end)}</div>
                    </div>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoCardTitle}>Logistics</div>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Provider</div>
                      <div className={styles.infoValue}>{detailShow.provider || '—'}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Rate Card</div>
                      <div className={styles.infoValue}>{detailShow.rate_card_name || '—'}</div>
                    </div>
                  </div>
                </div>

                {detailShow.notes && (
                  <div className={`${styles.infoCard} ${styles.infoCardFull}`}>
                    <div className={styles.infoCardTitle}>Notes</div>
                    <div style={{ fontSize: 13.5, color: '#111214', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                      {detailShow.notes}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FORM MODAL ── */}
      {formOpen && (
        <div className={styles.overlay} onClick={() => setFormOpen(false)}>
          <div className={styles.wideModal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <div className={styles.modalTitle}>{editShow ? 'Edit Show' : 'New Show'}</div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.formSection}>
                <div className={styles.formSectionTitle}>1. Show Information</div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Show Name *</label>
                    <input
                      className={styles.input}
                      value={form.name}
                      onChange={e => setField('name', e.target.value)}
                      placeholder="e.g. Sydney Home Show 2026"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Show Code</label>
                    <input
                      className={styles.input}
                      value={form.code}
                      onChange={e => setField('code', e.target.value)}
                      placeholder="e.g. SHS26"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Status</label>
                    <select
                      className={styles.select}
                      value={form.status}
                      onChange={e => setField('status', e.target.value as ShowStatus)}
                    >
                      {STATUSES.map(s => (
                        <option key={s} value={s}>{STATUS_META[s].label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.formSectionTitle}>2. Organiser</div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Organiser Name</label>
                    <input
                      className={styles.input}
                      value={form.organiser_name}
                      onChange={e => setField('organiser_name', e.target.value)}
                      placeholder="e.g. Reed Exhibitions"
                    />
                  </div>
                  <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Contact Name</label>
                    <input
                      className={styles.input}
                      value={form.vc_name}
                      onChange={e => setField('vc_name', e.target.value)}
                      placeholder="Full name"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Contact Phone</label>
                    <input
                      className={styles.input}
                      value={form.vc_phone}
                      onChange={e => setField('vc_phone', e.target.value)}
                      placeholder="Phone number"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Contact Email</label>
                    <input
                      type="email"
                      className={styles.input}
                      value={form.vc_email}
                      onChange={e => setField('vc_email', e.target.value)}
                      placeholder="Email address"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.formSectionTitle}>3. Venue</div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Venue Name</label>
                    <input
                      className={styles.input}
                      value={form.venue_name}
                      onChange={e => setField('venue_name', e.target.value)}
                      placeholder="e.g. ICC Sydney"
                    />
                  </div>
                  <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Venue Address</label>
                    <input
                      className={styles.input}
                      value={form.venue_address}
                      onChange={e => setField('venue_address', e.target.value)}
                      placeholder="Street address"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Dock / Area</label>
                    <input
                      className={styles.input}
                      value={form.dock}
                      onChange={e => setField('dock', e.target.value)}
                      placeholder="e.g. Loading Dock B"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Door / Gate</label>
                    <input
                      className={styles.input}
                      value={form.door}
                      onChange={e => setField('door', e.target.value)}
                      placeholder="e.g. Gate 3"
                    />
                  </div>
                  <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Drop-off Instructions</label>
                    <textarea
                      className={styles.textarea}
                      value={form.dropoff}
                      onChange={e => setField('dropoff', e.target.value)}
                      placeholder="Detailed instructions for drop-off..."
                    />
                  </div>
                  <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                    <label className={styles.label}>Vehicle Access</label>
                    <div className={styles.checkboxRow}>
                      <label className={styles.checkLabel}>
                        <input
                          type="checkbox"
                          checked={form.forklift}
                          onChange={e => setField('forklift', e.target.checked)}
                        />
                        Forklift
                      </label>
                      <label className={styles.checkLabel}>
                        <input
                          type="checkbox"
                          checked={form.bdouble}
                          onChange={e => setField('bdouble', e.target.checked)}
                        />
                        B-Double
                      </label>
                      <label className={styles.checkLabel}>
                        <input
                          type="checkbox"
                          checked={form.semi}
                          onChange={e => setField('semi', e.target.checked)}
                        />
                        Semi
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.formSectionTitle}>4. Show Dates</div>
                <div className={styles.formGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Open Date</label>
                    <input
                      type="date"
                      className={styles.input}
                      value={form.show_start}
                      onChange={e => setField('show_start', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Open Time</label>
                    <input
                      type="time"
                      className={styles.input}
                      value={form.show_start_time}
                      onChange={e => setField('show_start_time', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Close Date</label>
                    <input
                      type="date"
                      className={styles.input}
                      value={form.show_end}
                      onChange={e => setField('show_end', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Close Time</label>
                    <input
                      type="time"
                      className={styles.input}
                      value={form.show_end_time}
                      onChange={e => setField('show_end_time', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.formSectionTitle}>5. Bump In</div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>From Date</label>
                    <input
                      type="date"
                      className={styles.input}
                      value={form.bump_in_start}
                      onChange={e => setField('bump_in_start', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>To Date</label>
                    <input
                      type="date"
                      className={styles.input}
                      value={form.bump_in_end}
                      onChange={e => setField('bump_in_end', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.formSectionTitle}>6. Bump Out</div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>From Date</label>
                    <input
                      type="date"
                      className={styles.input}
                      value={form.bump_out_start}
                      onChange={e => setField('bump_out_start', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>To Date</label>
                    <input
                      type="date"
                      className={styles.input}
                      value={form.bump_out_end}
                      onChange={e => setField('bump_out_end', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.formSectionTitle}>7. Logistics</div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Provider Name</label>
                    <input
                      className={styles.input}
                      value={form.provider}
                      onChange={e => setField('provider', e.target.value)}
                      placeholder="e.g. Axis Logistics"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Rate Card Name</label>
                    <input
                      className={styles.input}
                      value={form.rate_card_name}
                      onChange={e => setField('rate_card_name', e.target.value)}
                      placeholder="e.g. Standard Forklift Rate"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.formSectionTitle}>8. Notes</div>
                <textarea
                  className={styles.textarea}
                  value={form.notes}
                  onChange={e => setField('notes', e.target.value)}
                  placeholder="Any additional notes or instructions..."
                  style={{ minHeight: 100 }}
                />
              </div>
            </div>

            <div className={styles.stickyBar}>
              <button className={styles.btnOutline} onClick={() => setFormOpen(false)} disabled={saving}>
                Cancel
              </button>
              <button
                className={styles.btnOutline}
                onClick={() => handleSave('draft')}
                disabled={saving}
                style={{
                  borderColor: '#f59e0b',
                  color: '#92400e',
                  background: 'rgba(245,158,11,0.07)',
                }}
              >
                {saving ? 'Saving...' : 'Save as Draft'}
              </button>
              <button className={styles.btnGreen} onClick={() => handleSave('active')} disabled={saving}>
                {saving ? 'Saving...' : 'Save as Active'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.toastWrap}>
        {toasts.map(t => (
          <div
            key={t.id}
            className={`${styles.toast} ${t.type === 'success' ? styles.toastSuccess : styles.toastError}`}
          >
            {t.msg}
          </div>
        ))}
      </div>
    </div>
  );
}
