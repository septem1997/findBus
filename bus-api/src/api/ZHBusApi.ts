import axios, { AxiosResponse } from 'axios';

interface BusAPIRes {
  code: number;
  data: any;
  msg: string;
}

const BusAxios = axios.create({
  baseURL: 'https://ssgj.zhtdtech.com/',
  headers: {
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    xweb_xhr: '1',
  },
});

const BusAPI = {
  async getRoutesByLineName(keyword: string) {
    const res: AxiosResponse<BusAPIRes> = await BusAxios.post(
      'ssgj/subroute/getSubRoutesByLineName',
      {
        key: keyword,
      },
    );
    return res.data;
  },
  async getStationsBySegmentId(segmentid: number) {
    const res: AxiosResponse<BusAPIRes> = await BusAxios.post(
      'ssgj/station/getStationsBySegmentId',
      {
        key: segmentid,
      },
    );
    return res.data;
  },
  async getBusStatusListBySegmentId(segmentid: number, subrouteid: number) {
    const res: AxiosResponse<BusAPIRes> = await BusAxios.post(
      'ssgj/bus/getBusListBySegmentIdAndSubroteid',
      {
        segmentid,
        subrouteid,
      },
    );
    return res.data;
  },
  async getDistanceByStation(param: {
    segmentid: number;
    stationname: string;
    subrouteid: number;
  }) {
    const res = await BusAxios.post('ssgj/subroute/getSubRoutesAndBus', {
      param,
    });
    return res.data;
  },
  async getNearbyStationsByLocation(param: {
    latitude: number;
    longitude: number;
  }) {
    const res: AxiosResponse<BusAPIRes> = await BusAxios.post(
      'ssgj/station/getNearbyStationsByLocation',
      {
        ...param,
        radius: 1000,
      },
    );
    return res.data;
  },
};
export default BusAPI;
