import {reactive} from "#imports";

const nearbyLocations = reactive([] as NearbyStationInfo[])
const updateNearbyLocations = async () => {
    // todo 检测经纬度是否变化，有的话再获取新的列表
    const res: any = await $fetch('/api/bus/getNearbyLocation', {
        method: 'post',
        body: {
            latitude: 22.270443979270112,
            longitude: 113.50502003643797
        }
    })
    if (res.code === 0) {
        nearbyLocations.length = 0
        nearbyLocations.push(...res.data)
    }
}
const useGlobalStore = ()=>{
    return {
        nearbyLocations:nearbyLocations,
        updateNearbyLocations:updateNearbyLocations
    }
}

export default useGlobalStore
