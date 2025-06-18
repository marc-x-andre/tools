<template>
  <div class="hasher">
    <n-h1>Hasher</n-h1>
    <n-input
      v-model:value="formValue.email"
      type="text"
      placeholder="Enter a value"
      @input="hashEmail"
    />
    <n-input
      v-model:value="formValue.hash"
      type="text"
      readonly
      placeholder="SHA-256 hash will appear here"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const formValue = ref({
  email: "",
  hash: "",
});

const hashEmail = async () => {
  if (!formValue.value.email) {
    formValue.value.hash = "";
    return;
  }

  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(formValue.value.email);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    formValue.value.hash = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch (error) {
    console.error("Error hashing email:", error);
    formValue.value.hash = "Error hashing email";
  }
};
</script>

<style lang="sass">
.hasher
  display: flex
  flex-direction: column
  gap: 1rem
  width: 100%
  max-width: 600px
  margin: 0 auto
</style>
