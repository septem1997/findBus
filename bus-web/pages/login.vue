<template>

  <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  >
    <template #title>
      {{ mode === Mode.Signup ? '注册' : '登陆' }}
    </template>
  </van-nav-bar>
  <div class="login-page">
    <van-form
        validate-trigger="onSubmit"
        @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="email"
            name="email"
            label="邮箱"
            type="email"
            autocomplete="email"
            placeholder="邮箱"
            :rules="[{ required: true, message: '请填写邮箱' },
          { validator: emailValidator,message: '请输入正确的邮箱' }]"
        />
        <van-field
            v-if="mode!==Mode.Check"
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
            v-if="mode===Mode.Signup"
            v-model="confirmPwd"
            type="password"
            name="confirmPwd"
            label="确认密码"
            placeholder="再次输入密码"
            :rules="[{ required: true, message: '请再次输入密码' },
            {validator: confirmValidator,message: '两次密码不一致'}]"
        />
        <van-field
            v-if="mode===Mode.Signup"
            v-model="validCode"
            center
            clearable
            name="validCode"
            type="number"
            :rules="[{ required: true, message: '请输入验证码' }]"
            label="验证码"
            placeholder="请输入邮箱验证码"
        >
          <template #button>
            <van-button
                :disabled="second>0"
                @click="sendCode"
                size="small" type="primary">
              {{ second > 0 ? `${second}` : '发送验证码' }}
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button
            :loading="isLoading"
            round block type="primary" native-type="submit">
          {{ mode.valueOf() }}
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, ref, watch} from "#imports";
import MyFetch from "~/apis/fetch";
import useGlobalStore from "~/hooks/globalStore";

enum Mode {
  Check = '下一步',
  Login = '登陆',
  Signup = '注册'
}

const second = ref(0)
const onClickLeft = () => history.back();
const email = ref('')
const password = ref('')
const confirmPwd = ref('')
const validCode = ref('')
const isLoading = ref(false)
const mode = ref(Mode.Check)
const {setUser} = useGlobalStore()
const emailValidator = (val) => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val);
const confirmValidator = () => password.value === confirmPwd.value
const sendCode = async () => {
  const success = await MyFetch.sendEMail(email.value)
  if (success) {
    second.value = 60
    const updateSec = () => {
      second.value = second.value - 1
      if (second.value > 0) {
        setTimeout(updateSec, 1000)
      }
    }
    updateSec()
  }
}
const onSubmit = async (values) => {
  isLoading.value = true
  try {
    if (mode.value === Mode.Check) {
      const available = await MyFetch.checkEmail(values.email)
      mode.value = available ? Mode.Signup : Mode.Login
    } else if (mode.value === Mode.Signup) {
      const res = await MyFetch.signUp(values)
      setUser(res)
      history.back()
    } else if (mode.value === Mode.Login) {
      const res = await MyFetch.login(values)
      setUser(res)
      history.back()
    }
  }finally {
    isLoading.value = false
  }
};
watch(() => email.value, (newVal, oldValue) => {
  if (mode.value !== Mode.Check) {
    mode.value = Mode.Check
    password.value = ''
  }
})
</script>

<style scoped lang="stylus">
.login-page {
  background #eee
  width 100vw
  height calc(100vh - 46px)
  display flex
  flex-direction column
  justify-content center
}
</style>
