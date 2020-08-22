import http from "@/utils/request";
import store from "@/store/index";

// 示例: 查询用户信息
export function get(data) {
    return http.get("/user/get", data);
}

// 登录
export function login(user, password) {}

// 注销
export function logout() {
    store.commit("logout");
}

export default {
    get,
};
