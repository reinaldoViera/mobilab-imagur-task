import React, { Component } from 'react'

export default class AsyncImg extends Component {
    state = {
        loaded: false
    }
    render() {
        const { src } = this.props;
        const { loaded } = this.state;
        return (
            loaded ? 
            <div style={{backgroundImage: 'assets/spinner-loop.gif'}}></div> :
            <div></div>
        )
    }
}
