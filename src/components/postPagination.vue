<template>
    <div class="btn-con">
        {{this.buttonsRen()}}
    <button class="btn" v-for="button in buttons" @click="paginationAlgo(button)" :class="currentPage(button)" :key="button">{{ button }}</button>
        </div>
</template>

<script>
/*eslint-disable*/
export default {
    props:["count","paginationAlgo", "activePage"],

    data(){
        return{
        buttons: 0,
        }
    },

    methods:{
        buttonsRen: function(){ 
            this.buttons = Math.ceil(this.count/5);
        },
        currentPage(button){
            if(this.activePage===button){
                return "active"
            }
        }
    },
}
/*eslint-disable*/
</script>

<style>
.btn{
    font-size: 30px;
    width:55px;
}
.active{
    background-color: rgb(50, 138, 211)
}
.btn-con{
    text-align: center;
}
</style>