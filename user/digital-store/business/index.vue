<!-- * @Author: 13008300191 904947348@qq.com
	* @Date: 2022-09-17 16:42:41
	* @LastEditors: 13008300191 904947348@qq.com
	* @LastEditTime: 2022-09-20 17:01:44
	* @FilePath: \团蜂商城 - 副本\tuan-uniapp\user\digital-store\business\index.vue
	* @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE -->
<template>
	<view>
		<view class="header">
			<img :src="common.seamingImgUrl('qt4o7j0jglkweyicy1fw.png')" class="back" alt="" @click="back" />
			<h2>业务管理</h2>
		</view>
		<view class="bussiness-chose">
			<view :class="{ active: currentTab === 0 }" class="item" @click="changeTab(0)">
				开发
			</view>
			<view :class="{ active: currentTab === 1 }" class="item" @click="changeTab(1)">
				潜在
			</view>
			<view :class="{ active: currentTab === 2 }" class="item" @click="changeTab(2)">
				VIP
			</view>
		</view>
		<view class="border"></view>
		<view class="listTetle">
			<view class="userName">姓名</view>
			<view class="userPhone">手机号</view>
			<view class="userProfession">职业类型</view>
			<view class="operation">操作</view>
		</view>
		<view v-for="(item, index) in userlist" :key="index" class="listDetail">
			<view class="userNamelist">{{ item.userName }}</view>
			<view class="userPhonelist">{{ item.userTel }}</view>
			<view class="userProfessionlist">{{ item.professional }}</view>
			<view class="operationDetail">
				<view class="userUp" :data-list="item" @click="window">详情</view>
				<view v-if="currentTab == 0" class="userChange" :data-list="item" @click="userUp">
					升级
				</view>
				<view v-if="currentTab == 1" class="userChange" :data-list="item" @click="userUp">
					升级
				</view>
			</view>
		</view>
		<!-- 弹窗 -->
		<!-- 用户详情与修改 -->
		<uni-popup ref="popup" type="center">
			<view class="detail-window">
				<view>
					<!-- <view class="title">用户详情与修改</view> -->
					<view class="title">用户详情</view>

					<view class="input-title">姓名:</view><input
						v-model="userName" type="text" disabled="ture" class="input-detail"
						@input="userNameinput"
					/>
					<view class="input-title">手机号:</view><input
						v-model="userPhone" type="text" disabled="ture" class="input-detail"
						@input="userPhoneinput"
					/>
					<view class="input-title">职业类型:</view><input
						v-model="userProfession" type="text" disabled="ture"
						class="input-detail" @input="userProfessioninput"
					/>
					<view v-if="currentTab == 1">
						<view class="input-title">爱好:</view><input
							v-model="userLove" type="text" disabled="ture" class="input-detail"
							@input="userLoveinput"
						/>
						<view class="input-title">工作地址:</view><input
							v-model="userWorklive" type="text" disabled="ture"
							class="input-detail" @input="userWorkliveinput"
						/>
					</view>
					<view v-if="currentTab == 2">
						<view class="input-title">爱好:</view><input
							v-model="userLove" type="text" disabled="ture" class="input-detail"
							@input="userLoveinput"
						/>
						<view class="input-title">工作地址:</view><input
							v-model="userWorklive" type="text" disabled="ture"
							class="input-detail" @input="userWorkliveinput"
						/>
						<view class="input-title">家庭住址:</view><input
							v-model="userHome" type="text" disabled="ture"
							class="input-detail" @input="userHomeinput"
						/>
						<view class="input-title">生日:</view><input
							v-model="userBirthday" type="text" disabled="ture"
							class="input-detail" @input="userBirthdayinput"
						/>
					</view>
				</view>
				<view class="button-background">
					<!-- <view class="top-button" @click="submit">提交</view> -->
					<view class="bottom-button" @click="close">取消</view>
				</view>
			</view>
		</uni-popup>
		<!-- 用户升级 -->
		<uni-popup ref="userUp" type="center">
			<view class="detail-window">
				<view class="title">用户升级</view>
				<view v-if="currentTab == 0">
					<view class="input-title">爱好:</view><input
						v-model="userLove" type="text" class="input-detail"
						@input="userLoveinput"
					/>
					<view class="input-title">工作地址:</view><input
						v-model="userWorklive" type="text" class="input-detail"
						@input="userWorkliveinput"
					/>
				</view>
				<view v-if="currentTab == 1">
					<view class="input-title">家庭住址:</view><input
						v-model="userHome" type="text" class="input-detail"
						@input="userHomeinput"
					/>
					<view class="input-title">生日:</view><input
						v-model="userBirthday" type="text" class="input-detail"
						@input="userBirthdayinput"
					/>
				</view>
				<view class="button-background">
					<view class="top-button" @click="submituserUp">提交</view>
					<view class="bottom-button" @click="close">取消</view>
				</view>
			</view>
		</uni-popup>
		<!-- 用户增加 -->
		<uni-popup ref="useradd" type="center">
			<view class="detail-window">
				<view>
					<view class="title">用户添加</view>
					<view class="input-title">姓名:</view><input
						type="text" placeholder="请输入姓名" class="input-detail"
						@input="userNameinput"
					/>
					<view class="input-title"> 选择性别:</view>
					<view>
						<uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
					</view>
					<view class="input-title">手机号:</view><input
						type="text" placeholder="请输入手机号" class="input-detail"
						@input="userPhoneinput"
					/>
					<view class="input-title">职业类型:</view><input
						type="text" placeholder="请输入职业类型" class="input-detail"
						@input="userProfessioninput"
					/>
				</view>
				<view class="input-title">所属业务员:</view><input
					type="text" placeholder="请输入业务员姓名" class="input-detail"
					@input="belongsSalesmaninput"
				/>

				<view class="input-title">业务员所属部门:</view><input
					type="text" placeholder="请输入业务员所属部门" class="input-detail"
					@input="belongsDepartmentinput"
				/>

				<view class="button-background">
					<view class="top-button" @click="submitAdduser">提交</view>
					<view class="bottom-button" @click="close">取消</view>
				</view>
			</view>
		</uni-popup>
		<view class="addimg">
			<img
				v-if="currentTab == 0" class="img"
				src="../../../static/images/icon/add.png" alt=""
				@click="useradd"
			/>
		</view>
		<!-- 提示弹窗 -->
		<view>
			<uni-popup ref="windowtext" type="center">
				<view>{{ windowtext }}</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import {
	upbussinessApi,
	queryMsgSentryListApi,
	saveMsgSentryApi
} from '../../../api/user'
import { getUserId } from '../../../utils'
export default {
	data() {
		return {
			inputValue: '',
			currentTab: 0,
			id: '',
			userId: '',
			status: '5',
			userName: '',
			userPhone: '',
			userProfession: '',
			userLove: '',
			userHome: '',
			userWorklive: '',
			userBirthday: '',
			belongsSalesman: '',
			belongsDepartment: '',
			searchinput: '',
			windowtext: '',
			userlist: [],
			value: 0,
			range: [
				{ value: 0, text: '未知' },
				{ value: 1, text: '男士' },
				{ value: 2, text: '女士' }
			]
		}
	},
	mounted() {
		this.queryMsgSentryList()
	},
	methods: {
		change(e) {
			console.log('e:', e)
			this.userGender = e
			console.log('usergender', this.userGender)
		},
		async levelUp() {
			const res = await upbussinessApi({
				// id: getUserId(),
				id: this.id,
				status: this.status * 1 + 1,
				hobby: this.userLove,
				workingPlace: this.userWorklive,
				homeAddress: this.userHome,
				birthday: this.userBirthday
			})

			if (res.errno == 0) {
				uni.showToast({
					title: '升级成功',
					icon: 'success',
					mask: true
				})
			} else {
				uni.showToast({
					title: '升级成功',
					icon: 'success',
					mask: true
				})
				// uni.showToast({
				//   title: "升级失败",
				//   icon: "none",
				//   mask: true,
				// });
			}
			this.queryMsgSentryList()
		},
		async queryMsgSentryList() {
			const res = await queryMsgSentryListApi({
				userId: getUserId(),
				// userId: 200,
				status: this.status * 1
				// search:this.searchinput,搜索晚点搞
			})
			this.userlist = res
			console.log(res)
			if (res.errno == 780 || res.errmsg == '该用户还不是业务员') {
				uni.showToast({
					title: res.errmsg,
					icon: 'none',
					mask: true
				})
				setTimeout(() => {
					this.$switchTab('/pages/user/user')
				}, 2000)
			}
		},
		async saveMsgSentry() {
			const res = await saveMsgSentryApi({
				brandUserId: getUserId(),
				userName: this.userName,
				userGender: this.userGender,
				userTel: this.userPhone,
				professional: this.userProfession,
				belongsSalesman: this.belongsSalesman,
				belongsDepartment: this.belongsDepartment
			})
			console.log(res)
			if (res.errno == 0) {
				uni.showToast({
					title: '添加成功',
					icon: 'success',
					mask: true
				})
			} else {
				uni.showToast({
					title: '添加失败',
					icon: 'none',
					mask: true
				})
			}
			this.queryMsgSentryList()
		},

		userNameinput(event) {
			this.userName = event.target.value
			console.log(event.target.value)
		},
		userPhoneinput(event) {
			this.userPhone = event.target.value
			console.log(event.target.value)
		},
		userProfessioninput(event) {
			this.userProfession = event.target.value
			console.log(event.target.value)
		},
		belongsSalesmaninput(event) {
			this.belongsSalesman = event.target.value
			console.log(event.target.value)
		},
		belongsDepartmentinput(event) {
			this.belongsDepartment = event.target.value
			console.log(event.target.value)
		},
		userLoveinput(event) {
			this.userLove = event.target.value
			console.log(event.target.value)
		},
		userWorkliveinput(event) {
			this.userWorklive = event.target.value
			console.log(event.target.value)
		},
		userLoveinput(event) {
			this.userLove = event.target.value
			console.log(event.target.value)
		},
		userWorkliveinput(event) {
			this.userWorklive = event.target.value
			console.log(event.target.value)
		},
		userHomeinput(event) {
			this.userHome = event.target.value
			console.log(event.target.value)
		},
		open() {
			this.$refs.popup.open()
			this.userNameinput = ''
			this.userPhoneinput = ''
			this.userProfessioninput = ''
			this.belongsSalesmaninput = ''
			this.belongsDepartmentinput = ''
			this.userLoveinput = ''
			this.userWorkliveinput = ''
			this.userLoveinput = ''
			this.userWorkliveinput = ''
			this.userHomeinput = ''
		},

		/**
		 * 点击取消按钮触发
		 * @param {Object} done
		 */

		close() {
			// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
			// ...

			this.$refs.popup.close()
			this.$refs.userUp.close()

			this.$refs.useradd.close()

			this.$refs.windowtext.close()
		},

		/**
		 * 点击确认按钮触发
		 * @param {Object} done
		 * @param {Object} value
		 */

		confirm(value) {
			// 输入框的值
			console.log(value)
			// TODO 做一些其他的事情，手动执行 close 才会关闭对话框
			// ...
			this.$refs.popup.close()
		},
		submit() {
			console.log(this.userName)
			console.log(this.userPhone)
			console.log(this.userProfession)
			console.log(this.userLove)
			console.log(this.userHome)
			console.log(this.userWorklive)
			console.log(this.userBirthday)
			this.$refs.popup.close('center')
		},
		submituserUp() {
			console.log(this.userName)
			console.log(getUserId())
			console.log(this.status)
			console.log(this.userPhone)
			console.log(this.userProfession)
			console.log(this.userLove)
			console.log(this.userHome)
			console.log(this.userWorklive)
			console.log(this.userBirthday)

			this.levelUp()
			this.$refs.userUp.close('center')
		},
		submitAdduser() {
			console.log(this.userName)
			console.log(this.userPhone)
			console.log(this.userProfession)
			// this.levelUp()
			if (!this.userName) {
				this.windowtext = '姓名不能为空'
				this.$refs.windowtext.open('center')
			} else if (!this.userPhone) {
				this.windowtext = '手机号不能为空'
				this.$refs.windowtext.open('center')
				console.log('手机号不能为空')
			} else if (!this.userProfession) {
				this.windowtext = '职业不能为空'
				this.$refs.windowtext.open('center')
				console.log('职业不能为空')
			} else if (!this.belongsSalesman) {
				this.windowtext = '所属业务员不能为空'
				this.$refs.windowtext.open('center')
				console.log('所属业务员不能为空')
			} else if (!this.belongsDepartment) {
				this.windowtext = '业务员部门不能为空'
				this.$refs.windowtext.open('center')
				console.log('业务员部门不能为空')
			} else {
				this.saveMsgSentry()
			}
			this.$refs.useradd.close('center')
		},
		changeTab(tab) {
			this.currentTab = tab

			if (tab == 0) {
				this.status = 5
			} else if (tab == 1) {
				this.status = 6
			} else if (tab == 2) {
				this.status = 7
			}
			this.queryMsgSentryList()
		},
		back() {
			this.$switchTab('/pages/user/user')
		},
		window(e) {
			this.id = e.currentTarget.dataset.list.id
			this.userName = e.currentTarget.dataset.list.userName
			this.userPhone = e.currentTarget.dataset.list.userTel
			this.userProfession = e.currentTarget.dataset.list.professional
			this.userLove = e.currentTarget.dataset.list.hobby
			this.userHome = e.currentTarget.dataset.list.homeAddress
			this.userWorklive = e.currentTarget.dataset.list.workingPlace
			this.userBirthday = e.currentTarget.dataset.list.birthday
			this.$refs.popup.open('center')
		},
		userUp(e) {
			this.id = e.currentTarget.dataset.list.id
			this.userName = e.currentTarget.dataset.list.userName
			this.userPhone = e.currentTarget.dataset.list.userTel
			this.userProfession = e.currentTarget.dataset.list.userProfession
			this.userLove = e.currentTarget.dataset.list.userLove
			this.userHome = e.currentTarget.dataset.list.userHome
			this.userWorklive = e.currentTarget.dataset.list.userWorklive
			this.userBirthday = e.currentTarget.dataset.list.userBirthday
			this.$refs.userUp.open('center')
		},
		useradd(e) {
			this.$refs.useradd.open('center')
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../../style/mixin.less";
@import "../../../style/var.less";

.header {
	width: 100%;
	text-align: center;
	margin-top: 30upx;
	padding-top: 30upx;

	.back {
		float: left;
		width: 40upx;
		margin-top: 6upx;
		padding-left: 30upx;
	}

	h2 {
		font-size: 34upx;
		display: inline;
		font-weight: normal;
	}
}

.bussiness-chose {
	display: flex;
	margin-top: 20upx;
	margin-bottom: 10upx;

	.item {
		margin: 0 auto;
		font-size: 24upx;

		&.active {
			font-weight: bold;
			color: #3d3d3d;
		}
	}
}

.border {
	width: 95%;
	margin: 0 auto;
	border: 0.5px solid #d8d8d8;
}

.listTetle {
	display: flex;
	align-items: center;
	padding: 0 20upx;
	margin: 10upx 0upx;

	.userName {
		width: 20%;
		text-align: center;
	}

	.userPhone {
		width: 35%;
		text-align: center;
	}

	.userProfession {
		width: 187.5upx;
		text-align: center;
	}

	.operation {
		width: 20%;
		text-align: center;
	}
}

.listDetail {
	display: flex;
	align-items: center;
	padding: 0 20upx;

	.userNamelist {
		width: 20%;
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding: 0 10upx;
	}

	.userPhonelist {
		width: 35%;
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding: 0 10upx;
	}

	.userProfessionlist {
		width: 25%;
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding: 0 10upx;
	}

	.operationDetail {
		width: 20%;
		text-align: center;
		padding: 0 10upx;
		font-size: 25upx;
		margin: 5upx;
		color: white;

		.userUp {
			background-color: lightskyblue;
			border-radius: 10upx;
			margin-bottom: 3upx;
			box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);
		}

		.userChange {
			background-color: lightblue;
			border-radius: 10upx;
			box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);
		}
	}
}

.detail-window {
	background-color: white;
	width: 630upx;
	padding: 40upx;
	border-radius: 20upx;

	.title {
		text-align: center;
		font-weight: 600;
		padding: 20upx;
	}

	.input-title {
		font-size: 32upx;
		font-weight: 700;
	}

	.input-detail {
		margin: 10upx 0;
		border: 1px solid #999999;
	}

	.button-background {
		padding-top: 40upx;

		.top-button {
			margin: 0 auto;
			text-align: center;
			color: white;
			width: 300upx;
			border-radius: 20px;
			background: linear-gradient(359deg,
					#07b907 4%,
					rgba(7, 185, 185, 0) 141%);
			box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);
		}

		.bottom-button {
			margin: 0 auto;
			text-align: center;
			color: white;
			margin-top: 20upx;
			width: 300upx;
			border-radius: 20px;
			background: linear-gradient(359deg,
					#07b9b9 4%,
					rgba(7, 185, 185, 0) 141%);
			box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.3);
		}
	}
}

.userUp-window {}

.addimg {
	.img {
		position: fixed;
		bottom: 60upx;
		right: 60upx;
		width: 80upx;
	}
}
</style>
