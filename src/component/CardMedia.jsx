import React from 'react';


export default function cardMediaComponent(type, src, mute = true, controls = false) {
    return type === 'video/mp4' ?
        ({ className }) => (<video poster={'assets/spinner-loop.gif'} autoPlay src={src} controls={controls} loop muted={mute} preload="none" className={className} />)
        : 'div'
}