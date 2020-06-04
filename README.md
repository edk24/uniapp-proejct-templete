# 零、目录结构

```
.
├── api             // 统一接口目录
│   └── user.js     // 用户接口 (按功能分组)
├── App.vue         
├── common          // 公共目录
│   ├── common.js   // 公共函数
│   └── uri.js      
├── components      // 公共组件目录
├── main.js         // 入口文件
├── manifest.json   // uniapp配置文件
├── pages           // 页面
│   ├── index
│   │   └── index.vue
│   ├── login      
│   │   ├── login.vue   
│   │   └── register    
├── pages.json      // 页面配置
├── README.md       // 自述文件
├── static          // 静态资源 (css/js/图片/声音等等)
│   ├── images
│   │   ├── category.png
├── store           // vuex缓存
│   └── index.js
├── uni.scss        // 公共样式
└── utils           // 工具目录
    └── request.js  // http请求库
```


# 一、命名规范

**文件名:** 文件名全小写 + 下划线 (search.vue / confirm_order.vue)

**命名一定要有意义**

- **命名规则:** 
    - 文件夹: 单词全小写, 允许数字下划线 (示例: /goods)
    - 文件名: 单词全小写, 允许数字下划线 (示例: /goods/detail.vue)
    - 变量命名: 
        - 命名: 驼峰命名, 首字母小写. 必须有意义
        - 页面状态值: 必须是bool类型, is作为前缀. 如:isOk, isShow
    - 方法命名:
        - 跳转页面: to+目录名/页面名 `toGoodsDetail()`, `toMy()`
        - 提交方法: submit前缀
- **页面逻辑:**
    - 防快速点击: 提交数据需要做防止快速重复点击, 以3秒为例. 防止重复向服务器发送数据


# 二、文件命名规范

有些页面必须固定文件名,  以下是规定. **必须严格执行:**

举个栗子: 创建有关`商品(goods)`的页面;

- 列表页: pages/`goods/list.vue`
- 详情页: pages/`goods/detail.vue`

或者

- 我的订单列表: pages/`my/order/list.vue`
- 我的订单详情: pages/`my/order/detail.vue`

**层级不要太深**

其他页面, 可自行起名字不严格要求. **但! 一定要起有意义的名字, 有辨识度**

如: 
- 搜索: search.vue
- 购物车: confirm_order.vue


# 三、公共配置

要求所有用到地址的地方, 都必须从vuex缓存中获取;

### vuex缓存 （store）

| 键名          | 说明                             | 默认值                      |
| ------------- | -------------------------------- | --------------------------- |
| **apiUrl**    | API地址                          | http://xxx.xxx.com/api/     |
| **staticUrl** | 静态资源地址( 比如图片/js/css等) | http://xxx.xxx.com/         |
| **wsUrl**     | WebSocket地址                    | ws://xxx.xxx.xxx.xxx:xxx    |
| token         | access_token                     |                             |
| userInfo      | 用户信息                         | Object:`{id:0, name:"", avatar:""}` |
| login         | 登录状态                         | Bool: `false`                     |

**操作代码：**

```javascript
// 取值
this.$store.state.apiUrl

// 赋值
this.$store.commit('login', {token:"1111"})
```

**最佳实践：**
> 缩略啰嗦的代码, 更简洁直观
```javascript
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
      // 将 this.apiUrl 映射为 this.$store.state.apiUrl
      ...mapState(['apiUrl', 'token'])
  },
  methods:{
      // 将 this.login(data) 映射为 this.$store.commit('login', data)
      ...mapMutations(['login'])
  }
}
```



*`$store` 是全局挂载的, 可以自行引入`store/index.js`*

# 四丶公共js

## 网址处理

*按需引入:*

```javascript
// 全部引入: uri.url()
import uri from '@/common/uri';
// 按需引入: url()
import { url } from '@/common/uri'

// 拼接服务器资源网址
url('/uploads/a.jpg') // http://domain.com/uploads/a.jpg
```

# 五丶请求

> 项目采用jwt或者oauth鉴权。不能使用`uni.request`发起请求。因为登录成功后每个请求都会带个token， uni.request没有拦截器会带来很多不便

## request 请求

> 参考`aixos`文档


应该使用： `utils/request.js` 来请求。

```javascript
import http from '@/utils/request'

http.get("/user/get", {id:159}).then((code, msg, data, count) => {
    // 请求成功
    // code：状态码， 0=成功， 非0表示失败
    // msg：提示文本 “操作失败，余额不足”
    // data：响应数据
    // count:记录总数 （前端可用来分页）
}).catch(err => {
    // 请求错误
})

// 除了 get 还有 post、put、delete请求方法
```


## 最佳实践：统一接口管理

> 开发中存在很多复用的接口， 我们可以把它整合起来统一管理并使用

接口目录：common/api/

比如有关用户`User`的接口：

*common/api/user.js:*

```javascript
import http from '@/utils/request';

// 示例: 查询用户信息
export function get(data) {
    return http.get("/user/get", data});
}

export default {
    get
}
```

*使用：*
```javascript
import user from '@/common/api/user';

// use
user.get({id:159}).then(res => {
    // 请求成功
}).catch(err=>{
    // 请求错误
})
```

# 六、引入js

**common/api/user.js:**
```javascript
import http from '@/utils/request';

// 示例: 查询用户信息
export function get(data) {
    return http.get("/user/get", data);
}

export default {
    get
}
```

**引入方式：**
```javascript
// 全部引入 export default { }
import user from '@/common/api/user'; 
// user.get()

// 按需引入
import { get } from '@/common/api/user';
// get()   可能重名， 而且不知道是哪个的get。 定义含糊

// 按需引入别名法
import { get as getUser } from '@/common/api/user';
// getUser()   这样就能知道是获取用户信息
```
