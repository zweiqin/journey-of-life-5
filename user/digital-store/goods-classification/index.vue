<template>
	<view class="goods-classification-container">
		<view class="head">
			<image src="./image/fanhui.png" mode="" @click="handleBack" />
			<span>商品分类</span>
			<button @click="createModal = true">添加分类</button>
		</view>
		<view class="goodsTable" :key="item.brandId" v-for="item in CategoryList">
			<view class="ClassItem">
				<view class="ClassName">
					<p>
						类名：<span>{{ item.name }}</span>
					</p>
					<p>
						创建时间：<span>{{ item.timer }}</span>
					</p>
				</view>
				<button class="btn" @click="updataCategory(item)">修改</button>
			</view>
		</view>
		<tui-modal :show="modal" custom maskClosable @cancel="closeModal">
			<tui-form-item label="类名">
				<input v-model="ParamsList.name" class="tui-input" placeholder="请输入分类名字" placeholder-style="color:#ccc" />
			</tui-form-item>
			<view class="reportBtn">
				<tui-button width="200rpx" height="72rpx" :size="28" type="danger" shape="circle" @click="handleClick">确定</tui-button>
				<tui-button width="200rpx" height="72rpx" :size="28" type="gray-primary" shape="circle" @click="modal = false">取消</tui-button>
			</view>
		</tui-modal>
		<tui-modal :show="createModal" custom maskClosable @cancel="closeModal">
			<tui-form-item label="类名">
				<input v-model="creatData.name" class="tui-input" placeholder="请输入分类名字" placeholder-style="color:#ccc" />
			</tui-form-item>
			<tui-form-item label="排序">
				<input v-model="creatData.sortOrder" class="tui-input" placeholder="请输入数字如1,2,3" placeholder-style="color:#ccc" />
			</tui-form-item>
			<view class="reportBtn">
				<tui-button width="200rpx" height="72rpx" :size="28" type="danger" shape="circle" @click="handleCreateClick">确定</tui-button>
				<tui-button width="200rpx" height="72rpx" :size="28" type="gray-primary" shape="circle" @click="createModal = false">取消</tui-button>
			</view>
		</tui-modal>
		<!-- <JHeader tabbar="/pages/user/user" width="50" height="50" title="商品分类"></JHeader>
		<view v-if="xxxList && xxxList.length">
			<view v-for="(item, index) in xxxList" :key="index" class="" style="padding-bottom: 35upx;">

			</view>
		</view>
		<LoadMore v-show="xxxList.length" :status="status"></LoadMore>
		<view v-if="xxxList && !xxxList.length && loadingStatus !== 'loading'" class="no-data">
			暂无xxx~
		</view> -->
	</view>
</template>

<script>
	import {
		getCategory
	} from "@/api/user";
	import tuiModal from "@/components/thorui/tui-modal/tui-modal.vue"
	import { addCategoryApi, updateCategoryNameApi } from '../../../api/user'
	// import { J_USER_INFO } from '../../../constant'
	// import { getUserId, getBrandId } from '../../../utils'

	export default {
		name: "GoodsClassification",
		components: {},
		onLoad(options) {},
		data() {
			return {
				CategoryList: [],
				modal: false,
				createModal: false,
				creatData: {name: "", sortOrder: "",},
				ParamsList:{ name:"", categoryId:"" }
			};
		},
		onShow() {
			this.getDataList()
		},
		methods: {
			getDataList() {
				getCategory().then((res) => {
					this.CategoryList = res.data;
					this.CategoryList.forEach(item => {
						item.timer = this.convertTimeString(item.addTime)
					})
				});
			},
			handleBack() {
				uni.navigateBack();
			},
			convertTimeString(timeString) {
				const date = new Date(timeString);
				// .toLocaleString("en-US", { timeZone: "Asia/Shanghai" })
				console.log(date)
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, "0");
				const day = String(date.getDate()).padStart(2, "0");
				// console.log(date.getHours())
				const hours = String(date.getHours()).padStart(2, "0");
				const minutes = String(date.getMinutes()).padStart(2, "0");
				const seconds = String(date.getSeconds()).padStart(2, "0");
				const convertedTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
				return convertedTimeString;
			},
			updataCategory(argument) {
				this.modal = true
				this.ParamsList.categoryId = argument.id
				// console.log(this.ParamsList)
				
			},
			handleCreateClick() {
				addCategoryApi(this.creatData).then(res => {
					console.log(res)
					this.getDataList() 
				}).catch(err => {
					console.log(err)
				})
				this.createModal = false
				this.creatData.name = ""
				this.creatData.sortOrder = ""
			},
			handleClick() {
				updateCategoryNameApi({...this.ParamsList}).then(res => {
					console.log(res)
					this.getDataList() 
				}).catch(err => {
					console.log(err)
				})
				this.ParamsList.name = ""
				this.modal = false
			}
		},
		onReachBottom() {},
	};
</script>

<style lang="less" scoped>
	.reportBtn {
				display: flex;
				justify-content: space-between;
				// text-align: center;
				color: white;
				// width: 126rpx;
				// height: 47rpx;
				// border-radius: 50rpx;
				line-height: 47rpx;
				letter-spacing: 3rpx;
				font-size: 20rpx;
				// background-color: rgb(233, 69, 23);
			}
	.goods-classification-container {
		width: 100vw;
		min-height: 100vh;
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		// padding: 40upx 24upx 140upx 24upx;
		box-sizing: border-box;
		background-color: #eeeeee;

		.head {
			display: flex;
			align-items: center;
			width: 100vw;
			padding: 17px 10px;
			box-sizing: border-box;
			background-color: white;

			>image {
				// border-radius: 50%;
				width: 32px;
				height: 32px;
				// background-color: rgba(124, 127, 127, 0.562);
			}

			>span {
				margin-left: 210rpx;
				font-weight: 550;
				font-size: 40rpx;
			}
			
			> button {
				margin-right: 0rpx;
				line-height: 50rpx;
				font-size: 20rpx;
				width: 160rpx;
				height: 50rpx;
			}
		}

		.goodsTable {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100vw;
			height: auto;

			.ClassItem {
				border-radius: 15rpx;
				margin: 10rpx 0rpx;
				box-sizing: border-box;
				width: 95vw;
				height: 200rpx;
				padding: 0rpx 20rpx;
				background-color: #fffffffa;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.btn {
					font-weight: 550;
					width: 220rpx;
					height: 100rpx;
					border-radius: 50rpx;
					margin: 0;
				}
				
				.ClassName {
					height: 160rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					> p:nth-of-type(1) {
						font-size: 60rpx;
						font-weight: 600;
					}
					> p:nth-of-type(2) {
						font-size: 24rpx;
						font-weight: 600;
						color: #777676;
						> span {
							display: inline-block;
							margin-top: 20rpx;
						}
					}
				}
			}
		}
	}
</style>