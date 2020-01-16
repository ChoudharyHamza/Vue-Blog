<template>
    <div>
        <div>
            <router-Link :to="{ name: 'RenderBlogWithPage', params: {activePage} }" >
                <button>Go back</button>
            </router-link>
        </div>
        <div v-if = "checkIds">
            <div>
                <h1> {{$store.state.currentPost.id}}-  {{ $store.state.currentPost.title }} </h1>
                <p> {{$store.state.currentPost.body}} </p>
            </div>
            <div class="author-div" > 
                <h2> Author: </h2>
                <h3 class= "same-line" > {{$store.state.currentPostUser.name}} </h3>
                <h5 class= "same-line" >{{$store.state.currentPostUser.email}} </h5>    
            </div>
            <div class="comment-div" >
                <h2> Comments </h2>
                <div v-for="(comment, index) in $store.state.currentPostComments" :key="index"> 
                    <hr>
                    <h3 > Email:-  {{comment.email}} </h3> <h5> Body:- {{ comment.body }} </h5>
                </div>
            </div>
        </div>
        <div v-else-if = "checkError"> <h1>Boom!  errorr tis an errorr </h1></div>
        <h1 v-else > Loading... </h1>

    </div>
</template>

<script>
export default {
    name: "PostDetail",
    props: ["postId", "activePage"],
    data(){
        return {
            errorOcurred: false,
        }
    }, 
    
    mounted(){
        this.$store.dispatch('makeRequestPostComments',this.postId)
        .catch(() =>{ this.errorOcurred = this.$store.state.currentPostRequestError } );
        this.$store.dispatch('makeRequestCurrentPost',this.postId)
        .catch(() =>{ this.errorOcurred = this.$store.state.currentPostRequestError } );
    },

    computed: {
        checkIds(){
          return this.postId==this.$store.state.currentPost.id;
        },
        checkError(){
            return this.errorOcurred;
        }
    },
}
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