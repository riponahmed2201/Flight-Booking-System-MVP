import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Flight } from './flight.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.bookings)
  user: User;

  @ManyToOne(() => Flight, flight => flight.bookings)
  flight: Flight;

  @Column()
  seatsBooked: number;

  @Column()
  bookingDate: Date;

  @Column()
  status: string;
}