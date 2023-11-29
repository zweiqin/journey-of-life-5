<template>
	<view class="field-pane-container">
		<view class="title">{{ title }}</view>
		<view v-for="item in fields" :key="item.label">
			<view v-if="item.field === 'id'"></view>
			<view v-else-if="item.field === 'startTime' || item.field === 'endTime'">
				<view v-if="form.isAppoint === 'true'" class="item">
					<template>
						<view
							class="input-wrapper" :style="{
								'flex-direction': item.type === 'textarea' ? 'column' : '',
								'align-items': item.type === 'textarea' ? 'flex-start' : ''
							}"
						>
							<view class="sub-title">{{ item.label }}</view>

							<view v-if="item.type === 'time' && item.field === 'startTime'">
								<input
									:value="form[item.field]" class="input" :disabled="true" type="text"
									:placeholder="item.placeholder" @click="$refs.dateTimeTradeS[0].show()"
									@input="handleInput(item.field, $event)"
								/>
								<tui-datetime
									ref="dateTimeTradeS" :type="7" radius
									@confirm="handleInput(item.field, $event)"
								></tui-datetime>
							</view>
							<view v-if="item.type === 'time' && item.field === 'endTime'">
								<input
									:value="form[item.field]" class="input" :disabled="true" type="text"
									:placeholder="item.placeholder" @click="$refs.dateTimeTradeE[0].show()"
									@input="handleInput(item.field, $event)"
								/>
								<tui-datetime
									ref="dateTimeTradeE" :type="7" radius
									@confirm="handleInput(item.field, $event)"
								></tui-datetime>
							</view>

						</view>
					</template>
				</view>
				<view v-else></view>
			</view>
			<view v-else-if="item.field === 'specifications'" class="item">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view class="input-wrapper">商品规格：</view>
					<view v-if="!form.id">
						<tui-radio-group v-model="multipleSpec" style="display: flex;" @change="handleSpecificationRadioChange">
							<tui-label
								v-for="(part, index) in [{ name: '标准规格', value: 'false' }, { name: '多规格', value: 'true' }]"
								:key="index"
							>
								<tui-list-cell padding="16upx">
									<view>
										<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
										</tui-radio>
										<text class="tui-text">{{ part.name }}</text>
									</view>
								</tui-list-cell>
							</tui-label>
						</tui-radio-group>
					</view>
					<view>
						<!-- 要么创建的时候，要么编辑且多规格的时候 -->
						<tui-button
							v-if="(!form.id && multipleSpec === 'true') || form.id" type="danger" width="120rpx"
							height="50rpx" margin="0 10rpx 0 0" style="border-radius: 50rpx;" @click="handleSpecificationShow"
						>
							添加
						</tui-button>
					</view>
				</view>
				<view>
					<tui-table v-if="form.specifications && form.specifications.length">
						<tui-tr>
							<tui-td
								v-for="(item, index) in [{ title: '规格名', key: 'specification' }, { title: '规格值', key: 'value' }, { title: '规格图片', key: 'picUrl' }, { title: '操作', key: 'operate' }]"
								:key="index" bold :span="8"
							>
								{{ item.title }}
							</tui-td>
						</tui-tr>
						<tui-tr v-for="(item, index) in form.specifications" :key="index">
							<tui-td :span="8">{{ item.specification }}</tui-td>
							<tui-td :span="8">{{ item.value }}</tui-td>
							<tui-td :span="8">
								<view v-if="item.picUrl">
									<JAvatar radius="10" :size="120" :src="common.seamingImgUrl(item.picUrl)"></JAvatar>
								</view>
								<view v-else>--</view>
							</tui-td>
							<tui-td :span="8">
								<tui-button
									type="danger" width="120rpx" height="50rpx" margin="0 10rpx 0 0"
									style="border-radius: 50rpx;"
									@click="handleSpecificationDelete(item)"
								>
									删除
								</tui-button>
							</tui-td>
						</tui-tr>
					</tui-table>
				</view>
			</view>
			<view v-else-if="item.field === 'products'" class="item">
				<view class="input-wrapper">商品库存：</view>
				<view>
					<tui-table v-if="form.products && form.products.length">
						<tui-tr>
							<tui-td
								v-for="(item, index) in [{ title: '货品规格', key: 'specification' }, { title: '售价', key: 'price' }, { title: '数量', key: 'number' }, { title: '图片', key: 'url' }, { title: '操作', key: 'operate' }]"
								:key="index" bold :span="item.key === 'specification' || item.key === 'operate' ? 8 : 6"
							>
								{{ item.title }}
							</tui-td>
						</tui-tr>
						<tui-tr v-for="(item, index) in form.products" :key="index">
							<tui-td :span="8">
								<view style="">
									<tui-tag
										v-for="tag in item.specifications" :key="tag" type="light-orange" padding="12rpx"
										margin="0 10rpx"
									>
										{{ tag }}
									</tui-tag>
								</view>
							</tui-td>
							<tui-td :span="6">{{ item.price }}</tui-td>
							<tui-td :span="6">{{ item.number }}</tui-td>
							<tui-td :span="6">
								<view v-if="item.url">
									<JAvatar radius="10" :size="120" :src="common.seamingImgUrl(item.url)"></JAvatar>
								</view>
								<view v-else>--</view>
							</tui-td>
							<tui-td :span="8">
								<tui-button
									type="blue" width="120rpx" height="50rpx" margin="0 10rpx 0 0"
									style="border-radius: 50rpx;"
									@click="handleProductShow(item)"
								>
									设置
								</tui-button>
							</tui-td>
						</tui-tr>
					</tui-table>
				</view>
			</view>
			<view v-else-if="item.field === 'attributes'" class="item">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view class="input-wrapper">商品参数：</view>
					<view>
						<tui-button
							type="danger" width="120rpx" height="50rpx" margin="0 10rpx 0 0"
							style="border-radius: 50rpx;"
							@click="handleAttributeShow"
						>
							添加
						</tui-button>
					</view>
				</view>
				<view>
					<tui-table v-if="form.attributes && form.attributes.length">
						<tui-tr>
							<tui-td
								v-for="(item, index) in [{ title: '商品参数名称', key: 'attribute' }, { title: '商品参数值', key: 'value' }, { title: '操作', key: 'operate' }]"
								:key="index" bold :span="8"
							>
								{{ item.title }}
							</tui-td>
						</tui-tr>
						<tui-tr v-for="(item, index) in form.attributes" :key="index">
							<tui-td :span="8">{{ item.attribute }}</tui-td>
							<tui-td :span="8">{{ item.value }}</tui-td>
							<tui-td :span="8">
								<tui-button
									type="blue" width="120rpx" height="50rpx" margin="0 10rpx 0 0"
									style="border-radius: 50rpx;"
									@click="handleAttributeDelete(item)"
								>
									删除
								</tui-button>
							</tui-td>
						</tui-tr>
					</tui-table>
				</view>
			</view>
			<view v-else-if="item.field === 'goodsCoupons'" class="item">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view class="input-wrapper">优惠券：</view>
					<view>
						<tui-button
							type="danger" width="120rpx" height="50rpx" margin="0 10rpx 0 0"
							style="border-radius: 50rpx;"
							@click="handleGoodsCouponsShow"
						>
							添加
						</tui-button>
					</view>
				</view>
				<view>
					<tui-table v-if="form.goodsCoupons && form.goodsCoupons.length" style="overflow-x: auto;width: 100%;">
						<tui-tr style="width: 920rpx;display: block;">
							<tui-td
								v-for="(item, index) in [{ title: '优惠券ID', key: 'couponId' }, { title: '需购物数', key: 'buyNumber' }, { title: '赠送类型', key: 'type' }, { title: '是否有时限', key: 'isTimeBox' }, { title: '开始时间', key: 'startTime' }, { title: '结束时间', key: 'endTime' }, { title: '操作', key: 'operate' }]"
								:key="index" bold :span="8" width="130rpx"
							>
								{{ item.title }}
							</tui-td>
						</tui-tr>
						<tui-tr v-for="(item, index) in form.goodsCoupons" :key="index" style="width: 920rpx;display: block;">
							<tui-td width="130rpx" :span="8">{{ item.couponId }}</tui-td>
							<tui-td width="130rpx" :span="8">{{ item.buyNumber }}</tui-td>
							<tui-td width="130rpx" :span="8">
								{{ goodsCouponsTypeList.find(i => item.type === i.value) ? goodsCouponsTypeList.find(i => item.type ===
									i.value).label : '--' }}
							</tui-td>
							<tui-td width="130rpx" :span="8">{{ item.isTimeBox ? '是' : '否' }}</tui-td>
							<tui-td width="130rpx" :span="8">{{ item.startTime || '--' }}</tui-td>
							<tui-td width="130rpx" :span="8">{{ item.endTime || '--' }}</tui-td>
							<tui-td width="130rpx" :span="8">
								<tui-button
									type="blue" width="120rpx" height="50rpx" margin="0 10rpx 0 0"
									style="border-radius: 50rpx;"
									@click="handleGoodsCouponsDelete(item)"
								>
									删除
								</tui-button>
							</tui-td>
						</tui-tr>
					</tui-table>
				</view>
			</view>
			<view v-else class="item">
				<template>
					<view
						class="input-wrapper" :style="{
							'flex-direction': item.type === 'textarea' ? 'column' : '',
							'align-items': item.type === 'textarea' ? 'flex-start' : ''
						}"
					>
						<view class="sub-title">{{ item.label }}</view>
						<input
							v-if="item.type === 'input'" :value="form[item.field]" class="input" :disabled="false"
							:type="item.field === 'counterPrice' || item.field === 'retailPrice' ? 'number' : 'text'"
							:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
						/>

						<textarea
							v-if="item.type === 'textarea'" :value="form[item.field]" class="textarea"
							:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
						></textarea>

						<tui-radio-group
							v-if="(item.type === 'radio') && (item.field === 'brandType')" v-model="form[item.field]" style="display: flex;"
							@change="handleInput(item.field, $event)"
						>
							<tui-label
								v-for="(part, index) in [{ name: '商城商品', value: '0' }, { name: '本地生活商品', value: '1' }]"
								:key="index"
							>
								<tui-list-cell padding="16upx">
									<view>
										<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
										</tui-radio>
										<text class="tui-text">{{ part.name }}</text>
									</view>
								</tui-list-cell>
							</tui-label>
						</tui-radio-group>
						<tui-radio-group
							v-else-if="item.type === 'radio'" v-model="form[item.field]" style="display: flex;"
							@change="(e) => { }"
						>
							<tui-label
								v-for="(part, index) in [{ name: '是', value: 'true' }, { name: '否', value: 'false' }]"
								:key="index"
							>
								<tui-list-cell padding="16upx">
									<view>
										<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
										</tui-radio>
										<text class="tui-text">{{ part.name }}</text>
									</view>
								</tui-list-cell>
							</tui-label>
						</tui-radio-group>

						<view
							v-if="item.type === 'dialog' && item.field === 'keywords'"
							style="flex: 1;display: flex;justify-content: space-between;align-items: center;" :style="{
								color: form.keywords ? '' : '#999'
							}"
						>
							<view>{{ form.keywords || item.placeholder }}</view>
							<view style="display: flex;">
								<tui-button
									type="danger" width="120rpx" height="50rpx" margin="0 10rpx 0 0"
									style="border-radius: 50rpx;"
									@click="form.keywords = ''"
								>
									删除
								</tui-button>
								<tui-button
									type="warning" width="120rpx" height="50rpx" style="border-radius: 50rpx;"
									@click="isShowKeywordsDialog = true"
								>
									新增
								</tui-button>
							</view>
						</view>

						<view
							v-if="item.type === 'picker' && item.field === 'categoryId'" style="flex: 1" :style="{
								color: form.categoryId ? '' : '#999'
							}" @click="isShowPicker = true"
						>
							{{ categoryIdName || "请选择所属分类" }}
						</view>

						<!-- <JArea
							v-if="item.type === 'area' && item.field === 'areaId'" style="flex: 1" :text="areaIdName" :placeholder="item.placeholder"
							@confirm="handleInput(item.field, $event)"
							></JArea> -->

					</view>
				</template>
			</view>
		</view>
		<!-- 关键字dialog -->
		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]"
			:show="isShowKeywordsDialog" title="关键字" @click="handleClickKeywordsDialog"
		>
			<template #content>
				<tui-input v-model="tempKeywords" label="关键字" placeholder="请输入关键字" clearable></tui-input>
			</template>
		</tui-dialog>
		<!-- 所属分类picker -->
		<tui-picker
			:show="isShowPicker" layer="3" :picker-data="categoryArr" @hide="isShowPicker = false"
			@change="handleInput('categoryId', $event)"
		>
		</tui-picker>
		<!-- 商品规格dialog -->
		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]"
			:show="specVisiable" title="设置规格" @click="handleClickSpecificationsDialog"
		>
			<template #content>
				<tui-input v-model="specForm.specification" label="规格名" placeholder="请输入规格名" clearable></tui-input>
				<tui-input v-model="specForm.value" label="规格值" placeholder="请输入规格值" clearable></tui-input>
				<JUpload
					title="规格图片" :img-url="common.seamingImgUrl(specForm.picUrl)" @upload="handleSaveSpecificationsImg"
					@delete="specForm.picUrl = '' || $forceUpdate()"
				></JUpload>
				<!-- (e) => specForm.picUrl = e && $forceUpdate() -->
			</template>
		</tui-dialog>
		<!-- 商品库存dialog -->
		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]"
			:show="productVisiable" title="设置货品" @click="handleClickProductDialog"
		>
			<template #content>
				<view style="display: flex;flex-wrap: wrap;">
					货品规格列：<tui-tag
						v-for="tag in productForm.specifications" :key="tag" type="light-orange" padding="12rpx"
						margin="0 10rpx"
					>
						{{ tag }}
					</tui-tag>
				</view>
				<tui-input v-model="productForm.price" label="货品售价" placeholder="请输入货品售价" clearable></tui-input>
				<tui-input v-model="productForm.number" label="货品数量" placeholder="请输入货品数量" clearable></tui-input>
				<JUpload
					title="货品图片" :img-url="common.seamingImgUrl(productForm.url)" @upload="handleSaveProductImg"
					@delete="productForm.url = '' || $forceUpdate()"
				></JUpload>
			</template>
		</tui-dialog>
		<!-- 商品参数dialog -->
		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]"
			:show="attributeVisiable" title="设置参数" @click="handleClickAttributeDialog"
		>
			<template #content>
				<tui-input v-model="attributeForm.attribute" label="商品参数名称" placeholder="请输入参数名称" clearable></tui-input>
				<tui-input v-model="attributeForm.value" label="商品参数值" placeholder="请输入商品参数值" clearable></tui-input>
			</template>
		</tui-dialog>
		<!-- 商品优惠券 -->
		<tui-select
			:list="goodsCouponsList" reverse :show="isShowGoodsCouponsSelect" @confirm="handleSelectGoodsCoupons"
			@close="isShowGoodsCouponsSelect = false"
		></tui-select>
		<tui-select
			:list="goodsCouponsTypeList" reverse :show="isShowGoodsCouponsTypeSelect"
			@confirm="handleSelectGoodsCouponsType" @close="isShowGoodsCouponsTypeSelect = false"
		></tui-select>
		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]"
			:show="goodsCouponsVisiable" title="设置优惠券" @click="handleClickGoodsCouponsDialog"
		>
			<template #content>
				<tui-input
					v-model="tempGoodsCoupons" disabled label="优惠券" placeholder="请选择优惠券"
					clearable
					@click="isShowGoodsCouponsSelect = true"
				></tui-input>
				<tui-input v-model="goodsCouponsForm.buyNumber" label="需购物数" placeholder="请输入需购物数" clearable></tui-input>
				<tui-input
					v-model="tempGoodsCouponsType" disabled label="赠送类型" placeholder="请选择赠送类型"
					clearable
					@click="isShowGoodsCouponsTypeSelect = true"
				></tui-input>
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view class="input-wrapper">是否有时限：</view>
					<view>
						<tui-radio-group v-model="goodsCouponsForm.isTimeBox" style="display: flex;">
							<tui-label
								v-for="(part, index) in [{ name: '是', value: 'true' }, { name: '否', value: 'false' }]"
								:key="index"
							>
								<tui-list-cell padding="16upx">
									<view>
										<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
										</tui-radio>
										<text class="tui-text">{{ part.name }}</text>
									</view>
								</tui-list-cell>
							</tui-label>
						</tui-radio-group>
					</view>
				</view>
				<view v-if="goodsCouponsForm.isTimeBox === 'true'">
					<tui-input
						v-model="goodsCouponsForm.startTime" disabled label="活动开始时间" placeholder="请选择活动开始时间"
						clearable
						@click="$refs.dateTimeTradeCouponsS.show()"
					></tui-input>
					<tui-datetime
						ref="dateTimeTradeCouponsS" :type="7" radius
						@confirm="(e) => goodsCouponsForm.startTime = e.result"
					></tui-datetime>
					<tui-input
						v-model="goodsCouponsForm.endTime" disabled label="活动结束时间" placeholder="请选择活动结束时间"
						clearable
						@click="$refs.dateTimeTradeCouponsE.show()"
					></tui-input>
					<tui-datetime
						ref="dateTimeTradeCouponsE" :type="7" radius
						@confirm="(e) => goodsCouponsForm.endTime = e.result"
					></tui-datetime>
				</view>
			</template>
		</tui-dialog>

	</view>
</template>

<script>
import { getGoodsTypeApi, getBrandCouponListApi } from '.././../../../api/user'
// import { getIndexCategoryListApi } from '.././../../../api/goods'
import { getBrandId } from '../../../../utils'

export default {
	name: 'FieldPaneGF',
	props: {
		fields: {
			type: Array,
			required: true
		},
		value: {
			type: Object,
			required: true
		},
		title: String
	},

	data() {
		return {
			form: {},
			isShowKeywordsDialog: false,
			tempKeywords: '',
			isShowPicker: false,
			categoryIdName: '',
			multipleSpec: 'false',
			categoryArr: [],
			// 商品规格dialog
			specVisiable: false,
			specForm: { specification: '', value: '', picUrl: '' },
			// 商品库存dialog
			productVisiable: false,
			productForm: { id: 0, specifications: [], price: 0.00, number: 0, url: '' },
			// 商品参数dialog
			attributeVisiable: false,
			attributeForm: { attribute: '', value: '' },
			// 商品优惠券
			goodsCouponsList: [],
			goodsCouponsTypeList: [ {
				value: 0,
				label: '购买商品赠送',
				text: '购买商品赠送'
			} ],
			tempGoodsCouponsType: '',
			isShowGoodsCouponsTypeSelect: false,
			tempGoodsCoupons: '',
			isShowGoodsCouponsSelect: false,
			goodsCouponsVisiable: false,
			goodsCouponsForm: { couponId: '', buyNumber: '', type: '', isTimeBox: '', startTime: '', endTime: '' }
		}
	},

	watch: {
		fields: {
			handler(value) {
				if (value) {
					const form = {}
					for (const item of value) {
						form[item.field] = this.value[item.field]
						if (item.type === 'picker' && item.field === 'categoryId') this.getGoodsType()
						if (item.type === 'table' && item.field === 'goodsCoupons') this.getBrandCouponList()
					}
					this.form = form
				}
			},
			immediate: true,
			deep: true
		},

		form: {
			handler(value) {
				this.$emit('input', value)
			},
			immediate: true,
			deep: true
		}
	},

	methods: {
		getGoodsType() {
			if (this.form.brandType === '0') {
				getGoodsTypeApi({ brandId: 1001079 })
					.then((res) => {
						this.categoryArr = res.data.data
						this.mapTree(this.categoryArr, '1')
					})
					.catch(() => {
						this.$showToast('所属分类列表获取失败')
					})
			} else if (this.form.brandType === '1') {
				getGoodsTypeApi({ brandId: getBrandId() })
					.then((res) => {
						this.categoryArr = res.data.data
						this.mapTree(this.categoryArr, '1')
					})
					.catch(() => {
						this.$showToast('所属分类列表获取失败')
					})
			}
		},
		getBrandCouponList() {
			if (this.form.brandType === '0') {
				getBrandCouponListApi({ brandId: 1001079 })
					.then((res) => {
						this.goodsCouponsList = res.data.map((item) => ({
							value: item.id,
							text: `${item.name}：${item.desc}`
						}))
					})
					.catch(() => {
						this.$showToast('优惠券列表获取失败')
					})
			} else if (this.form.brandType === '1') {
				getBrandCouponListApi({ brandId: getBrandId() })
					.then((res) => {
						this.goodsCouponsList = res.data.map((item) => ({
							value: item.id,
							text: `${item.name}：${item.desc}`
						}))
					})
					.catch(() => {
						this.$showToast('优惠券列表获取失败')
					})
			}
		},
		mapTree(data, level) {
			data.forEach((items) => {
				items.text = items.label
				// items.value = items.value
				if (level === '1' && items.children && items.children.length === 0) {
					items.children[0] = { text: '无', value: 0, children: [ { text: '无', value: 0 } ] }
				} else if (level === '1' && !items.children) {
					items.children = [ { text: '无', value: 0, children: [ { text: '无', value: 0 } ] } ]
				} else if (level === '2' && items.children && items.children.length === 0) {
					items.children[0] = { text: '无', value: 0 }
				} else if (level === '2' && !items.children) {
					items.children = [ { text: '无', value: 0 } ]
				} else if (items.children) {
					this.mapTree(items.children, String(Number(level) + 1))
				}
			})
		},

		handleClickKeywordsDialog(e) {
			console.log(e)
			if (e.index === 0) {
			} else if (e.index === 1) {
				if (!this.tempKeywords) return this.$showToast('关键字不能为空')
				if (!this.form.keywords) {
					this.form.keywords = this.tempKeywords
				} else {
					this.form.keywords = this.form.keywords + ',' + this.tempKeywords
				}
			}
			this.tempKeywords = ''
			this.isShowKeywordsDialog = false
		},

		// 商品规格表格相关
		handleSpecificationRadioChange(obj) {
			// console.log(this.form.id, obj)
			if (!this.form.id) { // 创建的时候
				if (obj.detail.value === 'false') {
					this.form.specifications = [ { specification: '规格', value: '标准', picUrl: '' } ]
					this.form.products = [ { id: 0, specifications: [ '标准' ], price: 0.00, number: 0, url: '' } ]
				} else {
					this.form.specifications = []
					this.form.products = []
				}
			}
		},
		handleSpecificationShow() {
			this.specForm = { specification: '', value: '', picUrl: '' }
			this.specVisiable = true
		},
		handleSaveSpecificationsImg(e) {
			this.specForm.picUrl = e
			this.$forceUpdate()
		},
		handleSpecificationDelete(row) {
			const index = this.form.specifications.indexOf(row)
			this.form.specifications.splice(index, 1)
			this.specToProduct()
		},
		handleClickSpecificationsDialog(e) {
			if (e.index === 0) {
				this.specVisiable = false
			} else if (e.index === 1) {
				var index = this.form.specifications.length - 1
				for (var i = 0; i < this.form.specifications.length; i++) {
					const v = this.form.specifications[i]
					if (v.specification === this.specForm.specification) {
						index = i
					}
				}
				this.form.specifications.splice(index + 1, 0, this.specForm)
				this.specVisiable = false
				this.specToProduct()
			}
		},
		specToProduct() {
			if (this.form.specifications.length === 0) {
				return
			}
			// 根据specifications创建临时规格列表
			var specValues = []
			var spec = this.form.specifications[0].specification
			var values = []
			values.push(0)
			for (var i = 1; i < this.form.specifications.length; i++) {
				const aspec = this.form.specifications[i].specification
				if (aspec === spec) {
					values.push(i)
				} else {
					specValues.push(values)
					spec = aspec
					values = []
					values.push(i)
				}
			}
			specValues.push(values)
			// 根据临时规格列表生产货品规格
			// 算法基于 https://blog.csdn.net/tyhj_sf/article/details/53893125
			var productsIndex = 0
			var products = []
			var combination = []
			var n = specValues.length
			for (var s = 0; s < n; s++) {
				combination[s] = 0
			}
			var index = 0
			var isContinue = false
			do {
				var specifications = []
				for (var x = 0; x < n; x++) {
					var z = specValues[x][combination[x]]
					specifications.push(this.form.specifications[z].value)
				}
				products[productsIndex] = {
					id: productsIndex,
					specifications,
					price: 0.0,
					number: 0,
					url: ''
				}
				productsIndex++
				index++
				combination[n - 1] = index
				for (var j = n - 1; j >= 0; j--) {
					if (combination[j] >= specValues[j].length) {
						combination[j] = 0
						index = 0
						if (j - 1 >= 0) {
							combination[j - 1] = combination[j - 1] + 1
						}
					}
				}
				isContinue = false
				for (var p = 0; p < n; p++) {
					if (combination[p] !== 0) {
						isContinue = true
					}
				}
			} while (isContinue)
			this.form.products = products
		},
		// 商品库存表格相关
		handleProductShow(row) {
			this.productForm = Object.assign({}, row)
			this.productVisiable = true
		},
		handleSaveProductImg(e) {
			this.productForm.url = e
			this.$forceUpdate()
		},
		handleClickProductDialog(e) {
			if (e.index === 0) {
				this.productVisiable = false
			} else if (e.index === 1) {
				for (var i = 0; i < this.form.products.length; i++) {
					const v = this.form.products[i]
					if (v.id === this.productForm.id) {
						this.form.products.splice(i, 1, this.productForm)
						break
					}
				}
				this.productVisiable = false
			}
		},
		// 商品参数表格相关
		handleAttributeDelete(row) {
			const index = this.form.attributes.indexOf(row)
			this.form.attributes.splice(index, 1)
		},
		handleAttributeShow() {
			this.attributeForm = { attribute: '', value: '' }
			this.attributeVisiable = true
		},
		handleClickAttributeDialog(e) {
			if (e.index === 0) {
				this.attributeVisiable = false
			} else if (e.index === 1) {
				this.form.attributes.unshift(this.attributeForm)
				this.attributeVisiable = false
			}
		},
		// 商品优惠券
		handleSelectGoodsCouponsType(e) {
			this.isShowGoodsCouponsTypeSelect = false
			this.goodsCouponsForm.type = e.options.value
			this.tempGoodsCouponsType = e.options.text
		},
		handleSelectGoodsCoupons(e) {
			this.isShowGoodsCouponsSelect = false
			this.goodsCouponsForm.couponId = e.options.value
			this.tempGoodsCoupons = e.options.text
		},
		handleGoodsCouponsShow() {
			this.tempGoodsCouponsType = ''
			this.goodsCouponsForm = { couponId: '', buyNumber: '', type: '', isTimeBox: '', startTime: '', endTime: '' }
			this.goodsCouponsVisiable = true
		},
		handleClickGoodsCouponsDialog(e) {
			if (e.index === 0) {
				this.goodsCouponsVisiable = false
			} else if (e.index === 1) {
				if (this.goodsCouponsForm.isTimeBox) {
				} else {
					var arr = this.goodsCouponsList.filter((item) => item.value === this.goodsCouponsForm.couponId)
					this.goodsCouponsForm.startTime = arr[0].startTime || ''
					this.goodsCouponsForm.endTime = arr[0].endTime || ''
				}
				this.form.goodsCoupons.unshift(this.goodsCouponsForm)
				this.goodsCouponsVisiable = false
			}
		},
		handleGoodsCouponsDelete(row) {
			const index = this.form.goodsCoupons.indexOf(row)
			this.form.goodsCoupons.splice(index, 1)
		},

		handleInput(field, e) {
			console.log(field, e)
			if (field === 'categoryId') {
				this.form[field] = e.value[2] === 0 ? e.value[1] === 0 ? e.value[0] : e.value[1] : e.value[2]
				this.categoryIdName = e.result.replaceAll('无', '')
			} else if (field === 'startTime' || field === 'endTime') {
				this.form[field] = e.result
			} else if (field === 'brandType') {
				this.form[field] = e.detail.value
				this.form.categoryId = ''
				this.categoryIdName = ''
				this.categoryArr = []
				this.goodsCouponsForm = { couponId: '', buyNumber: '', type: '', isTimeBox: '', startTime: '', endTime: '' }
				this.tempGoodsCouponsType = ''
				this.form.goodsCoupons = []
				this.goodsCouponsList = []
				this.getGoodsType()
				this.getBrandCouponList()
			} else {
				this.form[field] = e.detail.value
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../../../style/var.less";
@import "../../../../style/mixin.less";

.field-pane-container {
	margin-top: 30upx;

	.title {
		font-size: @f14;
		color: #fa5151;
		font-weight: bold;
	}

	.chooseGender {
		flex: 1;
		text-align: left;
	}

	.item {
		padding: 20upx 0;
		border-bottom: 1upx solid #d8d8d8;
		margin-top: 20upx;

		.input-wrapper {
			.flex();
			font-size: @f12;
			color: @c3d;

			.sub-title {
				margin-right: 20upx;
			}

			/deep/ .uni-input-placeholder,
			/deep/ .uni-textarea-placeholder {
				font-size: @f12;
				color: @c9;
			}

			.input {
				flex: 1;
				font-size: @f12;
			}

			.textarea {
				margin-top: 20upx;
				width: 100%;
				height: 100px;
				font-size: 24upx;
			}
		}
	}
}
</style>
