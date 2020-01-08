<template>
    <div class= "btn-con">
        {{this.buttonsRen()}}
        <button class= "btn" v-for= "button in buttons"  :key= "button">
            <router-link :to= "{name: 'RenderBlogWithPage', params: {activePage: button} }">
                {{ button }}
            </router-link>
        </button>
    </div>
</template>

<script>
/*eslint-disable*/
export default {
    props: ["count"],

    data(){
        return{
        buttons: 0,
        }
    },

    methods:{
        buttonsRen: function(){ 
            this.buttons= Math.ceil(this.count/5);
        },
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