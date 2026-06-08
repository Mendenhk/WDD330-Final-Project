//kriston: next: transfer "getData" method from the class ExternalServices from externalservices.mjs to this file and use to extract temples.json

import { loadHeaderFooter} from "./utils.mjs";

async function getTemples() {
  const response = await fetch('/src/json/temples.json');
  const responseText = await response.text();
  console.log("hello world");
  let data = responseText;
  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch (error) {
    data = responseText || response.statusText;
  }
  if (response.ok) {
    return data;
  } else {
    throw {
      name: "servicesError",
      message: data || response.statusText,
      status: response.status,
    };
  }
}