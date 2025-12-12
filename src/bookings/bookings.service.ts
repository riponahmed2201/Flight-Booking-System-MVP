import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
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
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async create(createBookingDto: CreateBookingDto, userId: number): Promise<Booking> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const flight = await queryRunner.manager.findOne(Flight, { where: { id: createBookingDto.flightId } });
      if (!flight) {
        throw new Error('Flight not found');
      }
      if (flight.seatsAvailable < createBookingDto.seatsBooked) {
        throw new Error('Not enough seats available');
      }
      const user = await queryRunner.manager.findOne(User, { where: { id: userId } });
      const booking = queryRunner.manager.create(Booking, {
        user,
        flight,
        seatsBooked: createBookingDto.seatsBooked,
        bookingDate: new Date(),
        status: 'confirmed',
      });
      await queryRunner.manager.save(booking);
      flight.seatsAvailable -= createBookingDto.seatsBooked;
      await queryRunner.manager.save(flight);
      await queryRunner.commitTransaction();
      return booking;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
