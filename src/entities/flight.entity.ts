import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booking } from './booking.entity';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  flightNumber: string;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;

  @Column('decimal')
  price: number;

  @Column()
  seatsAvailable: number;

  @OneToMany(() => Booking, booking => booking.flight)
  bookings: Booking[];
}