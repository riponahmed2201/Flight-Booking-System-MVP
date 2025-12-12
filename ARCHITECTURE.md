# ARCHITECTURE.md - Technical Implementation Details

> This document explains the senior-level architectural decisions and implementations in this project.

---

## 🎯 Senior-Level Enhancements

This project demonstrates production-ready backend development with the following advanced features:

### 1. Custom Exception Handling System

**Implementation:**
- 4 business-specific exceptions (`UserAlreadyExistsException`, `InvalidCredentialsException`, `FlightNotFoundException`, `InsufficientSeatsException`)
- Global exception filter (`AllExceptionsFilter`) that handles all error types
- Standardized error response format
- Environment-based error detail exposure (detailed in dev, sanitized in production)
- TypeORM error handling (e.g., unique constraint violations)

**Why This Matters:**
- Consistent error responses across the entire API
- Better debugging with proper error context
- Production-safe error messages (no sensitive data leaks)
- Centralized error handling (DRY principle)

**Code Location:**
- `src/common/exceptions/` - Custom exceptions
- `src/common/filters/http-exception.filter.ts` - Global filter
- Controllers have NO try-catch blocks (clean code)

---

### 2. Security Hardening

**Password Validation:**
- Minimum 8 characters
- Complexity requirements (uppercase, lowercase, number/special char)
- Implemented using `class-validator` decorators
- Custom validation messages

**Rate Limiting:**
- Global: 10 requests per 60 seconds
- Auth endpoints: 5 requests per 60 seconds (stricter)
- Prevents brute force attacks
- Returns HTTP 429 when limit exceeded

**Environment Validation:**
- Joi schema validates all environment variables on startup
- Application fails fast if configuration is invalid
- JWT_SECRET must be minimum 32 characters
- Type-safe configuration

**Database Security:**
- `synchronize: true` only in development
- Production uses migrations (prevents data loss)
- Passwords hashed with bcrypt (salt rounds: 10)
- SQL injection prevention via TypeORM parameterized queries

**Code Location:**
- `src/auth/dto/register.dto.ts` - Password validation
- `src/config/throttler.config.ts` - Rate limiting
- `src/config/validation.schema.ts` - Environment validation
- `src/config/database.config.ts` - Database config

---

### 3. Response DTOs (Data Transfer Objects)

**Implementation:**
- `UserResponseDto` - Excludes password field using `@Exclude()` decorator
- `BookingResponseDto` - Includes calculated fields (totalPrice) and denormalized data
- `FlightResponseDto` - Clean, consistent flight data structure
- Uses `class-transformer` for automatic transformation

**Why This Matters:**
- Prevents sensitive data leaks (passwords never in responses)
- Consistent response format across all endpoints
- Calculated fields (e.g., totalPrice = seats × price)
- API versioning support (can change DTOs without changing entities)

**Code Location:**
- `src/auth/dto/user-response.dto.ts`
- `src/bookings/dto/booking-response.dto.ts`
- `src/flights/dto/flight-response.dto.ts`
- Services use `plainToInstance()` for transformation

---

### 4. Pagination & Filtering

**Implementation:**
- Reusable `PaginationDto` with validation (page, limit)
- `FlightFilterDto` extends pagination with search filters
- Case-insensitive search (LIKE with LOWER())
- Date range filtering
- Sorting by multiple fields (price, departureTime)
- Paginated response includes metadata (total, totalPages)

**Why This Matters:**
- Efficient data loading (doesn't load all records)
- Better UX (users can search and filter)
- Scalable (works with millions of records)
- RESTful API design

**Code Location:**
- `src/common/dto/pagination.dto.ts` - Reusable pagination
- `src/flights/dto/flight-filter.dto.ts` - Flight-specific filters
- `src/flights/flights.service.ts` - QueryBuilder implementation

---

### 5. Modular Configuration

**Implementation:**
- Separate config files for each concern:
  - `validation.schema.ts` - Joi validation
  - `database.config.ts` - TypeORM config
  - `jwt.config.ts` - JWT settings
  - `throttler.config.ts` - Rate limiting
- Clean `app.module.ts` (no inline configuration)
- Type-safe configuration with TypeScript

**Why This Matters:**
- Separation of concerns
- Easy to test configuration in isolation
- Reusable across modules
- Maintainable and readable

**Code Location:**
- `src/config/` directory
- `src/app.module.ts` imports from config files

---

### 6. Clean Architecture

**Principles Applied:**
- **Controllers** - Only routing, no business logic
- **Services** - Business logic and data access
- **DTOs** - Data validation and transformation
- **Entities** - Database models
- **Guards** - Authentication/authorization
- **Filters** - Error handling
- **Interceptors** - Cross-cutting concerns

**Benefits:**
- Testable (each layer can be tested independently)
- Maintainable (clear separation of concerns)
- Scalable (easy to add new features)
- SOLID principles

---

### 7. Transaction Management

**Implementation:**
- Booking creation uses database transactions
- QueryRunner for manual transaction control
- Automatic rollback on error
- Seat availability updated atomically

**Why This Matters:**
- Data consistency (no partial bookings)
- Race condition prevention
- ACID compliance

**Code Location:**
- `src/bookings/bookings.service.ts` - Transaction implementation

---

## 🏗️ Architecture Decisions

### Why NestJS?
- Enterprise-grade framework
- Built-in dependency injection
- TypeScript support
- Modular architecture
- Extensive ecosystem

### Why TypeORM?
- Type-safe database queries
- Migration support
- Active Record and Data Mapper patterns
- Multiple database support

### Why PostgreSQL?
- ACID compliance
- Advanced features (JSON, full-text search)
- Scalable and reliable
- Open source

---

## 📊 Code Quality Metrics

- **TypeScript** - 100% type coverage
- **Linting** - ESLint with strict rules
- **Formatting** - Prettier for consistent style
- **Validation** - All inputs validated
- **Error Handling** - Centralized and consistent
- **Security** - Multiple layers of protection

---

## 🚀 Production Readiness

### Environment-Based Configuration
- Development: Auto-sync database, detailed errors, logging
- Production: Migrations, sanitized errors, optimized queries

### Scalability Considerations
- Pagination prevents memory issues
- Database indexes on frequently queried fields
- Connection pooling (TypeORM default)
- Stateless JWT (horizontal scaling ready)

### Monitoring & Logging
- Structured error logging
- Request/response logging capability
- Environment-based log levels

---

## 🎓 Learning Outcomes

This project demonstrates:
1. **Systems Thinking** - How different components work together
2. **Security Awareness** - Multiple security layers
3. **API Design** - RESTful principles, pagination, filtering
4. **Error Handling** - Graceful degradation
5. **Code Quality** - Clean, maintainable, testable code
6. **Production Readiness** - Environment-based config, proper logging

---

## 📚 References

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [OWASP Security Guidelines](https://owasp.org)
- [REST API Best Practices](https://restfulapi.net)
