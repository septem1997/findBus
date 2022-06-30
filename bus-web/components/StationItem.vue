<template>
  <div class="station-box">
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
  </div>
</template>

<script setup lang="ts">
import {ComputedRef, PropType} from "@vue/runtime-core";
import {computed, navigateTo, useRoute, useRouter} from "#imports";

const props = defineProps({
  station: Object as PropType<BusStationInfo>,
  isFirst: Boolean,
  isLast: Boolean,
  nearbyStation:String
})
const onStations:ComputedRef<BusStatusInfo[]> = computed(() =>
    props.station.busList ? props.station.busList.filter(b => b.arrivesymbol === 1) : []
)
const leavedStations:ComputedRef<BusStatusInfo[]> = computed(() =>
    props.station.busList ? props.station.busList.filter(b => b.arrivesymbol === 2) : []
)
</script>

<style scoped lang="stylus">
.station-box {
  display flex
  width 100%
  position relative
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
