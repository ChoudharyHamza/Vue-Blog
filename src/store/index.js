import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        posts:[],
        currentPost:{},
        currentPostUser:{},
        currentPostComments:[],
        mainRequestError:false,
        currentPostRequestError:false
    },
    getters: {},
    mutations: {
        changeCurrentPost(state, PostDetail){
            state.currentPost = PostDetail;
        },

        changeCurrentPostUser(state, userDetails){
            state.currentPostUser = userDetails;
        },

        changeCurrentPostComments(state, comments){
            state.currentPostComments = comments;
        },

        changePosts(state, payload){
            state.posts = payload;
        },

        errorOcurred(state){
            state.mainRequestError = true;
        },

        errorNotOcurred(state){
            state.mainRequestError = false;
        },
        currentPostRequestErrorOcurred(state){
            state.currentPostRequestError = true;
        }
    },
    actions: {
        makeRequestAllPosts( {commit} ){
            return axios.get("https:/jsonplaceholder.typicode.com/posts")
            .then(response => {this.subscribeAction
                response.data.length === 0 ? commit('errorOcurred') : commit('errorNotOcurred') ;
                commit('changePosts', response.data);
            })
            .catch(() =>  { 
              commit('errorOcurred');  
              return new Promise ((resolve, reject)=> reject() )})
        },

        makeRequestCurrentPost(context, postId){
           return axios.get(`https:/jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => { 
              context.commit('changeCurrentPost',response.data);
              context.dispatch('makeRequestUser');
              })
            .catch(()=> {
              context.commit('currentPostRequestErrorOcurred');
              return new Promise((resolve, reject)=>reject())
            });
        },

        makeRequestUser(context){
            axios.get(`https:/jsonplaceholder.typicode.com/users/${context.state.currentPost['userId']}`)
            .then( response =>{ 
                context.commit('changeCurrentPostUser', response.data) 
            })
            .catch(()=> {
                context.commit('currentPostRequestErrorOcurred')});
        },

        makeRequestPostComments(context, postId){
            return axios.get(`https:/jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => { 
              context.commit('changeCurrentPostComments',response.data);
            })
            .catch(()=> {
              context.commit('currentPostRequestErrorOcurred');
              return new Promise((resolve, reject)=> reject())
            })
        },
    }
});