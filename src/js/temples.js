//kriston: next: transfer "getData" method from the class ExternalServices from externalservices.mjs to this file and use to extract temples.json
import { loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();

async function getTemples() {
  const response = await fetch('/src/json/temples.json');
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
  console.log(temples); // remove once confirmed working
  templeCardTemplate(temples);
}

init();

function templeCardTemplate(temple) {
  return `
    <li class="temple-card">
      <img src="${temple.image}" alt="${temple.name}">
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

