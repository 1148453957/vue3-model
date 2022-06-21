import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

let history = null;
let router = null;
let instance = null;

let Props = null;

// 如果独立部署的时候,有bug因为角色权限，站点机房什么的都得从平台获取
if (!window.__POWERED_BY_QIANKUN__) {
  history = createWebHistory("/");
  router = createRouter({
    history,
    routes,
  });
  instance = createApp(App);
  instance.use(store).use(router).use(ElementPlus);
  router.isReady().then(() => {
    instance.mount("#app");
  });
}

// 作为子系统部署的时候
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

/** bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  //console.log("现在进入子应用power-control的bootstrap阶段");
}

/**应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法*/
export async function mount(props) {
  console.log("现在进入子应用power-control的mount周期", props);

  // 根据主应用传过来的dom和路由，去把子应用挂在到对应dom上，并加载对应的路由
  let { container, routes } = props;
  let routesNew = [];
  routes[0].children.forEach((e) => {
    let arr = e.path.split("/");
    routesNew.push({
      path: e.path,
      name: arr[3],
      component: () => import(`@/views/${arr[2]}/${arr[3]}`),
    });
  });
  history = createWebHistory("/");
  router = createRouter({
    history,
    routes: routesNew,
  });

  //要把主应用传过来的用户信息存在vuex里，如token，角色权限等
  store.dispatch("setUser", props.data);
  //第一次进来的时候，这个是不执行的，只有之后的变化才会执行,目前只有tokenState有实际用途
  props.onGlobalStateChange((value, prev) => {
    console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev);
  });
  //把prop.setGlobalState暴露出去
  Props = props;

  instance = createApp(App);
  instance
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount(container);
}
/**请求接口，返回401 token过期时，告诉主应用，由主应用退出登录*/
export function setState(data) {
  Props.setGlobalState(
    data // {tokenState:false}
  );
}
/** 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例*/
export async function unmount() {
  console.log("现在进入子应用c-child的unmount阶段", instance, history);
  instance.unmount();
  instance._container.innerHTML = "";
  instance = null;
  router = null;
  history.destroy();
}

/** 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效*/
export async function update(props) {
  console.log("update props", props);
}
