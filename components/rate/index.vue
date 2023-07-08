<template>
	<view class="rate-container">
		<img
			v-for="item in 5" :key="item" :src="item <= rate
				? common.seamingImgUrl('6pfw0ql11tpiw1plmyba.png')
				: common.seamingImgUrl('79gzmwafa4xkndbn75k1.png')
			" :style="{
				'width': size + 'px',
				'height': size + 'px',
				'margin-right': '7px'
			}"
			alt="" @click="handleClickStar(item)"
		/>
	</view>
</template>

<script>
export default {
	props: {
		size: {
			type: Number,
			default: 15
		},

		rate: {
			type: [Number, String],
			required: true
		}
	},

	methods: {
		handleClickStar(rate) {
			this.$emit('change', rate)
		}
	}
}
</script>
