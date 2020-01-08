<template>
<div>
  <keep-alive>
  <router-view></router-view>
  </keep-alive>
</div>
</template>

<script>
/* eslint-disable */
import RenderBlog from "./components/RenderBlog"

export default {

  components:{
    RenderBlog,
  },

  data(){
    return {

    }
  },

  methods:{
  }
}
/* eslint-disable */
</script>

<style>


</style>
