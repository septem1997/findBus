<template>
<div class="route-box" @click="navigateToDetail">
  <div class="name">
    {{ routeInfo.subroutename }}
  </div>
  <div class="station-box">
    <span>{{routeInfo.fststation}}</span>
    <span class="arrow"><van-icon name="down" /></span>
    <span>{{routeInfo.lststation}}</span>
  </div>
  <div class="time-line">
    <span class="time-box">
      <span class="badge" style="color: indianred">首</span>
      <span>{{routeInfo.fstsendtime}}</span>
    </span>
    <span class="time-box">
      <span class="badge" style="color: yellowgreen">末</span>
      <span class="">{{routeInfo.lstsendtime}}</span>
    </span>
  </div>
  <div class="diff-time">
    <span v-if="routeInfo.diff">
      预计<strong>{{routeInfo.diffTime}}分钟</strong>后到站
    </span>
    <span v-else>
      等待发车
    </span>
  </div>
  <div class="distance">距离本站<strong>{{ routeInfo.diff}}</strong>站</div>
</div>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";
import {navigateTo, useRoute,useRouter} from "#imports";

const props = defineProps({
  routeInfo: Object as PropType<RouteByStationInfo>,
})
const navigateToDetail = ()=>{
  navigateTo({
    name:'routeDetail',
    params:{
      ...props.routeInfo
    },
    query:{
      segmentId:props.routeInfo.segmentid,
      routeId:props.routeInfo.subrouteid
    }
  })
}
</script>

<style scoped lang="stylus">
@import "../assets/css/routeInfo.styl"
</style>
