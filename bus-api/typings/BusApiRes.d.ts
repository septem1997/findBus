interface NearbyStationInfo {
  distance: number;
  latitude: number;
  longitude: number;
  segmentid: string;
  stationid: string;
  stationname: string;
  stationno: string;
  stationtype: 3;
  stationtypename: string;
}

interface BusStatusInfo {
  arrivesymbol: 1 | 2;
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
}

interface BusLineInfo {
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
