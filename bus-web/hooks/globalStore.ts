import {onMounted, reactive, ref} from "#imports";
import MyFetch from "~/apis/fetch";
import {Ref} from "@vue/reactivity";

const nearbyLocations = reactive([] as NearbyStationInfo[])
const position = ref({
    latitude:22.278637468014338,
    longitude:113.50012190959929
})
const user:Ref<UserInfo|null> = ref(null)
const setUser = (u:UserInfo)=>{
    user.value = u
    if (u){
        localStorage.setItem('user',JSON.stringify(u))
    }else{
        localStorage.removeItem('user')
    }
}
const updateNearbyLocations = async () => {
    // todo 检测经纬度是否变化，有的话再获取新的列表
    const res = await MyFetch.getNearbyLocation(position.value.latitude,position.value.longitude)
    nearbyLocations.length = 0
    nearbyLocations.push(...res)
}
// onMounted(()=>{
//     const userTxt = localStorage.getItem('user')
// })

if (process.client) {
    console.log('localStorage',localStorage)
    const userTxt = localStorage.getItem('user')
    if (userTxt){
        setUser(JSON.parse(userTxt))
    }
}
const useGlobalStore = ()=>{
    return {
        setUser:setUser,
        user:user,
        position:position,
        nearbyLocations:nearbyLocations,
        updateNearbyLocations:updateNearbyLocations
    }
}

export default useGlobalStore
