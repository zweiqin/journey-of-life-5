<template>
  <tui-lazyload-img class="image-wrapper" @click="$emit('click')" :width="width ? width * 2 + 'rpx' : size * 2 + 'rpx'"
    :height="height ? height * 2 + 'rpx' : size * 2 + 'rpx'" :src="src" :radius="radius"
    :backgroundColor="backgroundColor" mode="scaleToFill"></tui-lazyload-img>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default:
        'https://img0.baidu.com/it/u=2256442941,3471177641&fm=253&fmt=auto&app=138&f=JPEG?w=480&h=854',
    },

    size: {
      type: Number,
      default: 80,
    },

    width: {
      type: Number,
    },

    height: {
      type: Number,
    },

    radius: {
      type: String,
      default: '50%',
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    }
  },
}
</script>

<style lang="less" scoped>
.image-wrapper {
  flex-shrink: 0;
}
</style>
