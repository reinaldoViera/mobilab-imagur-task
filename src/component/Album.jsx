import React from 'react'
import AlbumImg from './AlbumImg';
import AlbumDetails from './AlbumDetails';
import { Button, CircularProgress, Typography, withStyles } from '@material-ui/core';

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
            {
              error && <Typography className={classes.error} component="h1">
                Error loading the Album, please try again
                    </Typography>
            }
            {
              loading ? <CircularProgress className={classes.status} /> :
                <Button variant="contained" color="primary" className={classes.status} onClick={refreshAlbum}>
                  Refresh
                </Button>
            }
          </div>
      }

    </div>
  )
}

export default withStyles(styles)(Album)

