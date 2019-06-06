//Set up API call to GeoJSON
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

d3.json(url, function(data) {
  //Send response to a subfunction
  createFeatures(data.features)
  console.log(data.features)
})

function createFeatures(earthquakeData) {

  function onEachFeature(feature, layer)
  layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");

  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature : onEachFeature
  });


  createMap(earthquakes);

}

function createMap(earthquakes) {
  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  //Create a tile layer to serve as the map background
  //Create a baseMaps object to hold lightmap layer
  var baseMaps = {
    'Light Map' : lightmap,
    'Dark Map' : darkmap,
    'Street Map' : streetmap
  };

  //Create an overlayMaps object to hold earthquakes and tectonic plates
  var overlayMaps = {
    'Earthquakes' : earthquakes
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
};
