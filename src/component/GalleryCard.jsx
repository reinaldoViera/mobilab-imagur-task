import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import cardMedia from './CardMedia';

const styles = {
    card: {
    },
    emptyPaper: {
        width: '100%',
        height: '30vw'
    },
    media: {
        //objectFit: 'cover',
        width: '100%',
        backgroundColor: 'black',
        height: '30vw'
    },
};

function MediaCard(props) {
    const { classes, imgUrl, imgTitle = '', desc = '', onClick, type, id } = props;
    const description = () => desc ? desc.length > 150 ? desc.slice(0, 150) + ' ...' : desc : '';
    return (
        <div>
            <Card className={classes.card} onClick={() => onClick(id)}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={imgUrl}
                        component={cardMedia(type, imgUrl)}
                        title={imgTitle}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {imgTitle}
                        </Typography>
                        <Typography component="p">
                            {description()}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>

    );
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
    imgUrl: PropTypes.string.isRequired,
    imgTitle: PropTypes.string,
    desc: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(MediaCard);