from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["POST"],
    allow_headers=["*"],
)


# ── Request / Response models ──────────────────────────────────────────────────

class FreightItem(BaseModel):
    id: str
    type: str
    qty: int
    weight: str | None = None
    dimensions: str | None = None
    desc: str | None = None
    totalWeight: str | None = None


class QuoteRequest(BaseModel):
    show_id: int
    freightIn: bool
    freightOut: bool
    pickupForklift: bool | None = None
    deliveryForklift: bool | None = None
    items: list[FreightItem]


class LineItem(BaseModel):
    label: str
    amount: float


class QuoteResponse(BaseModel):
    lineItems: list[LineItem]
    total: float
    validDays: int = 7


# ── Calculation logic ──────────────────────────────────────────────────────────

@app.post("/calculate-quote", response_model=QuoteResponse)
def calculate_quote(req: QuoteRequest):
    line_items = []

    if req.freightIn:
        line_items.append(LineItem(label="Freight in (pickup)", amount=450))

    if req.freightOut:
        line_items.append(LineItem(label="Freight out (delivery)", amount=450))

    if req.items:
        item_total = len(req.items) * 150
        line_items.append(LineItem(label=f"{len(req.items)}x freight item(s)", amount=item_total))

    if req.pickupForklift is False:
        line_items.append(LineItem(label="Tailgate surcharge (pickup)", amount=65))

    if req.deliveryForklift is False:
        line_items.append(LineItem(label="Tailgate surcharge (delivery)", amount=65))

    line_items.append(LineItem(label="Insurance (basic)", amount=85))

    total = sum(item.amount for item in line_items)

    return QuoteResponse(lineItems=line_items, total=total)
