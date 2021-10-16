<template>
  <!-- <n-layout-content> -->
  <!-- <n-message-provider> -->
  <div class="login">
    <n-spin :show="spinShow">
      <div class="login-card">
        <div class="login-card-left">
          <div class="content">
            <div class="logo">MOON_STUDIO</div>
            <div class="title">Welcome to</div>
            <div class="title">ADMIN</div>
            <div class="username">USERNAME</div>
            <n-input v-model:value="name" size="large" placeholder="没错，就是你的用户名" clearable />
            <div class="password">PASSWORD</div>
            <n-input size="large" v-model:value="psw" type="password" showPasswordOn="click" placeholder="密码是什么来着" clearable />
            <div class="submit">
              <n-button type="info" @click="handleLogin">LOG IN</n-button>
            </div>
            <div class="forgot">Forgot your password?</div>
          </div>
        </div>
        <div class="login-card-center">
          <div class="login-card-center-circles">
            <div class="login-card-center-circles-row">
              <div class="login-card-center-circles-row-light"></div>
              <div class="login-card-center-circles-row-deep"></div>
            </div>
            <div class="login-card-center-circles-row">
              <div class="login-card-center-circles-row-light"></div>
              <div class="login-card-center-circles-row-deep"></div>
            </div>
          </div>
        </div>
        <div class="login-card-right">
          <div class="login-card-right-info">
            <div class="login-card-right-info-details">测试文字</div>
          </div>
          <div class="login-card-right-petal"></div>
        </div>
      </div>
    </n-spin>
  </div>
  <!-- </n-message-provider> -->
  <!-- </n-layout-content> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NInput, NSpin, NMessageProvider,useMessage } from 'naive-ui'

import useEvent from './useEvent'
import { useRouter } from 'vue-router'

const router = useRouter()
const msg = useMessage()
const name = ref('')
const psw = ref('')
const spinShow = ref(false)
const event = useEvent(msg,router)


const handleLogin = async () => {
  event.handleLogin(name, psw, spinShow)
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #060238;
  display: flex;
  align-items: center;
  justify-content: center;

  &-card {
    position: relative;
    display: flex;
    width: 1300px;
    height: 800px;
    min-height: 780px;
    border-radius: 25px;
    background-color: #fff;

    &-left {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;

      .content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        width: 70%;
        height: 50%;

        .logo,
        .title,
        .username,
        .password {
          width: 100%;
          text-align: left;
        }

        .title {
          font-size: 50px;
          font-weight: bold;
        }

        .username,
        .password {
          font-weight: bold;
          margin: 10px 0;
        }

        .n-input {
          border-radius: 5px;
        }

        .submit {
          width: 100%;
          margin: 20px 0;

          .n-button {
            width: 100%;
          }
        }

        .forgot {
          width: 100%;
        }
      }
    }

    &-center {
      position: relative;
      width: 400px;

      &-circles {
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        height: 50%;

        &-row {
          width: 100%;
          height: 50%;
          display: flex;
          justify-content: flex-end;

          &-light {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background-color: #fadca0;
          }

          &-deep {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background-color: #f3b63f;
          }
        }
      }
    }

    &-right {
      position: relative;
      width: 400px;

      &-info {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 50%;
        border-top-right-radius: 25px;
        background-color: #97a6e0;

        &-details {
          display: flex;
          justify-content: center;
          color: #fff;
          width: 100%;
          height: 100%;
          border-top-right-radius: 25px;
          border-bottom-right-radius: 100%;
          background-color: #3e54d8;
        }
      }

      &-petal {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50%;
        border-radius: 50%;
        border-bottom-right-radius: 25px;
        background-color: #ed6271;
      }
    }
  }
}
</style>
