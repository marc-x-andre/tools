<template>
  <div class="landing">
    <n-space class="components-spacer" data-scroll-container>
      <Introduction />
      <Base64ConverterForm />
      <CompressForm />
      <TicTacToe data-scroll />
    </n-space>
  </div>
</template>

<script setup>
import Introduction from "./Introduction.vue";
import Base64ConverterForm from "@/components/Base64ConverterForm.vue";
import CompressForm from "@/components/CompressForm.vue";
import TicTacToe from "@/components/block/TicTacToe.vue";
import LocomotiveScroll from "locomotive-scroll";

const scroll = new LocomotiveScroll();
</script>

<style lang="sass">
@import vars
.components-spacer
  gap: 20vh !important
  margin: 1rem 0 3rem !important
  +fromTablet()
    margin: 1rem 0 1rem !important
  > div
    width: 100%
</style>
