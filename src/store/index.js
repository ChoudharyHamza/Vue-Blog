import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
/*eslint-disable*/
export default new Vuex.Store({
    state: {
        posts:[],
        mainRequestError:false,
        currentPost:{},
        currentPostUser:{},
        currentPostComments:[],
        currentPostRequestError:false,
        objWithUrlStrings:{ 
            mainUrl: "https:/jsonplaceholder.typicode.com/",
            postsUrl: "posts/",
            userUrl: "users/",
            commentsUrl:"comments?postId="
        }
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
        makeRequestAllPosts( {state, commit} ){
            return axios.get(`${state.objWithUrlStrings.mainUrl}${state.objWithUrlStrings.postsUrl}`)
            .then(response => {
                response.data.length === 0 ? commit('errorOcurred') : commit('errorNotOcurred')
                commit('changePosts', response.data);
            })
            .catch(()=>{ commit('errorOcurred'); return reject;});
        },

        makeRequestCurrentPost({commit, dispatch, state}, postId){
           return axios.get(`${state.objWithUrlStrings.mainUrl}${state.objWithUrlStrings.postsUrl}${postId}`)
            .then(response => { 
              commit('changeCurrentPost',response.data);
              dispatch('makeRequestUser');
              })
            .catch(()=> {
              commit('currentPostRequestErrorOcurred');
              return reject()
            });
        },

        makeRequestUser({commit, state}){
            axios.get(`${state.objWithUrlStrings.mainUrl}${state.objWithUrlStrings.userUrl}${state.currentPost['userId']}`)
            .then( response =>{ 
                commit('changeCurrentPostUser', response.data) 
            })
            .catch(()=> {
                commit('currentPostRequestErrorOcurred')});
        },

        makeRequestPostComments({commit, state}, postId){
             return axios.get(`${state.objWithUrlStrings.mainUrl}${state.objWithUrlStrings.commentsUrl}${postId}`)
            .then(response => { 
              commit('changeCurrentPostComments',response.data);
            })
            .catch(()=> {
              commit('currentPostRequestErrorOcurred');
              return reject();
            })
        },
    }
});