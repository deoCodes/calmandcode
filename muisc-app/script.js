const clientId = '478159bff10f475c991f1c712ef0bb73';
const clientSecret = 'Y239eb0dca8444cd2ac6e54bb21a71e25';

async function getAccessToken() {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`)
    },
    body: 'grant_type=client_credentials'
  });

  const data = await result.json();
  return data.access_token;
}

async function fetchPlaylists(token) {
  const res = await fetch('https://api.spotify.com/v1/browse/featured-playlists?limit=8', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  const data = await res.json();
  return data.playlists.items;
}

function renderPlaylists(playlists) {
  const container = document.getElementById('playlist-container');
  container.innerHTML = '';

  playlists.forEach(playlist => {
    const div = document.createElement('div');
    div.className = 'playlist';
    div.innerHTML = `
      <a href="${playlist.external_urls.spotify}" target="_blank">
        <img src="${playlist.images[0].url}" alt="${playlist.name}" />
        <h3>${playlist.name}</h3>
      </a>
    `;
    container.appendChild(div);
  });
}

(async () => {
  try {
    const token = await getAccessToken();
    const playlists = await fetchPlaylists(token);
    renderPlaylists(playlists);
  } catch (err) {
    console.error('Something went wrong:', err);
    document.getElementById('playlist-container').innerHTML = "<p>Oops! Couldn't load playlists.</p>";
  }
})();

async function getAccessToken() {
  const result = await fetch('http://localhost:3000/token');
  const data = await result.json();
  return data.access_token;
}

