import Vue from 'vue'
import App from './App.vue'
import VueRounter from "vue-router"
import RenderBlog from "./components/RenderBlog"
import PostDetail from "./components/PostDetail"

Vue.config.productionTip = false

Vue.use(VueRounter);

let routes = [
  { path:"/", name:"RenderBlog" ,component:RenderBlog },
  { path:"/PostDetail", name:"PostDetail" ,component:PostDetail, props:true }
];

let router = new VueRounter({
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
