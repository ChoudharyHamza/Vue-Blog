<template>
<div>
    <router-Link :to="{ name: 'RenderBlogWithPage', params: {activePage} }" ><button>Go back</button></router-link>
    
    <div v-if = "checkIds">
    <h1> {{currentPost.id}}-  {{ currentPost.title }} </h1>
    <p> {{currentPost.body}} </p>
    </div>
    <h1 v-else > Loading... </h1>
    </div>
</template>

<script>
/*eslint-disable*/
import axios from "axios"
export default {
    name: "PostDetail",
    props: ["postId","activePage"],
    data(){
        return {
            currentPost:{},
        }
    }, 
    
    mounted(){
        this.makeRequest();
    },

    methods: {
        makeRequest(){
            axios(`https:/jsonplaceholder.typicode.com/posts/${this.postId}`)
            .then(response => {this.currentPost = response.data})    
            .catch(reject => console.log("errr erroor tehre is ain error"));
        }
    },
    

    computed: {
        checkIds(){
          return this.postId==this.currentPost.id;
          console.log(this.postId==this.currentPost.id)
        }
    }
}
/*eslint-disable*/
</script>>