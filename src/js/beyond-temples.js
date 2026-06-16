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
  const beyondList = document.querySelector(".temple-list");
  //below renders beyond cards
  beyondList.innerHTML = beyonds.map(beyondCardTemplate).join("");

  //category dropdown event listener
  const categoryDropdown = document.querySelector("#category");
  categoryDropdown.addEventListener("change", () => {
    filterByCategory(beyonds, categoryDropdown.value, beyondList);
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
      <p>${beyond.uniqueFact}</p>
      <ul>
        ${beyond.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>
      <p class="hours">Hours: ${beyond.openingHours}</p>
      <p class="tip"><strong>Tip:</strong> ${beyond.tip}</p>
    </li>
  `;
}

function filterByCategory(list, category, beyondList) {
  if (category !== "all") {
    const filteredList = list.filter((element) => element.category === category);
    beyondList.innerHTML = filteredList.map(beyondCardTemplate).join("");
  } else {
    beyondList.innerHTML = list.map(beyondCardTemplate).join("");
  }
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
