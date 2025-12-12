import { IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  flightId: number;

  @IsNumber()
  seatsBooked: number;
}