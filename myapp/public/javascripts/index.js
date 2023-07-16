let scripts = document.getElementsByTagName("script");
let lastScript = scripts[scripts.length - 1];
let scriptName = lastScript;
var incidents = JSON.parse(scriptName.getAttribute("incidents"));
let options = document.getElementById('opciones');
let input = document.getElementById('ubication'); 
let positionlat = document.getElementById('positionlat'); 
let positionlng = document.getElementById('positionlng'); 


const API_KEY = '9R3LlloO9eapskgkm9ds8eGoVhHxzcWoSVtQ_5RqvDQ';

// by default, Paris...
let coordinates = "48.8,2.3";
let lat;
let lng;

console.log("nada");
// let's get HTML5 geolocation


var platform = new H.service.Platform({
  'apikey': API_KEY
});

const defaultLayers = platform.createDefaultLayers();
const map = new H.Map(
  document.getElementById('map'),
  defaultLayers.vector.normal.map,
  {
    center: { lng: -71.5083, lat: -16.4236 },
    zoom: 15
  }
);


const ui = H.ui.UI.createDefault(map, defaultLayers);
const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
const markers = [];

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
      coordinates = position.coords.latitude + "," + position.coords.longitude;
      console.log(position.coords)
      var platform = new H.service.Platform({
          'apikey': API_KEY
      });

      lat =  position.coords.latitude;
      lng =  position.coords.longitude;
      
      var defaultLayers = platform.createDefaultLayers();
      //var servicePlaces = platform.getPlacesService();

      var marker = new H.map.Marker({lat: lat, lng: lng});
      map.addObject(marker);

  });
} else {
  console.log("Geolocation is not supported by this browser.");
}


for(incident of incidents) {
   var mark = new H.map.Marker({lat: incident.latitud, lng: incident.longitud});
   mark.setData(incident);
   markers.push(mark);
}

markers.forEach(function(marker) {
  map.addObject(marker);
});

markers.forEach(function(marker) {
  marker.addEventListener('tap', function (evt) {
    console.log(evt.target);
  }, false);
});


// Enable the event system on the map instance:

// // Add event listener:
// map.addEventListener('tap', function(evt) {
//   var coordinates = map.screenToGeo(
//     evt.currentPointer.viewportX,
//     evt.currentPointer.viewportY
//   );
  
//   var marker = new H.map.Marker(coordinates);
//   map.addObject(marker);
  
//   marker.setData('Esta es la información del marcador');
  
//   marker.addEventListener('tap', function(evt) {
//     var data = evt.target.getData();
//     console.log(data);
//   });

//   marker.addListener('click', function() {
//     var info = data.informacion;
//     console.log(info); // aquí puedes modificar la acción que se realiza al hacer clic en el marcador
//   });
// });


 // reemplaza 'mi-input' con el ID de tu elemento HTML


input.addEventListener('keyup', () => {
  findUbication(input.value);
});


input.addEventListener('click', () => {
  opciones.style.display = 'block';
});


input.addEventListener('keydown', () => {
  options.innerHTML = " ";
});


options.addEventListener('change', (event) => {
    console.log("event" , event.target.value);
    input.value = options.options[event.target.value].text;
    console.log(input.value);
    findPosition(input.value);
});


function findUbication(query) {
  // Construir la URL de la solicitud HTTP GET
  const url = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${query}&apiKey=${API_KEY}`;

  // Hacer una solicitud HTTP GET usando fetch y procesar la respuesta
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data && data.items && data.items.length > 0 ) {
          for (let i = 0; i < data.items.length ; i++) {
            console.log("opciones" , data);
            html = "<option value=" +  i + "> " +   data.items[i].title + "</option>";
            options.innerHTML += html;
          }
      }
    })
    .catch(error => {
      console.log(`Error en la solicitud HTTP: ${error}`);
    });
}

function findPosition(query) {
  // Construir la URL de la solicitud HTTP GET
  const url = `https://geocode.search.hereapi.com/v1/geocode?q=${query}&apiKey=${API_KEY}`;

  // Hacer una solicitud HTTP GET usando fetch y procesar la respuesta
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const ubication = data.items[0].position;
      console.log(ubication);
      var marker = new H.map.Marker({lat: ubication.lat, lng: ubication.lng});
      map.addObject(marker);
      positionlat.value = JSON.stringify(ubication.lat);
      positionlng.value = JSON.stringify(ubication.lng);  
    })
    .catch(error => {
      console.log(`Error en la solicitud HTTP: ${error}`);
    });
}







