<template>
  <div class="station-box">
    <van-button
        class="subscribe"
        icon="envelop-o"
        type="primary"
        size="mini"
        @click="subscribe"
    >
      订阅
    </van-button>
    <div class="bus-panel">
      <div class="bus-number" v-if="onStations.length">
        <div v-for="bus in onStations">
          {{ bus.cardid }}
        </div>
      </div>
    </div>
    <div class="dashed-line" v-if="!isLast">
      <div class="card-icon" v-for="bus in leavedStations">
        车
        <div class="bus-number">
          {{ bus.cardid }}
        </div>
      </div>
    </div>
    <div class="circle">
      <div class="card-icon" v-if="onStations.length">
        车
      </div>
    </div>
    <div class="station">
      <div class="name"
           :class="{highlight:nearbyStation===station.stationname}">
        {{ station.stationname }}
      </div>
      <div v-if="isFirst||isLast" style="font-size: 12px;color: #999">
        {{ isFirst ? '始发站' : '终点站' }}
      </div>
    </div>
    <van-popup v-model:show="showStartTime" position="bottom">
      <van-datetime-picker
          v-model="startTime"
          type="time"
          title="选择时间"
          :min-hour="6"
          :max-hour="23"
          @confirm="onStartTimeConfirm"
          @cancel="showStartTime = false"
      />
    </van-popup>
    <van-popup v-model:show="showEndTime" position="bottom">
      <van-datetime-picker
          v-model="endTime"
          type="time"
          title="选择时间"
          :min-hour="6"
          :max-hour="23"
          @confirm="onEndTimeConfirm"
          @cancel="showEndTime = false"
      />
    </van-popup>
    <van-popup
        v-model:show="show"
        closeable
        close-icon="close"
        position="bottom"
        round
        :style="{ height: '30%' }"
    >
      <div class="title">订阅公交路线提醒</div>
      <van-field
          v-model="startTime"
          is-link
          readonly
          label="开始时间"
          placeholder="点击选择时间"
          @click="showStartTime = true"
      />
      <van-field
          v-model="endTime"
          is-link
          readonly
          label="结束时间"
          placeholder="点击选择时间"
          @click="showEndTime = true"
      />
      <div class="tips">
        在以上时间段提醒我
        <strong>{{station.stationname}}站</strong>
        的公交车到站情况
      </div>
      <div style="text-align: center">
        <van-button
            @click="confirmSubscribe"
            style="width: calc(100% - 16px)"
            round  type="primary" native-type="submit">
          确定
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import {ComputedRef, PropType} from "@vue/runtime-core";
import {computed, navigateTo, ref, useRoute, useRouter} from "#imports";
import {Toast} from "vant";
import MyFetch from "~/apis/fetch";
import useGlobalStore from "~/hooks/globalStore";

const props = defineProps({
  station: Object as PropType<BusStationInfo>,
  isFirst: Boolean,
  isLast: Boolean,
  nearbyStation:String
})
const {user} = useGlobalStore()
const onStations:ComputedRef<BusStatusInfo[]> = computed(() =>
    props.station.busList ? props.station.busList.filter(b => b.arrivesymbol === 1) : []
)
const leavedStations:ComputedRef<BusStatusInfo[]> = computed(() =>
    props.station.busList ? props.station.busList.filter(b => b.arrivesymbol === 2) : []
)
const showStartTime = ref(false)
const showEndTime = ref(false)
const endTime = ref('')
const startTime = ref('')
const show = ref(false)
const route = useRoute()
const onStartTimeConfirm = (val)=>{
  startTime.value = val
  showStartTime.value = false
}
const onEndTimeConfirm = (val)=>{
  endTime.value = val
  showEndTime.value = false
}
const subscribe = ()=>{
  if (user.value){
    show.value = true
  }else{
    navigateTo({
      name:'login'
    })
  }
}
const confirmSubscribe = async () => {
  if (!startTime.value || !endTime.value) {
    Toast.fail('请选择时间')
    return
  }
  if (new Date(`1997-01-15 ${startTime.value}`).getTime() >=
      new Date(`1997-01-15 ${endTime.value}`).getTime()) {
    Toast.fail('开始时间不得大于结束时间')
    return
  }
  const success = await MyFetch.subscribe({
    stationname: props.station.stationname,
    clockEndTime: endTime.value,
    clockStartTime: startTime.value,
    segmentid: route.query.segmentId as string,
    subrouteid: route.query.routeId as string
  })
  if (success) {
    Toast.success('订阅成功')
    show.value = false
  }
}
</script>

<style scoped lang="stylus">
.title{
  margin 16px 16px
  font-weight bold
  color #333
}
.tips{
  font-size 14px
  margin 16px
  color #666
  strong{
    color #2176ff
  }
}
.station-box {
  display flex
  width 100%
  position relative
  .subscribe{
    position absolute
    right 12px
    top 1px
    color white
  }
  .highlight{
    color #2176ff!important
  }

  .bus-panel {
    width 100px
  }
  .bus-number{
    display inline-block
    background black
    color white
    font-size 14px
    padding 4px
    border-radius 6px
    position relative
    z-index 0
    &::after{
      position absolute
      content " "
      width 12px
      height 12px
      border-radius 2px
      right -2px
      top 6px
      background black
      transform rotate(45deg)
      z-index -1
    }
  }

  .dashed-line {
    min-height 68px
    background-image: linear-gradient(to bottom, #999 0%, #999 50%, transparent 50%);
    background-size: 1px 20px;
    width 1px
    transform translateY(20px)
    .card-icon{
      &:last-child{
        margin-bottom 30px
      }
      transform: translateX(-9px)
      margin 12px 0
      position relative
      .bus-number{
        position absolute
        left -92px
      }
    }
  }

  .name {
    font-weight bold
    color #666
  }

  .station {
    margin-left 24px
  }

  .card-icon {
    font-size 12px
    border-radius 50%
    width 17px
    background white
    height 17px
    text-align center
    line-height 17px
    border 1px solid indianred
  }

  .circle {
    position absolute
    top 1px
    left 92px
    background white
    width 15px
    height 15px
    border 1px solid #2176ff
    border-radius 50%
    .card-icon{
      position absolute
      left -2px
      top -2px
    }
  }
}
</style>
