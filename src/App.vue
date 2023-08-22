<script setup>
import MainLayout from "@/layout/MainLayout.vue";
import { light, dark } from "./assets/themes";
import { useThemeStore } from "@/stores/theme";
const themeStore = useThemeStore();
</script>

<template>
  <n-config-provider :theme-overrides="themeStore.isDark ? dark : light">
    <MainLayout>
      <router-view />
    </MainLayout>
  </n-config-provider>
</template>
