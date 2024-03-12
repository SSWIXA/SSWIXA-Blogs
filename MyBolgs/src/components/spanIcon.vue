<template>
  <div class="iconSpan_item">
    <RouterLink to="/" style="text-decoration: none; color: inherit; background-color: transparent">
      <el-text class="item_txt" :style="`--my-content: '${itemBeforeIcon}';`">{{ itemT }}</el-text>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref } from 'vue'

const props = defineProps(['msg']);
let orVal = toRefs(props);
let itemT = ref<string>(orVal['msg']?.value?.txt);
let itemBeforeT = ref<string>(orVal['msg']?.value?.before);
let itemBeforeIcon = ref<string>(itemBeforeT.value);
</script>


<style scoped lang="scss">

.iconSpan_item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px 0 10px;
  .item_txt {
    &::before {
      content: var(--my-content);
    }
  }
}

</style>
