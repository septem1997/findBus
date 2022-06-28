import { Body, Controller, Post } from '@nestjs/common';
import BusAPI from '../api/ZHBusApi';

@Controller('bus')
export class BusController {
  @Post('getNearbyLocation')
  async getNearbyStationsByLocation(@Body() positionDto: PositionDto) {
    return await BusAPI.getNearbyStationsByLocation(positionDto);
  }

  @Post('getRoutesByStation')
  async getRoutesByStation(@Body() busDto: BusDto) {
    return await BusAPI.getRoutesByStation(busDto);
  }

  @Post('getDiffBetweenBusAndStation')
  async getDiffBetweenBusAndStation(@Body() diffDto: DiffDto) {
    return await BusAPI.getDiffBetweenBusAndStation(diffDto);
  }
}
