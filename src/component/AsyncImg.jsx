import React, { useState } from 'react'
import { CircularProgress } from '@material-ui/core';

export default function AsyncImg({ src, className }) {
    const [loaded, setLoaded] = useState(false);
    function onLoad() {
        setLoaded(true);
    }
    return (
        <div>
            <CircularProgress className={className} style={{ padding: '70px', display: loaded ? 'none' : 'inherit'}}/>
            <img className={className} src={src} alt="" style={{display: !loaded ? 'none' : 'inherit'}} onLoad={onLoad}/>
        </div>            
    )
}
