<template>
    <!--
	swiper中的transfrom会使fixed失效,此时用height="100%"固定高度;
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,只能用mescroll-uni,不能用mescroll-body
	-->
    <mescroll-uni
        ref="mescrollRef"
        @init="mescrollInit"
        height="100%"
        top="70"
        :down="downOption"
        @down="downCallback"
        :up="upOption"
        @up="upCallback"
        @emptyclick="emptyClick"
        :fixed="true"
    >
        <view class="item" v-for="(item, a) in array">{{ item.goods_name }}</view>
    </mescroll-uni>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import MescrollMoreItemMixin from '@/components/mescroll-uni/mixins/mescroll-more-item.js';

export default {
    mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
    data() {
        return {
            downOption: {
                auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
            },
            upOption: {
                auto: false, // 不自动加载
                page: {
                    num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                    size: 20 // 每页数据的数量
                },
                noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
                empty: {
                    tip: '~ 空空如也 ~', // 提示
                    btnText: '去看看'
                }
            },
            array: [] //选项卡内容区全部一样的时候用array一个就行了
        };
    },
    props: {
        tabs: Array // tab菜单,此处用于取关键词
    },
    methods: {
        /*下拉刷新的回调 */
        downCallback() {
            // 这里加载你想下拉刷新的数据, 比如刷新轮播数据
            // loadSwiper();
            // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )

            // 下拉加载数据，我这里用的是page=1以后触发上拉第一次获得的数据
            // 加个延时看起来有动画--避免回弹太快
            setTimeout(() => {
                this.mescroll.resetUpScroll();
            }, 1000);
        },
        /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
        upCallback(page) {
            // console.log(page);
            //联网加载数据

            // 获得的都是当前swiper下的page和页长
            let pageNum = page.num; // 页码, 默认从1开始
            let pageSize = page.size; // 页长, 默认每页10条

            let keyword = this.tabs[this.i];
            // 重要部分 重要部分 重要部分
            // 获得当前下标，可以根据下标来替换接口路径从而区分获得数据
            // 我就暂时用同一个接口来取数据
            let tab_index = this.i;
            // console.log(this.i)

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
                    if (page.num == 1) {
                        this.array = [];
                    }

                    this.array = this.array.concat(res.data.data);

                    this.mescroll.endSuccess(curPageLen, totalSize);
                    // console.log(res.data.data.length);
                },
                fail: () => {},
                complete: () => {}
            });

            // apiSearch(page.num, page.size, keyword).then(curPageData=>{
            // 	//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
            // 	this.mescroll.endSuccess(curPageData.length);
            // 	//设置列表数据
            // 	if(page.num == 1) this.goods = []; //如果是第一页需手动制空列表
            // 	this.goods=this.goods.concat(curPageData); //追加新数据
            // }).catch(()=>{
            // 	//联网失败, 结束加载
            // 	this.mescroll.endErr();
            // })
        },
        //点击空布局按钮的回调
        emptyClick() {
            uni.showToast({
                title: '点击了按钮,具体逻辑自行实现'
            });
        }
        // 删除当前点击 可选
        // delete_item(index, list) {
        // 	uni.showModal({
        // 		title: '提示',
        // 		content: '是否删除当前订单',
        // 		showCancel: true,
        // 		success: res => {
        // 			if (res.confirm) {
        // 				console.log('删除成功');
        // 				list.splice(index, 1);
        // 			}
        // 			if (res.cancel) {
        // 				console.log('取消删除');
        // 			}
        // 		},
        // 		fail: () => {},
        // 		complete: () => {}
        // 	});
        // }
    }
};
</script>

<style lang="scss">
.item {
    padding: 20rpx;
}
</style>
