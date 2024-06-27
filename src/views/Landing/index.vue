<template>
  <div class="landing">
    <n-space class="components-spacer" data-scroll-container>
      <Introduction />
      <Base64ConverterForm />
      <div>
        <n-h3>Base64 Encoding</n-h3>
        <n-p>
          Base64 is a binary-to-text encoding scheme that converts binary data
          into an ASCII string format. It's commonly used to encode data for
          storage and transmission over media that are designed to deal with
          textual data. For example, it can encode images or files into a text
          format for easy embedding in HTML or CSS.
        </n-p>
        <n-h3>JSON (JavaScript Object Notation)</n-h3>
        <n-p>
          JSON is a lightweight data interchange format that's easy for humans
          to read and write and for machines to parse and generate. It's widely
          used for transmitting data in web applications, often serving as an
          alternative to XML.
        </n-p>
      </div>
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
