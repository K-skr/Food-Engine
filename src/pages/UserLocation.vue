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
            <div v-bind:class="['ui segment', 'hide']" style="max-height: 500px;overflow:auto" id="divss">
                <div class="ui divided items">
                    <div class="item" v-for="place in places">
                        <div class="content">
                            <div class="header">{{ place.text }}</div>
                            <div class="meta">{{ place.properties.category }}</div>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
        <div class="ten wide column segment ui" id="map"></div>
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
                bbox3:0,
                places:[],
                categories:[]
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
                axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/
                ${long},
                ${lat}
                .json?access_token=pk.eyJ1IjoiYnJycnJycmxhbCIsImEiOiJjbG9tZTJyZWQyeTh0MnFuMG5nZXRtdnp1In0.7GaDEG5S6wXt8i7ZyM6PKA`)
                 .then(response => {
                    console.log("your readable address: ")
                    console.log(response.data);
                    if(response.data.error_message){
                        console.log(response.data.error_message);
                    }else{
                            this.address =  response.data.features[0].place_name;
                            console.log(response.data.features[0].place_name);
                            console.log("bbox values: ",this.bbox0=response.data.features[2].bbox[0],
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
                &bbox=${this.bbox0},${this.bbox1},${this.bbox2},${this.bbox3}&limit=10
                &access_token=pk.eyJ1IjoiYnJycnJycmxhbCIsImEiOiJjbG9tZTJyZWQyeTh0MnFuMG5nZXRtdnp1In0.7GaDEG5S6wXt8i7ZyM6PKA`
                axios.get(URL)
                .then(response=>{
                    this.places=response.data.features;
                    console.log("nearby resto array: ");
                    console.log(this.places);
                    this.categories=response.data.features.properties;
                    // this.category=response.data.features[0].properties.category;
                    //console.log(response.data.features[0].place_name)
                    this.AddLocationToMaps();
                })
                .catch(error=>{
                    console.log(error.message);
                })
                const divs = document.getElementById("divss")
                if (divs.classList.contains("hide")){
                    divs.classList.remove("hide");
                }
            },
            AddLocationToMaps(){
                mapboxgl.accessToken = 'pk.eyJ1IjoiYnJycnJycmxhbCIsImEiOiJjbG9tZHpoMzAybTBjMmpuMHY3Nnh1YzI1In0.XaNXfY5h3jshsi9Vg1jnOA';
                const map = new mapboxgl.Map({
                container: 'map', // container ID
                // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
                style: 'mapbox://styles/mapbox/streets-v12', // style URL
                center: [this.long, this.lat], // starting position [lng, lat]
                zoom: 15 // starting zoom
                });
                // this.places.forEach(place=>{
                //     const lat = place.geometry.location.lat;
                //     const long = place.geometry.location.long;

                //     let marker = new
                // })
                const geojson = {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [response.data.features[0].geometry.coordinates[0], response.data.features[0].geometry.coordinates[1]]
                            },
                            properties: {
                                title: 'Mapbox',
                                description: 'Washington, D.C.'
                            }
                        },
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [-122.414, 37.776]
                            },
                            properties: {
                                title: 'Mapbox',
                                description: 'San Francisco, California'
                            }
                        }
                    ]
                };
            }
        }
    };
    </script>

<style>
    select:required:invalid { color: #C7C7CD  ; }
    option{
        color: black;
    }
    .hide{
        visibility:hidden !important;
    }
    #map{
        background-color: lavender;
    }
</style>
