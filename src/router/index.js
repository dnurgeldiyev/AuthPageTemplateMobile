import Vue from "vue";
import VueRouter from "vue-router";
import Enter from "../views/Enter.vue";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";
import Main from "../views/Main";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Enter",
    component: Enter
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn
  },
  {
    path: "/main",
    name: "Main",
    component: Main
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
