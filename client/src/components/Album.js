import React from 'react';
import GetPlayState from './GetPlayState';

const Album = (props) => {
    const {album} = props;
    return (
        <div className="album">
            <div className="details-container">
                <div className="overlay"></div>
                <img src={album.image_src} alt={album.name}/>
                <div className="details">
                    <h2 className="name">{album.name}</h2>
                    <a className="open-link" href={album.spotify_url} target="_blank">Open in Spotify</a>
                </div>
            </div>
            <GetPlayState >
                {
                    (playState, onPlay) => (
                        <div className="player-wrapper">
                            {
                                !playState.played ? <button className="play" onClick={onPlay}>Play</button> : <iframe className="player" 
                                    src={`https://open.spotify.com/embed?uri=${album.uri}`}
                                    frameBorder="0" 
                                    height="80" 
                                    allow="encrypted-media" 
                                    allowtransparency="true" 
                                    title={album.name}>
                                </iframe>
                            }
                            
                        </div>
                    )
                }
                
            </GetPlayState>
        </div>
    )
};

export default Album;