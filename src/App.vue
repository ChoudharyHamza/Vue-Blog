<template>
<div>
  <h1 v-if = "posts==[]"  > Loading... </h1>
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
    axios.get("https://jsonplaceholder.typicode.com/posts" ).then(response => { this.posts = response.data;console.log(response.data)  });
  },
    data(){
      return {
        posts : [],
      }
    }
  
}
/* eslint-disable */
</script>




<style>

</style>
