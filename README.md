#   Features
    1. Search based on artist name
    2. Lazy loading the albums after scroll reaches bottom of page
    3. Play an album by clicking on the Play button
    4. Click on 'open on spotify' to open a album in spotify.

#   Challenges
    1. Given url( https://api.spotify.com/v1/artists/0oSGxfWSnnOXhD2fKuz2Gy/albums) is not working. It turned out be all spotify api's require oAuth now.
    2. So, I implemented oAuth(Client Credentials Flow) on server-side.
    3. I created two services in node which accept few params to get albums as well as artist search results.

#   Project structure
    1. I wrapped create-react-app with my server-side code. 
    2. You will see client folder with all client files.
    3. server code in server.mjs and spotify-api.mjs(root level)

#   Requirements to run application locally
    1. Install Yarn and Node > 9 (basically, one supports experimental features) globally

#   Installation
    1. cd explore-spotify-album
    2. yarn
    3. cd client/
    4. yarn
    5. After completing above steps, go to root and run `yarn run dev`
    6. go to http://localhost:3000 to view application

    

    