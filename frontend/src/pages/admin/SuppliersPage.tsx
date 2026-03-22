import { useState, useEffect, useCallback } from 'react';
import styles from './SuppliersPage.module.scss';
import { supabase } from '../../lib/supabase';

// ── TYPES ─────────────────────────────────────────────────────────────────────
type SupplierType = 'equipment' | 'transport' | 'venue' | 'labour';

interface SupplierContact {
  id: string;
  supplier_id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
}

interface Supplier {
  id: string;
  type: SupplierType;
  name: string;
  state: string;
  phone: string;
  email: string;
  website: string;
  abn: string;
  address: string;
  notes: string;
  forklift: boolean;
  bdouble: boolean;
  semi: boolean;
  dock: string;
  door: string;
  dropoff: string;
  created_at: string;
  supplier_contacts: SupplierContact[];
}

type SupFormData = Omit<Supplier, 'id' | 'created_at' | 'supplier_contacts'>;
type ContactFormData = Omit<SupplierContact, 'id' | 'supplier_id'>;

const STATES = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'];
const TYPES: SupplierType[] = ['equipment', 'transport', 'venue', 'labour'];

const EMPTY_FORM: SupFormData = {
  type: 'equipment', name: '', state: '', phone: '', email: '',
  website: '', abn: '', address: '', notes: '',
  forklift: false, bdouble: false, semi: false, dock: '', door: '', dropoff: '',
};

const EMPTY_CONTACT: ContactFormData = { name: '', role: '', phone: '', email: '' };

const TYPE_COLORS: Record<SupplierType, { bg: string; text: string; label: string }> = {
  equipment: { bg: 'rgba(59,130,246,0.10)', text: '#1d4ed8', label: 'Equipment' },
  transport:  { bg: 'rgba(245,158,11,0.12)', text: '#92400e',  label: 'Transport'  },
  venue:      { bg: 'rgba(0,192,90,0.10)',   text: '#007a35',  label: 'Venue'      },
  labour:     { bg: 'rgba(139,92,246,0.10)', text: '#6d28d9',  label: 'Labour'     },
};

interface Toast { id: number; msg: string; type: 'success' | 'error' }

// ── HELPERS ───────────────────────────────────────────────────────────────────
function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase() || '?';
}

type ActiveTab = 'all' | SupplierType;

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [formOpen, setFormOpen] = useState(false);
  const [detailSup, setDetailSup] = useState<Supplier | null>(null);
  const [editSup, setEditSup] = useState<Supplier | null>(null);

  const [form, setForm] = useState<SupFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [staffModal, setStaffModal] = useState<{ mode: 'add' | 'edit'; contact?: SupplierContact } | null>(null);
  const [staffForm, setStaffForm] = useState<ContactFormData>(EMPTY_CONTACT);
  const [staffSaving, setStaffSaving] = useState(false);
  const [confirmDeleteContactId, setConfirmDeleteContactId] = useState<string | null>(null);

  const toast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('suppliers')
      .select('*, supplier_contacts(*)')
      .order('name');
    if (err) { setError(err.message); setLoading(false); return; }
    setSuppliers((data ?? []) as Supplier[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const counts: Record<ActiveTab, number> = {
    all: suppliers.length,
    equipment: suppliers.filter(s => s.type === 'equipment').length,
    transport: suppliers.filter(s => s.type === 'transport').length,
    venue: suppliers.filter(s => s.type === 'venue').length,
    labour: suppliers.filter(s => s.type === 'labour').length,
  };

  const filtered = suppliers.filter(s => {
    const matchTab = activeTab === 'all' || s.type === activeTab;
    const q = search.toLowerCase();
    const matchSearch = (
      s.name?.toLowerCase().includes(q) ||
      s.state?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q)
    );
    return matchTab && matchSearch;
  });

  const openCreate = () => {
    setEditSup(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (sup: Supplier) => {
    setEditSup(sup);
    setForm({
      type: sup.type, name: sup.name ?? '', state: sup.state ?? '',
      phone: sup.phone ?? '', email: sup.email ?? '', website: sup.website ?? '',
      abn: sup.abn ?? '', address: sup.address ?? '', notes: sup.notes ?? '',
      forklift: sup.forklift ?? false, bdouble: sup.bdouble ?? false, semi: sup.semi ?? false,
      dock: sup.dock ?? '', door: sup.door ?? '', dropoff: sup.dropoff ?? '',
    });
    setFormOpen(true);
    setDetailSup(null);
  };

  const handleFormSave = async () => {
    if (!form.name.trim()) return toast('Name is required', 'error');
    setSaving(true);
    const payload = { ...form };
    if (editSup) {
      const { error: err } = await supabase.from('suppliers').update(payload).eq('id', editSup.id);
      if (err) { toast(err.message, 'error'); setSaving(false); return; }
      toast('Supplier updated');
    } else {
      const { error: err } = await supabase.from('suppliers').insert(payload);
      if (err) { toast(err.message, 'error'); setSaving(false); return; }
      toast('Supplier created');
    }
    setSaving(false);
    setFormOpen(false);
    load();
  };

  const handleDelete = async (id: string) => {
    const { error: err } = await supabase.from('suppliers').delete().eq('id', id);
    if (err) { toast(err.message, 'error'); return; }
    toast('Supplier deleted');
    setDetailSup(null);
    setConfirmDeleteId(null);
    load();
  };

  const openAddStaff = () => { setStaffForm(EMPTY_CONTACT); setStaffModal({ mode: 'add' }); };
  const openEditStaff = (c: SupplierContact) => {
    setStaffForm({ name: c.name, role: c.role, phone: c.phone, email: c.email });
    setStaffModal({ mode: 'edit', contact: c });
  };

  const handleStaffSave = async () => {
    if (!detailSup) return;
    setStaffSaving(true);
    if (staffModal?.mode === 'edit' && staffModal.contact) {
      const { error: err } = await supabase.from('supplier_contacts').update(staffForm).eq('id', staffModal.contact.id);
      if (err) { toast(err.message, 'error'); setStaffSaving(false); return; }
      toast('Contact updated');
    } else {
      const { error: err } = await supabase.from('supplier_contacts').insert({ ...staffForm, supplier_id: detailSup.id });
      if (err) { toast(err.message, 'error'); setStaffSaving(false); return; }
      toast('Contact added');
    }
    setStaffSaving(false);
    setStaffModal(null);
    const { data } = await supabase.from('suppliers').select('*, supplier_contacts(*)').eq('id', detailSup.id).single();
    if (data) {
      setDetailSup(data as Supplier);
      setSuppliers(prev => prev.map(s => s.id === detailSup.id ? (data as Supplier) : s));
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    if (!detailSup) return;
    const { error: err } = await supabase.from('supplier_contacts').delete().eq('id', contactId);
    if (err) { toast(err.message, 'error'); return; }
    toast('Contact removed');
    setConfirmDeleteContactId(null);
    const { data } = await supabase.from('suppliers').select('*, supplier_contacts(*)').eq('id', detailSup.id).single();
    if (data) {
      setDetailSup(data as Supplier);
      setSuppliers(prev => prev.map(s => s.id === detailSup.id ? (data as Supplier) : s));
    }
  };

  const setField = <K extends keyof SupFormData>(key: K, val: SupFormData[K]) =>
    setForm(f => ({ ...f, [key]: val }));

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Suppliers</h1>
          <p className={styles.pageSub}>{suppliers.length} supplier{suppliers.length !== 1 ? 's' : ''} total</p>
        </div>
        <button className={styles.btnGreen} onClick={openCreate}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
          New Supplier
        </button>
      </div>

      <div className={styles.tabRow}>
        {(['all', ...TYPES] as ActiveTab[]).map(t => (
          <button
            key={t}
            className={`${styles.tab} ${activeTab === t ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t === 'all' ? 'All' : TYPE_COLORS[t as SupplierType].label}
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
            placeholder="Search by name, state, email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && <div className={styles.spinner} />}
      {error && <div className={styles.empty} style={{ color: '#ef4444' }}>{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className={styles.empty}>
          {search || activeTab !== 'all' ? 'No suppliers match your filters.' : 'No suppliers yet. Add your first one.'}
        </div>
      )}

      {!loading && !error && (
        <div className={styles.cardGrid}>
          {filtered.map(sup => (
            <div key={sup.id} className={styles.supCard} onClick={() => setDetailSup(sup)}>
              <div className={styles.cardTop}>
                <div
                  className={styles.avatar}
                  style={{
                    width: 42,
                    height: 42,
                    fontSize: 14,
                    background: TYPE_COLORS[sup.type].bg,
                    color: TYPE_COLORS[sup.type].text,
                  }}
                >
                  {initials(sup.name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className={styles.cardName}>{sup.name}</div>
                  <span
                    className={styles.typeBadge}
                    style={{ background: TYPE_COLORS[sup.type].bg, color: TYPE_COLORS[sup.type].text }}
                  >
                    {TYPE_COLORS[sup.type].label}
                  </span>
                  {sup.state && <span className={styles.stateBadge}>{sup.state}</span>}
                </div>
              </div>

              {sup.phone && (
                <div className={styles.cardRow}>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                    <path d="M3 5a2 2 0 012-2h.5a1 1 0 011 .8l.7 3.5a1 1 0 01-.3.96L6 9.18A11 11 0 0010.82 14l.92-.9a1 1 0 01.96-.3l3.5.7a1 1 0 01.8 1V15a2 2 0 01-2 2h-.5C7.16 17 3 12.84 3 7.5V5z" />
                  </svg>
                  {sup.phone}
                </div>
              )}

              {sup.type === 'venue' && (
                <div className={styles.venueBadgeRow}>
                  <span className={`${styles.vehicleBadge} ${sup.forklift ? styles.vehicleBadgeOk : ''}`}>
                    Forklift {sup.forklift ? '✓' : '✗'}
                  </span>
                  <span className={`${styles.vehicleBadge} ${sup.bdouble ? styles.vehicleBadgeOk : ''}`}>
                    B-Double {sup.bdouble ? '✓' : '✗'}
                  </span>
                  <span className={`${styles.vehicleBadge} ${sup.semi ? styles.vehicleBadgeOk : ''}`}>
                    Semi {sup.semi ? '✓' : '✗'}
                  </span>
                </div>
              )}

              <div className={styles.cardRow} style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #f0f0ee' }}>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2 18c0-3.314 3.134-6 7-6s7 2.686 7 6" />
                </svg>
                <span style={{ color: '#b0b0b0', fontSize: 12 }}>
                  {(sup.supplier_contacts ?? []).length} contact{(sup.supplier_contacts ?? []).length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── DETAIL MODAL ── */}
      {detailSup && (
        <div className={styles.overlay} onClick={() => { setDetailSup(null); setConfirmDeleteId(null); setConfirmDeleteContactId(null); }}>
          <div className={`${styles.modal} ${styles.modalWide}`} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <div
                className={styles.avatar}
                style={{
                  width: 52,
                  height: 52,
                  fontSize: 18,
                  background: TYPE_COLORS[detailSup.type].bg,
                  color: TYPE_COLORS[detailSup.type].text,
                }}
              >
                {initials(detailSup.name)}
              </div>
              <div style={{ flex: 1 }}>
                <div className={styles.modalTitle}>{detailSup.name}</div>
                <div className={styles.modalSub}>
                  <span
                    className={styles.typeBadge}
                    style={{ background: TYPE_COLORS[detailSup.type].bg, color: TYPE_COLORS[detailSup.type].text, marginRight: 8 }}
                  >
                    {TYPE_COLORS[detailSup.type].label}
                  </span>
                  {detailSup.state && <span className={styles.stateBadge}>{detailSup.state}</span>}
                </div>
              </div>
              <button className={styles.btnOutline} onClick={() => openEdit(detailSup)}>Edit</button>
              <button className={styles.btnDanger} onClick={() => setConfirmDeleteId(detailSup.id)}>Delete</button>
            </div>

            <div className={styles.modalBody}>
              {confirmDeleteId === detailSup.id && (
                <div className={styles.confirmBox}>
                  <div className={styles.confirmText}>Delete <strong>{detailSup.name}</strong>? This cannot be undone.</div>
                  <div className={styles.confirmActions}>
                    <button className={styles.btnDanger} onClick={() => handleDelete(detailSup.id)}>Yes, delete</button>
                    <button className={styles.btnOutline} onClick={() => setConfirmDeleteId(null)}>Cancel</button>
                  </div>
                </div>
              )}

              <div className={styles.section}>
                <div className={styles.sectionTitle}><span>Info</span></div>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}><div className={styles.infoLabel}>Phone</div><div className={styles.infoValue}>{detailSup.phone || '—'}</div></div>
                  <div className={styles.infoItem}><div className={styles.infoLabel}>Email</div><div className={styles.infoValue}>{detailSup.email || '—'}</div></div>
                  <div className={styles.infoItem}><div className={styles.infoLabel}>Website</div><div className={styles.infoValue}>{detailSup.website || '—'}</div></div>
                  <div className={styles.infoItem}><div className={styles.infoLabel}>ABN</div><div className={styles.infoValue}>{detailSup.abn || '—'}</div></div>
                  <div className={styles.infoItem} style={{ gridColumn: 'span 2' }}><div className={styles.infoLabel}>Address</div><div className={styles.infoValue}>{detailSup.address || '—'}</div></div>
                </div>
              </div>

              {detailSup.type === 'venue' && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}><span>Vehicle Access</span></div>
                  <div className={styles.venueBadgeRow} style={{ marginBottom: 12 }}>
                    <span className={`${styles.vehicleBadge} ${detailSup.forklift ? styles.vehicleBadgeOk : ''}`}>Forklift {detailSup.forklift ? '✓' : '✗'}</span>
                    <span className={`${styles.vehicleBadge} ${detailSup.bdouble ? styles.vehicleBadgeOk : ''}`}>B-Double {detailSup.bdouble ? '✓' : '✗'}</span>
                    <span className={`${styles.vehicleBadge} ${detailSup.semi ? styles.vehicleBadgeOk : ''}`}>Semi {detailSup.semi ? '✓' : '✗'}</span>
                  </div>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}><div className={styles.infoLabel}>Dock / Area</div><div className={styles.infoValue}>{detailSup.dock || '—'}</div></div>
                    <div className={styles.infoItem}><div className={styles.infoLabel}>Door / Gate</div><div className={styles.infoValue}>{detailSup.door || '—'}</div></div>
                    {detailSup.dropoff && (
                      <div className={styles.infoItem} style={{ gridColumn: 'span 2' }}><div className={styles.infoLabel}>Drop-off Instructions</div><div className={styles.infoValue} style={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{detailSup.dropoff}</div></div>
                    )}
                  </div>
                </div>
              )}

              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  <span>Contacts</span>
                  <button className={styles.btnGreen} onClick={openAddStaff} style={{ fontSize: 11.5, padding: '5px 12px' }}>+ Add Contact</button>
                </div>

                {confirmDeleteContactId && (
                  <div className={styles.confirmBox} style={{ marginBottom: 10 }}>
                    <div className={styles.confirmText}>Remove this contact?</div>
                    <div className={styles.confirmActions}>
                      <button className={styles.btnDanger} onClick={() => handleDeleteContact(confirmDeleteContactId)}>Yes, remove</button>
                      <button className={styles.btnOutline} onClick={() => setConfirmDeleteContactId(null)}>Cancel</button>
                    </div>
                  </div>
                )}

                {staffModal && (
                  <div className={styles.staffFormPanel}>
                    <div className={styles.staffFormTitle}>
                      {staffModal.mode === 'add' ? 'Add Contact' : 'Edit Contact'}
                    </div>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Name</label>
                        <input className={styles.input} value={staffForm.name} onChange={e => setStaffForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Role</label>
                        <input className={styles.input} value={staffForm.role} onChange={e => setStaffForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Site Manager" />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Phone</label>
                        <input className={styles.input} value={staffForm.phone} onChange={e => setStaffForm(f => ({ ...f, phone: e.target.value }))} placeholder="Phone" />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input className={styles.input} value={staffForm.email} onChange={e => setStaffForm(f => ({ ...f, email: e.target.value }))} placeholder="Email" />
                      </div>
                    </div>
                    <div className={styles.staffFormActions}>
                      <button className={styles.btnGreen} onClick={handleStaffSave} disabled={staffSaving}>{staffSaving ? 'Saving...' : 'Save'}</button>
                      <button className={styles.btnOutline} onClick={() => setStaffModal(null)}>Cancel</button>
                    </div>
                  </div>
                )}

                {(detailSup.supplier_contacts ?? []).length === 0 ? (
                  <div style={{ fontSize: 13, color: '#b0b0b0', padding: '12px 0' }}>No contacts yet.</div>
                ) : (
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th className={styles.th}>Name</th>
                        <th className={styles.th}>Role</th>
                        <th className={styles.th}>Phone</th>
                        <th className={styles.th}>Email</th>
                        <th className={styles.th}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {(detailSup.supplier_contacts ?? []).map(c => (
                        <tr key={c.id}>
                          <td className={styles.td} style={{ fontWeight: 600 }}>{c.name}</td>
                          <td className={styles.td} style={{ color: '#6b7280' }}>{c.role}</td>
                          <td className={styles.td}>{c.phone}</td>
                          <td className={styles.td}>{c.email}</td>
                          <td className={styles.td}>
                            <div className={styles.actionCell}>
                              <button className={styles.iconBtn} onClick={() => openEditStaff(c)}>Edit</button>
                              <button className={`${styles.iconBtn} ${styles.iconBtnDanger}`} onClick={() => setConfirmDeleteContactId(c.id)}>Del</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {detailSup.notes && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}><span>Notes</span></div>
                  <div style={{ fontSize: 13.5, color: '#111214', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{detailSup.notes}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── FORM MODAL ── */}
      {formOpen && (
        <div className={styles.overlay} onClick={() => setFormOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <div>
                <div className={styles.modalTitle}>{editSup ? 'Edit Supplier' : 'New Supplier'}</div>
                <div className={styles.modalSub}>{editSup ? 'Update supplier details' : 'Fill in the details below'}</div>
              </div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.formGroup} style={{ gridColumn: 'span 2', marginBottom: 16 }}>
                <label className={styles.label}>Type</label>
                <div className={styles.typePillRow}>
                  {TYPES.map(t => (
                    <button
                      key={t}
                      className={styles.typePill}
                      style={form.type === t ? {
                        border: `2px solid ${TYPE_COLORS[t].text}`,
                        background: TYPE_COLORS[t].bg,
                        color: TYPE_COLORS[t].text,
                      } : {
                        border: '2px solid #e0e0de',
                        background: '#fff',
                        color: '#6b7280',
                      }}
                      onClick={() => setField('type', t)}
                    >
                      {TYPE_COLORS[t].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.label}>Name *</label>
                  <input className={styles.input} value={form.name} onChange={e => setField('name', e.target.value)} placeholder="Supplier name" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>State</label>
                  <select className={styles.select} value={form.state} onChange={e => setField('state', e.target.value)}>
                    <option value="">Select state...</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>ABN</label>
                  <input className={styles.input} value={form.abn} onChange={e => setField('abn', e.target.value)} placeholder="XX XXX XXX XXX" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone</label>
                  <input className={styles.input} value={form.phone} onChange={e => setField('phone', e.target.value)} placeholder="Phone number" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input type="email" className={styles.input} value={form.email} onChange={e => setField('email', e.target.value)} placeholder="Email address" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Website</label>
                  <input className={styles.input} value={form.website} onChange={e => setField('website', e.target.value)} placeholder="https://..." />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Address</label>
                  <input className={styles.input} value={form.address} onChange={e => setField('address', e.target.value)} placeholder="Street address" />
                </div>

                {form.type === 'venue' && (
                  <>
                    <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                      <div className={styles.formDivider}>Venue Access</div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Forklift Access</label>
                      <div className={styles.toggleRow}>
                        <button
                          className={`${styles.toggleBtn} ${form.forklift ? styles.toggleBtnActive : ''}`}
                          onClick={() => setField('forklift', true)}
                        >
                          Yes
                        </button>
                        <button
                          className={`${styles.toggleBtn} ${!form.forklift ? styles.toggleBtnActive : ''}`}
                          onClick={() => setField('forklift', false)}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>B-Double Access</label>
                      <div className={styles.toggleRow}>
                        <button
                          className={`${styles.toggleBtn} ${form.bdouble ? styles.toggleBtnActive : ''}`}
                          onClick={() => setField('bdouble', true)}
                        >
                          Yes
                        </button>
                        <button
                          className={`${styles.toggleBtn} ${!form.bdouble ? styles.toggleBtnActive : ''}`}
                          onClick={() => setField('bdouble', false)}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Semi Access</label>
                      <div className={styles.toggleRow}>
                        <button
                          className={`${styles.toggleBtn} ${form.semi ? styles.toggleBtnActive : ''}`}
                          onClick={() => setField('semi', true)}
                        >
                          Yes
                        </button>
                        <button
                          className={`${styles.toggleBtn} ${!form.semi ? styles.toggleBtnActive : ''}`}
                          onClick={() => setField('semi', false)}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Dock / Area</label>
                      <input className={styles.input} value={form.dock} onChange={e => setField('dock', e.target.value)} placeholder="e.g. Loading Dock B" />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Door / Gate</label>
                      <input className={styles.input} value={form.door} onChange={e => setField('door', e.target.value)} placeholder="e.g. Gate 3" />
                    </div>

                    <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                      <label className={styles.label}>Drop-off Instructions</label>
                      <textarea className={styles.textarea} value={form.dropoff} onChange={e => setField('dropoff', e.target.value)} placeholder="Detailed instructions..." />
                    </div>
                  </>
                )}

                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.label}>Notes</label>
                  <textarea className={styles.textarea} value={form.notes} onChange={e => setField('notes', e.target.value)} placeholder="Any additional notes..." />
                </div>
              </div>
            </div>

            <div className={styles.modalFoot}>
              <button className={styles.btnOutline} onClick={() => setFormOpen(false)}>Cancel</button>
              <button className={styles.btnGreen} onClick={handleFormSave} disabled={saving}>
                {saving ? 'Saving...' : editSup ? 'Save Changes' : 'Create Supplier'}
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
