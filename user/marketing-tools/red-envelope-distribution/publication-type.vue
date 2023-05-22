<template>
	<view class="publication-type-container">
		<JHeader style="padding: 40upx 40upx 0;" width="50" height="50" title="发放类型"></JHeader>
		<tui-tabs
			:item-width="userInfo.roleIds === 6 || userInfo.roleIds === 7 ? '50%' : '100%'" selected-color="#000000" bold slider-bg-color="#ff0000"
			:tabs="userInfo.roleIds === 6 || userInfo.roleIds === 7 ? [{ name: '红包' }, { name: '优惠券' }] : [ { name: '红包' } ]" :current-tab="currentTab"
			@change="(e) => currentTab = e.index"
		></tui-tabs>

		<view v-if="currentTab === 0">
			<view style="width: 70%;margin: 10rpx auto 0;">
				<!-- <tui-button
					type="danger" bold shape="circle" width="100%"
					@click="go('/user/marketing-tools/red-envelope-distribution/publication-template?templateType=1')"
					>
					新建红包模板
					</tui-button> -->
			</view>
			<view>
				<tui-waterfall :list-data="redSystemTemplate">
					<template #left="{ entity }">
						<view style="width: 80%;margin: 0 auto 45upx;">
							<image :src="common.seamingImgUrl(entity.redUrl)" mode="widthFix" style="width: 100%;" />
							<tui-button type="primary" bold shape="circle" width="70%" height="52rpx" margin="0 auto" @click="handleRedUse(entity)">
								使用该模板
							</tui-button>
						</view>
					</template>
					<template #right="{ entity }">
						<view style="width: 80%;margin: 0 auto 45upx;">
							<image :src="common.seamingImgUrl(entity.redUrl)" mode="widthFix" style="width: 100%;" />
							<tui-button type="primary" bold shape="circle" width="70%" height="52rpx" margin="0 auto" @click="handleRedUse(entity)">
								使用该模板
							</tui-button>
						</view>
					</template>
				</tui-waterfall>
			</view>
		</view>

		<view v-if="currentTab === 1">
			<view style="width: 70%;margin: 10rpx auto 0;">
				<tui-button type="danger" bold shape="circle" width="100%" @click="showCouponSystemTemplate = true">
					新建优惠券模板
				</tui-button>
				<!-- go('/user/marketing-tools/red-envelope-distribution/publication-template?templateType=0') -->
			</view>
			<tui-landscape
				:show="showCouponSystemTemplate" :position="1" :mask-closable="true" icon-left="50rpx"
				icon-right="50rpx" @close="showCouponSystemTemplate = false"
			>
				<view style="max-height: 75vh;overflow-y: auto;">
					<image
						v-for="item in CouponSystemTemplate" :key="item.id" :src="common.seamingImgUrl(item.showUrl)"
						mode="widthFix" style="width: 600rpx;" @click="handleTemplateClick(item)"
					/>
				</view>
			</tui-landscape>
			<view
				v-for="item in CouponListData" :key="item.id"
				style="margin-top: 36upx;display: flex;flex-direction: column;align-items: center;"
			>
				<!-- <view :style="{ background: `url(${CouponSystemTemplate.find(part => part.typeRoll === item.type).redUrl}) no-repeat center` }" style="width: 100%;height: 100%;"></view> -->
				<view style="position: relative;width: 90%;">
					<image
						:src="common.seamingImgUrl(CouponSystemTemplate.find(part => part.typeRoll === item.type).redUrl)"
						mode="widthFix" style="width: 100%;"
					/>
					<view
						style="position: absolute;top: 8%;right: 5%;display: flex;align-items: center;color: #979797;"
						@click="go(`/user/marketing-tools/red-envelope-distribution/publication-template?templateType=0&isGoods=${item.typeRoll}&adminMagicId=${item.adminMagicId}&id=${item.id}`)"
					>
						<text style="margin-right: 10rpx;">修改</text>
						<view>
							<tui-icon
								name="arrowright" size="12" color="#979797"
								style="padding: 2rpx;border: 1px solid #979797;border-radius: 50%;"
							></tui-icon>
						</view>
					</view>
					<view
						style="position: absolute;top: 55%;left: 8%;display: flex;flex-direction: column;justify-content: space-around;max-width: 85%;height: 35%;color: #874713;"
						:style="{ color: item.typeRoll === 0 ? '#874713' : item.typeRoll === 1 ? '#F8EEBA' : '' }"
					>
						<view>
							<text>优惠券：</text><text
								:style="{ color: item.typeRoll === 0 ? '#FC4023' : item.typeRoll === 1 ? '#F8EEBA' : '' }"
							>
								<text
									style="padding-right: 6upx;font-size: 36upx;font-weight: bold;"
								>
									{{ item.rollMonkey
									}}
								</text><text>元</text>
							</text>
						</view>
						<view><text>满</text><text>{{ item.limitation }}</text><text>可用</text></view>
						<view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
							<text>有效期：</text><text>
								{{
									item.startTime }}
							</text>至<text>{{ item.endTime }}</text>
						</view>
					</view>
				</view>
				<tui-button type="primary" bold shape="circle" width="50%" height="52rpx" @click="handleCouponUse(item)">
					使用该模板
				</tui-button>
			</view>
		</view>

	</view>
</template>

<script>
import { J_USER_TOKEN, J_PAY_TYPE, J_USER_INFO } from '../../../constant'
import { getUserId } from '../../../utils'
import { getCouponMagicIsBindingApi, getCouponMagicListApi, getWrapAdminMagicApi, getMagicListIdApi } from '../../../api/user'
// import { payOrderGoodsApi } from '../../../api/goods'

export default {
	name: 'PublicationType',
	data() {
		return {
			currentTab: 0,
			showCouponSystemTemplate: false,
			CouponSystemTemplate: [],
			redSystemTemplate: [],
			// redListData: [],
			CouponListData: [],
			userInfo: {}
		}
	},
	onLoad() {
		this.userInfo = uni.getStorageSync(J_USER_INFO)
		getWrapAdminMagicApi({ type: '' })
			.then((res) => {
				this.CouponSystemTemplate = res.data.filter((item) => item.type === 1 || item.type === 2)
				this.redSystemTemplate = res.data.filter((item) => item.type === 0)
			})
			.catch((err) => {
				console.log(err)
			})
	},
	onShow() {
		getCouponMagicListApi({ userId: getUserId(), type: 0 }) // 0优惠券，1红包
			.then((res) => {
				// this.redListData = res.data.filter((item) => item.typeRoll === 2)
				this.CouponListData = res.data.filter((item) => item.typeRoll === 0 || item.typeRoll === 1)
			})
			.catch((err) => {
				console.log(err)
			})
	},

	methods: {
		// 点击进入模板选择页面
		handleChoosePublish() {
			uni.navigateTo({
				url: '/user/marketing-tools/red-envelope-distribution/publication-type'
			})
		},

		handleCouponUse(item) {
			uni.navigateBack({
				delta: 1,
				success: (res) => {
					uni.$emit('sendWrapMsg', { data: { wrapType: 1, wrapName: `${item.title}-${item.id}`, magicId: item.id } })
				}
			})
		},

		async handleRedUse(item) {
			const result = await getMagicListIdApi({ maId: item.id })
			uni.navigateBack({
				delta: 1,
				success: (res) => {
					uni.$emit('sendWrapMsg', { data: { wrapType: 0, wrapName: `${result.data.title}-${result.data.id}`, magicId: result.data.id } })
				}
			})
		},

		handleTemplateClick(item) {
			this.showCouponSystemTemplate = false
			if (item.type === 1) {
				this.go(`/user/marketing-tools/red-envelope-distribution/publication-template?templateType=0&isGoods=0&adminMagicId=${item.id}`)
			} else if (item.type === 2) {
				this.go(`/user/marketing-tools/red-envelope-distribution/publication-template?templateType=0&isGoods=1&adminMagicId=${item.id}`)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.publication-type-container {
	// height: 100vh;
	padding-bottom: 40upx;
	box-sizing: border-box;
	font-size: 24upx;
	color: #3d3d3d;
	background-color: #f6f6f5;

}
</style>
