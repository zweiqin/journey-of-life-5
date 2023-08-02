<template>
	<view class="user-center">
		<HeaderTool @menu-click="handleClickMenu"></HeaderTool>
		<UserInfo ref="userInfoRef"></UserInfo>

		<!-- 我的服务 -->
		<Pane title="我的工具" :menu-data="myTools" :permission-data="myToolsList" @menu-click="handleClickMenu"></Pane>

		<!-- 我的服务 -->
		<Pane title="我的服务" :menu-data="myServe" :permission-data="myServeList" @menu-click="handleClickMenu"></Pane>

		<!-- 数字化门店 -->
		<Pane v-if="userInfo.roleIds !== 11 || userInfo.roleIds !== 10" title="数字化营销门店" :menu-data="myStore" :permission-data="myStoreList" @menu-click="handleClickMenu"></Pane>

		<!-- 营销工具 -->
		<Pane title="营销工具" :menu-data="marketingTools" :permission-data="marketingToolsList" @menu-click="handleClickMenu"></Pane>

		<!-- 提示相关组件 -->
		<tui-toast ref="toast"></tui-toast>
		<tui-modal
			:show="$data._isShowTuiModel" title="提示" content="您还未登录，是否先去登录？"
			@click="_handleClickTuiModel($event, 'login', '/pages/user/user')"
		></tui-modal>
		<tui-modal :show="isShow" title="提示" content="您的会员等级不够，是否前去升级？" @click="handleUp"></tui-modal>

		<!-- 特殊code的 menu 操作 -->
		<CodePopup ref="codeRef"></CodePopup>
	</view>
</template>

<script>
import HeaderTool from './components/HeaderTool.vue'
import UserInfo from './components/UserInfo.vue'
import Pane from './components/Pane.vue'
import { myTools, myServe, myStore, marketingTools } from './config'
import showModelMixin from '../../mixin/showModel'
import { J_USER_INFO } from '../../constant'
import { refrshUserInfoApi, getRolePermissionMenuApi } from '../../api/user'
import { getUserId } from '../../utils'

export default {
	name: 'User',
	components: {
		HeaderTool,
		UserInfo,
		Pane
	},
	mixins: [ showModelMixin() ],
	data() {
		return {
			myTools: Object.freeze(myTools),
			myToolsList: [],
			myServe: Object.freeze(myServe),
			myServeList: [],
			myStore: Object.freeze(myStore),
			myStoreList: [],
			marketingTools: Object.freeze(marketingTools),
			marketingToolsList: [],
			isShow: false,
			userInfo: {}

		}
	},

	onLoad() {},

	onShow() {
		// console.log(this.myTools, this.myServe, this.myStore, this.marketingTools)
		this.$forceUpdate()
		this.userInfo = uni.getStorageSync(J_USER_INFO)
		this.$nextTick(() => {
			this.$refs.userInfoRef.setUserInfo()
		})
		if (getUserId()) {
			refrshUserInfoApi({
				userId: getUserId()
			}).then((res) => {
				this.userInfo = res.data
				uni.setStorageSync(J_USER_INFO, res.data)
				this.$refs.userInfoRef.setUserInfo()
			})
			getRolePermissionMenuApi({
				userId: getUserId()
			}).then((res) => {
				// 	console.log(res)
				const myToolsList = []
				const myServeList = []
				const myStoreList = []
				const marketingToolsList = []
				res.data.forEach((item) => {
					switch (item.type) {
						case 0:
							myToolsList.push(item)
							break
						case 1:
							myServeList.push(item)
							break
						case 2:
							myStoreList.push(item)
							break
						case 3:
							marketingToolsList.push(item)
							break
						default:
							break
					}
				})
				// this.myToolsList = myToolsList.map((item) => item.iconName)
				// this.myServeList = myServeList.map((item) => item.iconName)
				// this.myStoreList = myStoreList.map((item) => item.iconName)
				// this.marketingToolsList = marketingToolsList.map((item) => item.iconName)
				this.myToolsList = myToolsList
				this.myServeList = myServeList
				this.myStoreList = myStoreList
				this.marketingToolsList = marketingToolsList
			})
		}
	},

	mounted() {
		this.$refs.userInfoRef.setUserInfo()
	},

	methods: {
		// 点击了menu
		handleClickMenu(menuItemData) {
			console.log(this.userInfo)
			if (!this.isLogin()) {
				this.$data._isShowTuiModel = true
				return
			}
			if (menuItemData.type) {
				if (menuItemData.role.includes(this.userInfo.roleIds)) {
					this.handleSpecificMenu(menuItemData.type)
				} else {
					this.isShow = true
				}
				return
			}
			if (menuItemData.url) {
				if (menuItemData.role) {
					if (menuItemData.role.includes(this.userInfo.roleIds)) {
						uni.navigateTo({
							url: menuItemData.url
						})
					} else {
						this.isShow = true
					}
				} else {
					uni.navigateTo({
						url: menuItemData.url
					})
				}
			} else {
				this.empty()
			}
		},

		// 点击升级
		handleUp(e) {
			if (e.index) {
				this.go('/user/sever/userUp')
			}
			this.isShow = false
		},

		// 特殊的menu处理
		handleSpecificMenu(type) {
			switch (type) {
				case 'Promotion':
					this.$refs.codeRef.getCode('Promotion')
					break
				case 'Invitation':
					this.$refs.codeRef.getCode('Invitation')
					break
			}
		}
	}
}

// TODO:登陆成功回来之后需要刷新页面才能
</script>

<style lang="less" scoped>
.user-center {
	position: relative;
	width: 100%;
	min-height: 100vh;
	background: linear-gradient(180deg, rgba(255,247,193,0.64) 0%, rgba(216,216,216,0.20) 10%, #F6F6F6 43%);
	// background: linear-gradient(180deg, #FFE5CC 5%, #FFF9F0 16%, #F6F6F6 23%);
	padding: 30upx 30upx 130upx;
	box-sizing: border-box;

	.balance-text {
		font-size: 28upx;
		font-weight: bold;
		color: #FF0000;
	}

	.bee-btn {
		width: 160upx;
		height: 58upx;
		border-radius: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1.5;
		box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
		background-color: #FF0000;
		color: #fff;
		font-weight: bold;
		transition: all 350ms;

		&:active {
			background-color: #ff7878;
		}
	}
}
</style>
