import { ApiProperty } from '@nestjs/swagger';

export class BookingResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    flightNumber: string;

    @ApiProperty()
    origin: string;

    @ApiProperty()
    destination: string;

    @ApiProperty()
    departureTime: Date;

    @ApiProperty()
    arrivalTime: Date;

    @ApiProperty()
    seatsBooked: number;

    @ApiProperty()
    totalPrice: number;

    @ApiProperty()
    status: string;

    @ApiProperty()
    bookingDate: Date;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    userName: string;
}
