import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import styles from './OrganisersPage.module.scss';

// ── TYPES ─────────────────────────────────────────────────────────────────────
interface OrgContact {
  id: string;
  organiser_id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
}

interface Organiser {
  id: string;
  name: string;
  state: string;
  phone: string;
  email: string;
  website: string;
  abn: string;
  address: string;
  notes: string;
  created_at: string;
  org_contacts: OrgContact[];
}

type OrgFormData = Omit<Organiser, 'id' | 'created_at' | 'org_contacts'>;
type ContactFormData = Omit<OrgContact, 'id' | 'organiser_id'>;

const STATES = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'];

const EMPTY_FORM: OrgFormData = {
  name: '', state: '', phone: '', email: '',
  website: '', abn: '', address: '', notes: '',
};

const EMPTY_CONTACT: ContactFormData = { name: '', role: '', phone: '', email: '' };

// ── TOAST ─────────────────────────────────────────────────────────────────────
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

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function OrganisersPage() {
  const [organisers, setOrganisers] = useState<Organiser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // modals
  const [formOpen, setFormOpen] = useState(false);
  const [detailOrg, setDetailOrg] = useState<Organiser | null>(null);
  const [editOrg, setEditOrg] = useState<Organiser | null>(null);

  // form state
  const [form, setForm] = useState<OrgFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  // confirm delete organiser
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // staff modal
  const [staffModal, setStaffModal] = useState<{ mode: 'add' | 'edit'; contact?: OrgContact } | null>(null);
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
      .from('organisers')
      .select('*, org_contacts(*)')
      .order('name');
    if (err) { setError(err.message); setLoading(false); return; }
    setOrganisers((data ?? []) as Organiser[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  // filter
  const filtered = organisers.filter(o => {
    const q = search.toLowerCase();
    return (
      o.name?.toLowerCase().includes(q) ||
      o.state?.toLowerCase().includes(q) ||
      o.email?.toLowerCase().includes(q)
    );
  });

  // ── FORM SUBMIT ─────────────────────────────────────────────────────────────
  const openCreate = () => {
    setEditOrg(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (org: Organiser) => {
    setEditOrg(org);
    setForm({
      name: org.name ?? '',
      state: org.state ?? '',
      phone: org.phone ?? '',
      email: org.email ?? '',
      website: org.website ?? '',
      abn: org.abn ?? '',
      address: org.address ?? '',
      notes: org.notes ?? '',
    });
    setFormOpen(true);
    setDetailOrg(null);
  };

  const handleFormSave = async () => {
    if (!form.name.trim()) return toast('Name is required', 'error');
    setSaving(true);
    if (editOrg) {
      const { error: err } = await supabase
        .from('organisers')
        .update(form)
        .eq('id', editOrg.id);
      if (err) { toast(err.message, 'error'); setSaving(false); return; }
      toast('Organiser updated');
    } else {
      const { error: err } = await supabase
        .from('organisers')
        .insert(form);
      if (err) { toast(err.message, 'error'); setSaving(false); return; }
      toast('Organiser created');
    }
    setSaving(false);
    setFormOpen(false);
    load();
  };

  // ── DELETE ORGANISER ────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    const { error: err } = await supabase.from('organisers').delete().eq('id', id);
    if (err) { toast(err.message, 'error'); return; }
    toast('Organiser deleted');
    setDetailOrg(null);
    setConfirmDeleteId(null);
    load();
  };

  // ── STAFF CRUD ──────────────────────────────────────────────────────────────
  const openAddStaff = () => {
    setStaffForm(EMPTY_CONTACT);
    setStaffModal({ mode: 'add' });
  };

  const openEditStaff = (contact: OrgContact) => {
    setStaffForm({ name: contact.name, role: contact.role, phone: contact.phone, email: contact.email });
    setStaffModal({ mode: 'edit', contact });
  };

  const handleStaffSave = async () => {
    if (!detailOrg) return;
    setStaffSaving(true);
    if (staffModal?.mode === 'edit' && staffModal.contact) {
      const { error: err } = await supabase
        .from('org_contacts')
        .update(staffForm)
        .eq('id', staffModal.contact.id);
      if (err) { toast(err.message, 'error'); setStaffSaving(false); return; }
      toast('Contact updated');
    } else {
      const { error: err } = await supabase
        .from('org_contacts')
        .insert({ ...staffForm, organiser_id: detailOrg.id });
      if (err) { toast(err.message, 'error'); setStaffSaving(false); return; }
      toast('Contact added');
    }
    setStaffSaving(false);
    setStaffModal(null);
    const { data } = await supabase
      .from('organisers')
      .select('*, org_contacts(*)')
      .eq('id', detailOrg.id)
      .single();
    if (data) {
      setDetailOrg(data as Organiser);
      setOrganisers(prev => prev.map(o => o.id === detailOrg.id ? (data as Organiser) : o));
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    if (!detailOrg) return;
    const { error: err } = await supabase.from('org_contacts').delete().eq('id', contactId);
    if (err) { toast(err.message, 'error'); return; }
    toast('Contact removed');
    setConfirmDeleteContactId(null);
    const { data } = await supabase
      .from('organisers')
      .select('*, org_contacts(*)')
      .eq('id', detailOrg.id)
      .single();
    if (data) {
      setDetailOrg(data as Organiser);
      setOrganisers(prev => prev.map(o => o.id === detailOrg.id ? (data as Organiser) : o));
    }
  };

  // ── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Organisers</h1>
          <p className={styles.pageSub}>{organisers.length} organiser{organisers.length !== 1 ? 's' : ''} total</p>
        </div>
        <button className={styles.btnGreen} onClick={openCreate}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
          New Organiser
        </button>
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
          {search ? 'No organisers match your search.' : 'No organisers yet. Add your first one.'}
        </div>
      )}

      {!loading && !error && (
        <div className={styles.cardGrid}>
          {filtered.map(org => (
            <div key={org.id} className={styles.orgCard} onClick={() => setDetailOrg(org)}>
              <div className={styles.cardTop}>
                <div className={styles.avatar}>{initials(org.name)}</div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardName}>{org.name}</div>
                  {org.state && <span className={styles.stateBadge}>{org.state}</span>}
                </div>
              </div>

              {org.phone && (
                <div className={styles.cardRow}>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                    <path d="M3 5a2 2 0 012-2h.5a1 1 0 011 .8l.7 3.5a1 1 0 01-.3.96L6 9.18A11 11 0 0010.82 14l.92-.9a1 1 0 01.96-.3l3.5.7a1 1 0 01.8 1V15a2 2 0 01-2 2h-.5C7.16 17 3 12.84 3 7.5V5z" />
                  </svg>
                  {org.phone}
                </div>
              )}

              {org.email && (
                <div className={styles.cardRow}>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                    <path d="M2 5l8 6 8-6" /><rect x="2" y="4" width="16" height="12" rx="2" />
                  </svg>
                  {org.email}
                </div>
              )}

              <div className={styles.cardRow} style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #f0f0ee' }}>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2 18c0-3.314 3.134-6 7-6s7 2.686 7 6" />
                </svg>
                <span style={{ color: '#b0b0b0', fontSize: 12 }}>
                  {(org.org_contacts ?? []).length} staff
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── DETAIL MODAL ── */}
      {detailOrg && (
        <div className={styles.overlay} onClick={() => { setDetailOrg(null); setConfirmDeleteId(null); setConfirmDeleteContactId(null); }}>
          <div className={`${styles.modal} ${styles.modalWide}`} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <div className={`${styles.avatar} ${styles.avatarLg}`}>{initials(detailOrg.name)}</div>
              <div style={{ flex: 1 }}>
                <div className={styles.modalTitle}>{detailOrg.name}</div>
                <div className={styles.modalSub}>
                  {detailOrg.state && <span className={styles.stateBadge} style={{ marginRight: 8 }}>{detailOrg.state}</span>}
                  {detailOrg.abn && <span style={{ fontSize: 12, color: '#b0b0b0' }}>ABN: {detailOrg.abn}</span>}
                </div>
              </div>
              <button className={styles.btnOutline} onClick={() => openEdit(detailOrg)}>Edit</button>
              <button className={styles.btnDanger} onClick={() => setConfirmDeleteId(detailOrg.id)}>Delete</button>
            </div>

            <div className={styles.modalBody}>
              {confirmDeleteId === detailOrg.id && (
                <div className={styles.confirmBox}>
                  <div className={styles.confirmText}>Delete <strong>{detailOrg.name}</strong> and all their staff contacts? This cannot be undone.</div>
                  <div className={styles.confirmActions}>
                    <button className={styles.btnDanger} onClick={() => handleDelete(detailOrg.id)}>Yes, delete</button>
                    <button className={styles.btnOutline} onClick={() => setConfirmDeleteId(null)}>Cancel</button>
                  </div>
                </div>
              )}

              <div className={styles.section}>
                <div className={styles.sectionTitle}>Contact Information</div>
                <div className={styles.infoGrid}>
                  <div>
                    <div className={styles.infoLabel}>Phone</div>
                    <div className={styles.infoValue}>{detailOrg.phone || '—'}</div>
                  </div>
                  <div>
                    <div className={styles.infoLabel}>Email</div>
                    <div className={styles.infoValue}>{detailOrg.email || '—'}</div>
                  </div>
                  <div>
                    <div className={styles.infoLabel}>Website</div>
                    <div className={styles.infoValue}>{detailOrg.website || '—'}</div>
                  </div>
                  <div>
                    <div className={styles.infoLabel}>Address</div>
                    <div className={styles.infoValue}>{detailOrg.address || '—'}</div>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionTitle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Staff / Contacts</span>
                  <button className={styles.btnGreen} onClick={openAddStaff} style={{ fontSize: 11.5, padding: '5px 12px' }}>
                    + Add Staff
                  </button>
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
                      {staffModal.mode === 'add' ? 'Add Staff Member' : 'Edit Staff Member'}
                    </div>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Name</label>
                        <input className={styles.input} value={staffForm.name} onChange={e => setStaffForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Role</label>
                        <input className={styles.input} value={staffForm.role} onChange={e => setStaffForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Event Manager" />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Phone</label>
                        <input className={styles.input} value={staffForm.phone} onChange={e => setStaffForm(f => ({ ...f, phone: e.target.value }))} placeholder="Phone number" />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input className={styles.input} value={staffForm.email} onChange={e => setStaffForm(f => ({ ...f, email: e.target.value }))} placeholder="Email address" />
                      </div>
                    </div>
                    <div className={styles.staffFormActions}>
                      <button className={styles.btnGreen} onClick={handleStaffSave} disabled={staffSaving}>
                        {staffSaving ? 'Saving...' : 'Save'}
                      </button>
                      <button className={styles.btnOutline} onClick={() => setStaffModal(null)}>Cancel</button>
                    </div>
                  </div>
                )}

                {(detailOrg.org_contacts ?? []).length === 0 ? (
                  <div style={{ fontSize: 13, color: '#b0b0b0', padding: '12px 0' }}>No staff contacts yet.</div>
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
                      {(detailOrg.org_contacts ?? []).map(c => (
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

              {detailOrg.notes && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>Notes</div>
                  <div style={{ fontSize: 13.5, color: '#111214', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {detailOrg.notes}
                  </div>
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
                <div className={styles.modalTitle}>{editOrg ? 'Edit Organiser' : 'New Organiser'}</div>
                <div className={styles.modalSub}>{editOrg ? 'Update organiser details' : 'Fill in the details below'}</div>
              </div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.label}>Name *</label>
                  <input className={styles.input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Organiser name" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>State</label>
                  <select className={styles.select} value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))}>
                    <option value="">Select state...</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>ABN</label>
                  <input className={styles.input} value={form.abn} onChange={e => setForm(f => ({ ...f, abn: e.target.value }))} placeholder="XX XXX XXX XXX" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone</label>
                  <input className={styles.input} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="Phone number" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input className={styles.input} type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Email address" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Website</label>
                  <input className={styles.input} value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="https://..." />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Address</label>
                  <input className={styles.input} value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Street address" />
                </div>

                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.label}>Notes</label>
                  <textarea className={styles.textarea} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Any additional notes..." />
                </div>
              </div>
            </div>

            <div className={styles.modalFoot}>
              <button className={styles.btnOutline} onClick={() => setFormOpen(false)}>Cancel</button>
              <button className={styles.btnGreen} onClick={handleFormSave} disabled={saving}>
                {saving ? 'Saving...' : editOrg ? 'Save Changes' : 'Create Organiser'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOASTS ── */}
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
