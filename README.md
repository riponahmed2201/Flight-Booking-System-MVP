# Flight Booking System - Backend API

A production-ready NestJS backend for a flight booking system with JWT authentication, PostgreSQL database, and Swagger documentation.

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [API Documentation](#-api-documentation)
- [Database Schema](#️-database-schema)
- [Environment Variables](#-environment-variables)
- [Testing](#-testing)
- [Screenshots](#-screenshots)

---

## 🚀 Features

- ✅ **JWT Authentication** - Secure register/login with password validation
- ✅ **Flight Management** - List, search, filter, and sort flights
- ✅ **Booking System** - Create bookings with transaction support
- ✅ **PostgreSQL Database** - TypeORM with proper relations
- ✅ **API Documentation** - Interactive Swagger/OpenAPI
- ✅ **Security** - Rate limiting, input validation, error handling
- ✅ **Pagination** - Efficient data loading with metadata

---

## 📋 Tech Stack

- **Backend**: NestJS + TypeScript
- **Database**: PostgreSQL + TypeORM
- **Authentication**: JWT
- **Validation**: class-validator + class-transformer
- **Security**: @nestjs/throttler + Joi
- **Documentation**: Swagger/OpenAPI

---

## �️ Installation

### Prerequisites
- Node.js v16+
- PostgreSQL v12+
- npm or yarn

### Setup Steps

```bash
# 1. Clone repository
git clone <repository-url>
cd booking-backend

# 2. Install dependencies
npm install

# 3. Create PostgreSQL database
createdb booking_db
# Or using psql:
# psql -U postgres
# CREATE DATABASE booking_db;

# 4. Configure environment variables
# Create .env file in root directory
```

### Environment Configuration

Create `.env` file with the following variables:

```env
NODE_ENV=development
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=booking_db
JWT_SECRET=your-super-secret-key-minimum-32-characters-long
JWT_EXPIRATION=1d
PORT=3000
```

> ⚠️ **Important**: `JWT_SECRET` must be at least 32 characters long.

### Run Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

Application will start on: `http://localhost:3000`

Swagger documentation: `http://localhost:3000/api/docs`

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Available Endpoints

| Endpoint | Method | Auth Required | Description |
|----------|--------|---------------|-------------|
| `/auth/register` | POST | No | Register new user |
| `/auth/login` | POST | No | Login user |
| `/flights` | GET | No | Get all flights (paginated) |
| `/bookings` | POST | Yes | Create new booking |

---

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number or special character

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

---

### Flights

#### Get Flights (with pagination & filters)
```http
GET /flights?page=1&limit=10&origin=New York&destination=London&sortBy=price&sortOrder=ASC
```

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page (max: 100) |
| `origin` | string | - | Filter by origin city |
| `destination` | string | - | Filter by destination city |
| `departureDate` | string | - | Filter by date (YYYY-MM-DD) |
| `sortBy` | string | departureTime | Sort by field |
| `sortOrder` | string | ASC | ASC or DESC |

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "flightNumber": "AA123",
      "origin": "New York",
      "destination": "London",
      "departureTime": "2024-12-25T10:00:00Z",
      "arrivalTime": "2024-12-25T22:00:00Z",
      "price": 599.99,
      "seatsAvailable": 50
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

---

### Bookings

#### Create Booking
```http
POST /bookings
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "flightId": 1,
  "seatsBooked": 2
}
```

**Response:**
```json
{
  "id": 1,
  "flightNumber": "AA123",
  "origin": "New York",
  "destination": "London",
  "departureTime": "2024-12-25T10:00:00Z",
  "arrivalTime": "2024-12-25T22:00:00Z",
  "seatsBooked": 2,
  "totalPrice": 1199.98,
  "status": "confirmed",
  "bookingDate": "2024-12-13T03:00:00Z",
  "userId": 1,
  "userName": "John Doe"
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid JWT token
- `404 Not Found` - Flight doesn't exist
- `400 Bad Request` - Insufficient seats available

---

## 🗄️ Database Schema

### Tables

**users**
- `id` - Primary Key
- `email` - Unique, indexed
- `password` - Hashed with bcrypt
- `name` - String

**flights**
- `id` - Primary Key
- `flightNumber` - String
- `origin` - String
- `destination` - String
- `departureTime` - DateTime
- `arrivalTime` - DateTime
- `price` - Decimal
- `seatsAvailable` - Integer

**bookings**
- `id` - Primary Key
- `userId` - Foreign Key → users
- `flightId` - Foreign Key → flights
- `seatsBooked` - Integer
- `bookingDate` - DateTime
- `status` - String (confirmed, cancelled)

**Relations:**
- User → Bookings (One-to-Many)
- Flight → Bookings (One-to-Many)

---

## 📝 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | No | development | Environment (development/production/test) |
| `DATABASE_HOST` | Yes | - | PostgreSQL host |
| `DATABASE_PORT` | No | 5432 | PostgreSQL port |
| `DATABASE_USERNAME` | Yes | - | Database username |
| `DATABASE_PASSWORD` | Yes | - | Database password |
| `DATABASE_NAME` | Yes | - | Database name |
| `JWT_SECRET` | Yes | - | JWT secret key (min 32 characters) |
| `JWT_EXPIRATION` | No | 1d | JWT token expiration time |
| `PORT` | No | 3000 | Application port |

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov
```

---

## 📸 Screenshots

### Swagger Documentation
Access the interactive API documentation at `http://localhost:3000/api/docs`

![Swagger UI](screenshots/swagger-ui.png)

### API Endpoints
All endpoints are documented with request/response schemas

![API Endpoints](screenshots/api-endpoints.png)

### Authentication Flow
JWT-based authentication with secure password validation

![Authentication](screenshots/auth-flow.png)

### Error Handling
Consistent error responses with proper HTTP status codes

![Error Handling](screenshots/error-handling.png)

---

## 📦 Project Structure

```
src/
├── auth/                   # Authentication module
├── bookings/              # Bookings module
├── flights/               # Flights module
├── common/                # Shared utilities
│   ├── dto/              # Pagination DTOs
│   ├── exceptions/       # Custom exceptions
│   ├── filters/          # Exception filters
│   └── guards/           # Auth guards
├── config/                # Configuration files
├── entities/              # TypeORM entities
├── app.module.ts          # Root module
└── main.ts               # Application entry
```

---

## 🔒 Security Features

- **Password Validation** - Strong password requirements
- **Rate Limiting** - Prevents brute force attacks
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Automatic validation and sanitization
- **Error Handling** - Sanitized error messages
- **Environment Validation** - Validates configuration on startup

---

## 📄 License

This project is for evaluation purposes only.

---

## 🤝 Support

For questions or issues:
- Check [Swagger Documentation](http://localhost:3000/api/docs)
- Review [NestJS Documentation](https://docs.nestjs.com)
- See [TypeORM Documentation](https://typeorm.io)
