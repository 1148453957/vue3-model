<template>
  <div id="power-control-app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    document
      .getElementById("power-control-app")
      .setAttribute("data-theme", "default");
  },
};
</script>
<style lang="scss" scoped>
#app2 {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
