import {SymbolKind} from "vscode-languageserver-types";

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
