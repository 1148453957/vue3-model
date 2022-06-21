import axios from "axios";
import store from "@/store";
import { setState } from "@/main";

import qs from "qs";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service = axios.create({
  // 超时
  timeout: 120000,
});
// request拦截器
service.interceptors.request.use(
  (config) => {
    //config.formData为true时用form data形式传参
    if (config.formData) {
      config.headers["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";
      config.data = qs.stringify(config.data);
    }
    // 默认不传isToken，传就传isToken=false
    const isToken = !(config.isToken === false);
    const getToken = store.state.user.token;
    if (getToken && isToken) {
      config.headers["Authorization"] = "Bearer " + getToken; // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code;
    // 获取错误信息,有的是data.msg,有的是data.message?所以做成这样？就按data.message吧，以后报错了让后端统一改，哈哈
    //  const msg =res.data.msg || errorCode[code] || errorCode['default'];
    const message = res.data.message;

    if (code === 401) {
      ElMessageBox.alert(message, "系统提示", {
        confirmButtonText: "确定",
        callback: () => {
          setState({
            tokenState: false,
          });
        },
      });
      return Promise.reject("error");
    } else if (code === 500) {
      ElMessage({
        message,
        type: "error",
      });
      return Promise.reject(new Error(message));
    } else if (code !== 200) {
      ElNotification({
        title: message,
        type: "error",
      });
      return Promise.reject("error");
    } else {
      return res.data;
    }
  },
  (error) => {
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      if (error.response.data.msg) {
        message = error.response.data.msg;
      } else {
        message = "系统接口" + message.substr(message.length - 3) + "异常";
      }
    }
    ElMessage({
      message: message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
