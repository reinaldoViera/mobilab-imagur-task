import React from 'react'
import Grid from '@material-ui/core/Grid';
import GalleryCard from './GalleryCard';
import { CircularProgress, withStyles, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const imageAdapter = ({ link, images = [], title, description, type }) => {
    let imgUrl, desc, imgTitle, ctype;
    if (images.length) {
        imgUrl = images[0].link;
        desc = images[0].description;
        ctype = images[0].type;
    } else {
        imgUrl = link;
        desc = description;
        ctype = type;
    }
    imgTitle = title;
    return {
        imgUrl,
        imgTitle,
        type: ctype,
        desc
    }
}

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
                <Grid container spacing={24}>
                    {
                        galleries.map((gallery, index) => (
                            <Grid key={index} item xs={12} sm={6} lg={3} xl={2} md={4}>
                                <GalleryCard onClick={goToAlbum} {...imageAdapter(gallery)} id={gallery.id} />
                            </Grid>
                        ))
                    }
                </Grid>
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