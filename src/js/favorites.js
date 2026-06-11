//kriston: next: transfer "getData" method from the class ExternalServices from externalservices.mjs to this file and use to extract temples.json
import { loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();

function init() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  console.log(favorites);
  const favoriteList = document.querySelector(".favorites-list"); // update selector to match your HTML
  favoriteList.innerHTML = favorites.map(favoriteCardTemplate).join("");
}
init();

function favoriteCardTemplate(favorite) {
  return `
    <li class="favorite-card">
      <img src="${favorite.image}" alt="${favorite.name}">

      <h3>${favorite.name}</h3>
      <p class="khmer-name">${favorite.khmerName}</p>
      <p class="religion">Relition: ${favorite.religion}</p>
      <p class=built-by>Built buy: ${favorite.builtBy}</p>
      <p class="when-built">When built: ${favorite.built}</p>
      <p>${favorite.uniqueFact}</p>
      <ul>
        ${favorite.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>
      <p class="hours">Hours: ${favorite.openingHours}</p>
      <p class="tip"><strong>Tip:</strong> ${favorite.tip}</p>
    </li>
  `;
}


//future code to distinguish between temple cards and beyond temple cards
// function favoriteCardTemplate(favorite) {
//   if (favorite.religion) {
//     return templeCardTemplate(favorite);
//   } else {
//     return beyondCardTemplate(favorite);
//   }
// }

