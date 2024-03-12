<template>
  <div class="iconSpan_item">
    <RouterLink
      to="/"
      style="
        text-decoration: none;
        color: inherit;
        background-color: transparent;
        display: flex;
        align-items: center;
      "
    >
      <el-text v-if="spanModel" class="item_txt" :style="`--my-content: '${itemBeforeIcon}';`">{{
        itemT
      }}</el-text>
      <el-dropdown v-else @command="handleCommand">
        <span class="el-dropdown-link" :style="`--my-content: '${itemBeforeIcon}';`">
          {{ itemT
          }}<el-icon class="el-icon--right"
            ><svg
              t="1710237213521"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1703"
              width="200"
              height="200"
            >
              <path
                d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z"
                fill="#222222"
                p-id="1704"
              ></path>
            </svg>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a"></el-dropdown-item>
            <el-dropdown-item command="b"></el-dropdown-item>
            <el-dropdown-item command="c"></el-dropdown-item>
            <el-dropdown-item command="d"></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref, onMounted ,reactive} from 'vue'
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

const handleCommand = (command: string | number | object) => {
//   ElMessage(`click on item ${command}`)
}
const props = defineProps(['msg'])
let orVal = toRefs(props)
let itemT = ref<string>(orVal['msg']?.value?.txt)
let itemBeforeT = ref<string>(orVal['msg']?.value?.before)
// let itemChild = ref<>
let itemBeforeIcon = ref<string>(itemBeforeT.value)
let spanModel = ref<boolean>()

onMounted(() => {
  spanModel.value = itemT.value == '主页' || itemT.value == '关于'
  if(spanModel.value){
  


  }
})
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

  .el-dropdown-link {
    display: flex;
    align-items: center;
    &::before {
      content: var(--my-content);
    }
  }
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
