import {reactive, ref} from "#imports";
import MyFetch from "~/apis/fetch";

const nearbyLocations = reactive([] as NearbyStationInfo[])
const position = ref({
    latitude:22.278637468014338,
    longitude:113.50012190959929
})
const updateNearbyLocations = async () => {
    // todo 检测经纬度是否变化，有的话再获取新的列表
    const res = await MyFetch.getNearbyLocation(position.value.latitude,position.value.longitude)
    nearbyLocations.length = 0
    nearbyLocations.push(...res)
}
const useGlobalStore = ()=>{
    return {
        position:position,
        nearbyLocations:nearbyLocations,
        updateNearbyLocations:updateNearbyLocations
    }
}

export default useGlobalStore
