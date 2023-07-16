

let scripts = document.getElementsByTagName("script");
let lastScript = scripts[scripts.length - 1];
let scriptName = lastScript;
var incidents = JSON.parse(scriptName.getAttribute("incidents"));
let options = document.getElementById('opciones');
let input = document.getElementById('ubication'); 
let positionlat = document.getElementById('positionlat'); 
let positionlng = document.getElementById('positionlng'); 
const API_KEY = '9R3LlloO9eapskgkm9ds8eGoVhHxzcWoSVtQ_5RqvDQ';

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

// crea los marcadores

for(incident of incidents) {
  var mark = new H.map.Marker({lat: incident.latitud, lng: incident.longitud});
  mark.setData(incident);
  console.log(incident)
  markers.push(mark);
}

markers.forEach(function(marker) {
 map.addObject(marker);
});

markers.forEach(function(marker) {
  marker.addEventListener('tap', function (evt) {
    const data = marker.getData();
    console.log(data);
    document.querySelector('.marker-title').textContent = 'Titulo: ' +data.title;
    document.querySelector('.marker-description').textContent = 'Descripcion: ' + data.description;
    document.querySelector('.marker-ubication').textContent = 'Ubicacion: ' + data.ubication;
    document.querySelector('.marker-state').textContent = 'Estado: ' + data.state;
    document.querySelector('.marker-categorie').textContent = 'Categoría: ' + data.namecategory;


    const fechaISO8601 = data.date;
    const fecha = new Date(fechaISO8601);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    
    const fechaFormateada = `${dia}/${mes}/${anio}`;
    document.querySelector('.marker-date').textContent = 'Fecha: ' + fechaFormateada;


    const img = document.createElement('img');

    if(data.banner) {
      img.src = '../images/' + data.banner;
    }else {
      img.src = '../images/cori';
    }
    
    const div = document.querySelector('.temp');
    div.appendChild(img);


  }, false);
});



