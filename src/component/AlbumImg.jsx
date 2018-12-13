import React from 'react'
import cardMedia from './CardMedia';
import { Grow, Card, CardActionArea, CardMedia, CardContent, Typography, withStyles } from '@material-ui/core';

const styles = {
    card: {
    },
    media: {
        height: 'auto',
        margin: 'auto',
        maxWidth: '100%',
    },
};

function AlbumImg(props) {
    const { classes, link, title, description = '', type } = props;
    return (
        <Grow
            in
            style={{ transformOrigin: '0 0 0' }}
            timeout={1000}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={link}
                        component={cardMedia(type, link, false, true)}
                        title={title ? title : ''}
                    />
                    <CardContent>
                        <Typography component="p">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grow>
    );
}

export default withStyles(styles)(AlbumImg);
