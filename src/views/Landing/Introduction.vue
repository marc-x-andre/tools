<template>
  <n-grid :cols="isTablet ? 1 : 3" :x-gap="40" class="introduction">
    <n-gi span="12 800:6">
      <h1 class="handwrite" style="font-size: 2.4em">
        <span class="gradient text">JSON Tools </span>
        🍻
      </h1>
      <p>
        Whether you need to validate, format, or manipulate JSON, our
        easy-to-use utilities will streamline your tasks.
      </p>
      <SlideDownIcon />
    </n-gi>
  </n-grid>
</template>

<script setup>
import SlideDownIcon from "@/components/SlideDownIcon.vue";
</script>

<style lang="sass">
@import vars
.introduction
  min-height: 40vh
  align-items: center
.with-switch
  position: relative
  font-weight: normal !important
  font-size: 1.2rem
  .n-switch
    margin-right: 0.5rem
.floating
  display: flex
  position: relative
  width: 100%
  height: fit-content
  span
    animation: float 6s ease-in-out infinite
    animation-direction: alternate
    position: absolute
    left: 50%
    top: 50%
    font-size: 2em
    &:nth-child(2)
      animation-duration: 4.7s
      animation-direction: alternate-reverse
      left: 80%
      top: 70%
    &:nth-child(3)
      animation-duration: 6.3s
      left: 18%
      top: 77%
    &:nth-child(4)
      animation-duration: 5.7s
      animation-direction: alternate-reverse
      left: 7%
      top: 45%
    &:nth-child(5)
      animation-duration: 5.2s
      left: 86%
      top: 35%
    &:nth-child(6)
      animation-duration: 5.2s
      animation-direction: alternate-reverse
      left: 22%
      top: 6%
    &:nth-child(7)
      animation-duration: 6.2s
      left: 77%
      top: 77%
    &:nth-child(8)
      animation-duration: 5.3s
      left: 72%
      top: 7%
    &:nth-child(9)
      animation-duration: 6s
      animation-direction: alternate-reverse
      left: 33%
      top: 90%
    &:nth-child(10)
      animation-duration: 4.3s
      animation-direction: alternate-reverse
      left: 19%
      top: 8%

@keyframes float
  0%
    transform: translatey(0px) rotate(4deg)
  100%
    transform: translatey(-25px) rotate(-4deg)
</style>
