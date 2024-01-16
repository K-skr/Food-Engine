<template>
    <!-- background image div -->
    
        <div>
            <section :class="['ui one column grid','getctr']">
                <div class="titleB">
                <center>
                    <h1 :class="['head']">
                    <img class="ui image" id="logo" src="https://i.imgur.com/76siGbq.png">
                    <div class="content" id="title">
                        Food Engine
                    </div>
                    </h1>
                </center>
                </div>
            </section>
            <div>
            <section :class="['ui one column grid', 'getcenter']">
                <center><div :class="['centered column','opacity btn-center']" >
                    <h1>Press any button</h1>
                </div></center>
            </section></div>
        </div>    
        
    
    
  </template>

<style>

.btn-center{
    position: relative;
    background-color: rgba(222,184,135,0.5);
    padding: 8%;
    border-radius: 5%;

}

.getcenter{
    justify-content: center;
    position: absolute;
    top: 55%;
    left: 43%;
}

.getctr{
    justify-content: center;
    position: absolute;
    left: 40%;
    top: 10%;
}

#logo{
    height: 200px;
    width: 200px;
}
.titleB{
        background-color: rgba(207, 167, 114, 1);
        padding-bottom: 8%;
        border-radius: 10%;
   }
</style>

<script>
export default {
  mounted() {
    // Add event listener for keyup on the entire document
    document.addEventListener('keyup', this.handleKeyPress);
  },
  methods: {
    handleKeyPress(event) {
      // Check if any key is pressed (modify the condition as needed)
      if (event.key) {
        // Navigate to another page when any key is pressed
        this.$router.push('/UserLocation');
      }
    },
  },
  beforeDestroy() {
    // Remove the event listener to avoid memory leaks
    document.removeEventListener('keyup', this.handleKeyPress);
  },
};
</script>