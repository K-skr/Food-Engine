<template>
    <div class="ui grid">
        <div class="six wide column">
            <form class="ui segment large form">
                <div class="field">
                    <div class="ui right icon input large">
                        <input type="text" placeholder="Enter your address">
                        <i class="dot circle link icon"></i>
                    </div>
                </div>

                <div class="field">
                    <div class="two fields">
                        <div class="field">
                            <select>
                                <option value="Restaurants">Restaurants</option>
                            </select>
                        </div>

                        <div class="field">
                            <select>
                                <option value="5">5 KM</option>
                                <option value="10">10 KM</option>
                                <option value="15">15 KM</option>
                                <option value="20">20 KM</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button class="ui button violet"></button>
            </form>
        </div>
        <div class="ten wide colun segment ui" ref="map"></div>
    </div>
</template>