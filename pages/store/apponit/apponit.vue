<template>
  <view class="apponit-container">
    <BeeBack redirect :url="`/pages/store/detail/detail?brandId=${brandInfo.id}`">
      <view class="f-f-s">
        <tui-icon color="#000" name="arrowleft" :size="24"></tui-icon>
        <h3>预约信息</h3>
      </view>
    </BeeBack>
    <view class="pane brand-info">
      <view class="title f-w-500 font-17">预约门店</view>
      <view class="brand-info-detail f-s-b">
        <BeeAvatar :size="40" radius="10upx" :src="brandInfo.picUrl"></BeeAvatar>
        <view class="brand">
          <view class="f-w-500 font-14">{{ brandInfo.name }}</view>
          <view style="color: #767676" class="font-12"> 人均￥{{ brandInfo.perCapita }} 74%用户推荐</view>
        </view>
        <view class="phone-wrapper f-center">
          <BeeIcon :src="require('../../../static/brand/apponit/phone-fill.png')" :size="14"></BeeIcon>
        </view>
      </view>

      <view class="address-info f-s-b">
        <view class="font-12 address-wrapper">
          <text class="p-color font-12">距你{{ (brandInfo.distance / 1000).toFixed(2) }}公里</text>·{{ brandInfo.address }}
        </view>
        <view class="f-f-s font-12">
          导航
          <tui-icon style="margin-top: 4upx;" :size="15" name="arrowright"></tui-icon>
        </view>
      </view>
    </view>


    <view class="pane form-area">
      <view class="item title f-s-b">
        <text class="font-14 f-w-500 f-w-500">预约信息填写</text>
        <BeeIcon :src="require('../../../static/brand/apponit/edit.png')" :size="24"></BeeIcon>
      </view>
      <view class="item f-f-s">
        <view class="item-title f-c-00">联系人：</view>
        <input v-model="apponitForm.contacts" class="font-14" type="text" placeholder="请输入联系人">
      </view>

      <view class="item f-f-s">
        <view class="item-title f-c-00">联系人电话：</view>
        <input v-model="apponitForm.phone" class="font-14" type="text" placeholder="请输入联系人电话">
      </view>

      <view class="item f-f-s">
        <view class="item-title f-c-00">人数：</view>
        <input v-model.number="apponitForm.quantity" class="font-14" type="text" placeholder="请添加人数">
        <BeeIcon :src="require('../../../static/brand/apponit/user-plus.png')" :size="24"></BeeIcon>
      </view>

      <view class="item f-f-s">
        <view class="item-title f-c-00">到店时间：</view>
        <input v-model="apponitForm.arrivalTime" @click="handleChooseDate" class="font-14" readonly disabled type="text"
          placeholder="请选择到店时间">
        <tui-datetime @confirm="handleChooseTime" :setDateTime="currentTime" :startYear="currentYear"
          :endYear="currentYear + 1" :type="1" ref="datetimeRef"></tui-datetime>
        <BeeIcon :src="require('../../../static/brand/apponit/clock.png')" :size="24"></BeeIcon>
      </view>

      <view class="item f-s-b">
        <view class="item-title f-c-00">优惠劵：</view>
        <view class="f-f-s font-12 f-c-77">
          暂无可用
          <tui-icon style="margin-top: 4upx;" :size="15" name="arrowright"></tui-icon>
        </view>
      </view>

      <view class="item f-s-b">
        <textarea v-model.trim="apponitForm.remarks" placeholder="备注:(如需其他服务请备注)" class="font-12 r-5" cols="30"
          rows="10"></textarea>
      </view>
    </view>

    <tui-divider>随时退·过期自动退·可预约</tui-divider>

    <view class="footer f-center">
      <button v-if="!apponitInfo.id" @click="submitApponit" class="uni-btn f-center f-w-500 f-c-ff submit">提交预约</button>

      <view v-else class="view-apponit f-s-b">
        <button class="uni-btn cancel f-center font-15" @click="handleCancelApponit">取消预约</button>
        <button class="uni-btn view f-center font-15">预约成功</button>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { formatTime } from '../../../utils'
import { submitApponitApi, cancelApponitApi } from '../../../api/brand'
export default {
  data() {
    return {
      currentYear: null,
      currentTime: null,
      apponitForm: {
        brandId: "",
        contacts: "",
        phone: "",
        quantity: "",
        arrivalTime: "",
        coupon: "",
        remarks: ""
      },
      brandInfo: {},
      apponitInfo: {}
    }
  },
  onLoad(options) {
    this.currentYear = (new Date()).getFullYear()
    this.currentTime = formatTime(new Date())


    try {
      this.brandInfo = JSON.parse(options.info)
      this.apponitForm.brandId = this.brandInfo.id + ''
    } catch (error) {
      this.ttoast({
        type: 'fail',
        title: '错误'
      })
      uni.navigateBack();
    }


    if (options.apponitInfo) {
      try {
        this.apponitInfo = JSON.parse(options.apponitInfo)
        Object.assign(this.apponitForm, this.apponitInfo)
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '错误'
        })
        uni.navigateBack();
      }
    }


    console.log(this.apponitInfo);
  },
  methods: {
    // 显示选择时间
    handleChooseDate() {
      this.$refs.datetimeRef.show()
    },

    // 确认选择时间
    handleChooseTime(time) {
      this.apponitForm.arrivalTime = time.result
    },

    // 提交预约
    async submitApponit() {
      if (!this.apponitForm.contacts) {
        this.ttoast({
          type: 'fail',
          title: "请填写联系人姓名"
        })

        return
      }

      if (!this.apponitForm.phone) {
        this.ttoast({
          type: 'fail',
          title: "请填写联系人电话"
        })

        return
      }

      if (!this.apponitForm.quantity) {
        this.ttoast({
          type: 'fail',
          title: "请填写到到店人数"
        })

        return
      }

      if (!this.apponitForm.arrivalTime) {
        this.ttoast({
          type: 'fail',
          title: "请选择预约时间"
        })

        return
      }

      uni.showLoading({
        title: '提交中...',
        mask: true,
      });


      try {
        await submitApponitApi({ ...this.apponitForm, userId: this.userId })
        this.ttoast('预约成功')
        this.apponitForm = {
          brandId: "",
          contacts: "",
          phone: "",
          quantity: "",
          arrivalTime: "",
          coupon: "",
          remarks: ""
        }
        setTimeout(() => {
          uni.redirectTo({
            url: '/pages/store/detail/detail?brandId=' + this.brandInfo.id,
          })
        }, 1000);
      } finally {
        uni.hideLoading();
      }
    },

    // 点击取消预约
    async handleCancelApponit() {
      uni.showLoading({
        title: "预约取消中...",
      })

      await cancelApponitApi({
        "id": this.apponitInfo.id,
        "brandId": this.apponitInfo.brandId,
        "userId": this.userId,
        "contacts": this.apponitInfo.contacts,
        "phone": this.apponitInfo.phone,
        "quantity": this.apponitInfo.quantity,
        "arrivalTime": this.apponitInfo.arrivalTime,
        "coupon": this.apponitInfo.coupon,
        "remarks": this.apponitInfo.remarks
      })
      uni.hideLoading();
      this.ttoast('预约取消成功')

      this.apponitForm = {
        brandId: "",
        contacts: "",
        phone: "",
        quantity: "",
        arrivalTime: "",
        coupon: "",
        remarks: ""
      }

      this.apponitInfo = {}
    }
  },
}
</script>

<style lang="less" scoped>
@import '~@/style/mixin.less';

.apponit-container {
  .pdd(22upx 22upx);
  width: 100%;
  min-height: calc(100vh + 120upx);
  background-color: #F6F6F6;
  padding-bottom: 120upx;


  .pane {
    margin-top: 18upx;
    .pdd(44upx 24upx);
    background-color: #fff;
    border-radius: 20upx;
  }

  .address-wrapper {
    width: 560upx;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .brand-info-detail {
    margin: 22upx 0 28upx 0;

    .brand {
      flex: 1;
      margin-left: 20upx;
    }

    .phone-wrapper {
      width: 50upx;
      height: 50upx;
      background-color: #e5eeff;
      border-radius: 50%;
      box-sizing: border-box;
      padding-bottom: 2upx;
    }
  }

  .form-area {
    .item {
      padding: 28upx 0;
      font-size: 28upx;
      border-bottom: 1upx solid #ccc;

      &:last-child {
        border-bottom: none;
      }

      input {
        flex: 1;
      }

      textarea {
        flex: 1;
        background-color: #f6f6f6;
        .pdd(20upx 16upx);
      }

      &.title {
        border-bottom: 1upx dotted #000;
        padding-top: 0;
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    height: 120upx;
    z-index: 990;

    .view-apponit {
      width: 100%;

      .pdd(0 22upx);
    }

    .uni-btn {
      transition: all 500ms;

      &.submit {
        width: 630upx;
        height: 88upx;
        background-color: #FF973F;

        &:active {
          background-color: #ffc596;
        }
      }

      &.cancel {
        width: 184upx;
        height: 88upx;
        color: #FA5151;
        border: 1upx solid #FA5151;
        border-radius: 10upx;
      }

      &.view {
        width: 488upx;
        height: 88upx;
        border-radius: 10upx;
        background-color: #FA5151;
        color: #fff;
      }
    }
  }
}
</style>