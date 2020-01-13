<template>
    <div class= "btn-con">
        {{this.buttonsRen()}}

        <router-link :to= "{name: 'RenderBlogWithPage', params: {activePage: button} }" v-for= "button in buttons"  :key= "button">
            <button class= "btn"  :class={active:blueButton(button)}>
            {{ button }}
            </button>
        </router-link>
    </div>
</template>

<script>

export default {
    props: ["count", "currentPage"],

    data(){
        return{
        buttons: 0,
        }
    },

    methods:{
        buttonsRen: function(){ 
            this.buttons= Math.ceil(this.count/5);
        },blueButton(btn){
            if(this.currentPage == btn){
                return true
            }
        }
    },
}
/*eslint-disable*/
</script>

<style>
.btn{
    font-size: 30px;
    width: 55px;
}
.active{
    background-color: rgb(50, 138, 211)
}
.btn-con{
    text-align: center;
}
</style>