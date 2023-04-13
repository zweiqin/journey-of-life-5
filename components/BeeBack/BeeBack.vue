<template>
  <view class="back-container" @click="handleBack">
    <slot></slot>
  </view>
</template>

<script>
import { tabbarList } from '../../common/globalData'

export default {
  props: {
    url: {
      type: String,
      default: '',
    },

    redirect: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleBack() {
      if (this.url) {
        if (tabbarList.includes(this.url)) {
          uni.switchTab({
            url: this.url,
          })
        } else if (this.redirect) {
          uni.redirectTo({
            url: this.url,
          })
        } else {
          uni.navigateTo({
            url: this.url,
          })
        }

        return
      }

      const pages = getCurrentPages()
      console.log(pages);
      const pagesLength = pages.length
      let backLevel = 1
      if (pages.length === 1) {
        uni.switchTab({
          url: '/pages/index/index',
        })
        return
      } else {
        let lastUrl = pages[pagesLength - 1].route + this.getParams(pages[pagesLength - 1].options)
        for (
          let index = pages.length - 1;
          index > 0 && index < pages.length;
          index--
        ) {
          if (pages[index].route + this.getParams(pages[index].options) === lastUrl) {
            backLevel += 1
          } else {
            break
          }
        }

        uni.navigateBack({
          delta: backLevel - 1,
        })
      }
    },

    getParams(options) {
      return JSON.stringify(options)
    }
  },
}
</script>
