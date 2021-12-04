// addEventListener(async(event) => {
//   const results = await fetch('/api');
//   const json = results.json();
// });

async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const arrayName = await request.json();
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  // function displayMatches

  function findMatches(wordToMatch, cities) {
    return cities.filter((place) => {
      // here we need to figure out if the city or state matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return place.name.match(regex) || place.category.match(regex);
    });
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, cities);
    const html = matchArray.map((place) => {
      const regex = new RegExp(event.target.value, 'gi');
      const cityName = place.name.replace(regex, `<span class="h1">${event.target
        .value}</span>`);
      return `
                <li>
                <span class="name">${place.name}, ${place.state}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
                </li> 
                `;
    }).join('');
    suggestions.innerHTML = html;
  }
  
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions;