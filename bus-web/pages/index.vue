<template>
  <div>
    <van-search class="search-bar" v-model="searchText" placeholder="搜索公交路线"/>
    <div style="padding: 0 12px">
      <van-tag round type="primary">附近站点</van-tag>
    </div>
    <div>
      <van-skeleton style="margin-top: 12px" v-if="isLoading" :row="10" />
      <van-cell
          v-else
          @click="jumpToRoutes(item)"
          v-for="item in nearbyLocations"
          :title="item.stationname" is-link
          :value="`距您${item.distance.toFixed(0)}米`"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import {definePageMeta, navigateTo, onMounted, reactive, ref, useRouter} from "#imports";
import useGlobalStore from "~/hooks/globalStore";

definePageMeta({
  layout: 'home',
  keepalive:true
})
const router = useRouter()
const isLoading = ref(true)
const {nearbyLocations,updateNearbyLocations} = useGlobalStore()
const jumpToRoutes = (station:NearbyStationInfo)=>{
  navigateTo({
    path:'/routesByStation',
    query:{
      id:station.segmentid,
      name:station.stationname
    }
  })
}
onMounted(async () => {
  await updateNearbyLocations()
  isLoading.value = false
})
const searchText = ref('')

</script>

<style scoped lang="stylus">
.search-bar{
  position sticky
  top 0
  background white
  z-index 3
}
</style>
