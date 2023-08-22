<template>
  <n-h1>Compress JSON</n-h1>
  <n-form
    class="converter-form"
    ref="formRef"
    inline
    :label-width="80"
    :model="formValue"
    :rules="rules"
  >
    <n-grid :cols="12" :x-gap="24" item-responsive>
      <!-- Row 2 -->
      <n-form-item-gi span="12 800:6" label="JSON" path="text">
        <JsonEditor
          :modelValue="formValue.text"
          @update:modelValue="textToCompressed"
        />
      </n-form-item-gi>
      <n-form-item-gi span="12 800:6" label="Compressed" path="compressed">
        <n-input
          v-model:value="formValue.compressed"
          type="textarea"
          placeholder="Compressed JSON will appeare here"
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script setup>
import { ref } from "vue";
import JsonEditor from "./JsonEditor.vue";
import { compress, decompress } from "compress-json";

const compressToText = () => {
  try {
    console.log(formValue.value.compressed);
    const translated = decompress(JSON.parse(formValue.value.compressed));
    console.log(translated);
    formValue.value.text = translated;
    return true;
  } catch {
    return false;
  }
};

const textToCompressed = (v) => {
  console.log(compress(JSON.parse(v)));
  formValue.value.text = v;
  formValue.value.compressed = JSON.stringify(compress(JSON.parse(v)));
  console.log(compress(JSON.parse(v)));
};

const formRef = ref(null);
const formValue = ref({
  text: "",
  compress: "",
});

const rules = {
  text: {
    trigger: ["input"],
    validator: (rule, value) => {
      return value !== "";
    },
  },
  compressed: {
    trigger: ["input"],
    validator: () => {
      return compressToText();
    },
  },
};
</script>

<style lang="sass">
.converter-form
  .n-input .n-input__input, .n-input .n-input__textarea
    height: var(--input-height)
</style>
