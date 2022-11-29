import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchCountry = document.querySelector('#search-box');
const listCountry = document.querySelector('country-list');
const infoCountry = document.querySelector('country-info');

searchCountry.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const nameCountry = e.target.value.trim();

  if (!e.textContent) {
    cleanHtml();

    return;
  }

  fetchCountries(nameCountry)
    .then(data => {
      if (data.length > 10) {
        manyMatchesFound(data);
      } else if ((data.length <= 10) & (data.length > 1)) {
        createList(data);
      } else if ((data.length = 1)) {
        createCard(data);
      }
    })
    .catch(err => console.error(err));
}

function manyMatchesFound() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function createList(countries) {
  const markup = countries
    .map(country => {
      return `<li><img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20"><b>${country.name.official}</p></li>`;
    })
    .join('');
  listCountry.innerHTML = markup;
}

function createCard(countries) {
  const markup = countries
    .map(country => {
      return `<li><img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20"><b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
    })
    .join('');
  listCountry.innerHTML = markup;
}

function cleanHtml() {
  listCountry.innerHTML = '';
  infoCountry.innerHTML = '';
}

