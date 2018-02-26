import React, {Component} from 'react';

class ArtistSearch extends Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.selected = this.selected.bind(this);
        const {selectedArtist} = this.props;
        this.state = {
            artists: [],
            selectedArtists: selectedArtist,
            searchInput: selectedArtist.name
        }
    }

    /**
     * Handles user inputs
     * 
     * @param {any} event
     * 
     * @memberOf ArtistSearch
     */
    handleInput(e) {
        const input = e.target.value;
        this.setState({
            searchInput: input
        })

        this.getSearchDetails(input);
    }

    /**
     * Utitliy to debounce anhy function for a given time
     * 
     * @param {any} fn 
     * @param {any} time 
     * @returns 
     * 
     * @memberOf ArtistSearch
     */
    debounce(fn, time) {
        let timer;
        return (...args) =>  {
            const context = this;
            if(timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                timer = null;
                fn.apply(context, args);
            }, time);
            
        }
    }

    /**
     * Event that handles the artist selection
     * 
     * @param {any} artist 
     * 
     * @memberOf ArtistSearch
     */
    selected(artist) {
        this.setState({
            selectedArtists: artist,
            searchInput: artist.name,
            artists: []
        }, () => {
            this.props.onArtistSeleted(this.state.selectedArtists);
        })
    }

    /**
     * Utility to handle fetch responses
     * 
     * @param {any} response 
     * @returns 
     * 
     * @memberOf ArtistSearch
     */
    status(response){
    
        if (response.status === 200) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(new Error(response.statusText))
        }
    }

    /**
     * Fetches the artists data based on user entered data 
     * 
     * @param {any} query 
     * 
     * @memberOf ArtistSearch
     */
    getSearchDetails = this.debounce((query) => {
        const url = `/api/artists?query=${query}`;
        fetch(url)
            .then(this.status)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    artists: res
                })
            }).catch(err => {
                this.setState({
                    artists: []
                })
            })
    },300);

    render() {
        return (
            <div className="search-wrapper">
                <div className="input-wrapper">
                    <input text="text" placeholder="Search By Artist Name" value={this.state.searchInput} className="search-input" onChange={this.handleInput}/>
                    <div className="flyout-wrapper">
                        <ul className="flyout">
                            {this.state.artists.map((artist, i) => (
                                <li key={i} className="item" onClick={() => this.selected(artist)}>{artist.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default ArtistSearch;