<template>
	<view v-if="detailInfo" class="detail-container">
		<view class="bg">
			<OpContainer></OpContainer>
		</view>

		<view class="main-area">
			<IntelligentInfo :data="detailInfo"></IntelligentInfo>

			<view class="main-nav">
				<view
					v-for="item in navs" :key="item.value" class="item" :class="{ active: currentNav === item.value }"
					@click="handleSwitchTab(item)"
				>
					{{ item.label }}
				</view>
			</view>

			<CasePresentation :data="[]"></CasePresentation>
			<ProductPresentation :data="{}"></ProductPresentation>
			<Evaluate></Evaluate>
			<OpFooter></OpFooter>
		</view>
	</view>
</template>

<script>
import OpContainer from './cpns/OpCntainer.vue'
import IntelligentInfo from './cpns/IntelligentInfo.vue'
import CasePresentation from './cpns/CasePresentation.vue'
import ProductPresentation from './cpns/ProductPresentation.vue'
import OpFooter from './cpns/OpFooter.vue'
import Evaluate from './cpns/Evaluate.vue'
import { queryTalentDetailApi } from '../../api/marketing-treasure-house'

export default {
	components: {
		OpContainer,
		IntelligentInfo,
		CasePresentation,
		ProductPresentation,
		OpFooter,
		Evaluate
	},
	data() {
		return {
			navs: [
				{
					label: '服务案例',
					value: 0
				},
				{
					label: '服务企业',
					value: 1
				},
				{
					label: '评论',
					value: 2
				}
			],
			currentNav: 0,
			detailInfo: null
		}
	},

	onLoad(params) {
		this.getDetail(params.id)
	},

	methods: {
		handleSwitchTab(item) {
			this.currentNav = item.value
		},

		async getDetail(id) {
			const { data } = await queryTalentDetailApi({
				expertId: id
			})

			this.detailInfo = data
		}
	}
}
</script>

<style lang="less" scoped>
.detail-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f5;
  padding-bottom: 130upx;

  .bg {
    position: relative;
    width: 100%;
    height: 336upx;
    background-size: cover;
    background: url(https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00624-707.jpg) no-repeat;

    .op-container {
      position: absolute;
    }
  }

  .main-area {
    position: relative;
    z-index: 19;
    background-color: #f6f6f5;
    padding: 20upx;
    box-sizing: border-box;

    .main-nav {
      display: flex;
      align-items: center;
      padding: 30upx 0;

      .item {
        position: relative;
        font-size: 28upx;
        color: #8f8d85;
        margin-right: 48upx;
        line-height: 64upx;

        &::after {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          content: '';
          width: 0;
          height: 8upx;
          border-radius: 100px;
          background-color: #FE2301;
          bottom: 0;
        }

        &.active {
          color: #141000;
          font-size: 34upx;
          font-weight: bold;

          &::after {
            width: 40upx;
          }
        }
      }
    }
  }
}
</style>
