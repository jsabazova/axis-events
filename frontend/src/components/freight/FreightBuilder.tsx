import React, { useState } from 'react';
import styles from './FreightBuilder.module.scss';

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
      <div className={styles.optionPanel}>
        <button className={styles.backButton} onClick={handleBackClick}>
          ← Back to items
        </button>

        <div className={styles.sectionTitle}>{typeConfig.emoji} {typeConfig.label}</div>

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
      </div>
    );
  };

  return (
    <div className={styles.builderContainer}>
      <h1 className={styles.title}>Freight Builder</h1>
      <div className={styles.subhead}>What are you sending? Click an image to start</div>

      {showGrid && (
        <div className={styles.imageGrid}>
          {itemTypes.map((item) => (
            <div key={item.type} className={styles.imageCard} onClick={() => handleItemTypeClick(item.type)}>
              <span className={styles.itemEmoji}>{item.emoji}</span>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      )}

      {!showGrid && renderItemForm()}

      {items.length > 0 && (
        <div className={styles.summaryArea}>
          <div className={styles.sectionTitle}>📋 Items added</div>
          {items.map((item) => (
            <div key={item.id} className={styles.summaryItem}>
              <div className={styles.summaryHeader}>
                <span>{item.icon} {item.type}</span>
                <span className={styles.itemBadge}>Qty: {item.qty}</span>
              </div>
              <div className={styles.summaryDetails}>
                <div><strong>Weight:</strong> {item.weight}</div>
                <div><strong>Dimensions:</strong> {item.dimensions || '—'}</div>
                <div><strong>Total:</strong> {item.totalWeight || item.weight}</div>
              </div>
              {item.desc && <div className={styles.summaryDesc}>📝 {item.desc}</div>}
            </div>
          ))}
          <button className={styles.primaryButton} onClick={handleContinue}>
            Continue to quote →
          </button>
        </div>
      )}
    </div>
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
      <div className={styles.optionRow}>
        <button
          className={`${styles.optionButton} ${palletSize === 'single' ? styles.optionButtonActive : ''}`}
          onClick={() => setPalletSize('single')}
        >
          Single pallet
        </button>
        <button
          className={`${styles.optionButton} ${palletSize === 'double' ? styles.optionButtonActive : ''}`}
          onClick={() => setPalletSize('double')}
        >
          Double pallet
        </button>
      </div>

      {palletSize && (
        <div>
          <div className={styles.formGroup}>
            <label>Within {palletSize === 'single' ? '1200x1200x1800mm' : '2400x1200x1800mm'}?</label>
            <div className={styles.optionRow}>
              <button
                className={`${styles.optionButton} ${withinSize === true ? styles.optionButtonActive : ''}`}
                onClick={() => setWithinSize(true)}
              >
                Yes
              </button>
              <button
                className={`${styles.optionButton} ${withinSize === false ? styles.optionButtonActive : ''}`}
                onClick={() => setWithinSize(false)}
              >
                No
              </button>
            </div>
          </div>

          {withinSize === true && (
            <div className={styles.formGroup}>
              <label>Under 1000kg?</label>
              <div className={styles.optionRow}>
                <button
                  className={`${styles.optionButton} ${underWeight === true ? styles.optionButtonActive : ''}`}
                  onClick={() => setUnderWeight(true)}
                >
                  Yes
                </button>
                <button
                  className={`${styles.optionButton} ${underWeight === false ? styles.optionButtonActive : ''}`}
                  onClick={() => setUnderWeight(false)}
                >
                  No
                </button>
              </div>
            </div>
          )}

          {withinSize === false && (
            <>
              <div className={styles.formGroup}>
                <label>Length (mm)</label>
                <input
                  type="number"
                  value={dimensions.length}
                  onChange={(e) => setDimensions({...dimensions, length: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Width (mm)</label>
                <input
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Height (mm)</label>
                <input
                  type="number"
                  value={dimensions.height}
                  onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
                />
              </div>
            </>
          )}

          {((withinSize === true && underWeight === false) || withinSize === false) && (
            <div className={styles.formGroup}>
              <label>Weight (kg) per pallet</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value) || 1)}
            />
          </div>

          <button className={styles.primaryButton} onClick={handleAdd}>
            Add pallet
          </button>
        </div>
      )}
    </div>
  );
};

const CrateForm = ({ onAdd }: { onAdd: Function }) => {
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
      <div className={styles.optionRow}>
        <button
          className={`${styles.optionButton} ${crateSize === 'single' ? styles.optionButtonActive : ''}`}
          onClick={() => setCrateSize('single')}
        >
          Single crate
        </button>
        <button
          className={`${styles.optionButton} ${crateSize === 'double' ? styles.optionButtonActive : ''}`}
          onClick={() => setCrateSize('double')}
        >
          Double crate
        </button>
      </div>

      {crateSize && (
        <div>
          <div className={styles.formGroup}>
            <label>Within {crateSize === 'single' ? '1200x1200x1800mm' : '2400x1200x1800mm'}?</label>
            <div className={styles.optionRow}>
              <button
                className={`${styles.optionButton} ${withinSize === true ? styles.optionButtonActive : ''}`}
                onClick={() => setWithinSize(true)}
              >
                Yes
              </button>
              <button
                className={`${styles.optionButton} ${withinSize === false ? styles.optionButtonActive : ''}`}
                onClick={() => setWithinSize(false)}
              >
                No
              </button>
            </div>
          </div>

          {withinSize === true && (
            <div className={styles.formGroup}>
              <label>Under 1000kg?</label>
              <div className={styles.optionRow}>
                <button
                  className={`${styles.optionButton} ${underWeight === true ? styles.optionButtonActive : ''}`}
                  onClick={() => setUnderWeight(true)}
                >
                  Yes
                </button>
                <button
                  className={`${styles.optionButton} ${underWeight === false ? styles.optionButtonActive : ''}`}
                  onClick={() => setUnderWeight(false)}
                >
                  No
                </button>
              </div>
            </div>
          )}

          {withinSize === false && (
            <>
              <div className={styles.formGroup}>
                <label>Length (mm)</label>
                <input
                  type="number"
                  value={dimensions.length}
                  onChange={(e) => setDimensions({...dimensions, length: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Width (mm)</label>
                <input
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Height (mm)</label>
                <input
                  type="number"
                  value={dimensions.height}
                  onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
                />
              </div>
            </>
          )}

          {((withinSize === true && underWeight === false) || withinSize === false) && (
            <div className={styles.formGroup}>
              <label>Weight (kg) per crate</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value) || 1)}
            />
          </div>

          <button className={styles.primaryButton} onClick={handleAdd}>
            Add crate
          </button>
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
      <div className={styles.formGroup}>
        <label>Quantity</label>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value) || 1)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Length (mm)</label>
        <input
          type="number"
          value={dimensions.length}
          onChange={(e) => setDimensions({...dimensions, length: e.target.value})}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Width (mm)</label>
        <input
          type="number"
          value={dimensions.width}
          onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Height (mm)</label>
        <input
          type="number"
          value={dimensions.height}
          onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Weight (kg) per unit</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., printing press, industrial oven..."
        />
      </div>

      <button className={styles.primaryButton} onClick={handleAdd}>
        Add machine
      </button>
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
      <div className={styles.formGroup}>
        <label>Number of boxes</label>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value) || 1)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Total approx weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., cardboard boxes, mixed sizes..."
        />
      </div>

      <button className={styles.primaryButton} onClick={handleAdd}>
        Add boxes
      </button>
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
      <div className={styles.formGroup}>
        <label>Number of items</label>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value) || 1)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Total approx weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., furniture, artwork, poles..."
        />
      </div>

      <button className={styles.primaryButton} onClick={handleAdd}>
        Add items
      </button>
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
      <div className={styles.formGroup}>
        <label>Quantity</label>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value) || 1)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Length (mm)</label>
        <input
          type="number"
          value={dimensions.length}
          onChange={(e) => setDimensions({...dimensions, length: e.target.value})}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Width (mm)</label>
        <input
          type="number"
          value={dimensions.width}
          onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Height (mm)</label>
        <input
          type="number"
          value={dimensions.height}
          onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Weight (kg) per unit</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the item..."
        />
      </div>

      <button className={styles.primaryButton} onClick={handleAdd}>
        Add custom item
      </button>
    </div>
  );
};

export default FreightBuilder;
export type { FreightItem };
