import {Toast} from "vant";
import {$fetch, FetchContext} from 'ohmyfetch'
const apiFetch = $fetch.create({
    baseURL:'/api',
    onRequest({ request, options }):Promise<void> {
        const userTxt = localStorage.getItem('user')
        if (userTxt){
            const user = JSON.parse(userTxt)
            if (!options.headers){
                options.headers = {}
            }
            options.headers['Authorization'] = user.token
        }
        return
    },
    async onResponseError({ request, response, options }) {
        // Log error
        console.log('[fetch response error]', request, response._data, response.body)
        Toast.fail(response._data.message)
    }
})
const MyFetch = {
    async subscribe(param: SubscriptDto) {
        const res: any = await apiFetch('/subscribe/subscribe', {
            method: 'post',
            body:param
        })
        return res.code === 0
    },
    async signUp(param: {
        email: string;
        password: string;
        validCode: string
    }) {
        const res: any = await apiFetch('/user/signup', {
            method: 'post',
            body: param
        })
        if (res.code===0){
            return res.data as UserInfo
        }
    },
    async login(param: {
        email: string;
        password: string;
    }) {
        const res: any = await apiFetch('/user/login', {
            method: 'post',
            body: param
        })
        if (res.code===0){
            return res.data as UserInfo
        }
    },
    async checkEmail(email: string) {
        const res:any = await apiFetch('/user/emailAvailable?email=' + email)
        return res.data as boolean
    },
    async sendEMail(email: string) {
        const res:any = await apiFetch('/user/sendValidCode',{
            method:'post',
            body:{
                email:email
            }
        })
        return res.code===0
    },
    async getDiffBetweenBusAndStation(param: {
        segmentid: number;
        stationname: string;
        subrouteid: number;
    }) {
        const res:any = await apiFetch('/bus/getDiffBetweenBusAndStation', {
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
        const res: any = await apiFetch('/bus/getStationsBySegmentId', {
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
        const res: any = await apiFetch('/bus/getBusStatus', {
            method: 'post',
            body: param
        })
        if (res.code === 0) {
            return res.data as BusStatusInfo[]
        }
    },
    async getRoutesByLineName(keyword: string) {
        const res: any = await apiFetch('/bus/getRoutesByLineName', {
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
        const res: any = await apiFetch('/bus/getRoutesByStation', {
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
        const res: any = await apiFetch('/bus/getSegmentInfo', {
            method: 'post',
            body: param
        })
        if (res.code === 0) {
            return res.data
        }
    },
    async getNearbyLocation(latitude: number, longitude: number) {
        const res: any = await apiFetch('/bus/getNearbyLocation', {
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
