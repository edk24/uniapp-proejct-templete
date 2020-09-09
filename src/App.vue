<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	/*每个页面公共css */
    /* 单行文字超出隐藏 */
    .ellipsis1 {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis
    }
    /* 多行文字超出隐藏  配合-webkit-line-clamp: 行数;  来使用*/
    .ellipsis2 {
    	display: -webkit-box;
    	-webkit-box-orient: vertical;
    	overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: normal !important;
    	word-wrap: break-word;
    }
    /* 主要图片加载不及时，显示背景色来达到一种预加载的效果 */
    .poster {
    	background-color: #E5E5E5;
    }
</style>
