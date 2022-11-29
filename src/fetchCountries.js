import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const filters = 'name,capital,population,flags,languages';

function notFound() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

export default function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?fields=${filters}`).then(resp => {
    if (!resp.ok) {
      notFound();
      throw Error(statusText);
    }
    return resp.json();
  });
}


