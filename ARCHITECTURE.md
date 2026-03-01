# Axis Events - System Architecture Document

## Project Overview

**Axis Events** is a comprehensive event logistics platform specializing in freight forwarding, on-site services, and logistics management for trade shows, exhibitions, and events across Australia. The system consolidates shipments, provides automatic pricing calculations, and manages the complete logistics workflow from quote to delivery.

## Architecture Overview

### High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Client  │    │  Flask API       │    │   PostgreSQL    │
│   (Frontend)    │◄──►│  (Backend)       │◄──►│   Database      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │                          │
                              ▼                          │
                       ┌──────────────────┐              │
                       │   AWS S3         │              │
                       │   (File Storage) │              │
                       └──────────────────┘              │
                                                         │
                              ┌──────────────────────────┘
                              ▼
                       ┌──────────────────┐
                       │   Redis Cache    │
                       │   (Optional)     │
                       └──────────────────┘
```

## Technology Stack

### Frontend - React Application
- **Framework**: React 18+ with TypeScript
- **Styling**: CSS Modules / Styled Components with green accent theme
- **State Management**: React Query + Context API
- **Routing**: React Router v6
- **Forms**: React Hook Form with validation
- **UI Components**: Custom components following brand identity
- **Build Tool**: Vite or Create React App
- **Testing**: Jest + React Testing Library

### Backend - Flask API
- **Framework**: Flask 3.0+ with Python 3.9+
- **API Standard**: RESTful API with JSON responses
- **Database ORM**: SQLAlchemy 2.0+
- **Authentication**: Flask-JWT-Extended
- **Validation**: Marshmallow schemas
- **File Upload**: Flask-Upload with S3 integration
- **Background Tasks**: Celery with Redis broker
- **API Documentation**: Flask-RESTX (Swagger)
- **Testing**: Pytest + factory patterns

### Database - PostgreSQL
- **Version**: PostgreSQL 14+
- **Connection Pool**: SQLAlchemy connection pooling
- **Migrations**: Flask-Migrate (Alembic)
- **Backup Strategy**: AWS RDS automated backups

### Infrastructure - AWS
- **Compute**: EC2 t3.medium instances
- **Database**: RDS PostgreSQL (Multi-AZ for production)
- **Storage**: S3 for file uploads and static assets
- **Load Balancer**: Application Load Balancer
- **CDN**: CloudFront for static content delivery
- **Monitoring**: CloudWatch for logs and metrics

## System Components

### 1. Frontend React Application

#### Core Features
- **Public Website**: Marketing pages with clean, professional design
- **Quote System**: Multi-step quote form with real-time pricing
- **Customer Portal**: Shipment tracking and management
- **Admin Dashboard**: Comprehensive management interface

#### Design Requirements
- **Color Scheme**: White base with green accents (#00A86B suggested)
- **Typography**: Clean, professional fonts (Inter/Open Sans recommended)
- **Layout**: Mobile-first responsive design
- **UI/UX**: Inspired by Olympic Logistics - clean, simple, not cluttered

#### Component Structure
```
src/
├── components/
│   ├── common/           # Shared UI components
│   ├── forms/           # Form components with validation
│   ├── layout/          # Header, footer, navigation
│   └── charts/          # Data visualization
├── pages/
│   ├── public/          # Marketing pages (about, services, FAQ)
│   ├── quote/           # Quote system pages
│   ├── dashboard/       # Customer dashboard
│   └── admin/           # Admin interface
├── hooks/               # Custom React hooks
├── services/            # API service functions
├── store/               # State management
└── utils/               # Helper functions
```

#### Key Pages
1. **Homepage**: Clean hero section, service overview, CTA to quote
2. **Services Pages**: Freight, International, Site Services
3. **About Page**: Company story, team, values
4. **Quote Form**: Multi-step form with real-time calculations
5. **Customer Dashboard**: Shipment tracking, invoices, history
6. **Admin Panel**: Shipment management, consolidation tools

### 2. Backend Flask API

#### API Structure
```
app/
├── api/
│   ├── auth/            # Authentication endpoints
│   ├── quotes/          # Quote calculation and management
│   ├── shipments/       # Shipment CRUD operations
│   ├── customers/       # Customer management
│   ├── admin/           # Admin-only endpoints
│   └── public/          # Public endpoints (contact, info)
├── models/              # SQLAlchemy models
├── services/            # Business logic services
├── utils/               # Helper functions and utilities
└── config/              # Configuration management
```

#### Core Services

##### Pricing Engine
- **Base Calculation**: `base_rate + (volume_m3 * rate_per_m3) + (weight_kg * rate_per_kg)`
- **Distance Factor**: Suburb-based pricing with rate tables
- **Consolidation Logic**: Multi-shipment optimization
- **Dynamic Pricing**: Time-sensitive and urgent delivery premiums

##### Quote System
- Real-time price calculation
- Multi-step form processing
- PDF quote generation
- Email delivery and tracking

##### Consolidation Engine
- Automatic shipment grouping by trade show and date
- Truck capacity optimization
- Manual override capabilities
- Cost savings calculation and reporting

### 3. Database Schema

#### Core Tables

```sql
-- Customers table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    abn VARCHAR(20),
    address JSONB, -- Structured address data
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trade Shows table
CREATE TABLE trade_shows (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    venue_name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    suburb VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    bump_in_start TIMESTAMP,
    bump_out_end TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trucks table
CREATE TABLE trucks (
    id SERIAL PRIMARY KEY,
    truck_number VARCHAR(50) UNIQUE NOT NULL,
    capacity_volume_m3 DECIMAL(10,2) NOT NULL,
    capacity_weight_kg DECIMAL(10,2) NOT NULL,
    driver_name VARCHAR(255),
    driver_phone VARCHAR(50),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rates table
CREATE TABLE rates (
    id SERIAL PRIMARY KEY,
    area VARCHAR(100) NOT NULL,
    suburb VARCHAR(100),
    base_rate DECIMAL(10,2) NOT NULL,
    rate_per_km DECIMAL(10,4),
    rate_per_m3 DECIMAL(10,2) NOT NULL,
    rate_per_kg DECIMAL(10,4) NOT NULL,
    minimum_charge DECIMAL(10,2) NOT NULL,
    effective_from DATE NOT NULL,
    effective_to DATE
);

-- Shipments table
CREATE TABLE shipments (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    trade_show_id INTEGER REFERENCES trade_shows(id),
    pickup_address JSONB NOT NULL,
    dropoff_address JSONB NOT NULL,
    volume_m3 DECIMAL(8,3) NOT NULL,
    weight_kg DECIMAL(8,2) NOT NULL,
    description TEXT,
    special_requirements TEXT,
    status VARCHAR(50) DEFAULT 'quoted',
    quoted_price DECIMAL(10,2),
    final_price DECIMAL(10,2),
    pickup_date DATE,
    delivery_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Consolidations table
CREATE TABLE consolidations (
    id SERIAL PRIMARY KEY,
    trade_show_id INTEGER REFERENCES trade_shows(id),
    truck_id INTEGER REFERENCES trucks(id),
    departure_date TIMESTAMP NOT NULL,
    total_volume_m3 DECIMAL(10,2) DEFAULT 0,
    total_weight_kg DECIMAL(10,2) DEFAULT 0,
    total_revenue DECIMAL(12,2) DEFAULT 0,
    total_cost DECIMAL(12,2) DEFAULT 0,
    margin DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'planning',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Junction table for consolidations and shipments
CREATE TABLE consolidation_shipments (
    id SERIAL PRIMARY KEY,
    consolidation_id INTEGER REFERENCES consolidations(id),
    shipment_id INTEGER REFERENCES shipments(id),
    price_charged DECIMAL(10,2) NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(consolidation_id, shipment_id)
);

-- Payments table
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    shipment_id INTEGER REFERENCES shipments(id),
    amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP,
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    invoice_number VARCHAR(100),
    transaction_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Public Endpoints
```
GET  /api/public/services           # Get service information
POST /api/public/contact            # Contact form submission
GET  /api/public/trade-shows        # Available trade shows
POST /api/public/quote              # Generate quote
```

### Customer Endpoints
```
POST /api/auth/register             # Customer registration
POST /api/auth/login               # Customer login
GET  /api/customer/profile         # Get profile
PUT  /api/customer/profile         # Update profile
GET  /api/customer/shipments       # Get customer shipments
GET  /api/customer/shipments/:id   # Get specific shipment
POST /api/customer/shipments       # Create new shipment
```

### Admin Endpoints
```
GET  /api/admin/dashboard          # Dashboard analytics
GET  /api/admin/shipments          # All shipments with filters
PUT  /api/admin/shipments/:id      # Update shipment
GET  /api/admin/consolidations     # Consolidation management
POST /api/admin/consolidations     # Create consolidation
PUT  /api/admin/consolidations/:id # Update consolidation
GET  /api/admin/trucks             # Truck management
POST /api/admin/trucks             # Add new truck
GET  /api/admin/customers          # Customer management
GET  /api/admin/reports            # Generate reports
```

## Security & Authentication

### Authentication Flow
1. **Customer Registration**: Email verification required
2. **Login**: JWT token-based authentication
3. **Session Management**: Refresh token mechanism
4. **Admin Access**: Role-based permissions

### Security Measures
- Input validation and sanitization
- SQL injection prevention with parameterized queries
- Rate limiting on API endpoints
- HTTPS enforcement
- Secure file upload with virus scanning
- Environment variable management for secrets

## Deployment Architecture

### Development Environment
```
localhost:3000  → React Development Server
localhost:5000  → Flask Development Server
localhost:5432  → PostgreSQL Database
```

### Production Environment (AWS)
```
CloudFront CDN → ALB → EC2 Instances (Auto Scaling Group)
                             ↓
                        RDS PostgreSQL
                             ↓
                         S3 Storage
```

### Deployment Strategy
1. **CI/CD Pipeline**: GitHub Actions or AWS CodePipeline
2. **Blue-Green Deployment**: Zero downtime deployments
3. **Database Migrations**: Automated with Flask-Migrate
4. **Environment Management**: Separate staging and production

## Performance & Scalability

### Frontend Performance
- Code splitting and lazy loading
- Image optimization and WebP format
- CDN for static assets
- Browser caching strategies

### Backend Performance
- Database query optimization with indexes
- Redis caching for frequently accessed data
- Background job processing for heavy operations
- Connection pooling

### Monitoring
- Application metrics (response times, error rates)
- Business metrics (quotes generated, conversions)
- Infrastructure monitoring (CPU, memory, disk usage)
- Log aggregation and analysis

## Business Logic Implementation

### Quote Calculation Flow
1. **Form Submission**: Capture shipment details
2. **Address Validation**: Verify pickup/delivery locations
3. **Trade Show Matching**: Link to specific event
4. **Rate Lookup**: Find applicable rates by area/suburb
5. **Base Calculation**: Apply rate formula
6. **Consolidation Check**: Look for existing consolidations
7. **Final Price**: Apply discounts and generate quote

### Consolidation Process
1. **Shipment Grouping**: Group by trade show and date range
2. **Truck Assignment**: Find available trucks with capacity
3. **Route Optimization**: Optimize pickup and delivery routes
4. **Cost Calculation**: Calculate total costs and margins
5. **Customer Notification**: Inform customers of consolidated delivery

## File Structure

### Complete Project Structure
```
axis-events/
├── frontend/                    # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
├── backend/                     # Flask application
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── utils/
│   │   └── config/
│   ├── migrations/
│   ├── tests/
│   ├── requirements.txt
│   └── run.py
├── database/                    # Database scripts
│   ├── schema/
│   ├── seeds/
│   └── migrations/
├── deployment/                  # Deployment configurations
│   ├── docker/
│   ├── aws/
│   └── scripts/
├── docs/                       # Documentation
└── README.md
```

## Next Steps

1. **Setup Development Environment**
   - Initialize React and Flask projects
   - Setup PostgreSQL database
   - Configure development tools (ESLint, Prettier, Black)

2. **Core Implementation Priority**
   - Database schema creation and migration scripts
   - Basic Flask API with authentication
   - React frontend with routing and basic components
   - Quote form and pricing calculation

3. **MVP Features**
   - Customer quote submission
   - Admin shipment management
   - Basic consolidation tools
   - Payment tracking

4. **Production Deployment**
   - AWS infrastructure setup
   - CI/CD pipeline configuration
   - Performance monitoring
   - Security hardening

This architecture provides a scalable, maintainable foundation for the Axis Events logistics platform, supporting both the MVP requirements and future growth.