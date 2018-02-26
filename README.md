#   Features
1. Search based on artist name
2. Lazy loading the albums after scroll reaches bottom of page
3. Play an album by clicking on the Play button
4. Click on 'open on spotify' to open a album in spotify. 
5. I am not a good fan of Hoc. So, I used renderprops(GetPlayState) to rescue
6. I tweaked the webpack config to add SASS capability.

#   Challenges
1. Given url( https://api.spotify.com/v1/artists/0oSGxfWSnnOXhD2fKuz2Gy/albums) is not working. It turned out be all spotify api's require oAuth now.
2. So, I implemented oAuth(Client Credentials Flow) on server-side.
3. I created two services in node which accept few params to get albums as well as artist search results.

#   Project structure
1. I wrapped create-react-app with my server-side code. 
2. You will see client folder with all client files.
3. server code in server.mjs and spotify-api.mjs(root level)

    ## Components
    1. [AlbumList](https://github.com/venki227/explore-spotify-album/blob/master/client/src/components/AlbumList.js) - acts as a container
    2. [Album](https://github.com/venki227/explore-spotify-album/blob/master/client/src/components/Album.js) - dumb component that takes album prop and render the album tile
    3. [GetPlayState](https://github.com/venki227/explore-spotify-album/blob/master/client/src/components/GetPlayState.js) - a renderProps pattern to get the state of play
    4. [ArtistSearch](https://github.com/venki227/explore-spotify-album/blob/master/client/src/components/ArtistSearch.js) - Independent Typeahead component to get the artists by name

#   Requirements to run application locally
1. Install Yarn and Node > 9 (basically, one supports experimental features) globally

#   Installation
1. `cd explore-spotify-album`
2. `yarn`
3. `cd client/`
4. `yarn`
5. After completing above steps, go to root and run `yarn run dev`
6. go to http://localhost:3000 to view application

### Missing Features
1. Unit test
2. Custom Build




    

    