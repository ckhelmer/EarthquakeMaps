
//Create a tile layer to serve as the map background
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

//Create a baseMaps object to hold lightmap layer
var baseMaps = {
    'Light Map' : lightmap
};

//Create an overlayMaps object to hold earthquakes and tectonic plates
var overlayMaps = {
    "Earthquakes" : earthquakes
};

//Create the map object
var map = L.map('map-id', {
    center: [39.5, -98.35],
    zoom: 6,
    layers: [lightmap, earthquakes]
});

//Create a layer control 
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map)


