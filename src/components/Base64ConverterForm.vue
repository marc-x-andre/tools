<template>
  <n-form
    class="converter-form"
    ref="formRef"
    inline
    :label-width="80"
    :model="formValue"
    :rules="rules"
  >
    <n-grid :cols="12" :x-gap="24" item-responsive>
      <!-- Row 1 -->
      <n-gi span="0 800:3" />
      <n-form-item-gi span="4 800:2" label="URL Encoded" path="urlEncoded">
        <n-switch v-model:value="formValue.urlEncoded" />
      </n-form-item-gi>
      <n-form-item-gi span="4 800:2" label="JSON Format" path="json">
        <n-switch v-model:value="formValue.json" />
      </n-form-item-gi>
      <n-form-item-gi span="4 800:2" label="Trim Content" path="trim">
        <n-switch v-model:value="formValue.trim" />
      </n-form-item-gi>
      <n-gi span="0 800:3" />
      <!-- Row 2 -->
      <n-gi
        v-if="formValue.json"
        span="12 800:6"
        style="display: flex; flex-direction: column"
      >
        <n-form-item-gi span="12 " label="JSON" path="text">
          <JsonEditor
            :modelValue="formValue.text"
            @update:modelValue="updateJson"
          />
        </n-form-item-gi>
        <div style="display: flex; gap: 0.5rem; margin-top: 0.25rem">
          <n-button
            size="tiny"
            @click="copyToClipboard(formValue.text, 'json')"
            :title="
              copied.json
                ? 'Copied!'
                : formValue.json
                ? 'Copy JSON'
                : 'Copy Text'
            "
          >
            {{ copied.json ? "Copied!" : "Copy" }}
          </n-button>
          <n-button
            size="tiny"
            @click="
              downloadToFile(
                formValue.text,
                formValue.json ? 'json-output.json' : 'text-output.txt'
              )
            "
            :title="formValue.json ? 'Download JSON' : 'Download Text'"
          >
            Download
          </n-button>
        </div>
      </n-gi>
      <n-gi
        v-else
        span="12 800:6"
        style="display: flex; flex-direction: column"
      >
        <n-form-item-gi span="12" label="Text" path="text">
          <n-input
            v-model:value="formValue.text"
            type="textarea"
            placeholder="This text will be translate to base64"
          />
        </n-form-item-gi>
        <div style="display: flex; gap: 0.5rem; margin-top: 0.25rem">
          <n-button
            size="tiny"
            @click="copyToClipboard(formValue.text, 'text')"
            :title="copied.text ? 'Copied!' : 'Copy Text'"
          >
            {{ copied.text ? "Copied!" : "Copy" }}
          </n-button>
          <n-button
            size="tiny"
            @click="downloadToFile(formValue.text, 'text-output.txt')"
            title="Download Text"
          >
            Download
          </n-button>
        </div>
      </n-gi>
      <n-gi span="12 800:6" style="display: flex; flex-direction: column">
        <n-form-item-gi span="12" label="Base64" path="base64">
          <n-input
            v-model:value="formValue.base64"
            type="textarea"
            placeholder="VGhpcyB0ZXh0IHdpbGwgYmUgdHJhbnNsYXRlIHRvIGJhc2U2NA=="
          />
        </n-form-item-gi>
        <div style="display: flex; gap: 0.5rem; margin-top: 0.25rem">
          <n-button
            size="tiny"
            @click="copyToClipboard(formValue.base64, 'base64')"
            :title="copied.base64 ? 'Copied!' : 'Copy Base64'"
          >
            {{ copied.base64 ? "Copied!" : "Copy" }}
          </n-button>
          <n-button
            size="tiny"
            @click="downloadToFile(formValue.base64, 'base64-output.txt')"
            title="Download Base64"
          >
            Download
          </n-button>
          <n-button
            size="tiny"
            @click="openInNewTab"
            :disabled="formValue.base64 === ''"
            title="Open in new tab"
          >
            Open in new tab
          </n-button>
        </div>
      </n-gi>
    </n-grid>
  </n-form>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import JsonEditor from "./JsonEditor.vue";
import { defineProps } from "vue";

const props = defineProps({
  persist: {
    type: Boolean,
    default: false,
  },
});

const LOCAL_STORAGE_KEY = "base64ConverterFormValue";

const textToBase64 = () => {
  let text = formValue.value.text;
  if (formValue.value.trim) {
    text = text.replace(/\s+/g, " ");
  }
  text = formValue.value.urlEncoded ? encodeURI(text) : text;
  formValue.value.base64 = btoa(text);
  formValue.value.lastTouch = "text";
};

const base64ToText = () => {
  try {
    const translated = atob(formValue.value.base64);
    formValue.value.text = formValue.value.urlEncoded
      ? decodeURI(translated)
      : translated;
    formValue.value.lastTouch = "base64";
    return true;
  } catch {
    return false;
  }
};

const updateJson = (v) => {
  formValue.value.text = v;
  textToBase64();
};

const copied = ref({ json: false, base64: false });

const copyToClipboard = async (value, type) => {
  if (!value) return;
  try {
    await navigator.clipboard.writeText(value);
    copied.value[type] = true;
    setTimeout(() => (copied.value[type] = false), 1200);
  } catch {
    // fallback: do nothing
  }
};

const downloadToFile = (value, filename) => {
  if (!value) return;
  const blob = new Blob([value], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }, 100);
};

const openInNewTab = () => {
  if (!formValue.value.base64) return;
  const url = `http://localhost:3000/?appProps=${formValue.value.base64}`;
  window.open(url, "_blank")?.focus();
};

const formRef = ref(null);
const formValue = ref({
  text: "",
  base64: "",
  urlEncoded: false,
  json: true,
  trim: true,
  lastTouch: undefined,
});

onMounted(() => {
  if (props.persist) {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.assign(formValue.value, parsed);
      } catch (e) {
        // Ignore parse errors, start fresh
      }
    }
  }
});

watch(
  formValue,
  (val) => {
    if (props.persist) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(val));
    }
  },
  { deep: true }
);

const rules = {
  text: {
    trigger: ["input"],
    validator: (rule, value) => {
      textToBase64();
      return value !== "";
    },
  },
  base64: {
    trigger: ["input"],
    validator: () => {
      return base64ToText();
    },
  },
  urlEncoded: {
    trigger: ["input"],
    validator: () => {
      formValue.value.lastTouch === "text" ? textToBase64() : base64ToText();
    },
  },
};
</script>

<style lang="sass">
.converter-form
  .n-input .n-input__input, .n-input .n-input__textarea
    height: var(--input-height)
</style>
