<template>
	<view>
        <input type="text" v-model="phone" placeholder="请输入账号"/>
        <input type="password" v-model="passwd" placeholder="请输入密码"/>
        <view class="btn" @tap="submit()">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                phone: '',
                passwd: ''
			}
		},
		methods: {
            submit(){
                if(this.phone == ''){
                    this.$app.showToast('请输入手机号');
                    return;
                }
                if(!this.$app.checkPhone(this.phone)){
                    this.$app.showToast('请输入正确的手机号');
                    return;
                }
                if(this.passwd == ''){
                    this.$app.showToast('请输入密码');
                    return;
                }
                if(this.passwd.length < 6){
                    this.$app.showToast('密码长度不能小于6位');
                    return;
                }
            }
		}
	}
</script>

<style lang="scss">
    .btn{
        margin: 100rpx 40rpx;
        background-color: #f00;
        text-align: center;
        color: #FFFFFF;
        padding: 10rpx 0;
    }
</style>
