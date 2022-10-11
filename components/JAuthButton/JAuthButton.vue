<template>
  <button
    @click="$emit('click')"
    :style="{
      background: type === 'error' ? '#FA5151' : '',
    }"
    class="j-auth-button"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "primary",
    },
  },
};
</script>

<style lang="scss" scoped>
.j-auth-button {
  background-color: #07b9b9;
  color: #fff;
  font-size: 36upx;
  padding: 4upx 156upx;
  line-height: 2;
}
</style>