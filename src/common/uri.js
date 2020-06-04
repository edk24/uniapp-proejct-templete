import store from '@/store/index';
/*
 * url处理
 */


/**
 * 拼接服务器资源链接 (staticUrl + path)
 * url('/hello.jpg')   -->  http://domain.com/hello.jpg
 *
 * @param {string} path
 */
export function url(path) {
    return store.state.staticUrl + path;
}

export default {
    url
}
