<template>
<div class="route-box">
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

const props = defineProps({
  routeInfo: Object as PropType<RouteByStationInfo>,
})
</script>

<style scoped lang="stylus">
.route-box{
  padding 12px 0
  border-bottom 1px solid #ddd
  position relative
  .name{
    font-weight bold
    font-size 18px

  }
  .diff-time,.distance{
    position absolute
    right 12px
    font-size 14px
    color #666
    strong{
      color #2176ff
      margin 0 2px
    }
  }
  .diff-time{
    top 12px
  }
  .distance{
    bottom 12px
  }

  .station-box{
    color #666
    margin 8px 0
    font-size 14px
    .arrow i{
      margin 0 4px
      color #2176ff
      transform rotate(-90deg)
    }
  }
  .time-line{
    display flex
    align-items center
  }
  .time-box{
    margin-right 12px
    font-size 14px
    line-height 14px
    display flex
    align-items center
    color #999
    .badge{
      font-size 12px
      padding 1px
      margin-right 4px
      border 1px solid currentColor
      border-radius 4px
    }
  }
}
</style>
