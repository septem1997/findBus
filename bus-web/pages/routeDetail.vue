<template>
  <div class="route-page">
    <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        title="公交到哪了"/>
    <div class="route-box">
      <div class="name">
        {{ routeInfo.subroutename }}
      </div>
      <div class="station-box">
        <span>{{ routeInfo.fststation }}</span>
        <span class="arrow"><van-icon name="down"/></span>
        <span>{{ routeInfo.lststation }}</span>
      </div>
      <div class="time-line">
    <span class="time-box">
      <span class="badge" style="color: indianred">首</span>
      <span>{{ routeInfo.fstsendtime }}</span>
    </span>
        <span class="time-box">
      <span class="badge" style="color: yellowgreen">末</span>
      <span class="">{{ routeInfo.lstsendtime }}</span>
    </span>
      </div>
      <div class="diff-time">
      <span v-if="routeInfo.diff">
        约<strong>{{ routeInfo.diffTime }}分钟</strong>后到站
      </span>
        <span v-else>
        等待发车
      </span>
      </div>
      <div class="distance">
        离
        <strong>{{ nearbyStation }}</strong>
        还有<strong>{{ routeInfo.diff }}</strong>站
      </div>
    </div>

    <div class="station-list">
      <station-item v-for="(sta,index) in stations"
                    :nearby-station="nearbyStation"
                    :is-first="index===0"
                    :is-last="index===stations.length-1"
                    :station="sta" :key="sta.stationid">
      </station-item>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, useRoute} from "#imports";
import MyFetch from "~/apis/fetch";
import useGlobalStore from "~/hooks/globalStore";
import {GetDistance} from "~/utils/distanceUtil";

const route = useRoute();
// todo query 兜底
// const segmentid = ref(route.query.segmentId as string)
// const routeId = ref(route.query.routeId as string)
// const routeInfo = ref(route.params as any as RouteByStationInfo)
const routeInfo = ref({
  diff: "1",
  diffTime: "2",
  fstsendtime: "06:00",
  fststation: "环洲北路东",
  lstsendtime: "21:30",
  lststation: "格力康乐园",
  rundirection: "2",
  segmentid: "60244",
  subrouteid: "225",
  subroutename: "42路"
})
const nearbyStation = ref('')
const onClickLeft = () => history.back();
const stations = ref([] as BusStationInfo[])
const {position} = useGlobalStore()
const getStations = async () => {
  const stationInfos = await MyFetch.getStations(routeInfo.value.segmentid)
  let minDis = Number.MAX_VALUE
  stationInfos.forEach(sta => {
    const dis = GetDistance(sta.latitude, sta.longitude, position.value.latitude, position.value.longitude)
    if (dis < minDis) {
      nearbyStation.value = sta.stationname
    }
  })
  stations.value = stationInfos
}
const getBusStatus = async () => {
  const busList = await MyFetch.getBusStatus({
    subrouteid: routeInfo.value.subrouteid,
    segmentid: routeInfo.value.segmentid
  })
  stations.value.forEach((sta) =>
      sta.busList = busList.filter(bus => bus.stationid === sta.stationid)
  )
  // 遍历所有公交车，把公交车移动到对应站点的busList下
}
const init = async () => {
  if (routeInfo.value.segmentid) {
    // await MyFetch.getSegmentInfo({
    //   segmentid: segmentid.value,
    //   subrouteid: routeId.value
    // })
    await getStations()
    getBusStatus()
  } else {
    // todo 返回首页
  }
}
onMounted(async () => {
  init()
})
</script>

<style scoped lang="stylus">
@import "../assets/css/routeInfo.styl"
.route-page {
  background #eee
  width 100vw
  height 100vh
  display flex
  flex-direction column
}

.station-list {
  margin-top 12px
  background white
  height 0
  overflow auto
  flex 1
  padding 16px
}

.route-box {
  background white
  border-bottom none
  padding 16px

  .distance {
    position relative
    bottom auto
    right auto
    margin-top 12px
  }

  .diff-time {
    top auto
    bottom 16px
  }
}
</style>
