import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FlightsService } from './flights.service';
import { FlightFilterDto } from './dto/flight-filter.dto';

@Controller('flights')
@ApiTags('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) { }

  @Get()
  @ApiOperation({ summary: 'Get all flights with pagination and filters' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of available flights',
  })
  async findAll(@Query() filterDto: FlightFilterDto) {
    return this.flightsService.findAll(filterDto);
  }
}
