<template>
  <div class="login-container flex min-h-screen">
    <!-- 左侧背景和插画区域 -->
    <div class="login-left relative flex-1 hidden lg:flex items-center justify-center overflow-hidden">
      <img 
        :src="bgImg" 
        alt="background" 
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="illustration-wrapper relative z-10">
        <Illustration 
          class="w-full max-w-lg"
        />
      </div>
    </div>

    <!-- 右侧登录表单区域 -->
    <div class="login-right flex-1 flex items-center justify-center bg-white p-8">
      <div class="login-form-wrapper w-full max-w-md">
        <!-- Logo -->
        <div class="logo-wrapper flex justify-center mb-8">
          <Logo 
            class="w-16 h-16"
          />
        </div>

        <!-- 品牌名称 -->
        <h1 class="brand-name text-center text-3xl font-bold text-gray-800 mb-12">
          FPADMIN
        </h1>

        <!-- 登录表单 -->
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="off"
          label-position="top"
        >
          <el-form-item prop="username" class="form-item-custom">
            <el-input
              v-model="loginForm.username"
              placeholder="admin"
              size="small"
              clearable
              class="custom-input"
            >
              <template #prefix>
                <el-icon class="input-icon">
                  <User />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password" class="form-item-custom">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              size="small"
              show-password
              clearable
              class="custom-input"
              @keyup.enter="handleLogin"
            >
              <template #prefix>
                <el-icon class="input-icon">
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item class="form-item-custom mb-0">
            <el-button
              type="primary"
              class="w-full login-button"
              :loading="loading"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import Cookies from 'js-cookie';
import { delay } from '@/utils/utils';
import bgImg from '@/assets/images/login/bg.png';
import Illustration from '@/assets/svgs/illustration.svg?component';
import Logo from '@/assets/svgs/logo.svg?component';
import type { FormInstance, FormRules } from 'element-plus';

interface LoginForm {
  username: string;
  password: string;
}

const router = useRouter();
const loginFormRef = ref<FormInstance | null>(null);
const loading = ref<boolean>(false);

const loginForm = reactive<LoginForm>({
  username: '',
  password: ''
});

const loginRules: FormRules<LoginForm> = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
};

const handleLogin = async (): Promise<void> => {
  if (!loginFormRef.value) return;
  
  try {
    await loginFormRef.value.validate();
    loading.value = true;
    
    // 模拟登录请求延迟
    await delay();
    // 模拟生成 token
    const token = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // 将 token 存储到 cookie，设置过期时间为 7 天
    Cookies.set('token', token, { expires: 7 });
    
    ElMessage.success('登录成功');
    
    // 登录成功后跳转到首页
    router.push('/');
  } catch (error) {
    if (error !== false) {
      ElMessage.error('登录失败，请检查用户名和密码');
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="less" scoped>
.login-container {
  min-height: 100vh;
  background: #fff;
}

.login-left {
  position: relative;
  background: #c3cde6;
  
  img {
    object-fit: cover;
    opacity: 0.8;
  }
}

.illustration-wrapper {
  z-index: 2;
  padding: 3rem;
  max-width: 90%;
}

.brand-name {
  letter-spacing: 4px;
  color: #303f5b;
  font-weight: 600;
  margin-bottom: 3rem;
}

.login-form-wrapper {
  padding: 0 1rem;
}

.login-form {
  :deep(.form-item-custom) {
    margin-bottom: 24px;
    
    .el-form-item__label {
      display: none;
    }
    
    .el-form-item__error {
      padding-top: 4px;
    }
  }

  :deep(.custom-input) {
    .el-input__wrapper {
      border-radius: 8px;
      box-shadow: 0 0 0 1px #e4e7ed inset;
      padding: 14px 16px;
      transition: all 0.3s;
      background: #fff;
      
      &:hover {
        box-shadow: 0 0 0 1px #c0c4cc inset;
      }
      
      &.is-focus {
        box-shadow: 0 0 0 1px #386bf3 inset;
      }
    }
    
    .el-input__inner {
      padding-left: 12px;
      font-size: 14px;
      color: #303f5b;
      
      &::placeholder {
        color: #909399;
      }
    }
  }

  .input-icon {
    font-size: 20px;
    color: #909399;
  }

  :deep(.login-button) {
    height: 48px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    border: none;
    letter-spacing: 1px;
  }
}

.logo-wrapper {
  img {
    width: 64px;
    height: 64px;
  }
}

// 移动端适配
@media screen and (max-width: 1024px) {
  .login-left {
    display: none;
  }
  
  .login-right {
    min-height: 100vh;
    padding: 2rem 1rem;
  }
  
  .brand-name {
    font-size: 24px;
    margin-bottom: 2rem;
  }
  
  .logo-wrapper {
    margin-bottom: 1.5rem;
  }
}
</style>
