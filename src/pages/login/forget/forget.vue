<template>
	<view>
		<view class="row">
            <input class="val" type="number" maxlength="11" placeholder="请输入手机号" v-model="phone" />
            <view class="key">获取验证码</view>
        </view>
        <view class="row">
            <input class="val" type="text" maxlength="11" placeholder="请输入短信验证码" v-model="code" />
        </view>
        <view class="row">
            <input class="val" type="text" maxlength="11" placeholder="请输入密码(最少6位)" v-model="passwd" />
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                phone: '',
                code : '',
                passwd: ''
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
