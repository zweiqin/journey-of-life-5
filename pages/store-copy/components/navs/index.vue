<template>
  <view class="store-navs">
    <scroll-view scroll-x="true">
      <view class="nav-wrapper">
        <view class="item" v-for="item in navConfig" :key="item.key">
          <image class="icon" :src="item.imgUrl" mode="" />
          <text>{{ item.storeName }}</text>
        </view>
      </view>
    </scroll-view>

    <scroll-view scroll-x="true">
      <view class="tag-wrapper">
        <view class="tag-item">
          <view class="tag">附近</view>
        </view>
        <view class="tag-item">
          <view class="tag">智能排序</view>
        </view>
        <view class="tag-item">
          <view class="tag">附近1km</view>
        </view>
        <view class="tag-item">
          <view class="tag">有团购</view>
        </view>

         <view class="tag-item">
          <view class="tag">点评高分</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { navConfig } from "./config";
export default {
  data() {
    return {
      navConfig,
    };
  },
};
</script>

<style lang="less" scoped>
.store-navs {
  font-size: 28upx;
  padding-bottom: 20upx;

}
.nav-wrapper {
  display: flex;
  align-items: center;
  margin: 30upx 0;
  margin-bottom: 0;
}

.item {
  flex: 0 0 120upx;
  margin-right: 54upx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.icon {
  width: 100upx;
  height: 100upx;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 22upx;
}

text {
  white-space: nowrap;
}

.tag-wrapper {
  display: flex;
  align-items: center;
  margin-top: 20upx;
  padding-left: 20upx;
  font-size: 24upx;

  .tag-item {
    padding: 10upx 20upx;
    background-color: #F6F6F6;
    border-radius: 10upx;
    margin-right: 40upx;

    .tag {
      white-space: nowrap;
    }
  }
}
</style>