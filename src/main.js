import Vue from 'vue'
import App from './App.vue'
import VueRounter from "vue-router"
import RenderBlog from "./components/RenderBlog"
import PostDetail from "./components/PostDetail"

Vue.config.productionTip = false

Vue.use(VueRounter);

let routes = [
  { path: "/:activePage?", name: "RenderBlogWithPage", component: RenderBlog, props: true},
  
  { path: "/PostDetail/:activePage/:postId", name: "PostDetail", component: PostDetail, props: true }
];

let router = new VueRounter({
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
