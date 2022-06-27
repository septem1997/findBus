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

const route = useRoute();
const stationname = ref(route.query.name as string)
const segmentid = ref(route.query.id as string)
const onClickLeft = () => history.back();
</script>

<style scoped>

</style>
