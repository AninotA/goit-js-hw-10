// export function fetchCountries(name) {
//   const BASE_URL = 'https://restcountries.com/v3.1/name/';
//   const filters = 'name,capital,population,flags,languages';

//   return fetch(`${BASE_URL}/${name}?fields=${filters}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   });
//   // .catch(err => console.error(err));
// }

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const filters = 'name,capital,population,flags,languages';

function notFound() {
  Notiflix.Notify.failure("Oops, there is no country with that name")
}

export default function fetchCountries(name) {
  return fetch(`${BASE_URL}/${name}?fields=${filters}`).then(response => {
        if (!response.ok) {
          notFound()
          throw Error(statusText);
        }
        return response.json();
      });
   
}