<template>
<div> 
  <render-buttons class="elementShouldInline" :onClickSort="onClickSort"> </render-buttons>
    <div class="elementShouldInline">
      <label class ="inputlabel" > Search Posts </label>
      <input class="searchField" type ="text" v-model="searchValue" placeholder="Enter Text To search" />
    </div>
  <div>
    <h1 v-if = "posts.length===0"  class="center" > Loading... </h1>
    <h1 v-else-if = "errorr" > An error ocurred please refresh </h1> 
    <render-post v-else v-for = "post in paginatedArray" :key="post.id" :title="post.title" :activePage="activePage" :body="post.body" :postId="post.id"> 
    </render-post>
  </div>
  <post-pagination :count = "arrayToRender.length" :currentPage="activePage">  </post-pagination>
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
          this.arrayToRender = this.posts;
          this.paginationAlgo();
        }else{ 
          this.shouldSort = true;
          this.sortPosts();
          this.arrayToRender = this.sorted
          this.paginationAlgo();
        } 
      })
      .catch(() => { this.errorr = true;  });
  },

  data(){
    return {
      posts : [],
      errorr:false,
      arrayToRender:[],
      paginatedArray:[],
      sorted:[],
      shouldSort:false,
      sortOrder:0,
      searchValue:null,
      searchedArr:[]
    }
  },

  methods: {
    storeArray(response){
      response.data.length === 0 ? this.error= true: this.error =false;
      this.posts = response.data;
    },

    paginationAlgo(){
      let start = (this.activePage-1)*5;
      this.paginatedArray = this.arrayToRender.slice(start,start+5);
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

    searchValue:function(){
      this.searchedArr = this.posts.filter(item => { return item.title.match(this.searchValue) });
      this.arrayToRender = this.searchedArr
      this.paginationAlgo();
    },
    activePage:function(){
     this.paginationAlgo();      
    },

    sortOrder:function(){
      if(this.sortOrder != 0){
        this.sortPosts();
        this.arrayToRender = this.sorted;
        this.paginationAlgo();
      }
      if(this.sortOrder == 0)
      {
        this.arrayToRender = this.posts;
        this.paginationAlgo();
      }
    }
  }
}
/*eslint-disable*/
</script>

<style>
.elementShouldInline{
  display:inline-block
}
.center{
  margin-left: 50%;
  margin-right: 50%
}
.searchFieldLabel{
  margin-left:40px;
  font-size:20px;
}
.searchField{
  width: 600px;
  height: 40px;
  margin-left:10px;
}
</style>