<template>
<div>
  <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :title="stationname" />
  <div style="padding: 0 16px">
    <route-by-station :route-info="route" v-for="route in list" :key="route.segmentid" />
  </div>
</div>
</template>

<script setup lang="ts">
import {definePageMeta, onActivated, onMounted, onUnmounted, onUpdated, ref, useRoute} from "#imports";
import MyFetch from "~/apis/fetch";

const route = useRoute();
const stationname = ref(route.query.name as string)
const segmentid = ref(route.query.id as string)
const onClickLeft = () => history.back();

const updateDiff = async () => {
  for (const route of list.value) {
    const diffRes = await MyFetch.getDiffBetweenBusAndStation({
      segmentid: route.segmentid,
      stationname: stationname.value,
      subrouteid: route.subrouteid
    })
    route.diff = diffRes.diff
    route.diffTime = diffRes.time
  }
}
const list = ref([] as RouteByStationInfo[])
const timer = ref(null)
onMounted(async () => {
  list.value = await MyFetch.getRoutesByStation({
    stationname: stationname.value,
    segmentid: segmentid.value
  })
  updateDiff()
  timer.value = setInterval(updateDiff, 1000*60)
})
onUnmounted(()=>{
  clearInterval(timer.value)
})
</script>

<style scoped>

</style>
