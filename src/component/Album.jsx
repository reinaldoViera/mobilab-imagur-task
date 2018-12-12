import React from 'react'
import AlbumImg from './AlbumImg';
import AlbumDetails from './AlbumDetails';

export default function Album({ images = [], ups, downs, score, title }) {
  return (
    <div>
        <AlbumDetails ups={ups} downs={downs} score={score} title={title}/>
      {
          images.length !== 0 && 
          images.map((img) => (<AlbumImg key={img.id} {...img}/>))
      }
    </div>
  )
}
