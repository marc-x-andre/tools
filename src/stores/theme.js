import { defineStore } from "pinia";

export const useThemeStore = defineStore("themeStore", {
  state: () => ({
    isDark: localStorage.getItem("dark") === "true",
  }),
  actions: {
    setDark(v) {
      this.isDark = v;
      localStorage.setItem("dark", v);
    },
  },
});
