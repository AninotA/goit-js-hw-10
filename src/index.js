import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;


input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  let nameCountry = e.target.value.trim();

  if (nameCountry === '') {
    cleanHtml();
    return;
  }

  fetchCountries(nameCountry)
    .then(data => {
      if (data.length > 10) {
        // list.innerHTML = '';
        // info.innerHTML = '';
        manyMatchesFound(data);
        return;
      } else if (data.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
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

function createListCountry(countries) {
  const markup = countries
    .map(country => {
      return `<li class="country__item"><img src="${country.flags.svg}" alt="${country.name.official}" width="40">${country.name.official}</li>`;
    })
    .join('');
  list.innerHTML = markup;
}

function createMarkupCountry(arr) {
  const markup = arr
    .map(({ name, flags, capital, population, languages }) => {
      return `<div class="title"><img class="flag" src="${
        flags.svg
      }" alt="${name}" width="100" /><p class="country">${
        name.official
      }</p></div>
            <p class="info"><span class="info">Capital: </span>${capital}</p>
            <p class="info"><span class="info">Population: </span>${population}</p>
            <p class="info"><span class="info">Languages: </span>${Object.values(
              languages
            )}</p>`;
    })
    .join('');
  list.innerHTML = markup;
}

function cleanHtml() {
  list.innerHTML = '';
  info.innerHTML = '';
}
