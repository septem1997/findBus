<template>
  <div class="search-page">
    <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        title="搜索"/>
    <van-search
        v-model="keyword"
        @search="searchByKeyword"
        class="search-bar"
                placeholder="搜索公交路线"/>
    <div class="result" v-if="searchRes.length" >
      <div class="route-box"
           @click="navigateToDetail(route)"
           v-for="route in searchRes" :key="route.segmentid">
        <div class="name">{{route.subroutename}}</div>
        <div class="stations">
          <span>{{route.fststation}}</span>
          <span>&nbsp;-&nbsp;</span>
          <span>{{route.lststation}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {navigateTo, ref} from "#imports";
import MyFetch from "~/apis/fetch";
const onClickLeft = () => history.back();
const keyword = ref('')
const searchRes = ref([] as RouteByStationInfo[])
const searchByKeyword = async () => {
  searchRes.value = await MyFetch.getRoutesByLineName(keyword.value)
}
const navigateToDetail = (routeInfo)=>{
  navigateTo({
    name:'routeDetail',
    params:{
      ...routeInfo
    },
    query:{
      segmentId:routeInfo.segmentid,
      routeId:routeInfo.subrouteid
    }
  })
}
</script>

<style scoped lang="stylus">
.search-page {
  background #eee
  width 100vw
  height 100vh
  display flex
  flex-direction column
}
.result{
  height 0
  overflow auto
  flex 1
  background white
  margin-top 16px
  padding 0 16px
  .route-box{
    padding 6px 0
    border-bottom 1px solid #ddd
    font-size 14px
    .stations{
      color #999
      font-size 12px
    }
  }
}
</style>
