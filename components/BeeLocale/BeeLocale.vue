<template>
	<view class="bee-locale-container" @click="go('/pages/choose-address/choose-address')">
		<slot>
			<BeeIcon :src="require('./locale.png')" :size="20"></BeeIcon>
			<view class="location-text">{{ $store.getters.currentCity }}</view>
		</slot>
	</view>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.bee-locale-container {
  display: flex;
  align-items: center;
  margin-right: 10upx;

  .location-text {
    margin-left: 4upx;
  }
}
</style>
