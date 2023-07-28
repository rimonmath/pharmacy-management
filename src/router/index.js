import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/Login.vue";
import DashboardPage from "../views/Dashboard.vue";

const Overview = () => import("../views/dashboard/Overview.vue");
const Drugs = () => import("../views/dashboard/Drugs.vue");
const Vendors = () => import("../views/dashboard/Vendors.vue");
const SellingHistory = () => import("../views/dashboard/SellingHistory.vue");
const Settings = () => import("../views/dashboard/Settings.vue");
const AccountSettings = () => import("../views/dashboard/settings/Account.vue");
const WebsiteSettings = () => import("../views/dashboard/settings/Website.vue");
const ThemeSettings = () => import("../views/dashboard/settings/Theme.vue");

const routes = [
  { path: "/", component: LoginPage },
  {
    path: "/dashboard",
    component: DashboardPage,
    redirect: "/dashboard/overview",
    children: [
      { path: "overview", component: Overview },
      { path: "drugs", component: Drugs },
      { path: "vendors", component: Vendors },
      { path: "selling-history", component: SellingHistory },
      {
        path: "settings",
        component: Settings,
        redirect: "/dashboard/settings/account",
        children: [
          {
            path: "account",
            component: AccountSettings
          },
          {
            path: "website",
            component: WebsiteSettings
          },
          {
            path: "theme",
            component: ThemeSettings
          }
        ]
      }
    ]
  }
];

const router = createRouter({
  routes,
  history: createWebHistory()
});

// router.beforeEach((to, from) => {
//   console.log(to);
//   console.log(from);
//   // ...
//   // explicitly return false to cancel the navigation
//   // return false
// });

export default router;
