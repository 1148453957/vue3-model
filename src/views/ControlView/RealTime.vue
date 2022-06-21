<template>
  <div class="app-container">
    <div class="leftBox">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">
      </el-input>
      <el-tree
        ref="tree"
        v-loading="treeLoading"
        :data="treeData"
        :props="{
          label: 'name',
          value: 'id',
        }"
        :filter-node-method="filterNode"
        show-checkbox
        default-expand-all
        node-key="id"
      >
      </el-tree>
    </div>
    <div class="rightBox">
      <el-button type="primary" @click="change">Primary</el-button>
    </div>
  </div>
</template>
<script>
import {
  ref,
  // computed,
  watch,
  onBeforeUnmount,
} from "vue";
import { listTree } from "@/api/power";
export default {
  name: "RealTime",

  setup() {
    const filterText = ref(""),
      tree = ref(),
      treeLoading = ref(true),
      treeData = ref(null);

    watch([filterText], (newVal) => {
      tree.value.filter(newVal);
    });
    function filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    }

    listTree().then((res) => {
      treeData.value = JSON.parse(
        JSON.stringify(res.data).replace(/deviceList/g, "children")
      );
      treeData.value.forEach((e) => {
        e.id += "_1";
      });
      treeLoading.value = false;
    });
    const tt = ref(false);
    //    let bbb = computed(() => aaa.value * 2);
    function change() {
      tt.value = !tt.value;
      if (tt.value) {
        document
          .getElementById("power-control-app")
          .setAttribute("data-theme", "another");
      } else {
        document
          .getElementById("power-control-app")
          .setAttribute("data-theme", "default");
      }
    }
    onBeforeUnmount(() => {});

    return {
      filterText,
      tree,
      treeLoading,
      treeData,
      filterNode,
      change,
    };
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  @include themes() {
    flex-direction: row;
    flex-wrap: nowrap;
    .leftBox {
      width: 10%;
      margin-right: 20px;
      height: 100%;
      border-radius: 5px;
      min-width: 200px;
      overflow: hidden;
      background-color: theme("background-color1");
      ::v-deep .el-tree {
        background-color: theme("background-color1");
      }
      ::v-deep .el-input__inner {
        background-color: theme("background-color1");
      }
      .el-input {
        width: 90%;
        margin: 20px 5%;
      }
    }
    .rightBox {
      width: calc(90% - 20px);
      height: 100%;
    }
  }
}
</style>
