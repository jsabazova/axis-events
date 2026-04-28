# Axis Events — Backend Calculation & Supabase Runbook

**For: New Developers | Branch: `main`**

---

## 1. Project Overview

This is a React + TypeScript + Supabase app. There is **no separate backend server** — all database calls go directly from the frontend via the Supabase JS SDK. Supabase (hosted Postgres) handles the database, auth, and row-level security.

**Key branches:**
- `main` — production-ready code, Supabase fully wired up
- `dev` — older branch, diverged before Supabase was connected (do not use for new work)

---

## 2. Stack & File Map

```
frontend/src/
├── lib/supabase.ts              ← Supabase client (import this everywhere)
├── contexts/AuthContext.tsx     ← Auth state (session, user, signOut)
├── components/freight/
│   └── FreightBuilder.tsx       ← Freight item builder UI + FreightItem type
├── pages/quote/
│   └── QuotePage.tsx            ← 7-step quote flow + calculateTotal() + insert to DB
├── pages/admin/
│   ├── AdminQuotesPage.tsx      ← Reads quotes from DB, updates status
│   ├── ShowsPage.tsx            ← CRUD for shows
│   ├── RateCardsPage.tsx        ← CRUD for rate_cards + rate_card_tiers
│   ├── OrganisersPage.tsx       ← CRUD for organisers
│   └── SuppliersPage.tsx        ← CRUD for suppliers
supabase/
└── schema.sql                   ← Full Postgres schema (run once in Supabase dashboard)
```

---

## 3. Environment Setup

Copy `.env.local` into `frontend/` — it must contain:

```env
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

Get these from: **Supabase Dashboard → Project Settings → API**

The client is initialised once in `lib/supabase.ts` and imported everywhere:

```typescript
import { supabase } from '../../lib/supabase';
```

---

## 4. Database Schema

Run `supabase/schema.sql` in the **Supabase SQL Editor** once per project. Key tables:

| Table | Purpose |
|---|---|
| `shows` | Trade show events — `status: draft\|active\|completed` |
| `organisers` | Show organiser companies |
| `suppliers` | Equipment, transport, venues, labour providers |
| `rate_cards` | Pricing tiers (forklift lifts, storage per pallet) |
| `rate_card_tiers` | Bracketed price rows per rate card |
| `quotes` | Customer quote submissions |

**Important:** Every table has Row Level Security (RLS) enabled. Only authenticated (admin) users get access by default. The public quote submission works because the `quotes` table needs an `anon` insert policy — check this if inserts fail from the public quote form.

---

## 5. How a Quote is Calculated

All calculation logic lives in `QuotePage.tsx`:

```typescript
const calculateTotal = () => {
  let total = 0;
  if (freightIn)  total += 450;              // Pickup service
  if (freightOut) total += 450;              // Delivery service
  total += freightItems.length * 150;        // $150 per freight item
  if (pickupForklift   === false) total += 65; // Tailgate surcharge
  if (deliveryForklift === false) total += 65; // Tailgate surcharge
  total += 85;                               // Basic insurance (flat)
  return total;
};
```

**Pricing table:**

| Line item | Amount |
|---|---|
| Freight in (pickup) | $450 |
| Freight out (delivery) | $450 |
| Per freight item | $150 each |
| Tailgate at pickup (no forklift) | +$65 |
| Tailgate at delivery (no forklift) | +$65 |
| Insurance | $85 flat |

> **Note:** Rate cards (`rate_cards` + `rate_card_tiers`) exist in the DB and admin UI but are **not yet wired into `calculateTotal()`**. When you add dynamic pricing, fetch the show's `rate_card_id`, query `rate_card_tiers`, and apply the tier bracket based on lift count.

---

## 6. How to Save a Quote to Supabase

The `quotes` table currently uses a `notes TEXT` column to store the full payload as a JSON string (MVP approach — schema is marked as provisional).

**Answer to "should I pass JSON?"** — Yes. Stringify the whole quote object into `notes`. When the `quotes` table gets proper columns in the future, each field will move into its own column.

```typescript
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
    items: freightItems,       // FreightItem[]
    totalPrice: calculateTotal(),
  }),
});

if (error) {
  // handle error — show user message
}
```

**The JSON payload shape** passed into `notes`:

```json
{
  "contact": {
    "name": "Jane Smith",
    "company": "Acme Co.",
    "email": "jane@acme.com",
    "phone": "+61 400 000 000"
  },
  "freightIn": true,
  "freightOut": false,
  "pickupAddress": "123 Main St, Sydney NSW 2000",
  "deliveryAddress": "",
  "pickupForklift": true,
  "deliveryForklift": null,
  "items": [
    {
      "id": "abc123",
      "type": "Pallet",
      "icon": "🟦",
      "qty": 2,
      "weight": "950kg ea",
      "dimensions": "1200x1200x1800mm",
      "desc": "Display stands",
      "totalWeight": "1900kg"
    }
  ],
  "totalPrice": 1080
}
```

---

## 7. How to Read Data from Supabase

**Fetch with join:**
```typescript
const { data, error } = await supabase
  .from('quotes')
  .select('*, show:shows(name, code)')   // join shows table
  .order('id', { ascending: false });
```

**Fetch filtered list:**
```typescript
const { data, error } = await supabase
  .from('shows')
  .select('*')
  .eq('status', 'active')
  .order('show_start', { ascending: true });
```

**Update a record:**
```typescript
const { error } = await supabase
  .from('quotes')
  .update({ status: 'sent' })
  .eq('id', quoteId);
```

---

## 8. Adding a New Calculation Field

Follow this pattern when adding a new pricing line (e.g. storage days):

1. **Add state** in `QuotePage.tsx`:
   ```typescript
   const [storageDays, setStorageDays] = useState(0);
   ```

2. **Add to `calculateTotal()`**:
   ```typescript
   total += storageDays * 50; // $50/day storage
   ```

3. **Add to the JSON payload** in `handleAcceptQuote`:
   ```typescript
   notes: JSON.stringify({
     ...existing fields,
     storageDays,
   })
   ```

4. **Display the line** in Step 7 (quote summary section).

---

## 9. Connecting Rate Cards to Calculations (Next Step)

When you're ready to replace hardcoded prices with rate card data:

```typescript
// 1. Fetch the show's rate card when a show is selected
const { data: tiers } = await supabase
  .from('rate_card_tiers')
  .select('*')
  .eq('rate_card_id', selectedShow.rate_card_id)
  .order('sort_order');

// 2. Find the right tier bracket for lift count
const liftCount = freightItems.length;
const tier = tiers.find(t =>
  liftCount >= t.from_count &&
  (t.to_count === null || liftCount <= t.to_count)
);
const pricePerLift = tier?.price ?? 150; // fallback

// 3. Use in calculateTotal()
total += freightItems.length * pricePerLift;
```

---

## 10. Authentication (Admin Only)

The admin area uses Supabase Auth. Wrap any admin page with `<ProtectedRoute>`:

```typescript
// App.tsx pattern
<Route path="/admin/quotes" element={
  <ProtectedRoute>
    <AdminQuotesPage />
  </ProtectedRoute>
} />
```

Access the current user anywhere:
```typescript
import { useAuth } from '../../contexts/AuthContext';
const { user, session, signOut } = useAuth();
```

---

## 11. Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `insert` returns 401/RLS error from quote form | `quotes` table has no `anon` insert policy | Add: `CREATE POLICY "Anon insert" ON quotes FOR INSERT TO anon WITH CHECK (true);` |
| Env vars `undefined` in browser | `.env.local` missing or wrong prefix | All Vite env vars must start with `VITE_` |
| Join returns `null` | Wrong foreign key alias in `.select()` | Match the alias to the actual table name: `venue:suppliers(name)` |
| `updated_at` not updating | Trigger not running | Re-run the trigger section of `schema.sql` |

---

## 12. Dev Workflow

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # production build
```

The `dev` branch is behind `main` by ~4,500 lines of changes — always branch off `main` for new work.
