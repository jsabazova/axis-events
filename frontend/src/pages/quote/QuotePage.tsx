import React, { useState, useEffect } from 'react';
import styles from './QuotePage.module.scss';
import FreightBuilder, { type FreightItem } from '../../components/freight/FreightBuilder';
import { supabase } from '../../lib/supabase';

// ── Types ──────────────────────────────────────────────────────────────────────

interface Show {
  id: string;
  name: string;
  code: string;
  show_start: string;
  show_end: string;
  venue: { name: string } | null;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const sDay = s.getUTCDate();
  const sMon = MONTHS[s.getUTCMonth()];
  const eDay = e.getUTCDate();
  const eMon = MONTHS[e.getUTCMonth()];
  const eYear = e.getUTCFullYear();
  if (sMon === eMon) {
    return `${sDay}–${eDay} ${eMon} ${eYear}`;
  }
  return `${sDay} ${sMon} – ${eDay} ${eMon} ${eYear}`;
}

// ── Component ──────────────────────────────────────────────────────────────────

const QuotePage: React.FC = () => {
  // Shows loading
  const [shows, setShows] = useState<Show[]>([]);
  const [showsLoading, setShowsLoading] = useState(true);

  // Flow state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Step 2: Contact info
  const [contactName, setContactName] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactError, setContactError] = useState('');

  // Step 3: Freight in
  const [freightIn, setFreightIn] = useState<boolean | null>(null);
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupForklift, setPickupForklift] = useState<boolean | null>(null);

  // Step 5: Freight out
  const [freightOut, setFreightOut] = useState<boolean | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryForklift, setDeliveryForklift] = useState<boolean | null>(null);

  // Step 4 & 6: Freight items
  const [freightItems, setFreightItems] = useState<FreightItem[]>([]);

  // Quote reference (generated once)
  const [quoteId] = useState('AX-' + Math.floor(1000 + Math.random() * 9000));

  // Step 7: Loading & result
  const [isLoading, setIsLoading] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // ── Fetch shows on mount ─────────────────────────────────────────────────────

  useEffect(() => {
    const fetchShows = async () => {
      setShowsLoading(true);
      const { data } = await supabase
        .from('shows')
        .select('id, name, code, show_start, show_end, venue:suppliers(name)')
        .eq('status', 'active')
        .order('show_start', { ascending: true });
      setShows((data as unknown as Show[]) ?? []);
      setShowsLoading(false);
    };
    fetchShows();
  }, []);

  // ── Derived ──────────────────────────────────────────────────────────────────

  const filteredShows = shows.filter(show =>
    show.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (show.venue?.name ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ── Step handlers ─────────────────────────────────────────────────────────────

  const handleShowSelect = (show: Show) => {
    setSelectedShow(show);
    setTimeout(() => setCurrentStep(2), 300);
  };

  const handleContactContinue = () => {
    if (!contactName.trim() || !contactEmail.trim()) {
      setContactError('Full name and email are required.');
      return;
    }
    setContactError('');
    setCurrentStep(3);
  };

  const handleFreightInResponse = (response: boolean) => {
    setFreightIn(response);
    if (!response) {
      setPickupAddress('');
      setPickupForklift(null);
      setCurrentStep(4);
    }
  };

  const handlePickupComplete = () => {
    if (pickupAddress && pickupForklift !== null) {
      setCurrentStep(4);
    }
  };

  const handleFreightItemsComplete = (items: FreightItem[]) => {
    setFreightItems(items);
    if (currentStep === 4) {
      setCurrentStep(5);
    } else if (currentStep === 6) {
      startLoading();
    }
  };

  const handleFreightOutResponse = (response: boolean) => {
    setFreightOut(response);
    if (!response) {
      setDeliveryAddress('');
      setDeliveryForklift(null);
      setCurrentStep(6);
    }
  };

  const handleDeliveryComplete = () => {
    if (deliveryAddress && deliveryForklift !== null) {
      setCurrentStep(6);
    }
  };

  const startLoading = () => {
    setIsLoading(true);
    setCurrentStep(7);

    setTimeout(() => {
      setIsLoading(false);
      setShowQuote(true);
    }, 5000);
  };

  // ── Pricing ──────────────────────────────────────────────────────────────────

  const calculateTotal = () => {
    let total = 0;
    if (freightIn) total += 450;
    if (freightOut) total += 450;
    total += freightItems.length * 150;
    if (pickupForklift === false) total += 65;
    if (deliveryForklift === false) total += 65;
    total += 85; // insurance
    return total;
  };

  // ── Accept quote → save to Supabase ──────────────────────────────────────────

  const handleAcceptQuote = async () => {
    setSubmitError('');
    const { error } = await supabase.from('quotes').insert({
      show_id: selectedShow!.id,
      status: 'draft',
      notes: JSON.stringify({
        contact: {
          name: contactName,
          company: contactCompany,
          email: contactEmail,
          phone: contactPhone,
        },
        freightIn,
        freightOut,
        pickupAddress,
        deliveryAddress,
        pickupForklift,
        deliveryForklift,
        items: freightItems,
        totalPrice: calculateTotal(),
      }),
    });

    if (error) {
      setSubmitError('Something went wrong saving your quote. Please try again.');
      return;
    }

    setSubmitted(true);
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className={styles.quoteWrapper}>
      <div className={styles.container}>

        {/* Progress bar – 7 steps */}
        <div className={styles.progressSteps}>
          {[1, 2, 3, 4, 5, 6, 7].map(step => (
            <div
              key={step}
              className={`${styles.stepIndicator} ${currentStep === step ? styles.stepActive : ''} ${currentStep > step ? styles.stepCompleted : ''}`}
            />
          ))}
        </div>

        <h1 className={styles.title}>Quote Details</h1>
        <div className={styles.quoteBadge}>Quote ID: #{quoteId}</div>

        {/* ── Step 1: Show Selection ─────────────────────────────────────────── */}
        {currentStep === 1 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Select your show</div>

            <div className={styles.formGroup}>
              <label>Search shows</label>
              <input
                type="text"
                placeholder="Type show name or venue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {showsLoading && (
              <div className={styles.showsSpinner} />
            )}

            {!showsLoading && shows.length === 0 && (
              <div className={styles.emptyState}>
                No active shows available at this time.
              </div>
            )}

            {!showsLoading && shows.length > 0 && (
              <div className={styles.showGrid}>
                {filteredShows.map(show => (
                  <div
                    key={show.id}
                    className={`${styles.showCard} ${selectedShow?.id === show.id ? styles.showCardSelected : ''}`}
                    onClick={() => handleShowSelect(show)}
                  >
                    <div className={styles.showName}>{show.name}</div>
                    <div className={styles.showVenue}>{show.venue?.name ?? '—'}</div>
                    <div className={styles.showDates}>
                      {formatDateRange(show.show_start, show.show_end)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Step 2: Contact Info ──────────────────────────────────────────── */}
        {currentStep === 2 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Your contact details</div>

            <div className={styles.formGroup}>
              <label>Full name *</label>
              <input
                type="text"
                placeholder="Jane Smith"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Company</label>
              <input
                type="text"
                placeholder="Acme Co."
                value={contactCompany}
                onChange={(e) => setContactCompany(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Email *</label>
              <input
                type="email"
                placeholder="jane@acme.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Phone</label>
              <input
                type="tel"
                placeholder="+61 4xx xxx xxx"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            {contactError && (
              <div style={{ color: '#dc2626', marginBottom: '1rem', fontWeight: 600 }}>
                {contactError}
              </div>
            )}

            <button className={styles.primaryButton} onClick={handleContactContinue}>
              Continue
            </button>
          </div>
        )}

        {/* ── Step 3: Freight In ────────────────────────────────────────────── */}
        {currentStep === 3 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Freight into show?</div>
            <div className={styles.optionRow}>
              <button
                className={`${styles.optionButton} ${freightIn === true ? styles.optionButtonActive : ''}`}
                onClick={() => handleFreightInResponse(true)}
              >
                Yes, I need pickup
              </button>
              <button
                className={`${styles.optionButton} ${freightIn === false ? styles.optionButtonActive : ''}`}
                onClick={() => handleFreightInResponse(false)}
              >
                No
              </button>
            </div>

            {freightIn === true && (
              <div>
                <div className={styles.formGroup}>
                  <label>Pickup address</label>
                  <input
                    type="text"
                    placeholder="Start typing address..."
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Forklift at pickup?</label>
                  <div className={styles.optionRow}>
                    <button
                      className={`${styles.optionButton} ${pickupForklift === true ? styles.optionButtonActive : ''}`}
                      onClick={() => {
                        setPickupForklift(true);
                        setTimeout(handlePickupComplete, 100);
                      }}
                    >
                      Yes, they have forklift
                    </button>
                    <button
                      className={`${styles.optionButton} ${pickupForklift === false ? styles.optionButtonActive : ''}`}
                      onClick={() => {
                        setPickupForklift(false);
                        setTimeout(handlePickupComplete, 100);
                      }}
                    >
                      No (tailgate truck required)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Step 4: Freight Builder (Pickup Items) ────────────────────────── */}
        {currentStep === 4 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>What are you sending to the show?</div>
            <FreightBuilder
              onItemsChange={setFreightItems}
              onContinue={handleFreightItemsComplete}
            />
          </div>
        )}

        {/* ── Step 5: Freight Out ───────────────────────────────────────────── */}
        {currentStep === 5 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Freight out of show?</div>
            <div className={styles.optionRow}>
              <button
                className={`${styles.optionButton} ${freightOut === true ? styles.optionButtonActive : ''}`}
                onClick={() => handleFreightOutResponse(true)}
              >
                Yes, need delivery
              </button>
              <button
                className={`${styles.optionButton} ${freightOut === false ? styles.optionButtonActive : ''}`}
                onClick={() => handleFreightOutResponse(false)}
              >
                No
              </button>
            </div>

            {freightOut === true && (
              <div>
                <div className={styles.formGroup}>
                  <label>Delivery address</label>
                  <input
                    type="text"
                    placeholder="Start typing address..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Forklift at delivery?</label>
                  <div className={styles.optionRow}>
                    <button
                      className={`${styles.optionButton} ${deliveryForklift === true ? styles.optionButtonActive : ''}`}
                      onClick={() => {
                        setDeliveryForklift(true);
                        setTimeout(handleDeliveryComplete, 100);
                      }}
                    >
                      Yes, they have forklift
                    </button>
                    <button
                      className={`${styles.optionButton} ${deliveryForklift === false ? styles.optionButtonActive : ''}`}
                      onClick={() => {
                        setDeliveryForklift(false);
                        setTimeout(handleDeliveryComplete, 100);
                      }}
                    >
                      No (tailgate truck required)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Step 6: Freight Builder (Delivery Items) ──────────────────────── */}
        {currentStep === 6 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>What items are coming back from the show?</div>
            <FreightBuilder
              onItemsChange={setFreightItems}
              onContinue={() => startLoading()}
            />
          </div>
        )}

        {/* ── Step 7: Loading & Quote ───────────────────────────────────────── */}
        {currentStep === 7 && (
          <div>
            {isLoading && (
              <div className={styles.loadingScreen}>
                <div className={styles.loadingSpinner} />
                <div style={{ fontSize: '1.3rem', color: '#333', margin: '1rem 0' }}>
                  Building your quote...
                </div>
                <div style={{ color: '#666', fontStyle: 'italic' }}>
                  Analyzing requirements
                </div>
              </div>
            )}

            {showQuote && !submitted && (
              <div>
                <div className={styles.quoteSummary}>
                  <h2 style={{ marginBottom: '1.5rem' }}>Your Quote</h2>

                  <div className={styles.summaryRow}>
                    <span style={{ fontWeight: '600', color: '#333' }}>Show:</span>
                    <span style={{ color: '#000' }}>{selectedShow?.name}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span style={{ fontWeight: '600', color: '#333' }}>Venue:</span>
                    <span style={{ color: '#000' }}>{selectedShow?.venue?.name ?? '—'}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span style={{ fontWeight: '600', color: '#333' }}>Dates:</span>
                    <span style={{ color: '#000' }}>
                      {selectedShow ? formatDateRange(selectedShow.show_start, selectedShow.show_end) : '—'}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span style={{ fontWeight: '600', color: '#333' }}>Contact:</span>
                    <span style={{ color: '#000' }}>{contactName}</span>
                  </div>

                  <div style={{ background: '#f9f9f9', borderRadius: '20px', padding: '1.5rem', margin: '1.5rem 0' }}>
                    <div className={styles.summaryRow}>
                      <span style={{ fontWeight: '600', color: '#333' }}>Freight into show:</span>
                      <span style={{ color: '#000' }}>${freightIn ? '450' : '0'}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span style={{ fontWeight: '600', color: '#333' }}>Freight out of show:</span>
                      <span style={{ color: '#000' }}>${freightOut ? '450' : '0'}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span style={{ fontWeight: '600', color: '#333' }}>Items (estimated):</span>
                      <span style={{ color: '#000' }}>${freightItems.length * 150}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span style={{ fontWeight: '600', color: '#333' }}>Tailgate surcharge:</span>
                      <span style={{ color: '#000' }}>
                        ${(pickupForklift === false ? 65 : 0) + (deliveryForklift === false ? 65 : 0)}
                      </span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span style={{ fontWeight: '600', color: '#333' }}>Insurance (basic):</span>
                      <span style={{ color: '#000' }}>$85</span>
                    </div>
                  </div>

                  <div className={styles.totalPrice}>${calculateTotal()}</div>

                  <div style={{ textAlign: 'center', color: '#666', marginTop: '1rem' }}>
                    <p>Quote valid for 7 days • Includes basic cargo insurance • GST included</p>
                  </div>
                </div>

                {submitError && (
                  <div style={{ color: '#dc2626', marginBottom: '1rem', fontWeight: 600, textAlign: 'center' }}>
                    {submitError}
                  </div>
                )}

                <button className={styles.primaryButton} onClick={handleAcceptQuote}>
                  Accept Quote &amp; Proceed →
                </button>
              </div>
            )}

            {submitted && (
              <div className={styles.successScreen}>
                <svg
                  className={styles.successIcon}
                  viewBox="0 0 72 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="36" cy="36" r="36" fill="#00c05a" opacity="0.12" />
                  <circle cx="36" cy="36" r="28" fill="#00c05a" opacity="0.2" />
                  <circle cx="36" cy="36" r="20" fill="#00c05a" />
                  <path
                    d="M24 36.5L31.5 44L48 28"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className={styles.successTitle}>Quote Submitted</div>

                <div className={styles.successMessage}>
                  We'll review your requirements and send a formal quote to{' '}
                  <strong>{contactEmail}</strong> within 1 business day.
                </div>

                <div className={styles.successRef}>{quoteId}</div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default QuotePage;
