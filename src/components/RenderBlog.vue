<template>
<div> 
  <div>
    <h1 v-if = "posts.length===0"  class="center" > Loading... </h1>
    <h1 v-else-if = "errorr" > An error ocurred please refresh </h1> 
    <render-post v-else v-for = "post in arrToRender" :key="post.id" :title="post.title" :activePage="activePage" :body="post.body" :postId="post.id"> 
    </render-post>
  </div>
  <post-pagination :count = "posts.length" :currentPage="activePage">  </post-pagination>
</div>
</template>

<script>
import axios from "axios"
import RenderPost from "./RenderPost"
import postPagination from "./postPagination"

export default {
  components:{
    RenderPost,
    postPagination
  },
  props: { activePage: {
      default: 1
  } },
  mounted: function(){
    axios.get("https:/jsonplaceholder.typicode.com/posts")
      .then(response => {this.respons(response);this.paginationAlgo(this.activePage);})
      .catch(() => { this.errorr = true;  });
  },

  data(){
    return {
      posts : [],
      errorr:false,
      arrToRender:[],
    }
  },

  methods: {
    respons(response){
      response.data.length === 0 ? this.error= true: this.error =false;
      this.posts = response.data;
    },
    paginationAlgo(){
      let start = (this.activePage-1)*5;
      this.arrToRender = this.posts.slice(start,start+5);
    },
  },

  watch: {
    activePage:function(){
      this.paginationAlgo();
    }
  }
}
</script>

<style>
.center{
  margin-left: 50%;
  margin-right: 50%
}
</style>


