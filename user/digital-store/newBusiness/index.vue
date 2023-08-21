<template>
	<view>
		<view class="newBusiness">
			<JHeader width="50" height="50" title="业务管理"></JHeader>
			<view style="margin-top: 20upx"></view>
			<BusinessSearch></BusinessSearch>
			<view class="head">
				<view v-for="item in businessHead" :key="item.value" class="headDetail" :style="{ width: item.width }">
					{{ item.label }}
				</view>
				<image src="./image/plus.png" mode="scaleToFill" class="addImg" @click="addUser(2)" />
			</view>
			<BusinessUser
				v-for="item in bussinessList" :id="item.id" :key="item.id" :value="value"
				:user-name="item.userName"
				:user-tel="item.userTel" :user-gender="item.userGender" :professional="item.professional" :data="item"
			>
			</BusinessUser>
		</view>
		<view class="bottom">
			<view class="status">
				<view
					v-for="item in status" :key="item.value" class="item" :class="{ active: item.value == value }"
					@click="handleChangeTab(item.value)"
				>
					{{ item.label }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {
	queryMsgSentryListApi,
	saveMsgSentryApi,
	upbussinessApi
} from '../../../api/user'
import { getUserId } from '../../../utils'
import businessSearch from './businessSearch'
import businessUser from './businessUser'
import { status, businessHead } from './config.js'
export default {
	name: 'NewBusiness',
	components: { BusinessSearch: businessSearch, BusinessUser: businessUser },
	props: {},
	data() {
		return { status, businessHead, value: 5, bussinessList: [] }
	},
	methods: {
		addUser(e) {
			// uni.navigateTo({ url: `./addUser/index?type=${e}` });
			uni.navigateTo({ url: `./addUser/index` })
		},
		handleChangeTab(tab) {
			this.value = tab
			this.queryMsgSentryList()
		},
		queryMsgSentryList() {
			queryMsgSentryListApi({
				userId: getUserId(),
				// userId: 269,
				status: this.value
			}).then((res) => {
				this.bussinessList = res.data
			})
				.catch((e) => {
					if (e.errno == 780) {
						uni.showToast({
							title: e.errmsg,
							icon: 'none',
							mask: true
						})
						setTimeout(() => {
							this.$switchTab('/pages/user/user')
						}, 2000)
					}
				})
		}
	},

	// 页面周期函数--监听页面加载
	onLoad() {
		this.queryMsgSentryList()
	}
}
</script>

<style lang="less" scoped>
.newBusiness {
	padding: 0 10upx;

	.head {
		display: flex;
		border-bottom: 1px solid #d8d8d8;
		justify-content: space-between;
		padding-bottom: 10upx;
		margin: 20upx 0;

		.headDetail {
			text-align: center;
			font-size: 28upx;
		}

		.addImg {
			height: 40upx;
			width: 40upx;
			padding: 0 20upx;
			margin: 0 10upx;
			margin-right: 10px;
		}
	}
}

.bottom {
	position: fixed;
	bottom: 0;
	height: 80upx;
	line-height: 80upx;
	background: white;
	width: 100%;

	.status {
		display: flex;
		justify-content: space-around;
		font-size: 28upx;

		.item {
			&.active {
				color: #fa5151;
				font-weight: 600;
			}
		}
	}
}
</style>
