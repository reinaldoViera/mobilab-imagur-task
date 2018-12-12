import React from 'react'
import { CircularProgress, withStyles, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import GalleryMasonry from './GalleryMasonry';


const styles = () => ({
    status: {
        left: '40%',
        position: 'relative'
    },
    error: {
        textAlign: 'center'
    }
});

function Gallery({ galleries = [], loadMore, nextPage = 0, loading, classes, error, goToAlbum }) {
    return (
        <div>
            {
                galleries.length > 0 &&
                <GalleryMasonry galleries={galleries} onCardClick={goToAlbum}/>
            }

            <div>
                {
                    error && !galleries.length && <Typography className={classes.error} component="h1">
                        Error loading the gallery, please try again
                    </Typography>
                }
                {
                    loading ? <CircularProgress className={classes.status} /> :
                        <Button variant="contained" color="primary" className={classes.status}  onClick={() => loadMore(nextPage)}>
                            {
                                galleries.length ? 'Load more' : 'Refresh'
                            }
                        </Button>
                }
            </div>


        </div>
    )
}
Gallery.contextTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
}

export default withStyles(styles)(Gallery)