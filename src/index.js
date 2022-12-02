import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const DEBOUNCE_DELAY = 300;
const search = document.querySelector('#search-box');
const list = document.querySelector('country-list');
const info = document.querySelector('country-info');

search.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  let nameCountry = e.target.value.trim();

  if (nameCountry === '') {
    cleanHtml();
    return;
  }

  fetchCountries(nameCountry)
    .then(data => {
      if (data.length > 10) {
        list.innerHTML = '';
        info.innerHTML = '';
        manyMatchesFound(data);
        return;
      } else if (data.length <= 10 && data.length >= 2) {
        createListCountry(data);
      } else if (data.length === 1) {
        createMarkupCountry(data);
      }
    })
    .catch(err => console.error(err));
}

function manyMatchesFound() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function createListCountry(country) {
  return country
    .map(
      item =>
        `<li class="country__item"><img src="${item.flags.svg}" alt="${item.name.official}" width="30" hight="20">${item.name.official}</li>`
    )
    .join('');
}

function createMarkupCountry(arr) {
  const markup = arr
    .map(({ name, flags, capital, population, languages }) => {
      return `<div class="title"><img class="flag" src="${
        flags.svg
      }" alt="${name}" width="70" /><p class="country">${
        name.official
      }</p></div>
            <p class="info"><span class="info">Capital: </span>${capital}</p>
            <p class="info"><span class="info">Population: </span>${population}</p>
            <p class="info"><span class="info">Languages: </span>${Object.values(
              languages
            )}</p>`;
    })
    .join('');
  info.innerHTML = markup;
}

function cleanHtml() {
  list.innerHTML = '';
  info.innerHTML = '';
}
