export default {
    path: "/home",
    name: "home",
    component: () => import('../views/main/Home.vue'),
    children: [
      {
        path: "/statistics",
        name: "statistics",
        component: () => import("../views/main/Statistics.vue"),
      },
      {
        path: "/category",
        name: "category",
        component: () => import("../views/main/Category.vue"),
      },
    ],
  };
  