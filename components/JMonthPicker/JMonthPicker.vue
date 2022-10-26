<template>
  <picker
    @columnchange="handleColumnChange"
    mode="multiSelector"
    :range="columns"
    @change="handleConfirmTime"
    @cancel="handleCancelPicker"
  >
    {{ value || `${currentYear}年  ${currentMonth}月` }}
    <JIcon type="right-arrow"></JIcon>
  </picker>
</template>

<script>
export default {
  props: {
    value: String,
  },
  mounted() {
    this.initColumns();
  },
  data() {
    return {
      currentYear: "",
      currentMonth: "",
      columns: [],
      leftColumn: [],
      rightColumn: [],
    };
  },
  methods: {
    // 初始化选择列
    initColumns() {
      const nowTime = new Date();
      this.currentYear = nowTime.getFullYear();
      this.currentMonth = nowTime.getMonth() + 1;

      this.leftColumn = [
        this.currentYear,
        this.currentYear - 1,
        this.currentYear - 2,
      ];

      this.rightColumn = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];

      this.handleColumnChange({
        detail: {
          column: 0,
          value: 0,
        },
      });

      this.columns = [this.leftColumn, this.rightColumn];
    },

    // 列发生变化之后
    handleColumnChange(e) {
      const { column, value } = e.detail;
      if (column === 0) {
        const year = this.leftColumn[value];
        if (year == this.currentYear) {
          this.rightColumn = [];
          for (let i = 1; i <= this.currentMonth; i++) {
            this.rightColumn.push((i + "").length === 1 ? "0" + i : i);
          }
        } else {
          this.rightColumn = [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
          ];
        }
      }

      this.columns = [this.leftColumn, this.rightColumn];
    },

    // 确定
    handleConfirmTime(e) {
      const value = e.detail.value;

      this.$emit("confirm", {
        index: value,
        value: {
          year: this.leftColumn[value[0]],
          month: this.rightColumn[value[1]],
        },
      });
    },

    // 点击取消
    handleCancelPicker() {
      this.$emit("cacnel");
    },
  },
};
</script>

<style lang="less" scoped>
.j-icon {
  width: 30upx;
  height: 32upx;
  transform: rotate(90deg);
  margin-left: 20upx;
  vertical-align: -6upx;
}
</style>