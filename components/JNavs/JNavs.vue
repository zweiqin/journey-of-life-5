<template>
  <view class="j-navs">
    <view class="rows" v-for="(item, index) in rowsNumber" :key="item">
      <view
        class="item"
        v-for="nav in navs.navs.slice(index * navs.rows, item * navs.rows)"
        :key="nav.label"
        :style="{
          'margin-bottom': navs.styles.rowBottom,
        }"
        @click="handleNavItemClick(nav)"
      >
        <view
          :style="{
            width: navs.styles.width,
            height: navs.styles.height,
            background: nav.background,
            'border-radius': navs.styles.radius,
          }"
          class="icon-wrapper"
        >
          <img
            :style="{ width: nav.width || navs.styles.iconWidth }"
            :src="nav.icon"
            alt=""
          />
        </view>
        <text :style="navs.titleStyles" class="text">{{ nav.label }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    navs: {
      type: Object,
      require: true,
    },
  },

  data() {
    return {
      rowsNumber: 0,
      empty: 0,
    };
  },

  methods: {
    handleNavItemClick(nav) {
      this.$emit("nav-click", JSON.parse(JSON.stringify(nav)));
    },
  },

  watch: {
    navs: {
      handler(navs) {
        if (navs) {
          let rows = Math.floor(navs.navs.length / navs.rows);
          let emptyElment = navs.rows - (navs.navs.length - rows * navs.rows);
          if (emptyElment) {
            this.empty = emptyElment;
            rows = rows + 1;
          }

          this.rowsNumber = rows;
        }
      },

      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

.j-navs {
  width: 100%;

  .rows {
    .flex();
    .item {
      .flex();
      flex-direction: column;
    }
  }
  .icon-wrapper {
    .flex(center, center);
  }
}
</style>