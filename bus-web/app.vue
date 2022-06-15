<template>
  <div>
    <NuxtWelcome/>
  </div>
</template>

<script setup lang="ts">
$fetch('https://ssgj.zhtdtech.com/zhtpufa/sanlei/getWeather',{
  headers:{
    'Sec-Fetch-Dest':'empty',
    'Sec-Fetch-Mode':'cors',
    'Sec-Fetch-Site':'cross-site',
    'xweb_xhr':'1'
  }
})
</script>
