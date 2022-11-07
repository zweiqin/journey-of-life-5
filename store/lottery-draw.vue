<template>
  <view class="lottery-draw-container">
    <JBack></JBack>

    <view class="red-bag-wrapper">
      <view class="main">
        <image
          class="title-img"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/l0d68o5i2ew3y4bweclj.png"
          mode=""
        />
      </view>

      <view class="notice">
        <JIcon type="notice" width="36.66" height="28"></JIcon>
        <ul>
          <li>黄*刚刚获得9.9元红包</li>
        </ul>
      </view>

      <view class="pan">
        <view :class="{ mask: currentNumber === 0 }"
          ><JIcon type="redBag" width="36" height="40"></JIcon
        ></view>
        <view :class="{ mask: currentNumber === 1 }"
          ><JIcon type="redBag" width="36" height="40"></JIcon
        ></view>
        <view :class="{ mask: currentNumber === 2 }"
          ><JIcon type="redBag" width="36" height="40"></JIcon
        ></view>
        <view :class="{ mask: currentNumber === 7 }"
          ><JIcon type="redBag" width="36" height="40"></JIcon
        ></view>
        <view @click="handleStart" class="start-btn">抽红包</view>
        <view :class="{ mask: currentNumber === 4 }"
          ><JIcon type="redBag" width="36" height="40"></JIcon
        ></view>
        <view :class="{ mask: currentNumber === 6 }"
          ><JIcon type="redBag" width="36" height="40"></JIcon
        ></view>
        <view :class="{ mask: currentNumber === 5 }"
          ><JIcon type="redBag" width="36" height="40"></JIcon
        ></view>
        <view :class="{ mask: currentNumber === 4 }"
          ><JIcon type="redBag" width="36" height="40"></JIcon
        ></view>

        <view class="desc"> 抽奖次数： 5次 </view>
      </view>

      <button class="uni-btn share-btn">分享好友</button>
      <navigator>
        <view style="color: #ffc300; text-align: center">活动规则</view>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentNumber: null,
      timer: null
    };
  },

  methods: {
    handleStart() {
      const _this = this
      if (_this.timer) return;
      this.timer = setInterval(() => {
        this.currentNumber++;
        if (this.currentNumber === 7) {
          this.currentNumber = 0;
        }
      }, 50);
    },
  },
};
</script>

<style lang="less" scoped>
.lottery-draw-container {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 44upx;
  font-size: 28upx;
  box-sizing: border-box;
  background: linear-gradient(
    179deg,
    #fa5151 0%,
    rgba(250, 81, 81, 0.6027),
    rgba(250, 81, 81, 0)
  );

  /deep/ .j-back-container {
    position: relative;
    z-index: 12;
  }

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background: url("https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/20optl13y1sk98zem1d7.png")
      no-repeat;
    background-size: cover;
  }

  .red-bag-wrapper {
    position: relative;
    z-index: 10;
    margin-top: 28upx;
    width: 100%;
    padding: 50upx 34upx;
    box-sizing: border-box;
    background-color: #e23d3d;
    border-radius: 20upx;

    .main {
      width: 100%;
      height: 100%;
      padding: 40upx 28upx 28upx 20upx;
      box-sizing: border-box;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.302);
      background-color: #fa5151;
      border-radius: 20upx;

      .title-img {
        width: 100%;
        height: 154upx;
      }
    }
  }

  .notice {
    width: 100%;
    height: 52upx;
    background-color: #fff;
    border-radius: 20px;
    border: 1px solid #ffc300;
    margin-top: 48upx;
    padding: 0 36upx;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    ul {
      padding: 0;
      margin-left: 18upx;
      color: #fa5151;
      font-size: 24upx;
    }
  }

  .pan {
    position: relative;
    width: 100%;
    height: 450upx;
    border-radius: 20upx;
    background-color: #ff8f1f;
    box-shadow: inset 0px 2px 5px 2px #fff8c6;
    margin-top: 56upx;
    padding: 66upx 72upx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    view {
      width: 124upx;
      height: 92upx;
      background-color: #fa5151;
      border-radius: 20upx;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fbddad;

      &.mask {
        background-color: rgba(255, 0, 0, 0.726) !important;
      }

      &:nth-child(2n) {
        background-color: #fff;
      }

      &.start-btn {
        color: #fbddad;
        background-color: #e23d3d;
      }
    }

    .desc {
      position: absolute;
      bottom: -84upx;
      left: 50%;
      transform: translateX(-50%);
      width: 326.4upx;
      height: 62upx;
      background-color: #ff8f1f !important;
      border-radius: 20upx;
      color: #fff;

      &::after {
        position: absolute;
        content: "";
        width: 2px;
        height: 22upx;
        background-color: #ff8f1f;
        left: 46upx;
        top: -20upx;
      }

      &::before {
        position: absolute;
        content: "";
        width: 2px;
        height: 22upx;
        background-color: #ff8f1f;
        right: 46upx;
        top: -20upx;
      }
    }
  }

  .share-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 290upx;
    height: 92upx;
    margin: 110upx auto 0;
    border-radius: 100px;
    border: 2px solid #ffc300;
    background-color: #a70808;
    font-size: 36upx;
    color: #fff;
    margin-bottom: 20upx;
  }

  //   .position-btn {
  //     position: absolute;
  //     padding: 0;
  //     top: 50%;
  //     left: 50%;
  //     transform: translate(-50%, -50%);
  //     width: 124upx;
  //     height: 92upx;
  //     background-color: #fa5151;
  //     border-radius: 20upx;

  //     .uni-btn {
  //       text-align: center;
  //       width: 100%;
  //       height: 100%;
  //       line-height: 92upx;
  //       color: #fff8c6;
  //     }
  //   }
  // }
}
</style>