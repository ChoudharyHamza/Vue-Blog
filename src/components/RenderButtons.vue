<template>
    <div class="button-div">
    <button class="btn-sort" @click="onClickSort(1)" > Ascending Order </button>
    <button class="btn-sort" @click="onClickSort(-1)"> Descending Order </button>
    <button class="btn-sort" @click="onClickSort(0)" > Reset Order </button>
  </div>
</template>

<script>
export default {
  props:["onClickSort"]
}
</script>

<style scoped>
.btn-sort{
  font-size:20px;
  margin-left:30px;
}
.button-div{
  margin-top:50px;
  margin-left:100px
}
</style>