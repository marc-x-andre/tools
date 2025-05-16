<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="handwrite hero-title" style="font-size: 2.4em">
        <span class="gradient text">JSON Tools & Base64 Converter</span> 🍻
      </h1>
      <p class="tagline">
        Convert, validate, and format JSON & Base64 instantly.
        <br />
        All your essential developer tools, in one place.
      </p>
      <SlideDownIcon />
    </div>
  </section>
</template>

<script setup>
import SlideDownIcon from "@/components/SlideDownIcon.vue";
</script>

<style lang="sass">
@import vars
.introduction
  min-height: 30vh
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

.hero
  display: flex
  justify-content: center
  align-items: flex-start
  padding-top: 4rem
.hero-content
  width: 100%
  max-width: 66vw
  margin: 0 auto
  display: flex
  flex-direction: column
  align-items: center
  text-align: center
</style>
