<template>
	<view
		class="goods-filter-container"
		:class="{ fixed: scrollTop > top + 200 }"
	>
		<view
			v-for="item in filterMenu"
			:key="item.value"
			class="item"
			@click="handleFilter(item)"
		>
			<text :style="{ color: item.color }">{{ item.name }}</text>
			<BeeIcon :size="14" :src="item.icon"></BeeIcon>
		</view>

		<!-- <SynthesizePopup
			:translatey="translatey"
			v-model="visible.synthesizePopupVisible"
			></SynthesizePopup> -->
	</view>
</template>

<script>
import SynthesizePopup from './cpns/SynthesizePopup.vue'
import { filterMenu } from './data'

const mapComponent = {
	0: 'synthesizePopupVisible'
}

export default {
	name: 'GoodsFilter',
	components: {
		SynthesizePopup
	},
	props: {
		scrollTop: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			filterMenu: Object.freeze(filterMenu),
			top: 0,
			visible: {
				synthesizePopupVisible: false
			}
		}
	},

	computed: {
		translatey() {
			return this.top - this.scrollTop
		}
	},

	mounted() {
		this.getPosition()
	},

	methods: {
		async getPosition() {
			const res = await this._getSize('.goods-filter-container')
			this.top = res.top + res.height
		},

		// 点击显示筛选
		handleFilter(item) {
			// this.visible[mapComponent[item.value]] = true
		}
	}
}
</script>

<style lang="less" scoped>
.goods-filter-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 350ms;

  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 20upx 22upx 22upx 22upx;
    box-sizing: border-box;
    z-index: 100000;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
