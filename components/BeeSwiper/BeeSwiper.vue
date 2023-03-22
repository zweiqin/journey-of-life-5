<template>
  <swiper class="swiper">
    <swiper-item v-for="(image, index) in list" :key="index">
      <tui-lazyload-img
        @click="$emit('click', image)"
        width="100%"
        height="370rpx"
        :src="imageKey ? image[imageKey] : image"
      ></tui-lazyload-img>
    </swiper-item>
  </swiper>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },

    imageKey: {
      type: String,
      default: '',
    },

    width: {
      type: String,
      default: '',
    },

    height: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
