<template>
	<view>
		<view class="row">
            <input class="val" type="number" maxlength="11" placeholder="请输入手机号" v-model="phone" />
            <view class="key" @tap="getCode()">{{codeText}}<text v-if="!isSend">s</text></view>
        </view> 
        <view class="row">
            <input class="val" maxlength="6" type="text" placeholder="请输入短信验证码" v-model="code" />
        </view>
        <view class="row">
            <input class="val" type="text" maxlength="11" placeholder="请输入密码(最少6位)" v-model="passwd" />
        </view>
        
        <view class="btn" @tap="submit()">注册</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                phone: '',
                code : '',
                passwd: '',
                codeText: '获取验证码',
                isSend: true
			}
		},
		methods: {
            getCode(){
                if(this.phone == ''){
                    this.$app.showToast('请输入手机号');
                    return;
                }
                if(!this.$app.checkPhone(this.phone)){
                    this.$app.showToast('请输入正确的手机号');
                    return;
                }
                if(this.isSend){
                    clearInterval(this.timer);
                    this.isSend = false
                    this.codeText = 5;
                    this.timer = setInterval(() => {
                        if(this.codeText == 0){
                            this.codeText = '获取验证码';
                            this.isSend = true;
                            clearInterval(this.timer);
                        }else{
                            this.codeText--;
                        }
                        console.log(1);
                    },1000);
                }

            },
            submit(){
                if(this.phone == ''){
                    this.$app.showToast('请输入手机号');
                    return;
                }
                if(!this.$app.checkPhone(this.phone)){
                    this.$app.showToast('请输入正确的手机号');
                    return;
                }
                if(this.code == ''){
                    this.$app.showToast('请输入验证码');
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
    .row{
        margin: 0 40rpx;
        padding: 20rpx 0;
        border-bottom: 1rpx solid #f1f1f1;
        @include box();
    }
    .btn{
        margin: 100rpx 40rpx;
        background-color: #f00;
        text-align: center;
        color: #FFFFFF;
        padding: 10rpx 0;
    }
</style>
