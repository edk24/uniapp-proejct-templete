import http from '@/utils/request';

// 示例: 查询用户信息
export function get(data) {
    return http.get("/user/get", data);
}

export default {
    get
}
