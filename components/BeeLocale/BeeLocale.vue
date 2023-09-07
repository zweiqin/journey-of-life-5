<template>
	<view class="bee-locale-container" @click="go(`/pages/choose-address/choose-address?eventName=${eventName}`)">
		<slot>
			<tui-icon v-if="isIcon" :size="size" name="gps" color="#ffffff"></tui-icon>
			<BeeIcon v-else :src="require('./locale.png')" :size="size"></BeeIcon>
			<view class="location-text">
				<text :style="{ 'fontSize': size * 2 + 'upx' }">{{ $store.getters[field] }}</text>
			</view>
		</slot>
	</view>
</template>

<script>
export default {
	name: 'BeeLocale',
	props: {
		isIcon: {
			type: Boolean,
			default: false
		},
		size: {
			type: Number,
			default: 16
		},
		field: {
			type: String,
			default: 'currentCity'
		},
		eventName: {
			type: String,
			default: ''
		}
	}
}
</script>

<style lang="less" scoped>
.bee-locale-container {
  display: flex;
  align-items: center;
  margin-right: 10upx;

  .location-text {
		flex: 1;
		// width: 0;
		max-width: 38vw;
    margin-left: 4upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
  }
}
</style>
