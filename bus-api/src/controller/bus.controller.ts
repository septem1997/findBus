import { Body, Controller, Post, Param } from '@nestjs/common';
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

  @Post('getSegmentInfo')
  async getSegmentInfo(@Body() segmentInfo: SegmentInfoDto) {
    return await BusAPI.getSegmentInfo(segmentInfo);
  }

  @Post('getStationsBySegmentId')
  async getStationsBySegmentId(@Body('segmentId') segmentId: string) {
    return await BusAPI.getStationsBySegmentId(segmentId);
  }

  @Post('getBusStatus')
  async getBusStatus(@Body() segmentInfo: SegmentInfoDto) {
    return await BusAPI.getBusStatusListBySegmentId(segmentInfo);
  }

  @Post('getRoutesByLineName')
  async getRoutesByLineName(@Body('keyword') keyword: string) {
    return await BusAPI.getRoutesByLineName(keyword);
  }
}
