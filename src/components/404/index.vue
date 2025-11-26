<template>
  <div class="container">
    <SvgIcon className="picture"></SvgIcon>
    <p class="msg">
     xxx
      <b>xxx</b>
      {xxx
    </p>
    <div class="button">
      <span class="button-text">btn</span>
    </div>
    <div class="logo">
      404
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/assets/svgs/404Banner.svg?component';
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .picture {
    width: 454px;
    height: 202px;
  }
  .overall-logo {
    width: 80px;
    height: 33px;
  }
  .msg {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    color: #4a71d3;
    width: 435px;
  }
  .button {
    width: 289px;
    height: 48px;
    background: #4a71d3;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &-text {
      font-style: normal;
      font-weight: 800;
      font-size: 14px;
      line-height: 18px;
      color: #ffffff;
    }
  }
}

.logo {
  position: absolute;
  bottom: 1rem;
}
@media screen and (max-width: 768px) {
  .container {
    margin: auto 24px;
    .msg {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      width: 100%;
    }
    .picture {
      width: 290px;
    }
    .button {
      width: 234px;
    }
  }
}
</style>
