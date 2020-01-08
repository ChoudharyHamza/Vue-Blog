<template>
    <div class="container" >
    <div class="main-heading" >
      <h1 >{{postId}}-  {{title}} </h1>
    </div>
    <div>
      <p> {{body}} </p>
    </div>
  </div>
</template>

<script>
export default {
    props:["title", "body","postId"]
}
</script>

<style >
.container{
  width:90%;
  margin-left: 5%;
  margin-right:5%;
  margin-top:50px;
}
.main-heading{
  font-size:15px;
}
</style>>