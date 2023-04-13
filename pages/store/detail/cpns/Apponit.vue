<template>
  <view class="apponit-pane">
    <view class="apponit-main" v-if="apponitList.length">
      <view class="title f-s-b">
        <text class="p-color">{{ apponitList[0].cancel ? apponitList[0].cancel === 1 ? "已取消" : "已过期" : '预约成功' }}</text>
        <view class="f-f-s f-c-77 font-12" @click="handleViewDeial">
          展开查看详情
          <BeeIcon :size="12" :src="require('../../../../static/brand/apponit/detai.png')"></BeeIcon>
        </view>
      </view>
      <view class="brand-info-detail f-s-b">
        <BeeAvatar :size="40" radius="10upx" :src="data.picUrl"></BeeAvatar>
        <view class="brand">
          <view class="f-w-500 font-14">{{ data.name }}</view>
          <view style="color: #767676" class="font-12"> 人均￥{{ data.perCapita }} 74%用户推荐</view>
        </view>
        <view class="phone-wrapper f-center">
          <BeeIcon :src="require('../../../../static/brand/apponit/phone-fill.png')" :size="14"></BeeIcon>
        </view>
      </view>

      <view class="address-info f-s-b">
        <view class="font-12 address-wrapper">
          <text class="p-color font-12">距你{{ (data.distance / 1000).toFixed(2) }}公里</text>·{{ data.address }}
        </view>
        <view class="f-f-s font-12">
          导航
          <tui-icon style="margin-top: 4upx;" :size="15" name="arrowright"></tui-icon>
        </view>
      </view>
    </view>
    
    <view class="c-no-data f-center" v-if="!apponitList.length">
      <view>
        暂无预约<text class="p-color" style="font-size: 36upx;" @click="handleToApponit">去预约</text>

      </view>
      <BeeAvatar radius="0upx" :width="179" :height="156" :src="require('../../../../static/brand/detail/apponit.png')">
      </BeeAvatar>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    apponitList: {
      type: Array,
      required: true
    },
  },

  methods: {
    handleToApponit() {
      console.log(this.data);
      this.go('/pages/store/apponit/apponit?info=' + JSON.stringify(this.data))
    },
    // 查看预约详情
    handleViewDeial() {
      this.go('/pages/store/apponit/apponit?info=' + JSON.stringify(this.data) + '&apponitInfo=' + JSON.stringify(this.apponitList[0]))
    }
  },
}
</script>

<style lang="less" scoped>
@import '~@/style/mixin.less';

.apponit-main {
  .pdd(0 0 20upx 0);
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
</style>