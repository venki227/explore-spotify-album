import React, {Component} from 'react';
import Album from './Album';

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
        };
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnMount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentDidMount() {
        const {selectedArtist} = this.props;
        if(selectedArtist && selectedArtist.id) {
            this.getAlbumsForNewArtists(selectedArtist.id);
        }   
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps) {
            const {selectedArtist} = nextProps;
            this.getAlbumsForNewArtists(selectedArtist.id);
        }
    }

    getAlbumsForNewArtists(id) {
        this.setState({
            albums: []
        }, () => {
            fetch(`api/artists/${id}/albums`)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        ...res,
                        albums: [...res.albums],
                    })
                });
        })
        
    }

    status(response) {
    
        if (response.status === 200) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(new Error(response.statusText))
        }
    }

    getAlbums(offset) {
        const {selectedArtist} = this.props;
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

    lazyLoad() {
        if(!this.state.loading && this.state.next) {
            const offset = this.state.offset + this.state.limit;
            this.getAlbums(offset);
        }
    }

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

    renderLoader() {
        return (
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
            
        )
    }

    render() {
        return (
            this.state.albums.length === 0 ? this.renderLoader() : this.renderAlbum()
        )
    }
}


export default AlbumList;