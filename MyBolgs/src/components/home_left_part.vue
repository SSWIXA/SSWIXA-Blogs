<template>
  <div class="showlist">
    <div class="list" v-if="showList">
      <PagePart v-for="item in itemMessage" :key="item.title" :msg="item" />
    </div>
    <div class="list" v-else></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PagePart from '@/components/PagePart.vue'
import { getAllArticles } from '@/api/articleService'

const showList = ref(false)
const itemMessage = ref<any[]>([])

onMounted(() => {
  getData()
})

async function getData() {
  try {
    const data = await getAllArticles()
    itemMessage.value = data
    showList.value = true
    console.log('itemMessage', itemMessage.value)
  } catch (error) {
    console.error('获取文章列表失败:', error)
  }
}
</script>

<style scoped lang="scss"></style>