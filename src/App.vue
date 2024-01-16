<template>
  <div id="app">
    <div
            :class="['bg-image','container']"
            :style="{ 
            backgroundImage: 'url(https://i.imgur.com/gXjNKMQ.jpg)', 
            backgroundRepeat: 'no-repeat', 
            backgroundAttachment: 'fixed', 
            backgroundSize: '100% 100%',
            height: '100vh',
            width: '100vw',
            }">
    
    <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
 #title{
       
       font-family: 'Sora', sans-serif;
       font-size: 50px;
       color: #ED7D31;
   }
   #logo{
       height: 100px;
       width: 100px;
   }
</style>
