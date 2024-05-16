let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let result = document.getElementById("result");

searchBtn.addEventListener("click", () => {
  let Name = countryInp.value.trim().toLowerCase();
  let lastURL = `https://restcountries.com/v3.1/name/${Name}?fullText=true`;

  fetch(lastURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0]);
      if (data && data.length > 0) {
        const country = data[0];
        const currencyCode = Object.keys(country.currencies)[0];
        const currency = country.currencies[currencyCode];

        result.innerHTML = `
              <img src="${country.flags.svg}" class="flag-img" alt="Flag of ${
          country.name.common
        }"/>
              <h2>${country.name.common}</h2>
              <div class="wrapper">
                <div class="data-wrapper">
                  <h4>Capital:</h4>
                  <span>${country.capital ? country.capital[0] : "N/A"}</span>
                </div>
              </div>

              <div class="wrapper">
                <div class="data-wrapper">
                  <h4>Continent:</h4>
                  <span>${
                    country.continents ? country.continents[0] : "N/A"
                  }</span>
                </div>
              </div>

              <div class="wrapper">
                <div class="data-wrapper">
                  <h4>Population:</h4>
                  <span>${country.population.toLocaleString()}</span>
                </div>
              </div>

              <div class="wrapper">
                <div class="data-wrapper">
                  <h4>Currency:</h4>
                  <span>${
                    currency
                      ? `${currency.name} (${currency.symbol}) - ${currencyCode}`
                      : "N/A"
                  }</span>
                </div>
              </div>
              
              <div class="wrapper">
                <div class="data-wrapper">
                  <h4>Common Languages:</h4>
                  <span>${
                    country.languages
                      ? Object.values(country.languages).join(", ")
                      : "N/A"
                  }</span>
                </div>
              </div>
            `;
      } else {
        result.innerHTML = `<p>Sorry! This Country is not found in this site</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching country data:", error);
      result.innerHTML = `<p>There was an error fetching the country data. Please try again later.</p>`;
    });
});
