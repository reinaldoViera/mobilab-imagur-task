import React from 'react';
import AsyncImg from './AsyncImg';


export default function cardMediaComponent(type, src, mute = true, controls = false) {
    return type === 'video/mp4' ?
        ({ className }) => (<video poster={'assets/spinner-loop.gif'} autoPlay src={src} controls={controls} loop muted={mute} preload="none" className={className} style={{width: '100%', maxHeight: '80vh'}}/>)
        : ({ className }) => (<AsyncImg src={src} className={className}/>)
}