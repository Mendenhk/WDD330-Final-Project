import { loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

async function getBeyond() {
  const response = await fetch('../json/beyond-temples.json');
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

async function init() {
  const beyonds = await getBeyond();
  const beyondListElement = document.querySelector(".temple-list");
  //below renders beyond cards
  beyondListElement.innerHTML = beyonds.map(beyondCardTemplate).join("");

  //category dropdown event listener
  const categoryDropdown = document.getElementById("category");
  categoryDropdown.addEventListener("change", () => {
    filterByCategory(beyonds, categoryDropdown.value, beyondListElement);
  });

  //sort by distance button
  const distanceBtn = document.getElementById("sort-by-distance");
  distanceBtn.addEventListener("click", () => {
    //resets the dropdown menu.
    categoryDropdown.value = "all"
    sortByDistance(beyonds, beyondListElement);
  });

  // syncFavoriteButtons();
}
init();

function beyondCardTemplate(beyond) {
  return `
    <li class="beyond-card">
      <img src="${beyond.image}" alt="${beyond.name}">
      <h3>${beyond.name}</h3>
      <p class="khmer-name">${beyond.khmerName}</p>
      <p class="siem-distance">distance from Siem Reap: ${getDistanceFromSiemReap(beyond.latitude, beyond.longitude).toFixed(2)} miles</p>
      <p>${beyond.uniqueFact}</p>
      <ul>
        ${beyond.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>
      <p class="hours">Hours: ${beyond.openingHours}</p>
      <p class="tip"><strong>Tip:</strong> ${beyond.tip}</p>
    </li>
  `;
}

function filterByCategory(list, category, beyondListElement) {
  if (category !== "all") {
    const filteredList = list.filter((element) => element.category === category);
    beyondListElement.innerHTML = filteredList.map(beyondCardTemplate).join("");
  } else {
    beyondListElement.innerHTML = list.map(beyondCardTemplate).join("");
  }
}

function sortByDistance(list, beyondListElement) {
  const sortedList = list.sort((a, b) => getDistanceFromSiemReap(a.latitude, a.longitude) - getDistanceFromSiemReap(b.latitude, b.longitude));
  beyondListElement.innerHTML = sortedList.map(beyondCardTemplate).join("");
}

//below is the function for the haversine distance from Siem Reap, gotten from AI.
function getDistanceFromSiemReap(lat2, lng2) {
  const R = 6371; // km
  const lat1 = 13.3671;
  const lng1 = 103.8448;
  const toRad = deg => deg * (Math.PI / 180);

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// function syncFavoriteButtons(){
//   const favoriteOn = getLocalStorage("favorites") || [];
//   favoriteOn.forEach(element => {
//     //selects the heart button with a specific data(key/value) pair
//     const btn = document.querySelector(`.heart-btn[data-name="${element.name}"]`);
//     if(btn) {
//       btn.classList.add("favorited");
//     }
//   });
// }
