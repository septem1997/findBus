import {reactive} from "#imports";
import MyFetch from "~/apis/fetch";

const nearbyLocations = reactive([] as NearbyStationInfo[])
const updateNearbyLocations = async () => {
    // todo 检测经纬度是否变化，有的话再获取新的列表
    const res = await MyFetch.getNearbyLocation(22.278637468014338,113.50012190959929)
    nearbyLocations.length = 0
    nearbyLocations.push(...res)
}
const useGlobalStore = ()=>{
    return {
        nearbyLocations:nearbyLocations,
        updateNearbyLocations:updateNearbyLocations
    }
}

export default useGlobalStore
