import { createApp } from "vue";
import { createPinia } from "pinia";
import { naive } from "@/thirdparty";
import App from "@/App.vue";
import router from "@/router.js";
import { breakpointMixin } from "./stores/breakpoint";

import "./assets/index.sass";
import "animate.css";

const app = createApp(App);

app.use(createPinia());
app.use(naive);
app.use(router);
app.mixin(breakpointMixin);

app.mount("#app");
