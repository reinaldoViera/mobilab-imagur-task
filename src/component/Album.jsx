import React from 'react'
import AlbumImg from './AlbumImg';
import AlbumDetails from './AlbumDetails';
import { withStyles } from '@material-ui/core';
import ErrorCmp from './Error';
import Loading from './Loading';

const styles = () => ({
  status: {
    left: '40%',
    position: 'relative'
  },
  error: {
    textAlign: 'center'
  }
});

function Album({ images = [], ups, downs, score, title, error, loading, refreshAlbum, classes }) {
  return (
    <div>
      {
        images.length !== 0 ?
          <div>
            <AlbumDetails ups={ups} downs={downs} score={score} title={title} />
            {images.map((img) => (<AlbumImg key={img.id} {...img} />))}
          </div> :
          <div>
            <ErrorCmp className={classes.error} component="h1" error={error}>
              Error loading the Album, please try again
            </ErrorCmp>
            <Loading className={classes.status} onClick={refreshAlbum} loading={loading}>
              Refresh
            </Loading>
          </div>
      }

    </div>
  )
}

export default withStyles(styles)(Album)

