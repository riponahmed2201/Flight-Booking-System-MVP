import { IsNumber, Min } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  flightId: number;

  @IsNumber()
  @Min(1)
  seatsBooked: number;
}