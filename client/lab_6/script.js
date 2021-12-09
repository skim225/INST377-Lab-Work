async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const arrayName = await request.json();
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  function findMatches(wordToMatch, cities) {
    return cities.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return (place.name.match(regex) 
      || place.category.match(regex) 
      || place.address_line_1.match(regex) 
      || place.city.match(regex) 
      || place.zip.match(regex));
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, arrayName);
    const html = matchArray.map((place) => {
      const regex = new RegExp(event, 'gi');
      return `
        <li>
          <h1>${place.name}</h1>
          <h3>${place.category}</h3>
          <p>${place.address_line_1}</p>
          <p>${place.city}</p>
          <p>${place.zip}</p>
        </li> 
      `;
    });
    suggestions.innerHTML = html;
  }
  
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions;