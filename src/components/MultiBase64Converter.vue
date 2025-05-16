<template>
  <section>
    <n-h1>Base64 JSON converter</n-h1>
    <Base64ConverterForm
      v-for="id in converters"
      :key="id"
      style="margin-bottom: 2rem"
    />
    <n-button type="primary" @click="addConverter" style="margin-top: 1rem">
      Add another converter
    </n-button>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Base64ConverterForm from "./Base64ConverterForm.vue";

const converters = ref([0]);
let nextId = 1;

const addConverter = () => {
  converters.value.push(nextId++);
};
</script>
