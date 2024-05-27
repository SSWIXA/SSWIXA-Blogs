<template>
  <div class="showlist">
    <div class="list" v-if="showList">
      <PagePart v-for="item in itemMessage" :key="item.title" :msg="item" />
    </div>
    <div class="list" v-else></div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import PagePart from '@/components/PagePart.vue'
import axiosInstance from '@/axios/axios'
let showList: any = ref(false)
// 获取数据用于展示
let itemMessage: any = ref([])

onMounted(() => {
  getData(`317821/showItem`)
})

onBeforeMount(() => {

})

async function getData(url: string) {
  await axiosInstance.get(url).then((res) => {
    itemMessage.value = res?.data?.data
    showList.value = true
  })
}

</script>
<style scoped lang="scss"></style>
