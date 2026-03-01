import React, { useState } from 'react';
import styled from 'styled-components';

interface FreightItem {
  id: string;
  type: string;
  icon: string;
  qty: number;
  weight: string;
  dimensions?: string;
  desc?: string;
  totalWeight?: string;
}

interface FreightBuilderProps {
  onItemsChange: (items: FreightItem[]) => void;
  onContinue: (items: FreightItem[]) => void;
}

const BuilderContainer = styled.div`
  max-width: 800px;
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

const Subhead = styled.div`
  color: #333333;
  margin-bottom: 2rem;
  font-size: 1.2rem;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ImageCard = styled.div`
  background: #ffffff;
  border: 3px solid #dddddd;
  border-radius: 28px;
  padding: 2rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  color: #000000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  font-size: 1.2rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: #f9f9f9;
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 168, 107, 0.15);
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-bottom: 1rem;
  }

  .item-emoji {
    font-size: 4rem;
    margin-bottom: 1rem;
    display: block;
  }
`;

const OptionPanel = styled.div`
  background: #f9f9f9;
  border-radius: 32px;
  padding: 2rem;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  color: #000000;
  animation: slideUp 0.3s ease;
  font-size: 1.1rem;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const SectionTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #000000;
`;

const OptionRow = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
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

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #000000;
    font-size: 1.1rem;
  }

  input, textarea {
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

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.75rem 0;
  margin-bottom: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: underline;
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

const SummaryArea = styled.div`
  background: #f9f9f9;
  border-radius: 28px;
  padding: 2rem;
  margin-top: 2rem;
  color: #000000;
  border: 2px solid #e5e7eb;
`;

const SummaryItem = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  border: 2px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const SummaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-weight: 700;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const ItemBadge = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 40px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const SummaryDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
`;

const SummaryDesc = styled.div`
  color: #555;
  font-size: 1rem;
  padding-top: 0.5rem;
  border-top: 1px dashed #ccc;
`;

const itemTypes = [
  { type: 'pallet', label: 'Pallet', emoji: '🟦' },
  { type: 'crate', label: 'Crate', emoji: '📦' },
  { type: 'machine', label: 'Machine', emoji: '⚙️' },
  { type: 'boxes', label: 'Boxes', emoji: '📦' },
  { type: 'loose', label: 'Loose', emoji: '🧩' },
  { type: 'custom', label: 'Custom', emoji: '🎯' }
];

const FreightBuilder: React.FC<FreightBuilderProps> = ({ onItemsChange, onContinue }) => {
  const [items, setItems] = useState<FreightItem[]>([]);
  const [showGrid, setShowGrid] = useState(true);
  const [currentType, setCurrentType] = useState<string | null>(null);

  const addItem = (type: string, icon: string, qty: number, weight: string, dimensions?: string, desc?: string, totalWeight?: string) => {
    const newItem: FreightItem = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      icon,
      qty,
      weight,
      dimensions,
      desc,
      totalWeight: totalWeight || weight
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    onItemsChange(updatedItems);
    setShowGrid(true);
    setCurrentType(null);
  };

  const handleItemTypeClick = (type: string) => {
    setCurrentType(type);
    setShowGrid(false);
  };

  const handleBackClick = () => {
    setShowGrid(true);
    setCurrentType(null);
  };

  const handleContinue = () => {
    onContinue(items);
  };

  const renderItemForm = () => {
    if (!currentType) return null;

    const typeConfig = itemTypes.find(t => t.type === currentType);
    if (!typeConfig) return null;

    return (
      <OptionPanel>
        <BackButton onClick={handleBackClick}>
          ← Back to items
        </BackButton>

        <SectionTitle>{typeConfig.emoji} {typeConfig.label}</SectionTitle>

        {currentType === 'pallet' && (
          <PalletForm onAdd={addItem} />
        )}

        {currentType === 'crate' && (
          <CrateForm onAdd={addItem} />
        )}

        {currentType === 'machine' && (
          <MachineForm onAdd={addItem} />
        )}

        {currentType === 'boxes' && (
          <BoxesForm onAdd={addItem} />
        )}

        {currentType === 'loose' && (
          <LooseForm onAdd={addItem} />
        )}

        {currentType === 'custom' && (
          <CustomForm onAdd={addItem} />
        )}
      </OptionPanel>
    );
  };

  return (
    <BuilderContainer>
      <Title>Freight Builder</Title>
      <Subhead>What are you sending? Click an image to start</Subhead>

      {showGrid && (
        <ImageGrid>
          {itemTypes.map((item) => (
            <ImageCard key={item.type} onClick={() => handleItemTypeClick(item.type)}>
              <span className="item-emoji">{item.emoji}</span>
              <div>{item.label}</div>
            </ImageCard>
          ))}
        </ImageGrid>
      )}

      {!showGrid && renderItemForm()}

      {items.length > 0 && (
        <SummaryArea>
          <SectionTitle>📋 Items added</SectionTitle>
          {items.map((item) => (
            <SummaryItem key={item.id}>
              <SummaryHeader>
                <span>{item.icon} {item.type}</span>
                <ItemBadge>Qty: {item.qty}</ItemBadge>
              </SummaryHeader>
              <SummaryDetails>
                <div><strong>Weight:</strong> {item.weight}</div>
                <div><strong>Dimensions:</strong> {item.dimensions || '—'}</div>
                <div><strong>Total:</strong> {item.totalWeight || item.weight}</div>
              </SummaryDetails>
              {item.desc && <SummaryDesc>📝 {item.desc}</SummaryDesc>}
            </SummaryItem>
          ))}
          <PrimaryButton onClick={handleContinue}>
            Continue to quote →
          </PrimaryButton>
        </SummaryArea>
      )}
    </BuilderContainer>
  );
};

// Individual form components for each item type
const PalletForm = ({ onAdd }: { onAdd: Function }) => {
  const [palletSize, setPalletSize] = useState<'single' | 'double' | null>(null);
  const [withinSize, setWithinSize] = useState<boolean | null>(null);
  const [underWeight, setUnderWeight] = useState<boolean | null>(null);
  const [qty, setQty] = useState(1);
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });

  const handleAdd = () => {
    if (palletSize && withinSize !== null) {
      const maxDimensions = palletSize === 'single' ? '1200x1200x1800mm' : '2400x1200x1800mm';

      if (withinSize && underWeight === true) {
        onAdd('Pallet', '🟦', qty, 'under 1000kg ea', maxDimensions, '', (qty * 1000) + 'kg');
      } else if (withinSize && underWeight === false && weight) {
        onAdd('Pallet', '🟦', qty, weight + 'kg ea', maxDimensions, '', (qty * parseInt(weight || '0')) + 'kg');
      } else if (!withinSize && dimensions.length && dimensions.width && dimensions.height && weight) {
        const customDimensions = `${dimensions.length}x${dimensions.width}x${dimensions.height}mm`;
        onAdd('Pallet', '🟦', qty, weight + 'kg ea', customDimensions, '', (qty * parseInt(weight || '0')) + 'kg');
      }
    }
  };

  return (
    <div>
      <OptionRow>
        <OptionButton
          active={palletSize === 'single'}
          onClick={() => setPalletSize('single')}
        >
          Single pallet
        </OptionButton>
        <OptionButton
          active={palletSize === 'double'}
          onClick={() => setPalletSize('double')}
        >
          Double pallet
        </OptionButton>
      </OptionRow>

      {palletSize && (
        <div>
          <FormGroup>
            <label>Within {palletSize === 'single' ? '1200x1200x1800mm' : '2400x1200x1800mm'}?</label>
            <OptionRow>
              <OptionButton active={withinSize === true} onClick={() => setWithinSize(true)}>
                Yes
              </OptionButton>
              <OptionButton active={withinSize === false} onClick={() => setWithinSize(false)}>
                No
              </OptionButton>
            </OptionRow>
          </FormGroup>

          {withinSize === true && (
            <FormGroup>
              <label>Under 1000kg?</label>
              <OptionRow>
                <OptionButton active={underWeight === true} onClick={() => setUnderWeight(true)}>
                  Yes
                </OptionButton>
                <OptionButton active={underWeight === false} onClick={() => setUnderWeight(false)}>
                  No
                </OptionButton>
              </OptionRow>
            </FormGroup>
          )}

          {withinSize === false && (
            <>
              <FormGroup>
                <label>Length (mm)</label>
                <input
                  type="number"
                  value={dimensions.length}
                  onChange={(e) => setDimensions({...dimensions, length: e.target.value})}
                />
              </FormGroup>
              <FormGroup>
                <label>Width (mm)</label>
                <input
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
                />
              </FormGroup>
              <FormGroup>
                <label>Height (mm)</label>
                <input
                  type="number"
                  value={dimensions.height}
                  onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
                />
              </FormGroup>
            </>
          )}

          {((withinSize === true && underWeight === false) || withinSize === false) && (
            <FormGroup>
              <label>Weight (kg) per pallet</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </FormGroup>
          )}

          <FormGroup>
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value) || 1)}
            />
          </FormGroup>

          <PrimaryButton onClick={handleAdd}>
            Add pallet
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

const CrateForm = ({ onAdd }: { onAdd: Function }) => {
  // Similar to PalletForm but for crates
  const [crateSize, setCrateSize] = useState<'single' | 'double' | null>(null);
  const [withinSize, setWithinSize] = useState<boolean | null>(null);
  const [underWeight, setUnderWeight] = useState<boolean | null>(null);
  const [qty, setQty] = useState(1);
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });

  const handleAdd = () => {
    if (crateSize && withinSize !== null) {
      const maxDimensions = crateSize === 'single' ? '1200x1200x1800mm' : '2400x1200x1800mm';

      if (withinSize && underWeight === true) {
        onAdd('Crate', '📦', qty, 'under 1000kg ea', maxDimensions, '', (qty * 1000) + 'kg');
      } else if (withinSize && underWeight === false && weight) {
        onAdd('Crate', '📦', qty, weight + 'kg ea', maxDimensions, '', (qty * parseInt(weight || '0')) + 'kg');
      } else if (!withinSize && dimensions.length && dimensions.width && dimensions.height && weight) {
        const customDimensions = `${dimensions.length}x${dimensions.width}x${dimensions.height}mm`;
        onAdd('Crate', '📦', qty, weight + 'kg ea', customDimensions, '', (qty * parseInt(weight || '0')) + 'kg');
      }
    }
  };

  return (
    <div>
      <OptionRow>
        <OptionButton
          active={crateSize === 'single'}
          onClick={() => setCrateSize('single')}
        >
          Single crate
        </OptionButton>
        <OptionButton
          active={crateSize === 'double'}
          onClick={() => setCrateSize('double')}
        >
          Double crate
        </OptionButton>
      </OptionRow>

      {crateSize && (
        <div>
          <FormGroup>
            <label>Within {crateSize === 'single' ? '1200x1200x1800mm' : '2400x1200x1800mm'}?</label>
            <OptionRow>
              <OptionButton active={withinSize === true} onClick={() => setWithinSize(true)}>
                Yes
              </OptionButton>
              <OptionButton active={withinSize === false} onClick={() => setWithinSize(false)}>
                No
              </OptionButton>
            </OptionRow>
          </FormGroup>

          {withinSize === true && (
            <FormGroup>
              <label>Under 1000kg?</label>
              <OptionRow>
                <OptionButton active={underWeight === true} onClick={() => setUnderWeight(true)}>
                  Yes
                </OptionButton>
                <OptionButton active={underWeight === false} onClick={() => setUnderWeight(false)}>
                  No
                </OptionButton>
              </OptionRow>
            </FormGroup>
          )}

          {withinSize === false && (
            <>
              <FormGroup>
                <label>Length (mm)</label>
                <input
                  type="number"
                  value={dimensions.length}
                  onChange={(e) => setDimensions({...dimensions, length: e.target.value})}
                />
              </FormGroup>
              <FormGroup>
                <label>Width (mm)</label>
                <input
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
                />
              </FormGroup>
              <FormGroup>
                <label>Height (mm)</label>
                <input
                  type="number"
                  value={dimensions.height}
                  onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
                />
              </FormGroup>
            </>
          )}

          {((withinSize === true && underWeight === false) || withinSize === false) && (
            <FormGroup>
              <label>Weight (kg) per crate</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </FormGroup>
          )}

          <FormGroup>
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value) || 1)}
            />
          </FormGroup>

          <PrimaryButton onClick={handleAdd}>
            Add crate
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

const MachineForm = ({ onAdd }: { onAdd: Function }) => {
  const [qty, setQty] = useState(1);
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (dimensions.length && dimensions.width && dimensions.height && weight) {
      const dims = `${dimensions.length}x${dimensions.width}x${dimensions.height}mm`;
      onAdd('Machine', '⚙️', qty, weight + 'kg ea', dims, description, (qty * parseInt(weight || '0')) + 'kg');
    }
  };

  return (
    <div>
      <FormGroup>
        <label>Quantity</label>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value) || 1)}
        />
      </FormGroup>

      <FormGroup>
        <label>Length (mm)</label>
        <input
          type="number"
          value={dimensions.length}
          onChange={(e) => setDimensions({...dimensions, length: e.target.value})}
        />
      </FormGroup>

      <FormGroup>
        <label>Width (mm)</label>
        <input
          type="number"
          value={dimensions.width}
          onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
        />
      </FormGroup>

      <FormGroup>
        <label>Height (mm)</label>
        <input
          type="number"
          value={dimensions.height}
          onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
        />
      </FormGroup>

      <FormGroup>
        <label>Weight (kg) per unit</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <label>Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., printing press, industrial oven..."
        />
      </FormGroup>

      <PrimaryButton onClick={handleAdd}>
        Add machine
      </PrimaryButton>
    </div>
  );
};

const BoxesForm = ({ onAdd }: { onAdd: Function }) => {
  const [qty, setQty] = useState(1);
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (weight) {
      onAdd('Boxes', '📦', qty, weight + 'kg total', '', description, weight + 'kg');
    }
  };

  return (
    <div>
      <FormGroup>
        <label>Number of boxes</label>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value) || 1)}
        />
      </FormGroup>

      <FormGroup>
        <label>Total approx weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <label>Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., cardboard boxes, mixed sizes..."
        />
      </FormGroup>

      <PrimaryButton onClick={handleAdd}>
        Add boxes
      </PrimaryButton>
    </div>
  );
};

const LooseForm = ({ onAdd }: { onAdd: Function }) => {
  const [qty, setQty] = useState(1);
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (weight && description) {
      onAdd('Loose items', '🧩', qty, weight + 'kg total', '', description, weight + 'kg');
    }
  };

  return (
    <div>
      <FormGroup>
        <label>Number of items</label>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value) || 1)}
        />
      </FormGroup>

      <FormGroup>
        <label>Total approx weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., furniture, artwork, poles..."
        />
      </FormGroup>

      <PrimaryButton onClick={handleAdd}>
        Add items
      </PrimaryButton>
    </div>
  );
};

const CustomForm = ({ onAdd }: { onAdd: Function }) => {
  const [qty, setQty] = useState(1);
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (dimensions.length && dimensions.width && dimensions.height && weight && description) {
      const dims = `${dimensions.length}x${dimensions.width}x${dimensions.height}mm`;
      onAdd('Custom', '🎯', qty, weight + 'kg ea', dims, description, (qty * parseInt(weight || '0')) + 'kg');
    }
  };

  return (
    <div>
      <FormGroup>
        <label>Quantity</label>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value) || 1)}
        />
      </FormGroup>

      <FormGroup>
        <label>Length (mm)</label>
        <input
          type="number"
          value={dimensions.length}
          onChange={(e) => setDimensions({...dimensions, length: e.target.value})}
        />
      </FormGroup>

      <FormGroup>
        <label>Width (mm)</label>
        <input
          type="number"
          value={dimensions.width}
          onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
        />
      </FormGroup>

      <FormGroup>
        <label>Height (mm)</label>
        <input
          type="number"
          value={dimensions.height}
          onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
        />
      </FormGroup>

      <FormGroup>
        <label>Weight (kg) per unit</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the item..."
        />
      </FormGroup>

      <PrimaryButton onClick={handleAdd}>
        Add custom item
      </PrimaryButton>
    </div>
  );
};

export default FreightBuilder;
export type { FreightItem };