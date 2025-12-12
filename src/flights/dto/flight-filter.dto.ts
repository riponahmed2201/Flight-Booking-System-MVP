import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class FlightFilterDto extends PaginationDto {
    @ApiPropertyOptional({ description: 'Filter by origin city' })
    @IsOptional()
    @IsString()
    origin?: string;

    @ApiPropertyOptional({ description: 'Filter by destination city' })
    @IsOptional()
    @IsString()
    destination?: string;

    @ApiPropertyOptional({ description: 'Filter by departure date (YYYY-MM-DD)' })
    @IsOptional()
    @IsDateString()
    departureDate?: string;

    @ApiPropertyOptional({
        enum: ['price', 'departureTime'],
        description: 'Sort by field',
    })
    @IsOptional()
    @IsEnum(['price', 'departureTime'])
    sortBy?: string;

    @ApiPropertyOptional({ enum: ['ASC', 'DESC'], description: 'Sort order' })
    @IsOptional()
    @IsEnum(['ASC', 'DESC'])
    sortOrder?: 'ASC' | 'DESC';
}
