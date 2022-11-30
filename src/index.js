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

  // if (!nameCountry) {
  //   cleanHtml();
  //   return;
  // }

  fetchCountries(nameCountry).then(data => {
    if (data.length > 10) {
      manyMatchesFound(data);
    } else if ((data.length < 10) & (data.length >= 2)) {
      createListCountry(data);
    } else if ((data.length = 1)) {
      createMarkupCountry(data);
    }
  });
  // .catch(err => console.error(err));
}

function manyMatchesFound() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function createListCountry(arr) {
  const markup = arr
    .map(item => {
      return `<li><img src="${item.flags.svg}" alt="Flag of ${item.name.official}" width="30" hight="20"><b>${item.name.official}</p></li>`;
    })
    .join('');
  listCountry.innerHTML = markup;
}

function createMarkupCountry(arr) {
  const markup = arr
    .map(({ name, flags, capital, population, languages }) => {
      return `<li><img src="${
        flags.svg
      }" alt="${name}" width="30" hight="20"><b>${name.official}</b></p>
            <p><b>Capital</b>: ${capital}</p>
            <p><b>Population</b>: ${population}</p>
            <p><b>Languages</b>: ${Object.values(languages)} </p>
                </li>`;
    })
    .join('');
  infoCountry.innerHTML = markup;
}

function cleanHtml() {
  listCountry.innerHTML = '';
  infoCountry.innerHTML = '';
}
