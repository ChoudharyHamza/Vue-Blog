<template>
<div>
  <h1 v-if = "posts.length===0"  class="center"> Loading... </h1>
  <h1 v-else-if="errorr"> An error ocurred please refresh </h1> 
  <give-post v-else v-for="post in posts" :key="post.id" :title="post.title" :body="post.body">  </give-post>
</div>
</template>



<script>
/* eslint-disable */
import axios from "axios"
import givePost from "./components/givePost"
export default {
  name: 'app',
  components:{
    givePost
  },
  created:function(){
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(response => { this.posts = response.data;console.log(response.data)})
      .catch(error => { this.errorr = true;  })
  },
    data(){
      return {
        posts : [],
        errorr:false,
      }
    }
  
}
/* eslint-disable */
</script>




<style>
.center{
  margin-left:50%;
  margin-right:50%
}

</style>
