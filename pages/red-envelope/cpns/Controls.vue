<template>
	<view class="control-container">
		<!-- 城市格子 -->
		<view
			v-show="marks.length >= 6"
			class="city-grid"
			@click="cityGridVisible = true"
		>
			<BeeIcon
				:src="require('../../../static/red/city-grid.png')"
				:size="30"
			></BeeIcon>

			<text>城市格子</text>
		</view>

		<transition>
			<view v-show="cityGridVisible" class="red-envelope-container">
				<tui-icon name="shut" class="close-icon" @click="cityGridVisible = false"></tui-icon>
				<view class="wrapper">
					<image
						v-for="item in marks.slice(0, 9)"
						:key="item.id"
						class="item"
						src="../../../static/red/red-envple-item.png"
						mode=""
						@click.stop="handleReceive(item)"
					/>
				</view>
			</view>
		</transition>
	</view>
</template>

<script>
export default {
	name: 'Controls',
	props: {
		marks: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			cityGridVisible: true,
			number: 20
		}
	},

	methods: {
		handleReceive(item) {
			this.cityGridVisible = false
			this.$emit('receive', {
				detail: {
					markerId: item.id
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.city-grid {
  width: 82upx;
  padding: 12upx;
  box-sizing: border-box;
  position: fixed;
  top: 65%;
  right: 40upx;
  background-color: #fff;
  border-radius: 20upx;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  text {
    font-size: 24upx;
  }
}

.red-envelope-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10000000000;
  padding: 0 70upx;
  display: flex;
  align-items: center;
  justify-content: center;

  .close-icon{
    position: fixed;
    top: 40upx;
    right: 40upx;
  }

  .wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
      width: 189upx;
      height: 260upx;
      margin-bottom: 20upx;
    }
  }
}
</style>
