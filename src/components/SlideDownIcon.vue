<template>
  <div id="mouse-scroll">
    <div>
      <span class="down-arrow-1"></span>
      <span class="down-arrow-2"></span>
      <span class="down-arrow-3"></span>
    </div>
  </div>
</template>

<style lang="sass">
@import vars

#mouse-scroll
  display: flex
  justify-content: center
  opacity: 0.2
  style: block
  margin: auto
  & span
    display: block
    width: 5px
    height: 5px
    -ms-transform: rotate(45deg)
    -webkit-transform: rotate(45deg)
    transform: rotate(45deg)
    transform: rotate(45deg)
    border-right: 2px solid var(--n-text-color)
    border-bottom: 2px solid var(--n-text-color)
    margin: 0 0 3px 5px
  & .down-arrow-1
    margin-top: 6px
  & .down-arrow-1, & .down-arrow-2, & .down-arrow-3
    -webkit-animation: mouse-scroll 1s infinite
    -moz-animation: mouse-scroll 1s infinite

#mouse-croll .down-arrow-1
  -webkit-animation-delay: .1s
  -moz-animation-delay: .1s
  -webkit-animation-direction: alternate

#mouse-scroll .down-arrow-2
  -webkit-animation-delay: .2s
  -moz-animation-delay: .2s
  -webkit-animation-direction: alternate

#mouse-scroll .down-arrow-3
  -webkit-animation-delay: .3s
  -moz-animation-dekay: .3s
  -webkit-animation-direction: alternate

@-webkit-keyframes mouse-scroll
  0%
    opacity: 1

  50%
    opacity: .5

  100%
    opacity: 1

@keyframes mouse-scroll
    0%
        opacity: 0
    50%
        opacity: 0.5
    100%
        opacity: 1
</style>
