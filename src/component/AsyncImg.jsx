import React, { Component } from 'react'
import { CircularProgress } from '@material-ui/core';

export default class AsyncImg extends Component {
    state = {
        loaded: false
    }
    constructor(){
        super();
        this.onLoad = this.onLoad.bind(this);
    }
    onLoad(){
        this.setState({
            loaded: true
        })
    }
    render() {
        const { src, className } = this.props;
        const { loaded } = this.state;
        return (
            <div>
                <CircularProgress className={className} style={{ padding: '70px', display: loaded ? 'none' : 'inherit'}}/>
                <img className={className} src={src} alt="" style={{display: !loaded ? 'none' : 'inherit'}} onLoad={this.onLoad}/>
            </div>            
        )
    }
}
