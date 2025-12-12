import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Flight } from '../entities/flight.entity';
import { FlightFilterDto } from './dto/flight-filter.dto';
import { FlightResponseDto } from './dto/flight-response.dto';
import { PaginatedResponseDto } from '../common/dto/pagination.dto';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
  ) { }

  async findAll(
    filterDto: FlightFilterDto,
  ): Promise<PaginatedResponseDto<FlightResponseDto>> {
    const { page = 1, limit = 10, origin, destination, departureDate, sortBy = 'departureTime', sortOrder = 'ASC' } = filterDto;

    const queryBuilder = this.flightRepository.createQueryBuilder('flight');

    // Apply filters
    if (origin) {
      queryBuilder.andWhere('LOWER(flight.origin) LIKE LOWER(:origin)', {
        origin: `%${origin}%`,
      });
    }

    if (destination) {
      queryBuilder.andWhere(
        'LOWER(flight.destination) LIKE LOWER(:destination)',
        { destination: `%${destination}%` },
      );
    }

    if (departureDate) {
      const startOfDay = new Date(departureDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(departureDate);
      endOfDay.setHours(23, 59, 59, 999);

      queryBuilder.andWhere(
        'flight.departureTime BETWEEN :start AND :end',
        { start: startOfDay, end: endOfDay },
      );
    }

    // Apply sorting
    queryBuilder.orderBy(`flight.${sortBy}`, sortOrder);

    // Apply pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [flights, total] = await queryBuilder.getManyAndCount();

    // Transform to response DTOs
    const data: FlightResponseDto[] = flights.map((flight) => ({
      id: flight.id,
      flightNumber: flight.flightNumber,
      origin: flight.origin,
      destination: flight.destination,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      price: flight.price,
      seatsAvailable: flight.seatsAvailable,
    }));

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
