<template>
  <div class="iconSpan_item">
    <RouterLink
      :to="itemRouter"
      style="
        text-decoration: none;
        color: inherit;
        background-color: transparent;
        display: flex;
        align-items: center;
      "
    >
      <el-text
        v-if="spanModel"
        class="item_txt_before"
        :style="`--my-content: '${itemBeforeIcon}';`"
        >{{ itemT }}
        <el-icon class="el-icon--right" v-if="specialIcon" style="margin-left: 0">
          <svg
            t="1710314679307"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1703"
            width="200"
            height="200"
          >
            <path
              d="M972.8 549.9136v294.7584A128.0768 128.0768 0 0 1 844.8 972.8H179.2a128 128 0 0 1-128-128V179.2c0-70.7328 57.1904-128 127.872-128h202.3168a25.6 25.6 0 0 0 0-51.2H179.072A179.072 179.072 0 0 0 0 179.2v665.6a179.2 179.2 0 0 0 179.2 179.2h665.6c98.944 0 179.2-80.2816 179.2-179.328V549.9136a25.6 25.6 0 0 0-51.2 0z"
              fill="#222222"
              p-id="1704"
            ></path>
            <path
              d="M960 128c-353.4592 0-640 286.5408-640 640a25.6 25.6 0 0 0 51.2 0c0-325.1968 263.6032-588.8 588.8-588.8a25.6 25.6 0 0 0 0-51.2z"
              fill="#222222"
              p-id="1705"
            ></path>
            <path
              d="M720.1024 62.1568l256 102.4a25.6 25.6 0 0 0 18.9952-47.5136l-256-102.4a25.6 25.6 0 0 0-18.9952 47.5136z"
              fill="#222222"
              p-id="1706"
            ></path>
            <path
              d="M808.8064 348.4672l194.6368-189.312a25.6 25.6 0 1 0-35.6864-36.7104L773.12 311.7568a25.6 25.6 0 1 0 35.6864 36.7104z"
              fill="#222222"
              p-id="1707"
            ></path>
          </svg>
        </el-icon>
      </el-text>
      <el-dropdown v-else>
        <span class="el-dropdown-link" :style="`--my-content: '${itemBeforeIcon}';`">
          {{ itemT
          }}<el-icon class="el-icon--right">
            <svg
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
          <el-dropdown-menu class="drop_menu">
            <el-dropdown-item command="a" v-for="item in itemChild">
              <el-text class="secondTxt" :style="`--my-content: '${item.before}';`">{{
                item.txt
              }}</el-text>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const handleCommand = (command: string | number | object) => {
  //点击二级菜单时会触发的回调
  //   ElMessage(`click on item ${command}`)
}

const props = defineProps(['msg'])
let orVal = toRefs(props)
let itemT = ref<string>(orVal['msg']?.value?.txt) //右侧导航栏文本
let itemBeforeT = ref<string>(orVal['msg']?.value?.before) //右侧导航栏icon响应式
let itemChild = ref(orVal['msg']?.value?.child) //右侧导航栏子栏
let itemBeforeIcon = ref<string>(itemBeforeT.value) //右侧导航栏icon内容
let itemRouter = ref<string>(orVal['msg']?.value?.router)
let spanModel = ref<boolean>(true) //是否有二级菜单
let specialIcon = ref<boolean>(false) //使用特殊iconSVG
onMounted(() => {
  spanModel.value = itemChild.value.length == 0
  specialIcon.value = itemT.value == 'Gitee'
})
</script>

<style scoped lang="scss">
.iconSpan_item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px 0 10px;
  box-sizing: border-box;

  .item_txt_before {
    &::before {
      content: var(--my-content);
    }
    &:hover {
      border-bottom: solid 2px purple;
    }
  }
  .item_txt_after {
    &::after {
      content: var(--my-content);
    }
  }
  .el-dropdown {
    padding-bottom: 3px;
    padding-top: 3px;
    &:hover {
      border-bottom: solid 2px purple;
    }
    .el-dropdown-link {
      display: flex;
      align-items: center;
      &::before {
        content: var(--my-content);
      }
      &:focus-visible {
        outline: none;
      }
    }
  }
}

.drop_menu {
  ::v-deep .el-dropdown-menu__item {
    &:not(.is-disabled) {
      &:focus {
        background-color: #efefef;
      }
    }
    &:hover {
      background-color: #efefef;
    }
    .secondTxt {
      &::before {
        content: var(--my-content);
      }
      &:hover {
        color: blueviolet;
      }
    }
  }
}
</style>
