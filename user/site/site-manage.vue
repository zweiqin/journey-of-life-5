<template>
	<view class="site">
		<view class="site-title">
			<view class="title-left-view">
				<JBack :tabbar="backUrl" style="margin-top: 10upx; margin-left: 20upx" width="50" height="50" dark></JBack>
				<view class="site-mine">我的地址</view>
			</view>
			<view v-if="!isSelect" class="title-right-view">
				<view v-if="manageok == 1" class="manage" @click="manage"> 管理 </view>
				<view v-if="manageok == 2" class="manage" @click="manage"> 完成 </view>
			</view>
		</view>

		<view v-if="!siteList.length">
			<tui-no-data
				:img-url="common.seamingImgUrl('ncs28ma9a3ac5ufebzsw.png')" img-width="400" :fixed="false"
				style="margin-top: 50upx;"
			>
				暂无数据
			</tui-no-data>
		</view>
		<view v-for="(item, id) in siteList" v-else :key="id" class="site-detail">
			<view class="site-detail-frame">
				<view class="site-detail-fram-text">
					<view class="site-detail-top">
						<tui-icon v-if="item.isDefault" name="label-fill" :size="44" unit="rpx" bold color="#fc673e"></tui-icon>
						<tui-icon v-else name="label" :size="44" unit="rpx" bold color="#efefef"></tui-icon>
						<view class="site-detail-name">{{ item.name }}</view>
						<view class="site-detail-phone">{{ item.mobile }}</view>
						<view v-if="item.isDefault" class="default-site">默认</view>
					</view>
					<view class="site-detail-allsite">
						<view class="site-detail-pca">
							<image
								v-if="!isSelect" class="compile" mode="widthFix" src="../../static/images/icon/compile.png"
								@click="editAddress(item)"
							/>

							<view v-else class="choose-address" @click="handleChooseAddress(item)">
								选择该地址
							</view>
						</view>
						<view class="detail-site">{{ item.detailedAddress }} </view>
						<view v-if="manageok == 2">
							<view class="site-detail-boundary"> </view>
							<view class="site-detail-chose-default">
								<view class="site-default">
									<view style="display: flex"> </view>
								</view>
								<view>
									<image
										class="site-delete" src="../../static/images/icon/clear-his.png" alt=""
										@click="addressDelete(item)"
									/>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="site-bottom-background-white" @click="addsite">
			<view class="site-bottom">添加新的地址</view>
		</view>
	</view>
</template>

<script>
import {
	getAddressListApi,
	getRegionListApi,
	deleteAddressApi
} from '../../api/address'
import { getUserId } from '../../utils'
import { J_SELECT_ADDRESS } from '../../constant'

export default {
	name: 'SiteManage',
	data() {
		return {
			manageok: 1,
			sitedefault: 1,
			siteList: [],
			type: '',
			isSelect: false
		}
	},

	computed: {
		backUrl() {
			return this.isSelect ? '' : '/pages/user/user'
		}
	},
	methods: {
		addressDelete(item) {
			const _this = this
			uni.showModal({
				title: '提示',
				content: '确定要删除当前地址？',
				success(res) {
					if (res.confirm) {
						deleteAddressApi({
							userId: getUserId(),
							id: item.id
						}).then((res) => {
							_this.$showToast('删除成功', 'success')
							_this.getAddressList()
						})
					}
				}
			})
		},
		async getAddressList() {
			const res = await getAddressListApi({
				userId: getUserId()
			})
			this.siteList = res.data
		},
		async getRegionList() {
			const res = await getRegionListApi({
				pid: this.type
			})
			console.log(res)
			this.siteList = res.data
		},
		handleBack() {
			uni.navigateBack()
		},
		manage() {
			const manageok = this.manageok
			if (manageok === 1 && !this.siteList.length) {
				return
			}
			if (manageok == 1) {
				this.manageok = 2
			} else {
				this.manageok = 1
			}
		},
		addsite() {
			uni.navigateTo({
				url: '/user/site/add-site'
			})
		},

		editAddress(item) {
			uni.showModal({
				title: '提示',
				content: '确定要修改当前收货信息吗',
				success(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: `/user/site/add-site?editId=${item.id}`
						})
					}
				}
			})
		},

		handleChooseAddress(item) {
			uni.setStorageSync(J_SELECT_ADDRESS, item)
			uni.navigateBack()
		}
	},
	onLoad(options) {
		this.getAddressList()
		this.isSelect = !!options.appoint
	},

	onShow() {
		console.log('sb')
		this.getAddressList()
	}
}
</script>

<style lang="less" scoped>
@import "../../style/var.less";

.site {
	padding-bottom: 120upx;
	box-sizing: border-box;

	.site-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 74upx;
		margin-bottom: 18upx;
	}

	.title-left-view {
		display: flex;
		align-items: center;
	}

	.site-mine {
		font-size: @f16;
	}

	.manage {
		font-size: @f16;
		margin-right: 54upx;
	}

	.site-detail {
		margin-bottom: 24upx;

		.site-detail-frame {
			width: 95%;
			border-radius: 10px;
			background: #ffffff;
			box-sizing: border-box;
			border: 0.5px solid #ececec;
			margin: 0 auto;
			padding: 36upx 42upx 28upx 38upx;
		}

		.site-default-img {
			width: 34upx;
			height: 34upx;
			margin-right: 18upx;
		}

		.site-detail-fram-text {}

		.site-detail-top {
			display: flex;
			margin-bottom: 6upx;
			align-items: center;
		}

		.site-detail-icon {
			width: 32upx;
			height: 41upx;
		}

		.site-detail-pca {
			display: flex;
			font-size: @f14;
			margin-bottom: 3upx;
			justify-content: space-between;
		}

		.detail-site {
			font-size: @f14;
			margin: 20upx 0;
		}

		.site-detail-name {
			font-size: @f16;
			margin-left: 22upx;
			margin-right: 14upx;
		}

		.site-detail-phone {
			font-size: 24upx;
			font-weight: 350;
			color: #999999;
		}

		.default-site {
			margin-left: 42upx;
			border-radius: 20upx;
			box-sizing: border-box;
			border: 0.5px solid #ff8f1f;
			padding: 0 20upx;
			color: #ff8f1f;
			font-size: 24upx;
			font-weight: 350;
		}

		.compile {
			width: 32upx;
			height: 32upx;
		}
	}

	.site-bottom {
		width: 95%;
		height: 72upx;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100upx;
		background: #ff8f1f;
		color: white;
		font-size: 36upx;
		font-weight: 500;
	}

	.site-detail-boundary {
		margin-top: 14upx;
		margin-bottom: 26upx;
		border: 0.5px solid #d8d8d8;
	}

	.site-detail-chose-default {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 26upx;

		.site-default-text {
			font-size: 20upx;
		}

		.site-delete {
			width: 38upx;
			height: 42upx;
		}
	}

	.site-bottom-background-white {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100upx;
		background-color: #fff;
		padding-top: 10upx;
		box-sizing: border-box;
	}

	.choose-address {
		color: #fc7037;
		padding: 10upx 20upx;
		color: #fff;
		border-radius: 100px;
		background-color: #fc7037;
	}
}
</style>

