import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const country = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  let query = event.target.value.trim();
  if (query === '') {
    list.innerHTML = '';
    country.innerHTML = '';
    return;
  }
  fetchCountries(query)
    .then(json => {
      if (json.length > 10) {
        list.innerHTML = '';
        country.innerHTML = '';
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (json.length >= 2 && json.length <= 10) {
        country.innerHTML = '';
        list.innerHTML = createMarkupList(json);
        return;
      }
      if (json.length === 1) {
        list.innerHTML = '';
        country.innerHTML = createMarkupCard(json);
      }
    })
    .catch(() => {
      list.innerHTML = '';
      country.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function createMarkupCard(card) {
  const lng = [];
  for (let key in card[0].languages) {
    lng.push(card[0].languages[key]);
  }

  return `<h2>
  <img src="${card[0].flags.svg}" alt="${card[0].name.official}" width="50" hight="20">
  ${card[0].name.official}
  </h2>
  <p><b>Capital:</b> ${card[0].capital[0]}</p>
  <p><b>Population:</b> ${card[0].population}</p>
  <p><b>Languages:</b> ${lng.join(', ')}</p>`;
}

function createMarkupList(arr) {
  return arr
    .map(
      el =>
        `<li class="country__item">
        <img src="${el.flags.svg}" alt="${el.name.official}" width="50" hight="20">
        ${el.name.official}
        </li>`
    )
    .join('');
}

export function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const filters = 'name,capital,population,flags,languages';

  return fetch(`${BASE_URL}/${name}?fields=${filters}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
  // .catch(err => console.error(err));
}

// const DEBOUNCE_DELAY = 300;
// const searchCountry = document.querySelector('#search-box');
// const listCountry = document.querySelector('country-list');
// const infoCountry = document.querySelector('country-info');

// searchCountry.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// function onSearch(e) {
//   let nameCountry = e.target.value.trim();

//   if (nameCountry === '') {
//     cleanHtml();
//     return;
//   }

//   fetchCountries(nameCountry).then(data => {
//     if (data.length > 10) {
//       listCountry.innerHTML = '';
//       infoCountry.innerHTML = '';
//       manyMatchesFound(data);
//       return;
//     } else if (data.length <= 10 && data.length >= 2) {
//       createListCountry(data);
//     } else if (data.length === 1) {
//       createMarkupCountry(data);
//     }
//   })
//   .catch(() => {
//     listCountry.innerHTML = '';
//     infoCountry.innerHTML = '';
//     Notiflix.Notify.failure('Oops, there is no country with that name');
//   });
// }

// function manyMatchesFound() {
//   Notiflix.Notify.info(
//     'Too many matches found. Please enter a more specific name.'
//   );
// }

// function createListCountry(country) {
//   return country
//     .map(
//       item =>
//         `<li class="country__item"><img src="${item.flags.svg}" alt="${item.name.official}" width="30" hight="20">${item.name.official}</li>`
//     )
//     .join('');
// }

// function createMarkupCountry(arr) {
//   const markup = arr
//     .map(({ name, flags, capital, population, languages }) => {
//       return `<div class="title"><img class="flag" src="${flags.svg}" alt="${name}" width="70" /><p class="country">${name.official}</p></div>
//             <p class="info"><span class="info">Capital: </span>${capital}</p>
//             <p class="info"><span class="info">Population: </span>${population}</p>
//             <p class="info"><span class="info">Languages: </span>${Object.values(languages)}</p>`;
//     })
//     .join('');
//   infoCountry.innerHTML = markup;
// }

// function cleanHtml() {
//   listCountry.innerHTML = '';
//   infoCountry.innerHTML = '';
// }

