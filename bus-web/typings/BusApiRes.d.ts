interface NearbyStationInfo {
  distance: number;
  latitude: number;
  longitude: number;
  segmentid: string;
  stationid: string;
  stationname: string;
  stationno: string;
  stationtype: number;
  stationtypename: string;
}

interface BusStatusInfo {
  arrivesymbol: 1|2;
  busid: string;
  cardid: string;
  segmentid: number;
  sngserialid: number;
  stationid: string;
  stationname: string;
}

interface BusStationInfo {
  dualserialid: number;
  latitude: number;
  longitude: number;
  sngserialid: 1;
  stationid: string;
  stationname: string;
  stationno: string;
  busList:BusStatusInfo[]
}

interface RouteByStationInfo {
  diffTime:number;
  diff: number;
  fstsendtime: string;
  fststation: string;
  lstsendtime: string;
  lststation: string;
  rundirection: any;
  segmentid: number;
  subrouteid: number;
  subroutename: string;
}

interface SubscriptDto {
  segmentid: string;
  stationname: string;
  subrouteid: string;
  clockStartTime: string;
  clockEndTime: string;
}
