<template>
	<view>
        <!-- 带swiper的 tabs必须固定定位，不然会出现swiper拉倒顶部以后带动tabs -->
		<xlk-tabs widths="70%" activeColor="#1677FF" v-model="tabIndex"  heights="70rpx" fontSize="26rpx" :fixed="true"  :tabs="tabs" bgColor="#ffffff" lineBgColor="#f1f1f1" msg_wh="15rpx" lineWidth="50%"></xlk-tabs>
		<swiper :style="{ height: height }" :current="tabIndex" @change="swiperChange">
			<swiper-item v-for="(item, index) in tabs" :key="index"><mescroll-item :i="index" :index="tabIndex" :tabs="tabs"></mescroll-item></swiper-item>
		</swiper>
	</view>
</template>

<script>
// import uniTabs from '@/components/uni-tabs/uni-tabs.vue';
// import uniTabs from '@/components/jyx-tabs/jyx-tabs.vue';
 import MescrollItem from './tab_list_item.vue';
// import AppTabs from '@/components/other/app-tabs.vue';

export default {
	components: {
		MescrollItem
	},
	data() {
		return {
			height: '400px', // 需要固定swiper的高度
			tabs: [
				{ id: 1, title: '全部', isMsg: false },
				{ id: 2, title: '待付款', isMsg: false },
				{ id: 3, title: '待发货', isMsg: false },
				{ id: 4, title: '待收货', isMsg: false },
				{ id: 5, title: '待评价', isMsg: false }
			],
			tabIndex: 0 // 当前tab的下标
		};
	},
	methods: {
		// 轮播菜单
		swiperChange(e) {
			this.tabIndex = e.detail.current;
		}
	},
	onLoad() {
		// 需要固定swiper的高度
		this.height = uni.getSystemInfoSync().windowHeight + 'px';
	}
};
</script>

<style lang="scss">

</style>
