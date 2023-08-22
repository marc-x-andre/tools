import * as VueRouter from "vue-router";

import Landing from "views/Landing/index.vue";

const routes = [{ path: "/:pathMatch(.*)*", component: Landing }];

export default VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});
