# Mini Booking System Backend

A NestJS-based backend for a mini flight booking system with JWT authentication, PostgreSQL database, and Swagger documentation.

## Features

- JWT-based authentication (register/login)
- Flight listing API
- Booking creation API
- PostgreSQL database with proper relations
- Swagger/OpenAPI documentation at `/api/docs`

## Tech Stack

- **Backend**: NestJS + TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT
- **ORM**: TypeORM
- **Documentation**: Swagger/OpenAPI

## Installation

1. Clone the repository and navigate to the backend folder.

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL database and update `.env` file:
   ```
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=booking_db
   JWT_SECRET=your-secret-key
   ```

4. Ensure PostgreSQL is running and the database exists.

## Running the Application

```bash
# development
npm run start:dev

# production
npm run start:prod
```

The server will start on port 3000 by default.

## API Documentation

Access Swagger documentation at: `http://localhost:3000/api/docs`

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Flights
- `GET /flights` - Get all available flights

### Bookings
- `POST /bookings` - Create a new booking (requires JWT token)

## Database Schema

- **users**: id, email, password, name
- **flights**: id, flightNumber, origin, destination, departureTime, arrivalTime, price, seatsAvailable
- **bookings**: id, userId, flightId, seatsBooked, bookingDate, status

## Environment Variables

- `DATABASE_HOST`: PostgreSQL host
- `DATABASE_PORT`: PostgreSQL port
- `DATABASE_USERNAME`: Database username
- `DATABASE_PASSWORD`: Database password
- `DATABASE_NAME`: Database name
- `JWT_SECRET`: Secret key for JWT signing

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## License

This project is for evaluation purposes only.
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
