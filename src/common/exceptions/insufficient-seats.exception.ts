import { BadRequestException } from '@nestjs/common';

export class InsufficientSeatsException extends BadRequestException {
    constructor(requested: number, available: number) {
        super(
            `Insufficient seats available. Requested: ${requested}, Available: ${available}`,
        );
    }
}
