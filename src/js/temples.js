//kriston: next: transfer "getData" method from the class ExternalServices from externalservices.mjs to this file and use to extract temples.json
import { loadHeaderFooter} from "./utils.mjs";

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
  const templeList = document.querySelector(".temple-list"); // update selector to match your HTML
  templeList.innerHTML = temples.map(templeCardTemplate).join("");
}
init();

function templeCardTemplate(temple) {
  return `
    <li class="temple-card">
      <img src="${temple.image}" alt="${temple.name}">
      
      <div class="heart-btn" id="heartBtn" aria-label="Add to favorites" aria-pressed="false">
        <svg class="heart-svg" width="48" height="48" viewBox="0 0 24 24">
          <path class="heart-path" d="M12 21C12 21 3 13.5 3 8a4.5 4.5 0 0 1 9-0.9A4.5 4.5 0 0 1 21 8c0 5.5-9 13-9 13z"/>
        </svg>
      </div>

      <h3>${temple.name}</h3>
      <p class="khmer-name">${temple.khmerName}</p>
      <p>${temple.uniqueFact}</p>
      <ul>
        ${temple.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>
      <p class="hours">Hours: ${temple.openingHours}</p>
      <p class="tip"><strong>Tip:</strong> ${temple.tip}</p>
    </li>
  `;
}

// Heart Button JS
// const btn = document.getElementById('heartBtn');
//   const label = document.getElementById('heartLabel');
//   btn.addEventListener('click', () => {
//     const isFav = btn.classList.toggle('favorited');
//     btn.setAttribute('aria-pressed', isFav);
//     label.textContent = isFav ? 'Saved to favorites' : 'Add to favorites';
//     btn.classList.add('pop');
//     setTimeout(() => btn.classList.remove('pop'), 200);
//   });
