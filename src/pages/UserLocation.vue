<template>
    <div class="vertical">
        <h1 :class="['ui header','headB']">
            <img class="ui image" id="logo" src="https://i.imgur.com/76siGbq.png">
            <div class="content" id="title">
                Food Engine
            </div>
        </h1>
        <div class="ui grid">
        <div class="six wide column">
            <form class="ui segment large form">
                <div class="ui message" id="enterbutton" v-show="error">{{error}}</div>
                <div class="field">
                    <div class="ui right icon input large" :class="{loading:spinner}">
                        <input name = "address" type="text" readonly="readonly" placeholder="Press The Locator icon ---->" v-model="address" ref="addressInput"  autocomplete="off">
                        
                        <i 
                            id="enterbutton"
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
                            </select>
                        </div>
                    </div>
                </div>
                <button class="ui button" id="enterbutton" @click="FindCloseByButtonPressed">Find CloseBy</button>
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
        <div v-bind:class="['ten wide column segment ui', 'hide']" id="map" ></div>
        </div>
    </div>
</template>

<script>
    
    import axios from 'axios'
    

    export default{
        
        data(){
            return{
                address: "",
                error:"",
                spinner:false,
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
                this.spinner=true;
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(position=>{
                        this.spinner=false;
                        this.getAddressFrom(position.coords.latitude, position.coords.longitude)
                        this.lat=position.coords.latitude;
                        this.long=position.coords.longitude;
                    },
    
                    error=>{
                        this.error = "Locator is unable to find your address. Please try again.";
                        this.spinner = false;
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
                mapboxgl.accessToken = 'pk.eyJ1IjoiYnJycnJycmxhbCIsImEiOiJjbG9tZTJyZWQyeTh0MnFuMG5nZXRtdnp1In0.7GaDEG5S6wXt8i7ZyM6PKA'; 
                const yourLngLat ={
                    'type': 'FeatureCollection',
                    'features':[
                        {
                            'type':'Feature',
                            'geometry': {
                                'type':'point',
                                'coordinates':[this.long, this.lat]
                            },
                            'properties': {
                                'title': 'UserLocation',
                                //'description': 'Washington, D.C.'
                            }
                        }
                    ]
                }
                
                
                const map = new mapboxgl.Map({
                container: 'map', // container ID
                // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
                style: 'mapbox://styles/brrrrrrlal/clp0ys6xn019001pb1pqs2u5n', // style URL
                center: [this.long, this.lat], // starting position [lng, lat]
                zoom: 15 // starting zoom
                });
                
                for (const feature of yourLngLat.features) {
                    // create a HTML element for each feature
                    const ell = document.createElement('div');
                    ell.className = 'pmarker';
                
                    new mapboxgl.Marker(ell)
                    .setLngLat(feature.geometry.coordinates)
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML(
                            `<h3>Your Location</h3><p>${this.address}</p>`
                        )
                    )
                    .addTo(map);
                }

                for (const feature of this.places) {
                    // create a HTML element for each feature
                    const el = document.createElement('div');
                    el.className = 'marker';
                
                    new mapboxgl.Marker(el)
                    .setLngLat(feature.geometry.coordinates)
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML(
                            `<h3>${feature.text}</h3><p>${feature.properties.category}</p>`
                        )
                    )
                    .addTo(map);
                }
                const divs = document.getElementById("map")
                if (divs.classList.contains("hide")){
                    divs.classList.remove("hide");
                }
            }
        
        
        
        }
    };
    
</script>

<style>
    .headB{
        background-color: rgba(207, 167, 114, 1);
    }

    select:required:invalid { color: #C7C7CD  ; }
    option{
        color: black;
    }
    .hide{
        visibility:hidden !important;
    }
    .pmarker {
        background-image: url('https://cdn-icons-png.flaticon.com/128/3710/3710297.png');
        background-size: cover;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
    }

    .marker {
        background-image: url('https://cdn-icons-png.flaticon.com/128/3866/3866544.png');
        background-size: cover;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
    }

    #title{
       
        font-family: 'Sora', sans-serif;
        font-size: 50px;
        color: #ED7D31;
    }
    #logo{
        height: 100px;
        width: 100px;
    }
    #enterbutton{
        background-color: #ED7D31;
    }
</style>