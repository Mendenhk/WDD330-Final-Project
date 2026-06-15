import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

// === Mapbox setup ===
mapboxgl.accessToken = CONFIG.mapboxToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/outdoors-v12',
  center: [103.95, 13.45], // centered to cover the temple spread
  zoom: 7.5
});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

// === Temples data ===
const temples = [
  { "id": 1, "name": "Angkor Wat", "lat": 13.41250, "lng": 103.86667 },
  { "id": 2, "name": "Ta Prohm", "lat": 13.43500, "lng": 103.88917 },
  { "id": 3, "name": "Angkor Thom", "lat": 13.44167, "lng": 103.85833 },
  { "id": 4, "name": "Bayon Temple", "lat": 13.44139, "lng": 103.85917 },
  { "id": 5, "name": "Phnom Bakheng", "lat": 13.42418, "lng": 103.85601 },
  { "id": 6, "name": "Banteay Srei", "lat": 13.59889, "lng": 103.96278 },
  { "id": 7, "name": "Phnom Krom", "lat": 13.27500, "lng": 103.83500 },
  { "id": 8, "name": "Temple of Preah Vihear", "lat": 14.39056, "lng": 104.68028 },
  { "id": 9, "name": "Koh Ker", "lat": 13.79000, "lng": 104.56500 },
  { "id": 10, "name": "Beng Mealea", "lat": 13.47639, "lng": 104.23833 },
  { "id": 11, "name": "Prasat Wat (Wat Athvea)", "lat": 13.32360, "lng": 103.84100 },
  { "id": 12, "name": "Preah Khan", "lat": 13.45917, "lng": 103.85972 }
];

// === Build markers ===
temples.forEach(temple => {
  const el = document.createElement('div');
  el.className = 'marker';
  el.title = temple.name;

  new mapboxgl.Marker(el)
    .setLngLat([temple.lng, temple.lat])
    .addTo(map);
});