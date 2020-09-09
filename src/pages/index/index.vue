<template>
	<view class="root">

        <!-- 头部 start -->
        <view class="header">
            <view class="left" @click="toLocation()">贵阳市</view>
            <view class="search">
                <input disabled="true" class="input" placeholder-style="color: #ddd" type="text" placeholder="请输入关键字" />
            </view>
            <view class="right">
                <view class="right_1" @tap="toMessage()">消息</view>
                <view class="right_2" @tap="getScan()">扫码</view>
            </view>
        </view>
        <!-- 头部 end -->

<u-popup v-model="show">
			<view>出淤泥而不染，濯清涟而不妖</view>
		</u-popup>
		<u-button @click="show = true">打开</u-button>



	</view>
</template>

<script>
    import {url} from '@/common/uri';
	export default {
		data() {
			return {
                count: 6,
				show: false,
			}
		},
		onLoad() {
		},
		methods: {

		}
	}
</script>

<style lang="scss">
    .header{
        padding: 0 20rpx;
        @include box();
        height: 44px;
        line-height: 44px;
        background-color: #4CD964;
        color: #FFFFFF;
        .search{
            margin: 0 20rpx;
            flex: 1;
            height: 50rpx;
            border-radius: 50rpx;
            background-color: #FFFFFF;
            .input{
                padding: 0 20rpx;
            }
        }
        .right{
            @include box();
            .right_2{
                margin-left: 20rpx;
            }
        }
    }

</style>
