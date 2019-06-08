

//Set up API call to GeoJSON
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

function getColor(d) {
  return d > 8 ? '#ff4500' :
        d > 6 ? '#ff7946' :
        d > 4  ? '#ffa47d' :
        d > 2   ? '#ffcdb4' :
                  '#fff5ee';
}


d3.json(url, function(data) {

  var earthquakes = L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      var magnitude = feature.properties.mag;
      
      var circleMarkerOptions = {
        radius : ((magnitude*1.4) ** 2),
        fillColor: getColor(magnitude),
        color: '#999',
        fillOpacity: .9,
        weight: .5
      }
      return L.circleMarker(latlng, circleMarkerOptions) //{

        },
      onEachFeature: function(feature, layer) {
        
        layer.bindTooltip(feature.properties.place, feature.properties.mag);
      }
      }  
      );
  
  // var tectonicPlates = L.geoJSON(data, {
  //   pointToLayer: function(feature, coordinates) {
  //     var plates = coordinates
  //     return L.polygon(plates)
  //   }
  // })    
    createMap(earthquakes);  
 



function createMap(earthquakes, tectonicPlates) {
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
    zoom: 4,
    layers: [lightmap, earthquakes, tectonicPlates]
  });
 
  //Create a layer control 
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map)

  // var legend = L.control({position: 'bottomright'});
  //   legend.onAdd = function (map) {
  //     var div = L.DomUtil.create('div', 'info legend'),
  //     grades = [0, 1, 2, 3, 4, 5, 6, 7],
  //     labels = [];

  //     for (var i = 0; grades.length; i++) {
  //       div.innerHTML += '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  //       }
  //       return div;
  //   };
       
  // legend.addTo(map);
  earthquakes.addTo(map);
  
};
})
