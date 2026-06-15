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
async function getTemples() {
  const response = await fetch('../json/temples.json');
  if (response.ok) {
    return await response.json();
  } else {
    throw {
      name: "servicesError",
      message: response.statusText,
      status: response.status,
    };
  }
}

// === Build markers with popups ===
const temples = await getTemples();
console.log(temples);
console.log(temples[0]);
//ensures that map loads before loading icons
map.on("load", () => {
  temples.forEach((temple) => {
    const el = document.createElement("div");
    el.className = "marker";
    el.title = temple.name;

    const popupHTML = `
      <div class="temple-popup">
        <h3>${temple.name}</h3>
        <img
          src="${temple.image}"
          alt="${temple.name}"
          class="popup-img"
        >
        <p>${temple.uniqueFact.substring(0, 120)}...</p>
        <a class="details-button" href="../temples/index.html">
          More Details
        </a>
      </div>
    `;

    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: true,
      closeOnClick: true
    }).setHTML(popupHTML);

    new mapboxgl.Marker(el)
      .setLngLat([temple.location.lng, temple.location.lat])
      .setPopup(popup)
      .addTo(map);
  });
});