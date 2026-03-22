import { useState, useEffect, useCallback } from 'react';
import styles from './RateCardsPage.module.scss';
import { supabase } from '../../lib/supabase';

// ── TYPES ─────────────────────────────────────────────────────────────────────
interface RateCardTier {
  id?: string;
  rate_card_id?: string;
  from_count: number | '';
  to_count: number | '' | null;
  price: number | '';
  sort_order: number;
}

interface RateCard {
  id: string;
  name: string;
  provider: string;
  storage_price: number | null;
  notes: string;
  created_at: string;
  rate_card_tiers: RateCardTier[];
}

type RCFormData = {
  name: string;
  provider: string;
  storage_price: string;
  notes: string;
  tiers: RateCardTier[];
};

interface Toast { id: number; msg: string; type: 'success' | 'error' }

const EMPTY_FORM: RCFormData = {
  name: '', provider: '', storage_price: '', notes: '', tiers: [],
};

const newTier = (order: number): RateCardTier => ({
  from_count: '', to_count: '', price: '', sort_order: order,
});

// ── HELPERS ───────────────────────────────────────────────────────────────────
function fmtPrice(v: number | null | undefined) {
  if (v == null) return '—';
  return `$${Number(v).toFixed(2)}`;
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function RateCardsPage() {
  const [rateCards, setRateCards] = useState<RateCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [formOpen, setFormOpen] = useState(false);
  const [detailCard, setDetailCard] = useState<RateCard | null>(null);
  const [editCard, setEditCard] = useState<RateCard | null>(null);

  const [form, setForm] = useState<RCFormData>(EMPTY_FORM);
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
      .from('rate_cards')
      .select('*, rate_card_tiers(*)')
      .order('name');
    if (err) { setError(err.message); setLoading(false); return; }
    // sort tiers within each card
    const cards = (data ?? []).map((c: RateCard) => ({
      ...c,
      rate_card_tiers: [...(c.rate_card_tiers ?? [])].sort((a, b) => a.sort_order - b.sort_order),
    }));
    setRateCards(cards as RateCard[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = rateCards.filter(c => {
    const q = search.toLowerCase();
    return c.name?.toLowerCase().includes(q) || c.provider?.toLowerCase().includes(q);
  });

  const openCreate = () => {
    setEditCard(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (card: RateCard) => {
    setEditCard(card);
    setForm({
      name: card.name ?? '',
      provider: card.provider ?? '',
      storage_price: card.storage_price != null ? String(card.storage_price) : '',
      notes: card.notes ?? '',
      tiers: (card.rate_card_tiers ?? []).map(t => ({
        from_count: t.from_count ?? '',
        to_count: t.to_count ?? '',
        price: t.price ?? '',
        sort_order: t.sort_order,
      })),
    });
    setFormOpen(true);
    setDetailCard(null);
  };

  const addTier = () =>
    setForm(f => ({ ...f, tiers: [...f.tiers, newTier(f.tiers.length)] }));

  const removeTier = (idx: number) =>
    setForm(f => ({ ...f, tiers: f.tiers.filter((_, i) => i !== idx) }));

  const updateTier = (idx: number, field: keyof RateCardTier, value: string) => {
    setForm(f => {
      const tiers = [...f.tiers];
      tiers[idx] = { ...tiers[idx], [field]: value === '' ? '' : (field === 'to_count' && value === '' ? null : value) };
      return { ...f, tiers };
    });
  };

  const handleFormSave = async () => {
    if (!form.name.trim()) return toast('Name is required', 'error');
    setSaving(true);

    const payload = {
      name: form.name,
      provider: form.provider,
      storage_price: form.storage_price !== '' ? parseFloat(form.storage_price) : null,
      notes: form.notes,
    };

    let cardId: string;

    if (editCard) {
      const { error: err } = await supabase.from('rate_cards').update(payload).eq('id', editCard.id);
      if (err) { toast(err.message, 'error'); setSaving(false); return; }
      cardId = editCard.id;
      // Delete old tiers, re-insert
      await supabase.from('rate_card_tiers').delete().eq('rate_card_id', cardId);
    } else {
      const { data, error: err } = await supabase.from('rate_cards').insert(payload).select().single();
      if (err) { toast(err.message, 'error'); setSaving(false); return; }
      cardId = (data as RateCard).id;
    }

    if (form.tiers.length > 0) {
      const tierRows = form.tiers.map((t, i) => ({
        rate_card_id: cardId,
        from_count: t.from_count === '' ? 0 : Number(t.from_count),
        to_count: t.to_count === '' || t.to_count === null ? null : Number(t.to_count),
        price: t.price === '' ? 0 : Number(t.price),
        sort_order: i,
      }));
      const { error: tErr } = await supabase.from('rate_card_tiers').insert(tierRows);
      if (tErr) { toast(tErr.message, 'error'); setSaving(false); return; }
    }

    toast(editCard ? 'Rate card updated' : 'Rate card created');
    setSaving(false);
    setFormOpen(false);
    load();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('rate_card_tiers').delete().eq('rate_card_id', id);
    const { error: err } = await supabase.from('rate_cards').delete().eq('id', id);
    if (err) { toast(err.message, 'error'); return; }
    toast('Rate card deleted');
    setDetailCard(null);
    setConfirmDeleteId(null);
    load();
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Rate Cards</h1>
          <p className={styles.pageSub}>{rateCards.length} rate card{rateCards.length !== 1 ? 's' : ''} total</p>
        </div>
        <button className={styles.btnGreen} onClick={openCreate}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
          New Rate Card
        </button>
      </div>

      <div className={styles.controlRow}>
        <div className={styles.searchWrap}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="8.5" cy="8.5" r="5.5" /><path d="M14.5 14.5L18 18" />
          </svg>
          <input
            className={styles.searchInput}
            placeholder="Search by name or provider..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && <div className={styles.spinner} />}
      {error && <div className={styles.empty} style={{ color: '#ef4444' }}>{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className={styles.empty}>
          {search ? 'No rate cards match your search.' : 'No rate cards yet. Add your first one.'}
        </div>
      )}

      {!loading && !error && (
        <div className={styles.cardGrid}>
          {filtered.map(card => (
            <div key={card.id} className={styles.rcCard} onClick={() => setDetailCard(card)}>
              <div className={styles.cardHead}>
                <div className={styles.cardName}>{card.name}</div>
                {card.provider && <div className={styles.cardProvider}>{card.provider}</div>}
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.metaBadge}>
                  {(card.rate_card_tiers ?? []).length} tier{(card.rate_card_tiers ?? []).length !== 1 ? 's' : ''}
                </span>
                {card.storage_price != null && (
                  <span className={styles.storagePrice}>Storage {fmtPrice(card.storage_price)}/pallet</span>
                )}
              </div>
              {card.notes && <div className={styles.cardNotes}>{card.notes}</div>}
            </div>
          ))}
        </div>
      )}

      {/* ── DETAIL MODAL ── */}
      {detailCard && (
        <div className={styles.overlay} onClick={() => { setDetailCard(null); setConfirmDeleteId(null); }}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <div style={{ flex: 1 }}>
                <div className={styles.modalTitle}>{detailCard.name}</div>
                {detailCard.provider && <div className={styles.modalSub}>{detailCard.provider}</div>}
              </div>
              <button className={styles.btnOutline} onClick={() => openEdit(detailCard)}>Edit</button>
              <button className={styles.btnDanger} onClick={() => setConfirmDeleteId(detailCard.id)}>Delete</button>
            </div>

            <div className={styles.modalBody}>
              {confirmDeleteId === detailCard.id && (
                <div className={styles.confirmBox}>
                  <div className={styles.confirmText}>Delete <strong>{detailCard.name}</strong>? All tiers will also be deleted.</div>
                  <div className={styles.confirmActions}>
                    <button className={styles.btnDanger} onClick={() => handleDelete(detailCard.id)}>Yes, delete</button>
                    <button className={styles.btnOutline} onClick={() => setConfirmDeleteId(null)}>Cancel</button>
                  </div>
                </div>
              )}

              <div className={styles.section}>
                <div className={styles.sectionTitle}>Overview</div>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Provider</div>
                    <div className={styles.infoValue}>{detailCard.provider || '—'}</div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Storage Price</div>
                    <div className={styles.infoValue}>{detailCard.storage_price != null ? `${fmtPrice(detailCard.storage_price)} / pallet` : '—'}</div>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionTitle}>Forklift Pricing</div>
                {(detailCard.rate_card_tiers ?? []).length === 0 ? (
                  <div style={{ fontSize: 13, color: '#b0b0b0' }}>No tiers defined.</div>
                ) : (
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th className={styles.th}>From (lifts)</th>
                        <th className={styles.th}>To (lifts)</th>
                        <th className={styles.th}>Price / lift</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(detailCard.rate_card_tiers ?? []).map((tier, i) => (
                        <tr key={i}>
                          <td className={styles.td}>{tier.from_count}</td>
                          <td className={styles.td}>{tier.to_count ?? <span style={{ color: '#b0b0b0' }}>Open-ended</span>}</td>
                          <td className={styles.td} style={{ fontWeight: 700 }}>{fmtPrice(tier.price as number)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {detailCard.notes && (
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>Notes</div>
                  <div style={{ fontSize: 13.5, color: '#111214', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {detailCard.notes}
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
                <div className={styles.modalTitle}>{editCard ? 'Edit Rate Card' : 'New Rate Card'}</div>
                <div className={styles.modalSub}>{editCard ? 'Update rate card details' : 'Define the name, tiers, and storage price'}</div>
              </div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.formGrid} style={{ marginBottom: 18 }}>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.label}>Name *</label>
                  <input
                    className={styles.input}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Standard Forklift Rate"
                  />
                </div>

                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.label}>Provider</label>
                  <input
                    className={styles.input}
                    value={form.provider}
                    onChange={e => setForm(f => ({ ...f, provider: e.target.value }))}
                    placeholder="e.g. Axis Logistics"
                  />
                </div>
              </div>

              <div className={styles.tierSection}>
                <div className={styles.tierLabel}>Forklift Pricing</div>
                {form.tiers.length === 0 && (
                  <div style={{ fontSize: 13, color: '#b0b0b0', marginBottom: 10 }}>No tiers yet. Click below to add one.</div>
                )}
                {form.tiers.map((tier, idx) => (
                  <div key={idx} className={styles.tierRow}>
                    <input
                      type="number"
                      min="0"
                      placeholder="From"
                      className={styles.tierInput}
                      value={tier.from_count}
                      onChange={e => updateTier(idx, 'from_count', e.target.value)}
                    />
                    <span className={styles.tierSep}>—</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="To"
                      className={styles.tierInput}
                      value={tier.to_count ?? ''}
                      onChange={e => updateTier(idx, 'to_count', e.target.value)}
                    />
                    <div className={styles.tierPriceWrap}>
                      <span className={styles.tierPricePrefix}>$</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Price"
                        className={styles.tierPriceInput}
                        value={tier.price}
                        onChange={e => updateTier(idx, 'price', e.target.value)}
                      />
                    </div>
                    <button className={styles.deleteTierBtn} onClick={() => removeTier(idx)} title="Remove tier">
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M2 2l10 10M12 2L2 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button className={styles.btnAddTier} onClick={addTier} type="button">+ Add Tier</button>
              </div>

              <div className={styles.formGrid} style={{ marginTop: 18 }}>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.label}>Storage Price (per pallet)</label>
                  <div className={styles.prefixInput}>
                    <div className={styles.prefixSymbol}>$</div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className={styles.prefixInner}
                      value={form.storage_price}
                      onChange={e => setForm(f => ({ ...f, storage_price: e.target.value }))}
                    />
                  </div>
                </div>

                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.label}>Notes</label>
                  <textarea
                    className={styles.textarea}
                    value={form.notes}
                    onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    placeholder="Any additional notes..."
                  />
                </div>
              </div>
            </div>

            <div className={styles.modalFoot}>
              <button className={styles.btnOutline} onClick={() => setFormOpen(false)}>Cancel</button>
              <button className={styles.btnGreen} onClick={handleFormSave} disabled={saving}>
                {saving ? 'Saving...' : editCard ? 'Save Changes' : 'Create Rate Card'}
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
