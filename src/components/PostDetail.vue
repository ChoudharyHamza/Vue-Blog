<template>
    <div>
        <div>
            <router-Link :to="{ name: 'RenderBlogWithPage', params: {activePage} }" ><button>Go back</button></router-link>
            
            <div v-if = "checkIds">
            <h1> {{currentPost.id}}-  {{ currentPost.title }} </h1>
            <p> {{currentPost.body}} </p>
            </div>
            <h1 v-else > Loading... </h1>
        </div>
        <div class="author-div" > 
            <h2> Author: </h2>
            <h3 class= "same-line" > {{user.name}} </h3> <h5 class= "same-line" >{{user.email}} </h5>    
        </div>
        <div class="comment-div" >
            <h2> Comments </h2>
        <div v-for="(comment, index) in comments" :key="index"> <hr> <h3 > Email:-  {{comment.email}} </h3> <h5> Body:- {{ comment.body }} </h5> </div>
        </div>

    </div>
</template>

<script>
/*eslint-disable*/
import axios from "axios"

export default {
    name: "PostDetail",
    props: ["postId", "activePage"],
    data(){
        return {
            currentPost: {},
            errorOcurred: false,
            user:{},
            comments:{},
        }
    }, 
    
    mounted(){
        this.makeRequest();
        this.makeRequestComments();
    },

    methods: {
        makeRequest(){
            axios.get(`https:/jsonplaceholder.typicode.com/posts/${this.postId}`)
            .then(response => { 
                this.currentPost = response.data;
                this.makeRequestUser();
                })
            .catch(()=>{this.errorOcurred = true})    
        },
        makeRequestUser(){
            axios.get(`https:/jsonplaceholder.typicode.com/users/${this.currentPost.userId}`)
            .then( response =>{ this.user = response.data })
            .catch( ()  => { console.log("thies ais an errror") });
        },
        makeRequestComments(){
            axios.get(`https:/jsonplaceholder.typicode.com/comments?postId=${this.postId}`)
            .then(response => { this.comments = response.data;console.log(this.comments) })
            .catch(() => {console.log("thus an error occured")})
        }
    },
    
    computed: {
        checkIds(){
          return this.postId==this.currentPost.id;
        },
    },

    watch:{
        errorOcurred: function(){
        alert("boom!  errorr tis an errorr");
        }
    }
}
/*eslint-disable*/
</script>
<style scoped>
.author-div{
    margin-top:40px;
}
.same-line{
    display:inline-block;
    margin-left:30px;
}
.comment-div{
    margin: 50px
}
</style>