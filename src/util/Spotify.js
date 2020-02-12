const spotifyUrl = ''
const apiKey = '';
const corsUrl = 'https://cors-anywhere.herokuapp.com/' + spotifyUrl;
const headers = { Authorization: `Bearer ${apiKey}` }
const options = { headers: headers }

const Spotify = {};

Spotify.queryStringify = (params) => {
  return params.reduce((string, param, i) => {
    const paramName = Object.keys(param);
    const paramValue = param[paramName];
    const delimiter = (i === 0) ? '?' : '&';
    string += `${delimiter}${paramName}=${paramValue}`;
    return string;
  }, '');
}

Spotify.search = (term, location, sortBy) => {
  const queryParams = [
    { term: term },
    { location: location },
    { sort_by: sortBy }
  ]
  const queryUrl = corsUrl + Spotify.queryStringify(queryParams);
  return fetch(queryUrl, options)
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => {
          return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name, 
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count 
          }
        });
      } else {
      }
    });
};

export default Spotify;
