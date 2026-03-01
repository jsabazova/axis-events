import React, { useState } from 'react';
import styled from 'styled-components';
import FreightBuilder, { type FreightItem } from '../../components/freight/FreightBuilder';

const QuoteWrapper = styled.div`
  background: #f3f4f6;
  min-height: calc(100vh - 80px);
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Container = styled.div`
  max-width: 900px;
  width: 100%;
  background: white;
  border-radius: 40px;
  padding: 2.5rem;
  box-shadow: 0 30px 60px -15px rgba(0,0,0,0.3);
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #000000;
`;

const QuoteBadge = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  display: inline-block;
  margin-bottom: 2rem;
  font-weight: 600;
  font-size: 1.1rem;
`;

const ProgressSteps = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const StepIndicator = styled.div<{ active?: boolean; completed?: boolean }>`
  flex: 1;
  height: 8px;
  background: ${({ active, completed, theme }) =>
    active || completed ? theme.colors.primary : '#dddddd'};
  border-radius: 4px;
  transition: background 0.3s ease;
`;

const Section = styled.div`
  background: #f9f9f9;
  border-radius: 28px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 2px solid #e5e7eb;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  &.hidden {
    display: none;
  }
`;

const SectionTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #000000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ShowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ShowCard = styled.div<{ selected?: boolean }>`
  background: white;
  border: 3px solid ${({ selected, theme }) => selected ? theme.colors.primary : '#dddddd'};
  border-radius: 24px;
  padding: 2rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  background: ${({ selected }) => selected ? '#f0fdf4' : 'white'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 168, 107, 0.15);
  }
`;

const ShowEmoji = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ShowName = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #000;
`;

const ShowVenue = styled.div`
  color: #555;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const ShowDates = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #000000;
    font-size: 1.1rem;
  }

  input {
    width: 100%;
    padding: 1rem 1.25rem;
    border: 3px solid #dddddd;
    border-radius: 20px;
    font-size: 1.1rem;
    color: #000000;
    background: white;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const OptionRow = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const OptionButton = styled.button<{ active?: boolean }>`
  background: ${({ active, theme }) => active ? theme.colors.primary : 'white'};
  border: 3px solid ${({ active, theme }) => active ? theme.colors.primary : '#dddddd'};
  border-radius: 50px;
  padding: 1rem 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1 1 auto;
  color: ${({ active }) => active ? 'white' : '#000000'};
  font-size: 1.1rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ active, theme }) => active ? theme.colors.primaryDark : '#f0fdf4'};
  }
`;

const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1.25rem 2rem;
  font-weight: 700;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const LoadingScreen = styled.div`
  background: #f9f9f9;
  border-radius: 28px;
  padding: 3rem;
  text-align: center;
  margin: 2rem 0;
  border: 3px solid ${({ theme }) => theme.colors.primary};
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 5px solid #ddd;
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const QuoteSummary = styled.div`
  background: white;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 28px;
  padding: 2rem;
  margin: 2rem 0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  font-size: 1.1rem;

  &:last-child {
    border-bottom: none;
  }
`;

const TotalPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin: 1.5rem 0;
`;


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
    <QuoteWrapper>
      <Container>
        <ProgressSteps>
          {[1,2,3,4,5,6].map(step => (
            <StepIndicator
              key={step}
              active={currentStep === step}
              completed={currentStep > step}
            />
          ))}
        </ProgressSteps>

        <Title>Quote Details</Title>
        <QuoteBadge>Quote ID: #{quoteId}</QuoteBadge>

        {/* Step 1: Show Selection */}
        {currentStep === 1 && (
          <Section>
            <SectionTitle>🎪 Select your show</SectionTitle>
            <FormGroup>
              <label>Search shows</label>
              <input
                type="text"
                placeholder="Type show name or venue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FormGroup>
            <ShowGrid>
              {filteredShows.map(show => (
                <ShowCard
                  key={show.id}
                  selected={selectedShow?.id === show.id}
                  onClick={() => handleShowSelect(show)}
                >
                  <ShowEmoji>{show.emoji}</ShowEmoji>
                  <ShowName>{show.name}</ShowName>
                  <ShowVenue>{show.venue}</ShowVenue>
                  <ShowDates>{show.dates}</ShowDates>
                </ShowCard>
              ))}
            </ShowGrid>
          </Section>
        )}

        {/* Step 2: Freight In */}
        {currentStep === 2 && (
          <Section>
            <SectionTitle>📦 Freight into show?</SectionTitle>
            <OptionRow>
              <OptionButton
                active={freightIn === true}
                onClick={() => handleFreightInResponse(true)}
              >
                Yes, I need pickup
              </OptionButton>
              <OptionButton
                active={freightIn === false}
                onClick={() => handleFreightInResponse(false)}
              >
                No
              </OptionButton>
            </OptionRow>

            {freightIn === true && (
              <div>
                <FormGroup>
                  <label>Pickup address</label>
                  <input
                    type="text"
                    placeholder="Start typing address..."
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Forklift at pickup?</label>
                  <OptionRow>
                    <OptionButton
                      active={pickupForklift === true}
                      onClick={() => {
                        setPickupForklift(true);
                        setTimeout(handlePickupComplete, 100);
                      }}
                    >
                      Yes, they have forklift
                    </OptionButton>
                    <OptionButton
                      active={pickupForklift === false}
                      onClick={() => {
                        setPickupForklift(false);
                        setTimeout(handlePickupComplete, 100);
                      }}
                    >
                      No (tailgate truck required)
                    </OptionButton>
                  </OptionRow>
                </FormGroup>
              </div>
            )}
          </Section>
        )}

        {/* Step 3: Freight Builder (Pickup Items) */}
        {currentStep === 3 && (
          <Section>
            <SectionTitle>🔨 What are you sending to the show?</SectionTitle>
            <FreightBuilder
              onItemsChange={setFreightItems}
              onContinue={handleFreightItemsComplete}
            />
          </Section>
        )}

        {/* Step 4: Freight Out */}
        {currentStep === 4 && (
          <Section>
            <SectionTitle>📦 Freight out of show?</SectionTitle>
            <OptionRow>
              <OptionButton
                active={freightOut === true}
                onClick={() => handleFreightOutResponse(true)}
              >
                Yes, need delivery
              </OptionButton>
              <OptionButton
                active={freightOut === false}
                onClick={() => handleFreightOutResponse(false)}
              >
                No
              </OptionButton>
            </OptionRow>

            {freightOut === true && (
              <div>
                <FormGroup>
                  <label>Delivery address</label>
                  <input
                    type="text"
                    placeholder="Start typing address..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Forklift at delivery?</label>
                  <OptionRow>
                    <OptionButton
                      active={deliveryForklift === true}
                      onClick={() => {
                        setDeliveryForklift(true);
                        setTimeout(handleDeliveryComplete, 100);
                      }}
                    >
                      Yes, they have forklift
                    </OptionButton>
                    <OptionButton
                      active={deliveryForklift === false}
                      onClick={() => {
                        setDeliveryForklift(false);
                        setTimeout(handleDeliveryComplete, 100);
                      }}
                    >
                      No (tailgate truck required)
                    </OptionButton>
                  </OptionRow>
                </FormGroup>
              </div>
            )}
          </Section>
        )}

        {/* Step 5: Freight Builder (Delivery Items) */}
        {currentStep === 5 && (
          <Section>
            <SectionTitle>🔨 What items are coming back from the show?</SectionTitle>
            <FreightBuilder
              onItemsChange={setFreightItems}
              onContinue={() => startLoading()}
            />
          </Section>
        )}

        {/* Step 6: Loading & Quote */}
        {currentStep === 6 && (
          <div>
            {isLoading && (
              <LoadingScreen>
                <LoadingSpinner />
                <div style={{ fontSize: '1.3rem', color: '#333', margin: '1rem 0' }}>
                  Building your quote...
                </div>
                <div style={{ color: '#666', fontStyle: 'italic' }}>
                  Analyzing requirements
                </div>
              </LoadingScreen>
            )}

            {showQuote && (
              <div>
                <QuoteSummary>
                  <h2 style={{ marginBottom: '1.5rem' }}>Your Quote</h2>

                  <SummaryRow>
                    <span style={{ fontWeight: '600', color: '#333' }}>Show:</span>
                    <span style={{ color: '#000' }}>{selectedShow?.name}</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span style={{ fontWeight: '600', color: '#333' }}>Venue:</span>
                    <span style={{ color: '#000' }}>{selectedShow?.venue}</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span style={{ fontWeight: '600', color: '#333' }}>Dates:</span>
                    <span style={{ color: '#000' }}>{selectedShow?.dates}</span>
                  </SummaryRow>

                  <div style={{ background: '#f9f9f9', borderRadius: '20px', padding: '1.5rem', margin: '1.5rem 0' }}>
                    <SummaryRow>
                      <span style={{ fontWeight: '600', color: '#333' }}>Freight into show:</span>
                      <span style={{ color: '#000' }}>${freightIn ? '450' : '0'}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span style={{ fontWeight: '600', color: '#333' }}>Freight out of show:</span>
                      <span style={{ color: '#000' }}>${freightOut ? '450' : '0'}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span style={{ fontWeight: '600', color: '#333' }}>Items (estimated):</span>
                      <span style={{ color: '#000' }}>${freightItems.length * 150}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span style={{ fontWeight: '600', color: '#333' }}>Tailgate surcharge:</span>
                      <span style={{ color: '#000' }}>${(pickupForklift === false ? 65 : 0) + (deliveryForklift === false ? 65 : 0)}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span style={{ fontWeight: '600', color: '#333' }}>Insurance (basic):</span>
                      <span style={{ color: '#000' }}>$85</span>
                    </SummaryRow>
                  </div>

                  <TotalPrice>${calculateTotal()}</TotalPrice>

                  <div style={{ textAlign: 'center', color: '#666', marginTop: '1rem' }}>
                    <p>Quote valid for 7 days • Includes basic cargo insurance • GST included</p>
                  </div>
                </QuoteSummary>

                <PrimaryButton onClick={() => alert('Quote accepted! Thank you for choosing Axis Events.')}>
                  Accept Quote & Proceed →
                </PrimaryButton>
              </div>
            )}
          </div>
        )}
      </Container>
    </QuoteWrapper>
  );
};

export default QuotePage;