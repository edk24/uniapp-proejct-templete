<template>
	<view>
		<view class="empty" :style="{height:heights +'px'}">
			<image class="img" :src="imgSrc" :style="{width:imgWidth,height:imgHeight}"></image>
			<view class="text">{{text}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'xklEmpty',
		props:{
			//整个空白区域高度
			heights:{
				type: String,
				defualt: "auto"
			},
			//图片路径
			imgSrc:{
				type: String,
				default: '/static/images/empty_1.png'
			},
			//图片宽度
			imgWidth:{
				type: String,
				default: '300rpx'
			},
			//图片高度
			imgHeight:{
				type: String,
				default: '300rpx'
			},
			//空状态文本
			text:{
				type: String,
				default: '暂无更多消息~'
			},
		},
		data(){
			return{

			}
		},
		created() {
		}
	}
</script>

<style lang="scss">
	.empty{
		text-align: center;
		.img{
			margin-top: 40%;
			width: 300rpx;
			height: 300rpx;
		}
		.text{
			font-size: 26rpx;
			color: #838383;
		}
	}
</style>
