const spotifyUrl = 'https://accounts.spotify.com/authorize/';
const clientId = 'a460d484414e43408a5271308c3eb89c'; 
const redirectUri = 'http://localhost:3000/'; 

const accessToken = {};

const Spotify = {};

Spotify.getAccessToken = () => {
  if (!accessToken.token) {
    const params = Spotify.objectifyQueryString(window.location.href);
    if (!params.access_token) {
      const requestUri = spotifyUrl + Spotify.queryStringify(Spotify.getAccessToken.options);
      window.location.replace(requestUri);
    } else {
      accessToken.token = params.access_token;
      accessToken.expiry = params.expires_in;
      window.setTimeout(() => accessToken = {}, accessToken.expiry * 1000);
      window.history.pushState('Access Token', null, '/');
    }
  }
  return accessToken;
}
Spotify.getAccessToken.options = {
  client_id: clientId,
  response_type: 'token',
  redirect_uri: encodeURI(redirectUri)
}
Spotify.objectifyQueryString = (url) => {
  const paramsString = url.split('#')[1];
  const paramsObject = {};
  if (paramsString) {
    paramsString.split('&').forEach(pair => {
      paramsObject[pair.split('=')[0]] = [pair.split('=')[1]]; 
    });
  };
  return paramsObject;
}
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
