import React, {Component} from 'react';
import Album from './Album';
import ArtistSearch from './ArtistSearch';

class AlbumList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            next: false,
            prev: false,
            total: 0,
            offset: 0,
            limit: 0,
            loading: false,
            selectedArtist: {
                id:'1mYsTxnqsietFxj1OgoGbG',
                name:'A.R. Rahman'
            }
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.onArtistSeleted = this.onArtistSeleted.bind(this);
    }

    /**
     * Register scroll event to calculate scroll to bottom 
     * 
     * @memberOf AlbumList
     */
    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    /**
     * Unregister scroll after component removed from DOM
     * 
     * 
     * @memberOf AlbumList
     */
    componentWillUnMount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    /**
     * Get's a album list by takig initial selected artists data
     * 
     * @memberOf AlbumList
     */
    componentDidMount() {
        const {selectedArtist} = this.state;
        if(selectedArtist && selectedArtist.id) {
            this.getAlbumsForNewArtists(selectedArtist.id);
        }   
    }

    /**
     * Set's the selected artists on clicking on item in typeahead
     * 
     * @param {any} artist 
     * 
     * @memberOf AlbumList
     */
    onArtistSeleted(artist) {
        this.setState({
          selectedArtist: artist
        }, () => {
            this.getAlbumsForNewArtists(this.state.selectedArtist.id);
        })
    }

    /**
     * Gets the new album list based on user selection on typeahead
     * 
     * @param {any} id 
     * 
     * @memberOf AlbumList
     */
    getAlbumsForNewArtists(id) {
        this.setState({
            albums: []
        }, () => {
            fetch(`api/artists/${id}/albums`)
                .then(this.status)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        ...res,
                        albums: [...res.albums],
                    })
                }).catch(err => {
                    console.log('Something went wrong', err);
                });
        })
        
    }

    /**
     * Utitliy to handle fetch response
     * 
     * @param {any} response 
     * @returns 
     * 
     * @memberOf AlbumList
     */
    status(response) {
        if (response.status === 200) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(new Error(response.statusText))
        }
    }

    /**
     * Used to get the albums based on the scroll
     * 
     * @param {any} offset 
     * 
     * @memberOf AlbumList
     */
    getAlbums(offset) {
        const {selectedArtist} = this.state;
        this.setState({
            loading: true
        })
        fetch(`api/artists/${selectedArtist.id}/albums?offset=${offset}`)
        .then(this.status)
        .then(res => res.json())
        .then(res => {
            this.setState({
                ...res,
                albums: [...this.state.albums, ...res.albums],
                loading: false
            })
        }).catch(err => {
            this.setState({
                albums: []
            })
        });
    }

    /**
     * Utitility to calculate scroll when it reaches the bottom of the page
     * 
     * 
     * @memberOf AlbumList
     */
    handleScroll() {
        if(this.scroller) {
            const heightOfContent = this.scroller.offsetHeight;
            const yOffset = window.pageYOffset;
            const wholeY = yOffset + window.innerHeight;
            if(wholeY >= heightOfContent) {
                this.lazyLoad();
            }
        }

    }

    /**
     * Function that checks for end of the list per artist
     * 
     * 
     * @memberOf AlbumList
     */
    lazyLoad() {
        if(!this.state.loading && this.state.next) {
            const offset = this.state.offset + this.state.limit;
            this.getAlbums(offset);
        }
    }

    /**
     * 
     * 
     * @returns album list elements
     * 
     * @memberOf AlbumList
     */
    renderAlbum() {
        return (
            <div className="album-list" 
                 ref={(scroller) => this.scroller = scroller}>
                {
                    this.state.albums.map((al, i) => <Album album={al} key={al.id + i}/>)
                }
            </div>
        )
    }

    /**
     * 
     * 
     * @returns Loader elements
     * 
     * @memberOf AlbumList
     */
    renderLoader() {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
            
        )
    }

    render() {
        return (
            <div className="album-container">
                <ArtistSearch selectedArtist= {this.state.selectedArtist} onArtistSeleted={this.onArtistSeleted.bind(this)}/>
                {this.state.albums.length === 0 ? this.renderLoader() : this.renderAlbum()}
            </div>
            
        )
    }
}


export default AlbumList;