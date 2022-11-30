import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v2/name/';
const filters = 'name,capital,population,flags,languages';



export default function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?fields=${filters}`).then(response => {
    if (!response.ok) {
  
      throw new Error(Notiflix.Notify.failure('Oops, there is no country with that name'));
    }
    return response.json();
  }).catch(err=>console.error(err));
}
