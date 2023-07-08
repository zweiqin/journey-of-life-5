<template>
	<view class="ranking-list-container">
		<JBack tabbar="/pages/index/index" class="back"></JBack>
		<image
			class="top-img"
			:src="common.seamingImgUrl('0dnypqvolpvvfd6t02xb.png')"
			mode=""
		/>

		<view style="padding: 0 40upx">
			<RankingPane></RankingPane>
			<RankingPane></RankingPane>
			<RankingPane></RankingPane>
		</view>
	</view>
</template>

<script>
import RankingPane from './components/ranking-pane.vue'

export default {
	components: {
		RankingPane
	}
}
</script>

<style lang="less" scoped>
.ranking-list-container {
  .top-img {
    width: 100%;
  }

  .back {
    position: absolute;
    left: 16upx;
    top: 50upx;
    z-index: 10;
  }
}
</style>
