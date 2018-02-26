import fetch from 'node-fetch';

const ACCESS_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = '491cff0fdaae435290715e1bda8512f0';
const CLIENT_SECRET = 'dbba48fa73754df49f6a912779fdcea3';
const BEARER = 'Bearer';
const BASE_URL = 'https://api.spotify.com/v1';

const authOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
    },
    body: 'grant_type=client_credentials'
};

const getOptions = (token) => {
    return {
        headers: {
            'Authorization': `${BEARER} ${token}`,
            'Accept': 'application/json'
        }
    }
};

const status = (response) => {
    
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
        console.log('error:: ', response);
      return Promise.reject(new Error(response.statusText))
    }
}

/**
 * class that give access to spotify api
 * 
 * @class SpotifyApi
 */
class SpotifyApi {
    constructor(token) {
        this.access_token = token || '';
    }

    setAccessToken(token) {
        this.access_token = token;
    }

    getAccessToken() {
        return fetch(ACCESS_TOKEN_URL, authOptions)
            .then(status)
            .then(res => res.json())
            .then((res) => {
                this.setAccessToken(res.access_token);
                return res.access_token;
            });
    }

    getAlbumsForArtists(artistId, offset, limit) {
        const options = getOptions(this.access_token);
        const url = `${BASE_URL}/artists/${artistId}/albums?offset=${offset}&limit=${limit}`;
        return fetch(url, options)
                .then(status)
                .then(res => res.json())
                .then((res) => {
                    return this.transformData(res);;
            });
    }


    getArtists(query) {
        const options = getOptions(this.access_token);
        const url = `${BASE_URL}/search?q=${query}&type=artist&market=US&limit=5&offset=0`;
        return fetch(url, options)
                .then(status)
                .then(res => res.json())
                .then((res) => {
                    return this.transformSearchData(res.artists.items);
            });

    }

    /**
     * transform search data
     * 
     * @param {any} data 
     * @returns array
     * 
     * @memberOf SpotifyApi
     */
    transformSearchData(data) {
        return data.map((ar) => {
            return {
                id: ar.id,
                name: ar.name
            }
        })
    }
    /**
     * Transforms album data
     * 
     * @param {any} data 
     * @returns array
     * 
     * @memberOf SpotifyApi
     */
    transformData(data) {
        const transformedData = {
            albums: [],
            next: data.next ? true : false,
            prev: data.previous ? true : false,
            offset: data.offset,
            total: data.total,
            limit: data.limit
        }

        const al = data.items.map((item) => {
            return {
                id: item.id,
                uri: item.uri,
                name: item.name,
                image_src: item.images && item.images[0].url || '',
                spotify_url: item.external_urls.spotify
            }
        })

        transformedData.albums = al;
        return transformedData;
    }

    

}

export default SpotifyApi;
