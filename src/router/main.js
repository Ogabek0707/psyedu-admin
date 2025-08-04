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
      {
        path: "/region",
        name: "region",
        component: () => import("../views/main/Region.vue"),
      },
      {
        path: "/result/result-starter",
        name: "result-starter",
        component: () => import("../views/main/Statistics/ResultStarter.vue"),
      },
      {
        path: "/result/result-lesson",
        name: "result-lesson",
        component: () => import("../views/main/Statistics/ResultLesson.vue"),
      },
      {
        path: "/result/result-finish",
        name: "result-finish",
        component: () => import("../views/main/Statistics/ResultFinish.vue"),
      },
      {
        path: "/result/result-categories",
        name: "result-categories",
        component: () => import("../views/main/Statistics/ResultCategories.vue"),
      },
    ],
  };
  