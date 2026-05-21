<template>
  <div class="blur_mask login-wrapper">
    <div class="login-card">
      <h2 class="login-title">🔐 管理员登录</h2>
      <el-form :model="form" ref="formRef" :rules="rules" label-width="0" @keyup.enter="handleLogin">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名" :prefix-icon="User" size="large" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="密码" :prefix-icon="Lock"
            show-password size="large" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" :loading="loading" @click="handleLogin" style="width:100%">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import axiosInstance from '@/axios/axios'

const router = useRouter()
const formRef = ref()
const loading = ref(false)
const form = reactive({ username: '', password: '' })
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleLogin = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return
  loading.value = true
  try {
    const res = await axiosInstance.post('/auth/login', form)
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    ElMessage.success('登录成功')
    router.push('/admin')
  } catch (err) {
    ElMessage.error(err.message || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  backdrop-filter: blur(150px);
}

.login-card {
  width: 380px;
  padding: 40px 30px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  .login-title {
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 30px;
    color: #333;
  }
}

// 暗黑模式
.dark-mode .login-wrapper {
  background-color: rgba(26, 26, 26, 0.8) !important;
}

.dark-mode .login-card {
  background: rgba(40, 40, 40, 0.9) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  .login-title { color: #e2e8f0; }
}
</style>
