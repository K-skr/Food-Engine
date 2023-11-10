<template>
    <div class="ui grid">
        <div class="six wide column">
            <form class="ui segment large form">
                <div class="ui message violet" v-show="error">{{error}}</div>
                <div class="field">
                    <div class="ui right icon input large">
                        <input type="text" placeholder="Enter your address" v-model="address">
                        <i 
                            class="dot circle link icon"
                            @click="LocatorButtonPressed"
                            ></i>
                    </div>
                </div>

                <div class="field">
                    <div class="two fields">
                        <div class="field">
                            <select required>
                                <option value="" disabled selected hidden>Type</option>
                                <option value="Restaurants">Restaurants</option>
                            </select>
                        </div>

                        <div class="field">
                            <select required>
                                <option value="" disabled selected hidden>Proximity</option>
                                <option value="5">locality</option>
                                <option value="10">city</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button class="ui button violet" @click="FindCloseByButtonPressed">Find CloseBy</button>
            </form>
        </div>
        <div class="ten wide colun segment ui" ref="map"></div>
    </div>
</template>

<script>
    
    import axios from 'axios'
    
    export default{
    
        data(){
            return{
                address: "",
                error:"",
                lat:0,
                long:0,
                bbox0:0,
                bbox1:0,
                bbox2:0,
                bbox3:0
            }
        },
    
        methods:{
            LocatorButtonPressed(){
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(position=>{
                        this.getAddressFrom(position.coords.latitude, position.coords.longitude)
                        this.lat=position.coords.latitude;
                        this.long=position.coords.longitude;
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
                axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1IjoiYnJycnJycmxhbCIsImEiOiJjbG9tZTJyZWQyeTh0MnFuMG5nZXRtdnp1In0.7GaDEG5S6wXt8i7ZyM6PKA`)
                 .then(response => {
                    console.log(response.data);
                    if(response.data.error_message){
                        console.log(response.data.error_message);
                    }else{
                            this.address =  response.data.features[0].place_name;
                            console.log(response.data.features[0].place_name);
                            console.log(this.bbox0=response.data.features[2].bbox[0],
                            this.bbox1=response.data.features[2].bbox[1],
                            this.bbox2=response.data.features[2].bbox[2],
                            this.bbox3=response.data.features[2].bbox[3])
                    }
                })
                .catch(error=>{
                    console.log(error.message);
                })
            },
            FindCloseByButtonPressed(){
                const URL=`https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json?proximity=${this.long},${this.lat}
                &bbox=${this.bbox0},${this.bbox1},${this.bbox2},${this.bbox3}
                &access_token=pk.eyJ1IjoiYnJycnJycmxhbCIsImEiOiJjbG9tZTJyZWQyeTh0MnFuMG5nZXRtdnp1In0.7GaDEG5S6wXt8i7ZyM6PKA`
                console.log(URL)
                axios.get(URL)
                .then(response=>{
                    console.log(response.data);
                })
                .catch(error=>{
                    console.log(error.message);
                })
            }
        }
    };
    </script>

<style>
    select:required:invalid { color: #C7C7CD  ; }
    option{
        color: black;
    }
</style>