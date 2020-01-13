<template>
<div> 
  <render-buttons :onClickSort="onClickSort"> </render-buttons>
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
/*eslint-disable*/
import axios from "axios"
import RenderPost from "./RenderPost"
import postPagination from "./postPagination"
import RenderButtons from "./RenderButtons"

export default {
  components:{
    RenderPost,
    postPagination,
    RenderButtons
  },

  props: { activePage: {
      default: 1
  } },

  mounted: function(){
    axios.get("https:/jsonplaceholder.typicode.com/posts")
      .then(response => {this.storeArray(response);
        if(sessionStorage.length>0)
        {
          this.sortOrder = Number(sessionStorage.getItem("sortOrder"));
        }
        if(this.sortOrder == 0){
          this.trueArrayToRender = this.posts;
          this.paginationAlgo();
        }else{ 
          this.shouldSort = true;
          this.sortPosts();
          this.trueArrayToRender = this.sorted
          this.paginationAlgo();
        } 
      })
      .catch(() => { this.errorr = true;  });
  },

  data(){
    return {
      posts : [],
      errorr: false,
      trueArrayToRender: [],
      arrToRender: [],
      sorted: [],
      shouldSort: false,
      sortOrder: 0
    }
  },

  methods: {
    storeArray(response){
      response.data.length === 0 ? this.error= true: this.error =false;
      this.posts = response.data;
    },

    paginationAlgo(){
      let start = (this.activePage-1)*5;
      this.arrToRender = this.trueArrayToRender.slice(start,start+5);
    },

    onClickSort(n){
      if(n != 0)
      {
        this.shouldSort = true
        this.sortOrder = n
        sessionStorage.setItem("sortOrder", String(this.sortOrder));
      }
      if(n == 0) {
        this.sortOrder = n
        this.shouldSort = false
        sessionStorage.setItem("sortOrder", String(this.sortOrder));
      }
    },

    sortPosts(){
      if(this.shouldSort == true){
        this.sorted = this.posts.slice().sort( (a, b) => { 
          a=a.title;
          b=b.title;
          if( a>b ) { return 1*this.sortOrder }
          if( a<b ) { return -1*this.sortOrder }
          if( a==b ){ return 0*this.sortOrder }
          });
      }else{console.log("cant sort")}
    }
  },

  watch: {
    activePage:function(){
     this.paginationAlgo();      
    },

    sortOrder:function(){
      if(this.sortOrder != 0){
        this.sortPosts();
        this.trueArrayToRender = this.sorted;
        this.paginationAlgo();
      }
      if(this.sortOrder == 0)
      {
        this.trueArrayToRender = this.posts;
        this.paginationAlgo();
      }
    }
  }
}
/*eslint-disable*/
</script>

<style>

.center{
  margin-left: 50%;
  margin-right: 50%
}
</style>


