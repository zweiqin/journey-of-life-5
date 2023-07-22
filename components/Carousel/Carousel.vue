<template>
	<view
		class="banner"
		:style="{
			'height': height + 'px',
			'border-radius': radius + 'px',
			'margin-top': top + 'px'
		}"
	>
		<swiper
			class="swiper"
			indicator-dots
			autoplay
			indicator-color="#fff"
			indicator-active-color="#fff"
		>
			<swiper-item v-for="item in list" :key="item">
				<img style="height: 100%; 'border-radius':10px " :src="item" alt="" />
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	props: {
		height: Number,
		radius: {
			type: Number,
			default: 10
		},
		top: {
			type: Number,
			default: 14
		},
		list: {
			type: Array,
			default: () => []
		}
	}
}
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  height: 284upx;
  border-radius: 20upx;
  overflow: hidden;

  .swiper {
    width: 100%;
    height: 100%;

    /deep/ .uni-swiper-dot-active {
      transition: all 350ms;
      border-radius: 0;
      width: 40upx !important;
    }

    /deep/ .uni-swiper-dot {
      border-radius: 0px;
      transition: all 350ms;
      height: 4upx;
      width: 4upx;
      margin-right: 6upx;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
