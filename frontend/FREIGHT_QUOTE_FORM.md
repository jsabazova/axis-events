# Freight Quote Form Documentation

## Overview

The Freight Quote Form is a comprehensive React component that allows users to request freight quotes for event logistics. It includes real-time pricing calculations, address autocomplete functionality, and form validation.

## Component Structure

### Main Component
- **File**: `/src/components/forms/FreightQuoteForm.tsx`
- **Purpose**: Main form component with complete quote request functionality

### Utility Functions
- **File**: `/src/utils/pricingCalculator.ts`
- **Purpose**: Contains all pricing calculation logic and helper functions

## Form Fields and Logic

### 1. Auto-Generated Fields
- **Quote ID**: Automatically generated using timestamp (`AX${timestamp}`)
- **Event Details**: Pre-filled from database/mock data
  - Event Address, Suburb, Post Code
  - Bump In/Out Dates and Times
  - Event Forklift Cost Structure

### 2. User Input Fields

#### Pickup Address
- **Type**: Searchable dropdown with autocomplete
- **Library**: `react-select`
- **Validation**: Required field
- **Future Enhancement**: Will integrate with Google Maps API for real address validation

#### Forklift Availability at Pickup
- **Type**: Radio buttons (Yes/No)
- **Logic**:
  - Yes: Standard truck options, customer handles loading
  - No: Requires truck with tailift, driver handles loading
- **Impact**: Affects pricing and truck availability

#### Freight Details
- **Estimated Volume**: Numeric input (cubic meters)
- **Estimated Weight**: Numeric input (kilograms)
- **Number of Lifts at Event**: Numeric input
- **Additional Options**: Checkboxes for urgent delivery and oversized items

## Pricing Calculation Logic

### Base Pricing Structure
```typescript
BASE_FREIGHT_RATE = $85 per cubic meter
MINIMUM_FREIGHT_CHARGE = $180
```

### Distance-Based Multipliers
- **Local (0-10km)**: 1.0x multiplier
- **Metro (10-50km)**: 1.3x multiplier
- **Regional (50-150km)**: 1.8x multiplier
- **Interstate (150-500km)**: 2.5x multiplier
- **Long Distance (500km+)**: 3.2x multiplier

### Event Forklift Costs
- **1 lift**: $90
- **2-4 lifts**: $80 per lift
- **22+ lifts (semi trailer)**: $55 per lift
- **5-21 lifts**: $80 per lift (small rate)

### Surcharges
- **Tail Lift Service**: $120 (when no forklift at pickup)
- **Urgent Delivery**: 50% surcharge on total
- **Oversized Items**: $250 additional charge
- **GST**: 10% of subtotal

### Calculation Formula
```
Base Freight = max(volume × $85, $180)
Distance Adjusted = Base Freight × Distance Multiplier
Subtotal = Distance Adjusted + Event Forklift + Tail Lift + Oversized
If Urgent: Subtotal = Subtotal × 1.5
GST = Subtotal × 0.1
Total = Subtotal + GST
```

## Form Validation

### Required Fields
- **Pickup Address**: Must be selected from dropdown

### Real-time Validation
- Errors displayed immediately when field is invalid
- Error styling applied to form elements
- Submit button disabled during submission

### Error Handling
- Network errors handled gracefully
- User feedback provided for all error states
- Form remains in editable state on submission failure

## State Management

### Form Data State
```typescript
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
```

### Derived State
- **Pricing Breakdown**: Calculated automatically when form data changes
- **Form Errors**: Updated during validation
- **Submission Status**: Tracks form submission state

## Real-time Features

### Automatic Pricing Updates
- Pricing recalculates when any relevant field changes
- Uses `useEffect` hook to monitor form changes
- Debounced to prevent excessive calculations

### Address Autocomplete
- Searchable dropdown with local mock data
- Filters options based on user input
- Clears validation errors when valid address selected

## User Experience Features

### Visual Feedback
- Loading states during form submission
- Color-coded pricing breakdown
- Error highlighting on invalid fields
- Success animations on form submission

### Responsive Design
- Mobile-friendly layout
- Adaptive grid system for form fields
- Touch-friendly controls

## Future Enhancements

### Phase 1 (Current)
- ✅ Basic form with validation
- ✅ Local address autocomplete
- ✅ Real-time pricing calculations
- ✅ Responsive design

### Phase 2 (Planned)
- [ ] Google Maps API integration
- [ ] Backend API integration
- [ ] Email notification system
- [ ] Quote history and tracking
- [ ] PDF quote generation

### Phase 3 (Future)
- [ ] Advanced route optimization
- [ ] Integration with logistics management system
- [ ] Real-time vehicle tracking
- [ ] Customer portal for quote management

## Technical Implementation Notes

### Dependencies
- **react-select**: Address autocomplete functionality
- **styled-components**: Component styling
- **React hooks**: State management and side effects

### Performance Considerations
- Pricing calculations are memoized where possible
- Large address datasets would require virtualization
- API calls will need proper caching and error retry logic

### Accessibility
- Form labels properly associated with inputs
- Keyboard navigation supported
- Screen reader compatible
- High contrast error states

### Security Considerations
- Input validation on all user inputs
- Sanitization of address data when API integrated
- Rate limiting for quote submissions (future)
- HTTPS enforcement for production

## Testing Strategy

### Unit Tests (Recommended)
- Pricing calculation functions
- Form validation logic
- Component rendering
- User interaction handling

### Integration Tests (Recommended)
- End-to-end form submission flow
- API integration when implemented
- Cross-browser compatibility

### Manual Testing Checklist
- [ ] Form loads with correct default values
- [ ] Address autocomplete works correctly
- [ ] Pricing updates in real-time
- [ ] Validation errors display properly
- [ ] Form submits successfully
- [ ] Mobile responsiveness verified

## Deployment Notes

### Environment Variables (Future)
```
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key
REACT_APP_API_BASE_URL=https://api.axis-events.com.au
```

### Build Considerations
- Component is tree-shakable
- Styled-components are server-side render compatible
- No external CSS dependencies required

## Support and Maintenance

### Common Issues
1. **Pricing not updating**: Check useEffect dependencies
2. **Address autocomplete not working**: Verify react-select configuration
3. **Validation errors**: Ensure all required fields are properly validated

### Performance Monitoring
- Monitor pricing calculation performance
- Track form completion rates
- Monitor API response times (when implemented)

---

**Last Updated**: March 1, 2026
**Version**: 1.0.0
**Maintainer**: Axis Events Development Team