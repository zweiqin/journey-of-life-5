<template>
	<view ref="tabsContainerRef" class="j-tabs-container">
		<scroll-view style="position: relative" scroll-x="true">
			<view class="scroll-wrapper-container">
				<view
					v-for="(item, index) in tabs"
					:key="item.name"
					class="item"
					:class="{
						'item-active': activeIndex === index
					}"
					@click="handleCurrentChange(index)"
				>
					{{ item.name }}
				</view>
			</view>
		</scroll-view>
		<!-- <view v-if="!noScrollBar" ref="scrollBarRef" class="scroll-bar"></view> -->
	</view>
</template>

<script>
export default {
	props: {
		tabs: {
			type: Array,
			required: true
		},

		activeIndex: {
			type: Number,
			default: 0
		},

		noScrollBar: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		styles() {
			if (this.noScrollBar) {
				return {
					paddingBottom: '10upx',
					borderBottom: '4upx solid transparent'
				}
			}
		}
	},

	watch: {
		tabs: {
			handler() {
				this.$forceUpdate()
			},

			immediate: true
		}
	},

	// watch: {
	//   activeIndex() {
	//     this.$nextTick(() => {
	//       this.setScrollBar();
	//     });
	//   },
	// },

	mounted() {
		// this.$nextTick(() => {
		//   this.setScrollBar();
		// });
	},

	methods: {
		setScrollBar() {
			if (this.noScrollBar) {
				return
			}

			// scrollBarRef
			const currentEl = document.querySelector('.item-active')
			const baseLeft = document
				.querySelector('.j-tabs-container')
				.getBoundingClientRect().left

			if (currentEl) {
				const locale = currentEl.getBoundingClientRect()
				this.$refs.scrollBarRef.$el.style.left = locale.left - baseLeft + 'px'
				this.$refs.scrollBarRef.$el.style.width = locale.width + 'px'
			}
		},

		handleCurrentChange(index) {
			this.$emit('change', index)
		}
	}
}
</script>

<style lang="less" scoped>
.j-tabs-container {
  position: relative;

  .scroll-wrapper-container {
    display: flex;
    margin: 22upx 0 28upx 0;
    overflow-y: scroll;

    .item {
      position: relative;
      font-size: 28upx;
      color: #3d3d3d;
      margin-right: 52upx;
      white-space: nowrap;
      padding-bottom: 10upx;
      border-bottom: 2upx solid transparent;

      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 8upx;
        border-radius: 100px;
        left: 0;
        bottom: -3px;
        transition: all 200ms linear;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    .item-active {
      color: #fa5151;
      transition: all 350ms;
      // border-bottom: 2px solid #fa5151;

      &::after {
        background-color: #fa5151;
      }
    }
  }

  .scroll-bar {
    height: 4upx;
    background-color: #fa5151;
    width: 30px;
    border-radius: 10px;
    position: absolute;
    transition: all 350ms;
    bottom: 7px;
  }
}
</style>
