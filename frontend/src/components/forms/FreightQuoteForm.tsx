import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import {
  calculateFreightPricing,
  estimateDistance,
  formatCurrency,
  type PricingBreakdown,
  type PricingFactors
} from '../../utils/pricingCalculator';

// Types for form data
interface FreightQuoteFormData {
  quoteId: string;
  eventAddress: string;
  eventSuburb: string;
  eventPostCode: string;
  eventBumpInDate: string;
  eventBumpOutDate: string;
  eventBumpInTime: string;
  eventBumpOutTime: string;
  eventForkliftCosts: ForkliftCostTier;
  pickupAddress: string;
  forkliftAtPickup: boolean;
  estimatedVolume: number;
  estimatedWeight: number;
  liftCount: number;
  isUrgent: boolean;
  isOversized: boolean;
}

interface FormErrors {
  pickupAddress?: string;
  forkliftAtPickup?: string;
}

interface ForkliftCostTier {
  single: number; // 1 lift
  small: number;  // 2-4 lifts
  bulk: number;   // 22+ lifts (semi trailer)
}

// Mock event data - would come from backend
const mockEventData = {
  eventAddress: "123 Exhibition Street",
  eventSuburb: "Melbourne",
  eventPostCode: "3000",
  eventBumpInDate: "2026-10-02",
  eventBumpOutDate: "2026-10-05",
  eventBumpInTime: "07:00-17:00",
  eventBumpOutTime: "07:00-14:00",
  eventForkliftCosts: {
    single: 90,
    small: 80,
    bulk: 55
  }
};

// Mock address options for autocomplete
const addressOptions = [
  { value: '123 Collins Street, Melbourne VIC 3000', label: '123 Collins Street, Melbourne VIC 3000' },
  { value: '456 Bourke Street, Melbourne VIC 3000', label: '456 Bourke Street, Melbourne VIC 3000' },
  { value: '789 Elizabeth Street, Melbourne VIC 3000', label: '789 Elizabeth Street, Melbourne VIC 3000' },
  { value: '321 Queen Street, Melbourne VIC 3000', label: '321 Queen Street, Melbourne VIC 3000' },
  { value: '654 Spencer Street, Melbourne VIC 3000', label: '654 Spencer Street, Melbourne VIC 3000' },
  { value: '987 Flinders Street, Melbourne VIC 3000', label: '987 Flinders Street, Melbourne VIC 3000' },
];

const FormContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 0 ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing['2xl']};
  }
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  h2 {
    color: ${({ theme }) => theme.colors.gray[900]};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  .quote-id {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    display: inline-block;
  }
`;

const FormSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  h3 {
    color: ${({ theme }) => theme.colors.gray[800]};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.gray[700]};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  background-color: ${({ theme }) => theme.colors.gray[50]};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.gray[500]};
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;

  input[type="radio"] {
    width: 18px;
    height: 18px;
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

const InfoCard = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  h4 {
    color: ${({ theme }) => theme.colors.gray[800]};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  .cost-breakdown {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};

    .cost-item {
      display: flex;
      justify-content: space-between;
      padding: ${({ theme }) => theme.spacing.sm};
      background-color: ${({ theme }) => theme.colors.white};
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      border: 1px solid ${({ theme }) => theme.colors.gray[100]};
    }
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Custom styles for react-select
const selectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    padding: '4px',
    border: `2px solid ${state.isFocused ? '#A8E533' : '#E5E7EB'}`,
    borderRadius: '8px',
    fontSize: '16px',
    boxShadow: state.isFocused ? '0 0 0 3px #A8E53320' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#A8E533' : '#D1D5DB'
    }
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#A8E533' : state.isFocused ? '#A8E53320' : 'white',
    color: state.isSelected ? 'white' : '#374151',
    '&:hover': {
      backgroundColor: state.isSelected ? '#A8E533' : '#A8E53320'
    }
  }),
};

const FreightQuoteForm: React.FC = () => {
  const [formData, setFormData] = useState<FreightQuoteFormData>({
    quoteId: `AX${Date.now().toString().slice(-6)}`,
    ...mockEventData,
    pickupAddress: '',
    forkliftAtPickup: true,
    estimatedVolume: 2.5, // Default to 2.5 cubic meters
    estimatedWeight: 500, // Default to 500kg
    liftCount: 2, // Default to 2 lifts
    isUrgent: false,
    isOversized: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricingBreakdown, setPricingBreakdown] = useState<PricingBreakdown | null>(null);

  const handleAddressChange = (selectedOption: any) => {
    const newAddress = selectedOption?.value || '';
    setFormData(prev => ({
      ...prev,
      pickupAddress: newAddress
    }));

    // Clear address error if valid address is selected
    if (newAddress && errors.pickupAddress) {
      setErrors(prev => ({ ...prev, pickupAddress: undefined }));
    }
  };

  const handleForkliftChange = (hasForklift: boolean) => {
    setFormData(prev => ({
      ...prev,
      forkliftAtPickup: hasForklift
    }));
  };

  const handleInputChange = (field: keyof FreightQuoteFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Calculate pricing whenever relevant form data changes
  useEffect(() => {
    if (formData.pickupAddress) {
      const distance = estimateDistance(
        formData.pickupAddress,
        `${formData.eventAddress}, ${formData.eventSuburb} ${formData.eventPostCode}`
      );

      const pricingFactors: PricingFactors = {
        distance,
        weight: formData.estimatedWeight,
        volume: formData.estimatedVolume,
        hasForkliftAtPickup: formData.forkliftAtPickup,
        liftCount: formData.liftCount,
        eventForkliftCosts: formData.eventForkliftCosts,
        isUrgent: formData.isUrgent,
        requiresTailLift: !formData.forkliftAtPickup,
        isOversized: formData.isOversized
      };

      const pricing = calculateFreightPricing(pricingFactors);
      setPricingBreakdown(pricing);
    }
  }, [
    formData.pickupAddress,
    formData.forkliftAtPickup,
    formData.estimatedVolume,
    formData.estimatedWeight,
    formData.liftCount,
    formData.isUrgent,
    formData.isOversized,
    formData.eventAddress,
    formData.eventSuburb,
    formData.eventPostCode,
    formData.eventForkliftCosts
  ]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.pickupAddress.trim()) {
      newErrors.pickupAddress = 'Pickup address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Quote form submitted:', formData);
      // Here you would send the data to your backend
      // await submitQuoteRequest(formData);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Quote request submitted! We\'ll get back to you within 2 hours.');
    } catch (error) {
      console.error('Failed to submit quote:', error);
      alert('Failed to submit quote. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormHeader>
        <h2>Freight Quote Request</h2>
        <div className="quote-id">Quote ID: {formData.quoteId}</div>
      </FormHeader>

      <form onSubmit={handleSubmit}>
        <FormSection>
          <h3>📍 Event Details</h3>
          <FormGrid>
            <FormField>
              <label>Event Address</label>
              <Input value={formData.eventAddress} disabled />
            </FormField>
            <FormField>
              <label>Event Suburb</label>
              <Input value={formData.eventSuburb} disabled />
            </FormField>
            <FormField>
              <label>Event Post Code</label>
              <Input value={formData.eventPostCode} disabled />
            </FormField>
          </FormGrid>

          <FormGrid>
            <FormField>
              <label>Bump In Date</label>
              <Input value={formData.eventBumpInDate} disabled />
            </FormField>
            <FormField>
              <label>Bump Out Date</label>
              <Input value={formData.eventBumpOutDate} disabled />
            </FormField>
          </FormGrid>

          <FormGrid>
            <FormField>
              <label>Bump In Time</label>
              <Input value={formData.eventBumpInTime} disabled />
            </FormField>
            <FormField>
              <label>Bump Out Time</label>
              <Input value={formData.eventBumpOutTime} disabled />
            </FormField>
          </FormGrid>
        </FormSection>

        <FormSection>
          <h3>🚛 Pickup Details</h3>
          <FormField>
            <label>Pickup Address *</label>
            <Select
              options={addressOptions}
              onChange={handleAddressChange}
              styles={{
                ...selectStyles,
                control: (provided: any, state: any) => ({
                  ...selectStyles.control(provided, state),
                  border: `2px solid ${errors.pickupAddress ? '#EF4444' : state.isFocused ? '#A8E533' : '#E5E7EB'}`,
                }),
              }}
              isSearchable={true}
              placeholder="Type to search for an address..."
              isClearable={true}
              filterOption={(option, inputValue) =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
              }
            />
            {errors.pickupAddress && (
              <ErrorMessage>{errors.pickupAddress}</ErrorMessage>
            )}
          </FormField>

          <FormField style={{ marginTop: '1.5rem' }}>
            <label>Forklift Available at Pickup Address? *</label>
            <RadioGroup>
              <RadioOption>
                <input
                  type="radio"
                  name="forklift"
                  checked={formData.forkliftAtPickup === true}
                  onChange={() => handleForkliftChange(true)}
                />
                Yes - We have a forklift and will load the truck
              </RadioOption>
              <RadioOption>
                <input
                  type="radio"
                  name="forklift"
                  checked={formData.forkliftAtPickup === false}
                  onChange={() => handleForkliftChange(false)}
                />
                No - Truck needs tailift and driver loading
              </RadioOption>
            </RadioGroup>
          </FormField>
        </FormSection>

        <FormSection>
          <h3>📦 Freight Details</h3>
          <FormGrid>
            <FormField>
              <label>Estimated Volume (cubic meters)</label>
              <Input
                type="number"
                step="0.1"
                min="0.1"
                value={formData.estimatedVolume}
                onChange={(e) => handleInputChange('estimatedVolume', parseFloat(e.target.value) || 0)}
              />
            </FormField>
            <FormField>
              <label>Estimated Weight (kg)</label>
              <Input
                type="number"
                step="10"
                min="1"
                value={formData.estimatedWeight}
                onChange={(e) => handleInputChange('estimatedWeight', parseInt(e.target.value) || 0)}
              />
            </FormField>
            <FormField>
              <label>Number of Lifts at Event</label>
              <Input
                type="number"
                min="0"
                value={formData.liftCount}
                onChange={(e) => handleInputChange('liftCount', parseInt(e.target.value) || 0)}
              />
            </FormField>
          </FormGrid>

          <FormField style={{ marginTop: '1.5rem' }}>
            <label style={{ marginBottom: '1rem' }}>Additional Options</label>
            <RadioGroup style={{ flexDirection: 'column', gap: '0.5rem' }}>
              <RadioOption>
                <input
                  type="checkbox"
                  checked={formData.isUrgent}
                  onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
                />
                Urgent delivery (same day/next day) - 50% surcharge
              </RadioOption>
              <RadioOption>
                <input
                  type="checkbox"
                  checked={formData.isOversized}
                  onChange={(e) => handleInputChange('isOversized', e.target.checked)}
                />
                Oversized items (requires special handling)
              </RadioOption>
            </RadioGroup>
          </FormField>
        </FormSection>

        {pricingBreakdown && (
          <InfoCard style={{ backgroundColor: '#F0F9FF', borderColor: '#3B82F6' }}>
            <h4>💰 Estimated Pricing Breakdown</h4>
            <div className="cost-breakdown">
              <div className="cost-item">
                <span>Base Freight ({formData.estimatedVolume}m³)</span>
                <strong>{formatCurrency(pricingBreakdown.baseFreight)}</strong>
              </div>
              <div className="cost-item">
                <span>Distance Multiplier (×{pricingBreakdown.distanceMultiplier})</span>
                <strong>Applied</strong>
              </div>
              {pricingBreakdown.forkliftCostAtEvent > 0 && (
                <div className="cost-item">
                  <span>Event Forklift ({formData.liftCount} lifts)</span>
                  <strong>{formatCurrency(pricingBreakdown.forkliftCostAtEvent)}</strong>
                </div>
              )}
              {pricingBreakdown.tailLiftSurcharge > 0 && (
                <div className="cost-item">
                  <span>Tail Lift Service</span>
                  <strong>{formatCurrency(pricingBreakdown.tailLiftSurcharge)}</strong>
                </div>
              )}
              {pricingBreakdown.urgentDeliverySurcharge > 0 && (
                <div className="cost-item">
                  <span>Urgent Delivery Surcharge</span>
                  <strong>{formatCurrency(pricingBreakdown.urgentDeliverySurcharge)}</strong>
                </div>
              )}
              {pricingBreakdown.oversizedItemSurcharge > 0 && (
                <div className="cost-item">
                  <span>Oversized Item Surcharge</span>
                  <strong>{formatCurrency(pricingBreakdown.oversizedItemSurcharge)}</strong>
                </div>
              )}
              <div className="cost-item" style={{ borderTop: '2px solid #E5E7EB', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                <span>Subtotal</span>
                <strong>{formatCurrency(pricingBreakdown.subtotal)}</strong>
              </div>
              <div className="cost-item">
                <span>GST (10%)</span>
                <strong>{formatCurrency(pricingBreakdown.gst)}</strong>
              </div>
              <div className="cost-item" style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}>
                <span>TOTAL</span>
                <strong>{formatCurrency(pricingBreakdown.total)}</strong>
              </div>
            </div>
            <p style={{
              marginTop: '1rem',
              fontSize: '0.875rem',
              color: '#6B7280',
              textAlign: 'center'
            }}>
              * This is an estimate. Final pricing may vary based on actual requirements and site conditions.
            </p>
          </InfoCard>
        )}

        <InfoCard>
          <h4>💰 Event Forklift Cost Structure</h4>
          <div className="cost-breakdown">
            <div className="cost-item">
              <span>Single lift</span>
              <strong>${formData.eventForkliftCosts.single}</strong>
            </div>
            <div className="cost-item">
              <span>2-4 lifts</span>
              <strong>${formData.eventForkliftCosts.small} per lift</strong>
            </div>
            <div className="cost-item">
              <span>22+ lifts (semi trailer)</span>
              <strong>${formData.eventForkliftCosts.bulk} per lift</strong>
            </div>
          </div>
        </InfoCard>

        {!formData.forkliftAtPickup && (
          <InfoCard style={{ backgroundColor: '#FEF3C7', borderColor: '#F59E0B' }}>
            <h4>⚠️ No Forklift at Pickup</h4>
            <p>Since you don't have a forklift at pickup, we'll need to send a truck with a tailift.
               This affects pricing and available truck options. Our driver will handle the loading.</p>
          </InfoCard>
        )}

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default FreightQuoteForm;