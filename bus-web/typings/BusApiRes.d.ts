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

enum BusArriveSymbol{
  OnStation =1,
  LeavedStation=2
}

interface BusStatusInfo {
  arrivesymbol: BusArriveSymbol;
  busid: string;
  cardid: string;
  segmentid: number;
  sngserialid: number;
  stationid: string;
  stationname: string;
  busList:BusStationInfo[]
}

interface BusStationInfo {
  dualserialid: number;
  latitude: number;
  longitude: number;
  sngserialid: 1;
  stationid: string;
  stationname: string;
  stationno: string;
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
