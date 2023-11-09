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
                <button class="ui button violet">Find CloseBy</button>
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
            },
            FindCloseByButtonPressed(){
                // let URL=`https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?proximity=${this.long},${this.lat}&bbox=${},${},${},${}&
                // access_token=pk.eyJ1IjoiYnJycnJycmxhbCIsImEiOiJjbG9tZHpoMzAybTBjMmpuMHY3Nnh1YzI1In0.XaNXfY5h3jshsi9Vg1jnOA`
                // axios.get(URL)
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