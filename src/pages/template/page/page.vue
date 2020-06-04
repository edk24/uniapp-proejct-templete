<template>
    <view>
        <mescroll-uni
            ref="mescrollRef"
            @init="mescrollInit"
            @down="downCallback"
            @up="upCallback"
            :down="downOption"
            :up="upOption"
        >
            <!-- <view> @init="mescrollInit" @down="downCallback" @up="upCallback"为固定值,不可删改(与mescroll-mixins保持一致) </view>
            <view> 字节跳动小程序 ref="mescrollRef" 必须配置 </view>-->
            <view class="content">
                <view class="item" v-for="(item, a) in dataList" :key="a">{{ item.goods_name }}</view>
            </view>
        </mescroll-uni>
        <!-- <view>原生组件和fixed元素需写在mescroll-uni的外面,否则滚动列表时会抖动 </view> -->
    </view>
</template>

<script>
// 引入mescroll-mixins.js
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
    mixins: [MescrollMixin], // 使用mixin
    data () {
        return {
            // 下拉刷新的配置(可选)
            downOption: {
                // offset: 65,
                // use: true, // 是否启用下拉刷新; 默认true
                // auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
                // native: false // 启用系统自带的下拉组件,默认false;仅mescroll-body生效,mescroll-uni无效
                // (native: true, 则需在pages.json中配置"enablePullDownRefresh":true)
            },
            // 上拉加载的配置(可选)
            upOption: {
                // use: true, // 是否启用上拉加载; 默认true
                // auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
                page: {
                    num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                    size: 10 // 每页数据的数量,默认10
                },
                // noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
                // empty: {
                //     tip: '暂无相关数据'
                // }
            },
            // 列表数据
            dataList: []
        };
    },
    methods: {
        /*下拉刷新的回调, 有三种处理方式:*/
        downCallback () {
            // 第1种: 请求具体接口
            // uni.request({
            // 	url: 'xxxx',
            // 	success: () => {
            // 		// 请求成功,隐藏加载状态
            // 		this.mescroll.endSuccess()
            // 	},
            // 	fail: () => {
            // 		// 请求失败,隐藏加载状态
            // 		this.mescroll.endErr()
            // 	}
            // })
            // 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可

            // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
            // 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
            // this.mescroll.endSuccess()

            // 我这里用了第二种方法调用mescroll.resetUpScroll() 会重置列表为第一页 再触发upCallback方法
            //让列表变成第一页的数据
            setTimeout(() => {
                this.mescroll.resetUpScroll();
            }, 1000);

            // 若整个downCallback方法仅调用this.mescroll.resetUpScroll(),则downCallback方法可删 (mixins已默认)
        },
        /*上拉加载的回调*/
        upCallback (page) {
            let pageNum = page.num; // 页码, 默认从1开始
            let pageSize = page.size; // 页长, 默认每页10条


            // 我这里事例用了   //方法二: 后台接口有返回列表的总数据量 totalSize  // 当前页长度  // console.log(page.num);
            uni.request({
                url: 'https://shop.08588888877.com/api/goods/getlist',
                method: 'GET',
                data: {
                    page: pageNum,
                    limit: pageSize
                },
                success: res => {
                    // 当前页长度
                    let curPageLen = res.data.data.length;
                    // 总数量
                    let totalSize = res.data.data.count;
                    // console.log(page.num);
                    console.log(page.num);
                    if (page.num == 1) {
                        this.dataList = [];
                    }
                    this.dataList = this.dataList.concat(res.data.data);
                    this.mescroll.endSuccess(curPageLen, totalSize);

                },
                fail: () => { },
                complete: () => { }
            });

            // uni.request({
            // 	url: 'xxxx?pageNum='+pageNum+'&pageSize='+pageSize,
            // 	success: (data) => {
            // 接口返回的当前页数据列表 (数组)
            // let curPageData = data.xxx;
            // 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
            // let curPageLen = curPageData.length;
            // 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
            // let totalPage = data.xxx;
            // 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
            // let totalSize = data.xxx;
            // 接口返回的是否有下一页 (true/false)
            // let hasNext = data.xxx;

            //设置列表数据
            // if(page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
            // this.dataList = this.dataList.concat(curPageData); //追加新数据

            // 请求成功,隐藏加载状态
            //方法一(推荐): 后台接口有返回列表的总页数 totalPage
            // this.mescroll.endByPage(curPageLen, totalPage);

            //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
            //this.mescroll.endBySize(curPageLen, totalSize);

            //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
            //this.mescroll.endSuccess(curPageLen, hasNext);

            //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
            //如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
            //如果传了hasNext,则翻到第二页即可显示无更多数据.
            //this.mescroll.endSuccess(curPageLen);

            // 如果数据较复杂,可等到渲染完成之后再隐藏下拉加载状态: 如
            // this.$nextTick(()=>{
            // 	this.mescroll.endSuccess(curPageLen)
            // })

            //curPageLen必传的原因:
            // 1. 使配置的noMoreSize 和 empty生效
            // 2. 判断是否有下一页的首要依据:
            //    当传的值小于page.size时(说明不满页了),则一定会认为无更多数据;
            //    比传入的totalPage, totalSize, hasNext具有更高的判断优先级;
            // 3. 当传的值等于page.size时,才会取totalPage, totalSize, hasNext判断是否有下一页
            // 传totalPage, totalSize, hasNext目的是避免方法四描述的小问题

            // 提示: 您无需额外维护页码和判断显示空布局,mescroll已自动处理好.
            // 当您发现结果和预期不一样时, 建议再认真检查以上参数是否传正确
            // 	},
            // 	fail: () => {
            // 		//  请求失败,隐藏加载状态
            // 		this.mescroll.endErr()
            // 	}
            // })
        }
    }
};
</script>

<style>
.item {
    padding: 50rpx;
}
</style>
