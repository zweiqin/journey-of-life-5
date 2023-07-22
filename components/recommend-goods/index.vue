<template>
	<view
		class="recommend-goods-container"
		:style="{
			padding: padding + 'px'
		}"
	>
		<view v-if="showTitle" class="title"></view>
		<ul>
			<li v-for="item in list" :key="item.id">

				<JGoods :scroll-top="scrollTop" :data="item"></JGoods>
			</li>
		</ul>
	</view>
</template>

<script>
import { everyLookApi } from '../../api/goods'
export default {

	components: {},
	props: {
		id: {
			type: [Number, String],
			default: 14
		},

		showTitle: {
			type: Boolean,
			default: true
		},

		padding: [Number, String],
		scrollTop: Number
	},

	data() {
		return {
			list: []
		}
	},

	mounted() {
		this.getData()
	},

	methods: {
		async getData() {
			const res = await everyLookApi(this.id)
			if (res.errno === 0) {
				this.list = res.data.goodsList
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

.recommend-goods-container {
  padding: 15upx;
}

.title {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 1px;
  border-top: 1upx solid black;
  margin: 20px 0 20px 0;

  &::before {
    position: absolute;
    content: "大家都在看";
    display: block;
    background-color: @cw;
    padding: 0 20px;
    top: -10px;
    left: 50%;
    font-size: @f14;
    white-space: nowrap;
    transform: translateX(-50%);
  }
}

ul {
  padding: 0;
  .flex();
  flex-wrap: wrap;
}
</style>
