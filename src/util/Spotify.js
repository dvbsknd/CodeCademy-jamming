const spotifyUrl = 'https://accounts.spotify.com/authorize/';
const clientId = 'a460d484414e43408a5271308c3eb89c'; 
const redirectUri = 'http://localhost:3000/'; 
const searchUri = 'https://api.spotify.com/v1/search';

let accessToken = {};

const Spotify = {};

Spotify.getAccessToken = () => {
  if (!accessToken.token) {
    console.log('No token found');
    const params = Spotify.objectifyQueryString(window.location.href);
    if (!params.access_token) {
      const requestUri = spotifyUrl + Spotify.queryStringify(Spotify.getAccessToken.options);
      console.log('Requesting Token');
      window.location.assign(requestUri);
    } else {
      console.log('Token found in URL');
      accessToken.token = params.access_token;
      accessToken.expiry = params.expires_in;
      window.setTimeout(() => accessToken = {}, accessToken.expiry * 1000);
      window.history.pushState('Access Token', null, '/');
    }
  }
  return accessToken;
};
Spotify.getAccessToken.options = [
  { client_id: clientId },
  { response_type: 'token' },
//  { scope: 'playlist-modify-private' },
  { redirect_uri: encodeURI(redirectUri) }
];
Spotify.objectifyQueryString = (url) => {
  const paramsString = url.split('#')[1];
  const paramsObject = {};
  if (paramsString) {
    paramsString.split('&').forEach(pair => {
      paramsObject[pair.split('=')[0]] = pair.split('=')[1]; 
    });
  };
  return paramsObject;
};
Spotify.queryStringify = (params) => {
  return params.reduce((string, param, i) => {
    const paramName = Object.keys(param);
    const paramValue = param[paramName];
    const delimiter = (i === 0) ? '?' : '&';
    string += `${delimiter}${paramName}=${paramValue}`;
    return string;
  }, '');
};
Spotify.search = (term) => {
  const token = Spotify.getAccessToken().token;
  if (term && token) {
    const queryParams = [
      { q: encodeURI(term) },
      { type: 'track' }
    ];
    const queryUrl = searchUri + Spotify.queryStringify(queryParams);
    return fetch(queryUrl, 
      { headers: {
        'Authorization': `Bearer ${token}`
      }})
      .then(response => response.json())
      .then(jsonResponse => jsonResponse);
  } else {
    return Promise.resolve('Search term not supplied.');
  }
};
Spotify.storePlaylist = (playlistName, tracksToSave) => {
  if (tracksToSave.length > 0 && Spotify.getAccessToken().token) {
  Spotify.getUserId()
    .then(userId => {
      Spotify.getPlaylistId(userId, playlistName)
        .then(playlistId => {
          Spotify.storePlaylistTracks(playlistId, tracksToSave)
        })
    });
  } else { console.log('No playlist data or invalid token.') }
};
Spotify.getUserId = () => {
  return fetch('https://api.spotify.com/v1/me', 
    { headers: {
      'Authorization': `Bearer ${Spotify.getAccessToken().token}`
    }})
    .then(response => response.json())
    .then(jsonResponse => {
      console.log('User ID retreived', jsonResponse.id);
      return jsonResponse.id;
    });
};
Spotify.getPlaylistId = (userId, playlistName) => {
  return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
    { method: 'POST',
      headers: { 
        'Authorization': `Bearer ${Spotify.getAccessToken().token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: playlistName,
        description: "A test playlist for CodeCademy course",
        public: false
      })
    })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      console.log('Playlist ID retrieved', jsonResponse.id);
      return jsonResponse.id
    });
};
Spotify.storePlaylistTracks = (playlistId, tracksToSave) => {
  return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, 
    { method: 'POST',
      headers: { 'Authorization': `Bearer ${Spotify.getAccessToken().token}` },
      body: JSON.stringify({ uris: tracksToSave })
    }).then(res => { if (res.ok) console.log('Tracks saved.') });
}

export default Spotify;
