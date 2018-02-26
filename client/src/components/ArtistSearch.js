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

    handleInput(e) {
        const input = e.target.value;
        this.setState({
            searchInput: input
        })
        this.getSearchDetails(input);
    }

    selected(artist) {
        this.setState({
            selectedArtists: artist,
            searchInput: artist.name,
            artists: []
        }, () => {
            this.props.onArtistSeleted(this.state.selectedArtists);
        })
    }

    status(response){
    
        if (response.status === 200) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(new Error(response.statusText))
        }
    }

    getSearchDetails(query) {
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
    }

    render() {
        return (
            <div>
                <div className="search-wrapper">
                    <input text="text" value={this.state.searchInput} className="search-input" onChange={this.handleInput}/>
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