<template>
    <section class="ui two column centered grid">
        <div class="column">
            <form class="ui segment large form">
                <div class="ui message violet" v-show="error">{{error}}</div>
                <div class="ui segment">
                    <div class="field">
                        <div class="ui right icon input large">
                            <input type="text" placeholder="Enter your addres" v-model="address"/>
                            <i 
                                class="dot circle link icon"
                                @click="LocatorButtonPressed"></i>
                        </div>
                    </div>
                    <button class="ui button">GO</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>

import axios from 'axios'

export default{

    data(){
        return{
            address: "",
            error:""
        }
    },

    methods:{
        LocatorButtonPressed(){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position=>{
                    this.getAddressFrom(position.coords.latitude, position.coords.longitude)
                    },

                error=>{
                    this.error = error.message;
                    //console.log(error.message);
                });
            }
            else{
                this.error = "Your Browser does not support Geolocation API"
                console.log("Your Browser does not support Geolocation API");
            }
        },
        getAddressFrom(lat,long){
            axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1IjoiYnJycnJycmxhbCIsImEiOiJjbG9tZHpoMzAybTBjMmpuMHY3Nnh1YzI1In0.XaNXfY5h3jshsi9Vg1jnOA`)
             .then(response => {
                console.log(response.data);
                if(response.data.error_message){
                    console.log(response.data.error_message);
                }else{
                        this.address =  response.data.features[0].place_name;
                        console.log(response.data.features[0].place_name);
                }
            })
            .catch(error=>{
                console.log(error.message);
            })
        }
    }
};
</script>

<style>
.ui.button, .dot.circle.icon{
    background-color: #363062;
    color: #FFFFFF;
}
</style>