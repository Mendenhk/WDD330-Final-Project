import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

//fixed rate for if the fetch returns an error
const KHR_RATE = 4100;

const conversionButton = document.getElementById("convert-btn");
conversionButton.addEventListener("click", async () => { 
  const amount = parseFloat(document.getElementById("amount").value);

  //error handling if amount input value is null/empty
  if (!amount || amount <= 0) {
  document.getElementById("result").textContent = "Please enter a valid amount.";
  return;
}
  const from = document.getElementById("currency").value;
  //if from === "USD" then to = KHR, else to = USD
  const to = from === "USD" ? "KHR" : "USD";

  let converted;

  try {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/1a01856179408f52541ae26b/pair/${from}/${to}/${amount}`
  );
  const data = await response.json();
  if (data.conversion_result) {
    converted = data.conversion_result;
  } else {
    converted = from === "USD" ? amount * KHR_RATE : amount / KHR_RATE;
  }
} catch (error) {
  //if an error is returned then KHR will be calculated using a fixed rate
  converted = from === "USD" ? amount * KHR_RATE : amount / KHR_RATE;
}

  document.getElementById("result").textContent = `${converted.toFixed(2)} ${to}`;
  document.getElementById("dollar-riel").textContent =
    to === "KHR" ? "Cambodian Riel (KHR)" : "US Dollar (USD)";
});