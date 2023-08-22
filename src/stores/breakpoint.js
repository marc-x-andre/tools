import { computed, ref } from "vue";
import { defineStore, mapState } from "pinia";

export const useBreakpointStore = defineStore("breakpoint", () => {
  const windowWidth = ref(window.innerWidth);
  window.addEventListener(
    "resize",
    () => (windowWidth.value = window.innerWidth)
  );
  const isMobile = computed(() => windowWidth.value <= 768);
  const isTablet = computed(() => windowWidth.value <= 1068);
  return {
    isMobile,
    isTablet,
  };
});

export const breakpointMixin = {
  computed: {
    ...mapState(useBreakpointStore, ["isMobile", "isTablet"]),
  },
};
