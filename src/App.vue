<template>
<div>
  <div>
    <h1 v-if = "posts.length===0"  class="center"> Loading... </h1>
    <h1 v-else-if="errorr"> An error ocurred please refresh </h1> 
    <render-post v-else v-for="post in arrToRender" :key="post.id" :title="post.title" :body="post.body" :postId="post.id">  </render-post>
  </div>
  
  <post-pagination :activePage="activePage" :count="posts.length" :paginationAlgo="paginationAlgo" >  </post-pagination>
</div>
</template>

<script>
/* eslint-disable */
import axios from "axios"
import RenderPost from "./components/RenderPost"
import postPagination from "./components/postPagination"

export default {
  components:{
    RenderPost,
    postPagination
  },
  
  created:function(){
    axios.get("https:/jsonplaceholder.typicode.com/posts")
      .then(response => {this.respons(response);this.paginationAlgo(this.activePage);})
      .catch(error => { this.errorr = true;  });
  },

  data(){
    return {
      posts : [],
      errorr:false,
      returnedEmpty:false,
      arrToRender:[],
      activePage:1
    }
  },

  methods:{
    respons(response){
      
      response.data.length === 0 ? this.error=true: this.error =false;
      this.posts = response.data;
    },
    paginationAlgo(value){
      let start = (value-1)*5;
      this.arrToRender = this.posts.slice(start,start+5);
      this.activePage = value;
    },
  },
}
/* eslint-disable */
</script>

<style>
.center{
  margin-left:50%;
  margin-right:50%
}

</style>
