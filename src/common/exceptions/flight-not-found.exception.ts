import { NotFoundException } from '@nestjs/common';

export class FlightNotFoundException extends NotFoundException {
    constructor(flightId: number) {
        super(`Flight with ID ${flightId} not found`);
    }
}
