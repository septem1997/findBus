<template>
  <div>
    <van-search v-model="searchText" placeholder="搜索公交路线"/>
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

import {definePageMeta, onMounted, reactive, ref, useRouter} from "#imports";

definePageMeta({
  layout: 'home',
  keepalive:true
})
const router = useRouter()
const isLoading = ref(true)
const nearbyLocations = reactive([] as NearbyStationInfo[])
const jumpToRoutes = (station:NearbyStationInfo)=>{
  router.push(`/routesByStation?id=${station.segmentid}&name=${station.stationname}`)
}
onMounted(async () => {
  const res: any = await $fetch('/api/bus/getNearbyLocation', {
    method: 'post',
    body: {
      latitude: 22.270443979270112,
      longitude: 113.50502003643797
    }
  })
  if (res.code === 0) {
    for (const item of res.data) {
      nearbyLocations.push(item)
    }
  }
  isLoading.value = false
})
const searchText = ref('')

</script>

<style scoped>

</style>
