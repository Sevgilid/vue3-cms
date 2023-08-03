<template>
  <div class="panel-account">
    <el-form
      label-width="60px"
      :model="account"
      size="large"
      :rules="accountRules"
      status-icon
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'

import { localCache } from '@/utils/cache'
// 1.输入框的绑定/定义account数据
const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

// 2.定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}
// 3.执行账号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isKeep: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的帐号和密码
      const name = account.name
      const password = account.password

      // 2.向服务器发送网络请求(携带账号和密码)
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 3.判断是否需要记住密码
        if (isKeep) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
    } else {
      ElMessage.error('Oops, 请输入正确的格式后再登录.')
    }
  })
}
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.panel-account {
  color: red;
}
</style>
