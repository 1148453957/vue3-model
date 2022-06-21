<template>
<div>
这是系统配置界面
</div>
</template>
<script>
import {
//ref, // 用ref来构建响应式数据，并通过.value 来读写，不用再用this了
 // toRefs, // props里的数据得通过这个才可以解构赋值成ref
 // computed,
 //watch,
 onMounted,
  onBeforeMount,
  onBeforeUnmount,
 onUnmounted,
 //watchEffect,
 // nextTick,
} from 'vue';
export default {
  name:'SystemManage',

 props: {
 //msg: String, 这里放父组件传过来的参数
 },
emits: ['', ''], //这里放父组件传过来的方法
 setup(props, { attrs, emit, expose, slots }) {
   console.log(props, { attrs, emit, expose, slots });
 // props和 context的解构赋值
  // const { msg } = toRefs(props);//这里把props解构赋值，就可以通过参数名直接用了,只读
 // emit('', params); //调用父组件的方法，并传参
  /*   //用ref来构建响应式数据，并通过.value 来读写，不用再用this了
   let aaa = ref(null);
 aaa.value = 2;
 //直接声明函数并调用就可以
 function test() {
  console.log(props, { attrs, emit, expose, slots });
   }
 test(); */
 /*    // 用数组包裹，多层对象也会触发监视，第一次不执行，数组里有一个变了，也会都返回
 watch([aaa], (newVal, oldVal) => {
console.log(newVal, oldVal);
   });
 // 立刻执行，没有旧返回值，
 watchEffect(() => {
aaa.value++;
    }); */
  //    let bbb = computed(() => aaa.value * 2);
  onBeforeMount(() => {});
  onMounted(() => {
   //  nextTick(() => {});
});
 onBeforeUnmount(() => {});
  onUnmounted(() => {});
  return {
   // aaa, bbb, test, // 这里把用ref声明的变量以及自定义的方法导出
   };
 },
};
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>