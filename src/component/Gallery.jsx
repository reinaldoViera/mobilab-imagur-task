import React from 'react'
import PropTypes from 'prop-types';
import GalleryMasonry from './GalleryMasonry';
import { withStyles, Fab, Tooltip } from '@material-ui/core';
import ArrowUpwardRounded from '@material-ui/icons/ArrowUpwardRounded';
import ErrorCmp from './Error';
import Loading from './Loading';


const styles = (theme) => ({
    status: {
        left: '40%',
        position: 'relative'
    },
    fab: {
        margin: theme.spacing.unit,
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
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
                <Tooltip title="Scroll top" aria-label="Add" placement="top">
                    <Fab color="primary" aria-label="Add" className={classes.fab} onClick={() => window.scrollTo(0, 0)}>
                        <ArrowUpwardRounded />
                    </Fab>
                </Tooltip>
                <ErrorCmp className={classes.error} error={error && !galleries.length}>
                    Error loading the gallery, please try again
                </ErrorCmp>
                <Loading className={classes.status} onClick={() => loadMore(nextPage)} loading={loading}>
                    {
                        galleries.length ? 'Load more' : 'Refresh'
                    }
                </Loading>
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