<template>
  <view class="pane-wrapper">
    <view class="title-wrapper">
      <view class="left">
        <h3>{{ title }}</h3>
        <slot name="title"></slot>
      </view>

      <view class="right">
        <slot name="right"></slot>
      </view>
    </view>

    <view class="menu-wrapper">
      <slot>
        <view class="row-wrapper" v-for="row in renderMenu.rowNumber" :key="row">
          <view @click="$emit('menu-click', menu)" class="item"
            v-for="menu in renderMenu.data.slice((row - 1) * colum, row * colum)" :key="menu.name">
              <BeeIcon v-if="menu.icon" :size="32" :src="menu.icon"></BeeIcon>
              <image v-else style="width: 64upx; height: 64upx"> </image>
              <text class="menu-name">{{ menu.name }}</text>
          </view>
        </view>
      </slot>
    </view>
  </view>
</template>

<script>
import tuiBadge from '../../../components/thorui/tui-badge/tui-badge.vue'
export default {
  components: { tuiBadge },
  props: {
    title: {
      type: String,
      required: true
    },

    menuData: {
      type: Array,
    },

    colum: {
      type: Number,
      default: 4
    }
  },

  computed: {
    renderMenu() {
      if (!this.menuData) {
        return []
      }
      const orginMenuData = JSON.parse(JSON.stringify(this.menuData))
      const intRow = Math.floor(this.menuData.length / this.colum)
      if (intRow * this.colum - this.menuData.length !== 0) {
        const replenishNum = Math.ceil(this.menuData.length / this.colum) * this.colum - this.menuData.length
        const replenishMenu = new Array(replenishNum)
        replenishMenu.fill({})
        orginMenuData.push(...replenishMenu)
      }
      return {
        rowNumber: orginMenuData.length / this.colum,
        data: orginMenuData
      }
    }
  }

}
</script>

<style lang="less" scoped>
.pane-wrapper {
  padding: 30upx 48upx 40upx 24upx;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10upx;
  margin-top: 24upx;

  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;

      h3 {
        color: #000000;
        font-weight: 500;
        font-size: 28upx;
      }
    }
  }

  .row-wrapper {
    margin-top: 28upx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .badge-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 96upx;
    }

    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 96upx;
      transition: 350ms all;
      border-radius: 4px;

      &:active {
        background-color: #f0f0f0;
      }

      text {
        font-size: 24upx;
      }
    }
  }
}
</style>