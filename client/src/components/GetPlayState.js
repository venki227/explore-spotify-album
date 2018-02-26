
import React, {Component} from 'react';

class GetPlayState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            played: false,
        }
        this.onPlay = this.onPlay.bind(this);
    }


    onPlay() {
        this.setState({
            played: true
        })
    }

    render() {
        return (
            <div>
                {this.props.children(this.state, this.onPlay)}
            </div>
        );
    }
}

export default GetPlayState; 