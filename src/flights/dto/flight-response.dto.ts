import { ApiProperty } from '@nestjs/swagger';

export class FlightResponseDto {
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
    price: number;

    @ApiProperty()
    seatsAvailable: number;
}
