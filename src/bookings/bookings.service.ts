import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';
import { Flight } from '../entities/flight.entity';
import { User } from '../entities/user.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createBookingDto: CreateBookingDto, userId: number): Promise<Booking> {
    const flight = await this.flightRepository.findOne({ where: { id: createBookingDto.flightId } });
    if (!flight) {
      throw new Error('Flight not found');
    }
    if (flight.seatsAvailable < createBookingDto.seatsBooked) {
      throw new Error('Not enough seats available');
    }
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const booking = this.bookingRepository.create({
      user,
      flight,
      seatsBooked: createBookingDto.seatsBooked,
      bookingDate: new Date(),
      status: 'confirmed',
    });
    await this.bookingRepository.save(booking);
    flight.seatsAvailable -= createBookingDto.seatsBooked;
    await this.flightRepository.save(flight);
    return booking;
  }
}
