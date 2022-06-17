<template>
<div class="station-box">
  <div class="name">
    {{stationInfo.stationname}}
  </div>
  <div class="distance">距离您{{stationInfo.distance.toFixed(0)}}米</div>
</div>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";

const props = defineProps({
  stationInfo: Object as PropType<NearbyStationInfo>,
})
</script>

<style scoped lang="stylus">
.station-box{
  display flex
}
</style>
