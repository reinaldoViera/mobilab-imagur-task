import React from 'react'
import { AppBar, Toolbar, Typography, withStyles, IconButton } from '@material-ui/core';
import { withRouter } from "react-router";
import ArrowBack from '@material-ui/icons/ArrowBack';

const title = (path) => {
    switch (path) {
        case '/':
            return 'Gallery';
        default:
            return 'Album';
    }
}

const styles = (theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
});

export function MyAppBar({ classes, location, history }) {

    return (
        <div>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    {
                        location.pathname !== '/' &&
                        <IconButton onClick={() => history.goBack()} color="inherit" aria-label="Menu">
                            <ArrowBack />
                        </IconButton>
                    }
                    <Typography variant="h6" color="inherit">
                        {title(location.pathname)}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withStyles(styles)(withRouter(MyAppBar));
