# 📄 README — Logistics MVP System

## Project Name

**TradeShow Logistics Consolidation MVP**

---

## 1. Project Overview

This project is a **web-based logistics platform** designed to consolidate shipments from multiple companies attending trade shows in Melbourne. The system will:

* Accept customer shipment requests via a web form
* Automatically calculate pricing based on volume, weight, pickup/dropoff suburb, and trade show
* Consolidate multiple shipments into a single truck to reduce costs while preserving margins
* Track shipments, trucks, payments, and trade show delivery schedules
* Provide an admin interface for managing consolidations and monitoring operations

**Target users:** Trade show vendors in Melbourne
**Traffic target (MVP):** ~100 users/month

---

## 2. Core Components

| Component      | Description                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------- |
| Frontend       | React-based web form for shipment submission and admin dashboard                                   |
| Backend API    | FastAPI (Python) or Node.js handling form submission, pricing calculation, and shipment management |
| Database       | PostgreSQL for relational data storage                                                             |
| Cloud          | AWS EC2 (backend), RDS PostgreSQL (DB), S3 (file storage)                                          |
| Pricing Engine | Calculates shipment cost based on rates, volume, weight, and consolidation rules                   |
| Admin Tools    | Assign shipments to trucks, view consolidations, mark deliveries, generate invoices                |

---

## 3. Database Schema (Relational)

**Key Tables:**

1. **Customers**

   * id, company_name, contact_name, email, phone, ABN, created_at

2. **Trade Shows**

   * id, name, venue_name, address, suburb, city, state, start_date, end_date

3. **Trucks**

   * id, truck_number, capacity_volume, capacity_weight, driver_name, active

4. **Rates**

   * id, area, suburb, base_rate, rate_per_km, rate_per_m3, rate_per_kg, minimum_charge

5. **Shipments**

   * id, customer_id, trade_show_id, pickup_address/suburb/area, dropoff_address/suburb/area, volume_m3, weight_kg, status, created_at

6. **Consolidations**

   * id, trade_show_id, truck_id, departure_date, total_volume, total_weight, total_revenue, total_cost, margin

7. **Consolidation_Shipments**

   * id, consolidation_id, shipment_id, price_charged

8. **Payments**

   * id, customer_id, shipment_id, amount, payment_date, payment_status, invoice_number

---

## 4. Pricing / Consolidation Logic

1. Base price calculation:

```
price = base_rate + (volume_m3 * rate_per_m3) + (weight_kg * rate_per_kg)
```

2. Consolidation discount:

* Multiple shipments assigned to one truck reduce cost per customer while keeping margin positive

3. Admin may manually adjust consolidation assignments for optimization

---

## 5. AWS Deployment (MVP)

* **EC2 instance:** t3.small for backend and frontend
* **RDS PostgreSQL:** managed database (2 GB RAM, burstable CPU)
* **S3 bucket:** file storage (invoices, documents)
* **Optional future scaling:** Load balancer + multiple EC2s, Redis caching, auto-scaling groups

---

## 6. MVP Features

**Customer-facing:**

* Shipment submission form (pickup/dropoff, trade show, volume, weight)
* Automatic pricing calculation

**Admin-facing:**

* View and manage shipments
* Consolidate shipments into trucks
* Track delivery status
* Record payments and generate invoices

---

## 7. Development Guidelines

* **Codebase:** Maintain backend/frontend separation
* **Configuration:** Use environment variables for secrets, DB URLs, API keys
* **Database migration:** Use SQL scripts or ORM migration tools
* **Deployment:** Containerize backend (optional), deploy to EC2, connect to RDS, store files on S3

---

## 8. Getting Started

1. **Clone repository**
2. **Setup environment variables**: DB_URL, AWS credentials, secret keys
3. **Install dependencies**:

   ```bash
   # Backend
   pip install -r requirements.txt  # or npm install for Node.js
   # Frontend
   npm install
   ```
4. **Run local server**:

   ```bash
   # Backend
   uvicorn main:app --reload
   # Frontend
   npm start
   ```
5. **Create initial database tables** using provided SQL migration scripts
6. **Deploy** to EC2 and connect backend to RDS
7. **Upload S3 bucket** for static files

---

## 9. Next Steps / Future Enhancements

* Automatic consolidation optimization
* Customer dashboard for tracking shipments and invoices
* CI/CD pipeline for automated deployment
* Monitoring, logging, and alerts (CloudWatch or similar)
* Multi-city expansion beyond Melbourne
