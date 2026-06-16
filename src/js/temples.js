//kriston: next: transfer "getData" method from the class ExternalServices from externalservices.mjs to this file and use to extract temples.json
import { loadHeaderFooter, getLocalStorage, setLocalStorage, updateFavoriteCount } from "./utils.mjs";

loadHeaderFooter();

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

async function init() {
  const temples = await getTemples();
  const templeList = document.querySelector(".temple-list");
  //below renders temple cards
  templeList.innerHTML = temples.map(templeCardTemplate).join("");

  // Heart Button JS-adds heart buttons to temple cards
  document.querySelectorAll(".heart-btn").forEach(heartBtn => {
    heartBtn.addEventListener("click", () => {
      const isFavorited = heartBtn.classList.toggle("favorited");
      //adds the pop class used for adding a pop (increase in size) to the heart when clicked then is removed.
      heartBtn.classList.add("pop");
      setTimeout(() => heartBtn.classList.remove("pop"), 200);
      //creats favorites list in local storage or removes unfavorited
      const thisTemple = temples.find(t => t.name === heartBtn.dataset.name);
      let favorites = getLocalStorage("favorites") || [];
      if (isFavorited) {
        favorites.push(thisTemple);
      } else {
        favorites = favorites.filter(element => element.name !== thisTemple.name);
      }
      setLocalStorage("favorites", favorites);
      updateFavoriteCount();
    });
  });

  syncFavoriteButtons();
}
init();

function templeCardTemplate(temple) {
  return `
    <li class="temple-card">
      <img src="${temple.image}" alt="${temple.name}">
      
      <div class="heart-btn" data-name="${temple.name}">
        <svg class="heart-svg" width="48" height="48" viewBox="0 0 24 24">
          <path class="heart-path" d="M12 21C12 21 3 13.5 3 8a4.5 4.5 0 0 1 9-0.9A4.5 4.5 0 0 1 21 8c0 5.5-9 13-9 13z"/>
        </svg>
      </div>

      <h3>${temple.name}</h3>
      <p class="khmer-name">${temple.khmerName}</p>
      <p class="religion">Relition: ${temple.religion}</p>
      <p class=built-by>Built buy: ${temple.builtBy}</p>
      <p class="when-built">When built: ${temple.built}</p>
      <p>${temple.uniqueFact}</p>
      <ul>
        ${temple.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>
      <p class="hours">Hours: ${temple.openingHours}</p>
      <p class="tip"><strong>Tip:</strong> ${temple.tip}</p>
    </li>
  `;
}

function syncFavoriteButtons() {
  const favoriteOn = getLocalStorage("favorites") || [];
  favoriteOn.forEach(element => {
    //selects the heart button with a specific data(key/value) pair
    const btn = document.querySelector(`.heart-btn[data-name="${element.name}"]`);
    if (btn) {
      btn.classList.add("favorited");
    }
  });
}
// code for Google maps embeded API (an external API for mapping my temples)
