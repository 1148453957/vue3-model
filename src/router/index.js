const routes = [
  {
    path: "/",
    name: "index",

    component: () => import("@/views/ControlView/RealTime.vue"),
  },

  {
    path: "/power-control/ControlView/RealTime",
    name: "RealTime",

    component: () => import("@/views/ControlView/RealTime.vue"),
  },

  {
    path: "/power-control/ControlView/PowerAnalysis",
    name: "PowerAnalysis",

    component: () => import("@/views/ControlView/PowerAnalysis.vue"),
  },
  {
    path: "/power-control/ControlView/ControlMethod",
    name: "ControlMethod",

    component: () => import("@/views/ControlView/ControlMethod.vue"),
  },
  {
    path: "/power-control/ControlView/SystemManage",
    name: "SystemManage",

    component: () => import("@/views/ControlView/SystemManage.vue"),
  },
];

export default routes;
