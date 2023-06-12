<template>
	<view class="pane-wrapper recomment-pane-wrapper">
		<h3>更多本店推荐</h3>
		<scroll-view class="" scroll-x="true">
			<view class="goods-list">
				<view v-for="item in data" :key="item.id" class="goods-item">
					<BeeAvatar :width="100" :height="85" radius="10upx" :src="common.seamingImgUrl(item.picUrl)">
					</BeeAvatar>

					<view class="goods-name">
						{{ item.name }}
					</view>

					<view class="price-wrapper">
						<text class="current-price">￥{{ item.retailPrice }}</text>
						<!-- <text class="old-price">￥987</text> -->
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	props: {
		data: {
			type: Array,
			required: true
		}
	}
}
</script>

<style lang="less" scoped>
.recomment-pane-wrapper {
  h3 {
    font-size: 34upx;
    font-weight: 500;
    margin-bottom: 26upx;
  }

  .goods-list {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  .goods-item {
    margin-right: 20upx;
  }

  .goods-name {
    width: 194upx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-weight: 500;
  }

  .current-price {
    color: #FA5151;
    font-weight: 500;
    font-size: 28upx;
    margin-right: 6upx;
  }

  .old-price {
    color: #777777;
    font-size: 24upx;
  }
}
</style>
