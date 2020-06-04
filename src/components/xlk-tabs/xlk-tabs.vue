<template name="uniTabs">
    <view class="jyx-tabs" :style="{ position: fixed ? 'fixed' : 'relative', 'z-index':fixed?'1':'auto'}">
        <view class="uni_tabs_title">
            <view
                class="item"
                :style="{ backgroundColor: bgColor, color: textColor, fontSize: fontSize, height: heights, color: value === ttIndex ? activeColor : '' }"
                v-for="(item, ttIndex) in tabs"
                :key="ttIndex"
                @click="tabClick(ttIndex)"
            >
                <view class="text" :style="{ height: heights, width: widths }">
                    {{ getTabName(item) }}
                    <view class="msg" v-if="item.isMsg" :style="{ height: msg_wh, width: msg_wh }"></view>
                </view>
            </view>
        </view>
        <view class="line_box" :style="[{ backgroundColor: lineBgColor, height: lineHeight }]">
            <view class="line" :style="[{ left: left + '%', width: width + '%' }]">
                <view class="line_inner" :style="[{ width: lineWidth, backgroundColor: activeColor, height: lineHeight }]"></view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'uniTabs',
    props: {
        //数组
        tabs: {
            type: Array,
            default() {
                return [
                    // {id:1,title:'全部',isMsg:true},
                    // {id:2,title:'待付款',isMsg:false},
                    // {id:3,title:'待发货',isMsg:false},
                    // {id:4,title:'待收货',isMsg:false},
                    // {id:5,title:'待评价',isMsg:false}
                ];
            }
        },
        //选中的颜色，包括文字和下划线
        activeColor: {
            type: String,
            default: '#1677FF'
        },
        //选显卡头部宽度
        widths: {
            type: String,
            default: '100%'
        },
        //选显卡头部高度
        heights: {
            type: String,
            default: '42px'
        },
        //选项卡头部背景颜色
        bgColor: {
            type: String,
            default: '#ffffff'
        },
        //选项卡头部默认文字颜色
        textColor: {
            type: String,
            default: '#333333'
        },
        //选项卡头部文字大小
        fontSize: {
            type: String,
            default: '30rpx'
        },
        //下划线的背景颜色
        lineBgColor: {
            type: String,
            default: '#cccccc'
        },
        //下划线默认位置	,默认0,为第一个
        current: {
            type: Number,
            default: 0
        },
        //底部下划线宽度
        lineWidth: {
            type: String,
            default: '25%'
        },
        //底部下划线高度
        lineHeight: {
            type: String,
            default: '3px'
        },
        value: {
            // 当前显示的下标 (使用v-model语法糖: 1.props需为value; 2.需回调input事件)
            type: [String, Number],
            default() {
                return 0;
            }
        },
        // 消息点的大小
        msg_wh: {
            type: String,
            default: '20rpx'
        },
        fixed: {
            type: [Boolean, String],
            default: false
        }
    },
    computed: {
        left() {
            return (100 / this.tabs.length) * this.value;
        },
        width() {
            return 100 / this.tabs.length;
        }
    },
    data() {
        return {};
    },
    methods: {
        getTabName(tab) {
            return typeof tab === 'object' ? tab.title : tab;
        },
        tabClick(i) {
            if (this.value != i) {
                this.$emit('input', i);
                this.$emit('change', i);
            }
        }
    }
};
</script>

<style lang="scss">
.jyx-tabs {
    position: relative;
    width: 100%;
    top: 0rpx;
    left: 0rpx;
}
.uni_tabs_title {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    .item {
        font-weight: 700;
        flex: 1;
        display: flex;
        justify-content: center;
        .text {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            .msg {
                position: absolute;
                top: 10rpx;
                right: 10rpx;
                width: 20rpx;
                height: 20rpx;
                background-color: #f00;
                border-radius: 50%;
            }
        }
    }
}
.line_box {
    position: relative;
    width: 100%;
    height: 3px;
    .line {
        position: absolute;
        top: 0;
        transition: all 0.5s;
        display: flex;
        justify-content: center;
        .line_inner {
            background-color: #f0ad4e;
            border-radius: 50rpx;
        }
    }
}
</style>
