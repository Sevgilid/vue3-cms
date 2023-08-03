<template>
  <div class="panel">
    <h1>后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="card" stretch v-model="activeName">
        <el-tab-pane label="账号登录" name="account">
          <pannelAccount ref="accountRef"></pannelAccount>
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <pannelPhone></pannelPhone>
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机号登录</span>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部 -->
    <div class="control">
      <el-checkbox v-model="isKeep" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="loginClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import pannelAccount from './panel-account.vue'
import pannelPhone from './panel-phone.vue'
import { ref, watch } from 'vue'
// const isKeep = ref(false)
// 记住密码状态的配置
const isKeep = ref<boolean>(localCache.getCache('isKeep') ?? 'false')
watch(isKeep, (newValue) => {
  localCache.setCache('isKeep', newValue)
})
console.log(isKeep.value)

// 账号登录绑定
const activeName = ref('account')
const accountRef = ref<InstanceType<typeof pannelAccount>>()
function loginClick() {
  if (activeName.value === 'account') {
    // 通过实例调用子组件方法时把记住密码iskeep状态传递过去
    accountRef.value?.loginAction(isKeep.value)
  } else {
    console.log('正在手机登录')
  }
}
</script>

<style lang="less" scoped>
.panel {
  width: 330px;
  margin-bottom: 150px;
  h1 {
    text-align: center;
    margin-bottom: 15px;
  }
  // tabs样式
  .tabs {
    .label {
      display: flex;
      justify-content: center;
      align-items: center;
      .text {
        margin-left: 5px;
      }
    }
  }

  // 底部样式
  .control {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
