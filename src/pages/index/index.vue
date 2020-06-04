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

        <!-- 轮播图 start -->
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
            <swiper-item>
                <view class="swiper-item"></view>
            </swiper-item>
        </swiper>
        <!-- 轮播图 end -->

        <!-- 最近新品 start -->
        <view class="new">
            <view class="title">最近新品</view>
            <view class="content">
                <view class="group" v-for="(group,a) in recent" :key="a">
                    <view class="item" v-for="(item,b) in group.list" :key="b">
                        <image class="poster" :src="item.image"></image>
                        <view class="info">
                            <view class="name">{{item.name}}</view>
                            <view class="name">{{item.text}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 最近新品 end -->
	</view>
</template>

<script>
    import {url} from '@/common/uri';
	export default {
		data() {
			return {
				recent:[
                    {
                        id: 1,
                        name: '第一个',
                        list: [
                            {id:1,name: '张三',image: '../../static/logo.png',text:'sdfsf',tags:['优秀','良好','极品']},
                            {id:2,name: '李四',image: '../../static/logo.png',text:'sdfsf',tags:['优秀','良好']},
                            {id:3,name: '张三',image: '../../static/logo.png',text:'sdfsf',tags:['优秀','良好','极品']}
                        ]
                    },
                    {
                        id: 2,
                        name: '第二个',
                        list: [
                            {id:1,name: '张三',image: '../../static/logo.png',text:'sdfsf',tags:['优秀','良好','极品']},
                            {id:2,name: '李四',image: '../../static/logo.png',text:'sdfsf',tags:['优秀','良好']},
                            {id:3,name: '张三',image: '../../static/logo.png',text:'sdfsf',tags:['优秀','良好','极品']}
                        ]
                    }
                ]
			}
		},
		onLoad() {

            console.log(url("xfdd"));


		},
		methods: {
            //跳转定位页面
            toLocation(){

            },
            //跳转消息页面
            toMessage(){

            },
            //扫码
            getScan(){

            }
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
