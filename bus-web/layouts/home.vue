<template>
  <div class="container">
    <div class="page">
      <slot/>
    </div>
    <tabbar v-model="active">
      <tabbar-item name="home"  icon="map-marked">公交查询</tabbar-item>
      <tabbar-item name="subscribe" icon="star">我的订阅</tabbar-item>
    </tabbar>
  </div>
</template>

<script setup lang="ts">
import {ref, useRouter, watch} from "#imports";
import { Tabbar, TabbarItem } from 'vant';

const active = ref('home')
const router = useRouter();
watch(()=>active.value,(index)=>{
  switch (index){
    case 'home':{
      router.replace('/')
      break
    }
    case 'subscribe':{
      router.replace('/subscribe')
      break
    }
  }
})
</script>

<style scoped lang="stylus">
.container{
  position fixed
  left 0
  right 0
  bottom 0
  top 0
  .page{
    overflow auto
    position absolute
    left 0
    right 0
    top 0
    bottom 50px
  }
}
</style>
