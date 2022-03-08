async function countries() {
  const response = await fetch("https://restcountries.com/v2/all");
  const data = await response.json();
  return data;
}
countries().then((countries) => {
  const allCountries = [];
  countries.map((country) => {
    allCountries.push(country.demonym);
  });
  allCountries.sort().map((country) => {
    document.getElementById("nationality").innerHTML += `
      <option style="padding:1rem" value=${country}>${country}</option>
    `;
  });
});

// countries().then((countries) => {
//   countries
//     .sort((a, b) => b - a)
//     .map((country) => {
//       document.getElementById("nationality").innerHTML += `
//       <option style="padding:1rem" value=${country.demonym}><img src=${country.flag} alt=${country.demonym}>${country.demonym}</option>
//     `;
//     });
// });

// console.log(countriesList);
