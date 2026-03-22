import React, { useState } from 'react';
import styles from './QuotePage.module.scss';
import FreightBuilder, { type FreightItem } from '../../components/freight/FreightBuilder';

interface Show {
  id: string;
  name: string;
  venue: string;
  dates: string;
  emoji: string;
}

const shows: Show[] = [
  {
    id: 'BAFMEL26',
    name: 'Banking & Finance Expo',
    venue: 'MCEC, Melbourne',
    dates: 'Feb 22-24, 2026',
    emoji: '🏦'
  },
  {
    id: 'DESIGN25',
    name: 'DesignEx Sydney',
    venue: 'ICC Sydney',
    dates: 'Mar 15-17, 2025',
    emoji: '🎨'
  },
  {
    id: 'FOODEX',
    name: 'FoodEx Brisbane',
    venue: 'Brisbane Convention Centre',
    dates: 'Jun 10-12, 2026',
    emoji: '🍔'
  },
  {
    id: 'AUTOSHOW',
    name: 'Auto Show Melbourne',
    venue: 'Melbourne Convention Centre',
    dates: 'Oct 5-9, 2026',
    emoji: '🚗'
  },
  {
    id: 'TECHSUMMIT',
    name: 'Tech Summit Sydney',
    venue: 'International Convention Centre',
    dates: 'Aug 20-22, 2026',
    emoji: '💻'
  },
  {
    id: 'BUILDEXPO',
    name: 'Build Expo Melbourne',
    venue: 'Melbourne Showgrounds',
    dates: 'Nov 12-14, 2026',
    emoji: '🏗️'
  }
];

const QuotePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [freightIn, setFreightIn] = useState<boolean | null>(null);
  const [freightOut, setFreightOut] = useState<boolean | null>(null);
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [pickupForklift, setPickupForklift] = useState<boolean | null>(null);
  const [deliveryForklift, setDeliveryForklift] = useState<boolean | null>(null);
  const [freightItems, setFreightItems] = useState<FreightItem[]>([]);
  const [quoteId] = useState('AX-' + Math.floor(1000 + Math.random() * 9000));
  const [isLoading, setIsLoading] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShows = shows.filter(show =>
    show.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    show.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowSelect = (show: Show) => {
    setSelectedShow(show);
    setTimeout(() => setCurrentStep(2), 300);
  };

  const handleFreightInResponse = (response: boolean) => {
    setFreightIn(response);
    if (!response) {
      setPickupAddress('');
      setPickupForklift(null);
      setCurrentStep(3); // Go to freight builder for pickup items
    }
  };

  const handlePickupComplete = () => {
    if (pickupAddress && pickupForklift !== null) {
      setCurrentStep(3); // Go to freight builder for pickup items
    }
  };

  const handleFreightOutResponse = (response: boolean) => {
    setFreightOut(response);
    if (!response) {
      setDeliveryAddress('');
      setDeliveryForklift(null);
      setCurrentStep(5); // Go to freight builder for delivery items
    }
  };

  const handleDeliveryComplete = () => {
    if (deliveryAddress && deliveryForklift !== null) {
      setCurrentStep(5); // Go to freight builder for delivery items
    }
  };

  const handleFreightItemsComplete = (items: FreightItem[]) => {
    setFreightItems(items);
    if (currentStep === 3) {
      setCurrentStep(4); // Go to freight out question
    } else if (currentStep === 5) {
      setCurrentStep(6); // Go to loading/quote
    }
  };

  const startLoading = () => {
    setIsLoading(true);
    setCurrentStep(6);

    setTimeout(() => {
      setIsLoading(false);
      setShowQuote(true);
    }, 5000);
  };

  const calculateTotal = () => {
    let total = 0;

    if (freightIn) total += 450;
    if (freightOut) total += 450;

    // Estimate based on freight items
    total += freightItems.length * 150;

    // Tailgate surcharges
    if (pickupForklift === false) total += 65;
    if (deliveryForklift === false) total += 65;

    // Insurance
    total += 85;

    return total;
  };

  return (
    <div className={styles.quoteWrapper}>
      <div className={styles.container}>
        <div className={styles.progressSteps}>
          {[1,2,3,4,5,6].map(step => (
            <div
              key={step}
              className={`${styles.stepIndicator} ${currentStep === step ? styles.stepActive : ''} ${currentStep > step ? styles.stepCompleted : ''}`}
            />
          ))}
        </div>

        <h1 className={styles.title}>Quote Details</h1>
        <div className={styles.quoteBadge}>Quote ID: #{quoteId}</div>

        {/* Step 1: Show Selection */}
        {currentStep === 1 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>🎪 Select your show</div>
            <div className={styles.formGroup}>
              <label>Search shows</label>
              <input
                type="text"
                placeholder="Type show name or venue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.showGrid}>
              {filteredShows.map(show => (
                <div
                  key={show.id}
                  className={`${styles.showCard} ${selectedShow?.id === show.id ? styles.showCardSelected : ''}`}
                  onClick={() => handleShowSelect(show)}
                >
                  <div className={styles.showEmoji}>{show.emoji}</div>
                  <div className={styles.showName}>{show.name}</div>
                  <div className={styles.showVenue}>{show.venue}</div>
                  <div className={styles.showDates}>{show.dates}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Freight In */}
        {currentStep === 2 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>📦 Freight into show?</div>
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

        {/* Step 3: Freight Builder (Pickup Items) */}
        {currentStep === 3 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>🔨 What are you sending to the show?</div>
            <FreightBuilder
              onItemsChange={setFreightItems}
              onContinue={handleFreightItemsComplete}
            />
          </div>
        )}

        {/* Step 4: Freight Out */}
        {currentStep === 4 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>📦 Freight out of show?</div>
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

        {/* Step 5: Freight Builder (Delivery Items) */}
        {currentStep === 5 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>🔨 What items are coming back from the show?</div>
            <FreightBuilder
              onItemsChange={setFreightItems}
              onContinue={() => startLoading()}
            />
          </div>
        )}

        {/* Step 6: Loading & Quote */}
        {currentStep === 6 && (
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

            {showQuote && (
              <div>
                <div className={styles.quoteSummary}>
                  <h2 style={{ marginBottom: '1.5rem' }}>Your Quote</h2>

                  <div className={styles.summaryRow}>
                    <span style={{ fontWeight: '600', color: '#333' }}>Show:</span>
                    <span style={{ color: '#000' }}>{selectedShow?.name}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span style={{ fontWeight: '600', color: '#333' }}>Venue:</span>
                    <span style={{ color: '#000' }}>{selectedShow?.venue}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span style={{ fontWeight: '600', color: '#333' }}>Dates:</span>
                    <span style={{ color: '#000' }}>{selectedShow?.dates}</span>
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
                      <span style={{ color: '#000' }}>${(pickupForklift === false ? 65 : 0) + (deliveryForklift === false ? 65 : 0)}</span>
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

                <button
                  className={styles.primaryButton}
                  onClick={() => alert('Quote accepted! Thank you for choosing Axis Events.')}
                >
                  Accept Quote & Proceed →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotePage;
