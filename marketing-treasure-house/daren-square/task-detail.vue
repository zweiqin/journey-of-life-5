<template>
  <view class="task-detail">
    <JHeader width="50" height="50" title="任务详情"></JHeader>

    <view class="task-name"
      >广州市都茂建筑装饰装修有限公司（深圳市 云剪30人）</view
    >

    <view class="tags">
      <image class="tag1" src="../../static/images/square/tag1.png" mode="" />
      <view class="tag2">任务奖励</view>
    </view>

    <view class="desc">具体佣金以商家平台数据为准</view>

    <view class="main">
      <view class="sub-title">任务信息</view>

      <view class="main-item">
        <view class="main-item-title">店铺名称</view>
        <view class="main-item-value">广州市都茂建筑装饰装修有限公司</view>
      </view>

      <view class="main-item">
        <view class="main-item-title">拼单区域</view>
        <view class="main-item-value">
          <view class="tag"> 广东省 </view>
        </view>
      </view>

      <view class="main-item">
        <view class="main-item-title">剪辑要求</view>
        <view class="main-item-value">
          【商家信息】：广州市都建筑装饰装修有限 公司
          定位地址：广东省深圳市光明区松明路7号 附近
          品宣无套餐，挂定位即可，定位可以搜：李 松萌社区公园
          【几个需要突出的亮点】（选一两个点重点 突出即可）
          1：品宣无套餐，挂定位即可 2：品宣无套餐，挂定位即可
          3：品宣无套餐，挂定位即可 4：品宣无套餐，挂定位即可 【注意事项】：
          1：品宣无套餐，挂定位即可 2：品宣无套餐，挂定位即可
          3：品宣无套餐，挂定位即可 【做任务流程】：
          点击报名—报名后直接剪辑发布—24小时内 回填链接—系统审核—小程序直接提现
        </view>
      </view>

      <view class="main-footer">
        <view class="time">4天前发布</view>

        <view class="info">
          <image
            class="avatar"
            src="../../static/images/square/account-circle-fill.png"
            mode=""
          />
          <view>探店官方省内</view>
          <image
            class="renzheng"
            src="../../static/images/square/renzheng.png"
            mode=""
          />
          <image
            class="right-arrow"
            src="../../static/images/square/right-arrow.png"
            mode=""
          />
        </view>
      </view>

      <SourceMaterial></SourceMaterial>
      <Datebase></Datebase>

      <view class="sub-title">注意</view>
      <view class="attention">
        备注：任务双方私下沟通时注意防骗，如遇假任务，欺骗信息等不
        良行为，请立即向平台
      </view>

      <view class="sub-title">团购等级</view>
      <Rule></Rule>
    </view>

    <view class="footer">
      <view class="item">
        <JIcon type="square-share" width="40" height="40"></JIcon>
        <text>分享</text>
      </view>

      <view class="item">
        <JIcon type="square-collection" width="46" height="40"></JIcon>
        <text>收藏</text>
      </view>

      <button class="uni-btn">马上参与</button>
    </view>
  </view>
</template>

<script>
import SourceMaterial from "./components/source-material";
import Datebase from "./components/datebase";
import Rule from "./components/rules";

export default {
  components: {
    SourceMaterial,
    Datebase,
    Rule,
  },
};
</script>

<style lang="less" scoped>
.task-detail {
  padding: 32upx;
  box-sizing: border-box;
  font-size: 28upx;
  padding-bottom: 140upx;

  .task-name {
    font-size: 36upx;
    font-weight: bold;
    margin-top: 40upx;
  }

  .tags {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 24upx;
    margin: 22upx 0 10upx 0;

    .tag1 {
      width: 140upx;
      height: 46upx;
      margin-right: 10upx;
    }

    .tag2 {
      height: 46upx;
      box-sizing: border-box;
      padding: 3px 6px;
      background-color: #efefef;
      border-radius: 10upx;
    }
  }

  .desc {
    color: #777777;
    font-size: 24upx;
  }

  .main {
    margin-top: 74upx;
    .sub-title {
      font-size: 32upx;
      font-weight: bold;
      margin-bottom: 20upx;
    }

    .main-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 30upx;
      border-bottom: 1upx solid #d8d8d8;
    }

    .main-item {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      font-size: 28upx;
      margin-bottom: 40upx;

      .main-item-title {
        color: #777777;
        margin-right: 36upx;
        flex-shrink: 0;
      }
    }

    .info {
      display: flex;
      align-items: center;

      .avatar {
        width: 32upx;
        height: 32upx;
        object-fit: cover;
        margin-right: 20upx;
      }

      .renzheng {
        width: 96.5upx;
        height: 35upx;
        margin-left: 20upx;
      }

      .right-arrow {
        width: 40upx;
        height: 40upx;
      }
    }
  }

  .attention {
    margin: 20upx 0 30upx 0;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 130upx;
  display: flex;
  background-color: #fff;
  padding: 0 28upx 0 46upx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .uni-btn {
    flex: 1;
    width: 412upx;
    height: 76upx;
    background: linear-gradient(270deg, #fa5151 63%, #ff9e33 100%);
    font-size: 36upx;
    line-height: 76upx;
    color: #efefef;
  }

  .j-icon{
    margin-bottom: 10upx;
  }

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-right: 72upx;
  }
}
</style>