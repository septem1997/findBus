<template>
<div>
  <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :title="stationname" />
</div>
</template>

<script setup lang="ts">
import {definePageMeta, onActivated, onMounted, onUpdated, ref, useRoute} from "#imports";

// definePageMeta({
//   keepalive:true
// })
const stationname = ref('')
const segmentid = ref('')
const route = useRoute();
const onClickLeft = () => history.back();
const init = ()=>{
  console.log(route.query.name)
  stationname.value = 'asdasd'
  // segmentid.value = route.query.id as string
}
onMounted(()=>{
  console.log(1)
  init()
})
// onActivated(()=>{
//   console.log(2)
//   init()
// })
</script>

<style scoped>

</style>
