<template>
<div> 
  <render-buttons class="element-inline" :onClickSort="onClickSort"> </render-buttons>
    <div class="element-inline">
      <label class ="search--label" > Search Posts </label>
      <input class="search--field" type ="text" v-model="searchValue" placeholder="Enter Text To search" />
    </div>
  <div>
    <h1 v-if = "shouldRender"  class="align-center" > Loading... </h1>
    <h1 v-else-if = "errorr" > An error ocurred please refresh </h1> 
    <render-post v-else v-for = "post in paginatedArray" :key="post.id" :title="post.title" :activePage="activePage" :body="post.body" :postId="post.id"> 
    </render-post>
  </div>
  <post-pagination :count = "arrayToRender.length" :currentPage="activePage">  </post-pagination>
</div>
</template>

<script>
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
    this.$store.dispatch('makeRequestAllPosts')
      .then(() => {
        this.posts = this.$store.state.posts
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
      .catch(() => { 
        this.errorr = this.$store.state.mainRequestError;
      });
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

  computed:{
    shouldRender(){
     return this.posts.length == 0 && this.errorr == false
    }
  },

  methods: {
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
      }
    }
  },
  watch: {
    searchValue:function(){
      this.searchedArr = this.posts.filter(item => { return item.title.match(this.searchValue) });
      this.arrayToRender = this.searchedArr
      if(this.activePage != 1 ){
      this.$router.push("/1")}
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
</script>

<style>
.element-inline{
  display:inline-block
}
.align-center{
  margin-left: 50%;
  margin-right: 50%
}
.search--label{
  margin-left:40px;
  font-size:20px;
}
.search--field{
  width: 600px;
  height: 40px;
  margin-left:10px;
}
</style>