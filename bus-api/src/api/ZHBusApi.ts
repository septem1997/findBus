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
  async getSegmentInfo(segmentInfo: SegmentInfoDto) {
    const res: AxiosResponse<BusAPIRes> = await BusAxios.post(
      'ssgj/segment/getOtherSegmentInfoBySegmentId',
      segmentInfo,
    );
    return res.data.data;
  },
  async getRoutesByLineName(keyword: string) {
    const res: AxiosResponse<BusAPIRes> = await BusAxios.post(
      'ssgj/subroute/getSubRoutesByLineName',
      {
        key: keyword,
      },
    );
    return res.data;
  },
  async getStationsBySegmentId(segmentid: string) {
    const res: AxiosResponse<BusAPIRes> = await BusAxios.post(
      'ssgj/station/getStationsBySegmentId',
      {
        key: segmentid,
      },
    );
    return res.data.data;
  },
  async getRoutesByStation(param: BusDto) {
    const res: AxiosResponse<BusAPIRes> = await BusAxios.post(
      'ssgj/subroute/getSubRoutesBySegmentidAndStation',
      {
        ...param,
      },
    );
    if (res.data.code === 200) {
      return res.data.data;
    }
  },
  async getBusStatusListBySegmentId(segmentInfo: SegmentInfoDto) {
    const res: AxiosResponse<BusAPIRes> = await BusAxios.post(
      'ssgj/bus/getBusListBySegmentIdAndSubroteid',
      segmentInfo,
    );
    return res.data.data;
  },
  async getDiffBetweenBusAndStation(param: DiffDto) {
    const res = await BusAxios.post('ssgj/subroute/getSubRoutesAndBus', {
      ...param,
    });
    return res.data;
  },
  async getNearbyStationsByLocation(param: PositionDto) {
    const res: AxiosResponse<BusAPIRes> = await BusAxios.post(
      'ssgj/station/getNearbyStationsByLocation',
      {
        ...param,
        radius: 1000,
      },
    );
    if (res.data.code === 200) {
      return res.data.data;
    }
  },
};
export default BusAPI;
