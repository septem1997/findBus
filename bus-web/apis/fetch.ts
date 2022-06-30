const MyFetch = {
    async getDiffBetweenBusAndStation(param: {
        segmentid: number;
        stationname: string;
        subrouteid: number;
    }) {
        const res:any = await $fetch('/api/bus/getDiffBetweenBusAndStation', {
            method:'post',
            body:param,
        });
        if (res.code===0){
            return res.data.data as {
                diff:number;
                time:number
            }
        }
    },
    async getStations(segmentid: string) {
        const res: any = await $fetch('/api/bus/getStationsBySegmentId', {
            method: 'post',
            body: {
                segmentId:segmentid
            }
        })
        if (res.code === 0) {
            const routes =  res.data as BusStationInfo[]
            return routes
        }
    },
    async getBusStatus(param: {
        segmentid: string;
        subrouteid: string;
    }) {
        const res: any = await $fetch('/api/bus/getBusStatus', {
            method: 'post',
            body: param
        })
        if (res.code === 0) {
            return res.data as BusStatusInfo[]
        }
    },
    async getRoutesByLineName(keyword: string) {
        const res: any = await $fetch('/api/bus/getRoutesByLineName', {
            method: 'post',
            body: {
                keyword
            }
        })
        if (res.code === 0) {
            const routes = res.data as RouteByStationInfo[]
            return routes
        }
    },
    async getRoutesByStation(param: {
        segmentid: string;
        stationname: string;
    }) {
        const res: any = await $fetch('/api/bus/getRoutesByStation', {
            method: 'post',
            body: param
        })
        if (res.code === 0) {
            const routes =  res.data as RouteByStationInfo[]
            return routes
        }
    },
    async getSegmentInfo(param: {
        segmentid: string;
        subrouteid: string;
    }) {
        const res: any = await $fetch('/api/bus/getSegmentInfo', {
            method: 'post',
            body: param
        })
        if (res.code === 0) {
            return res.data
        }
    },
    async getNearbyLocation(latitude: number, longitude: number) {
        const res: any = await $fetch('/api/bus/getNearbyLocation', {
            method: 'post',
            body: {
                latitude: latitude,
                longitude: longitude
            }
        })
        if (res.code === 0) {
            return res.data as NearbyStationInfo[]
        }
    }
}

export default MyFetch
