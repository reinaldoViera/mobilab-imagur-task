import React from 'react'
import { Card, CardActions, Button, withStyles, CardContent, Typography } from '@material-ui/core';
import ArrowUpwardRounded from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRounded from '@material-ui/icons/ArrowDownwardRounded';

const styles = {
    card: {
    },
    button: {
    },
};

function AlbumDetails(props) {
    const { classes, ups, downs, score, title } = props;
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
            </CardContent>
            <CardActions>
                <Button className={classes.button}>
                    {ups}
                    <ArrowUpwardRounded />
                </Button>
                <Button className={classes.button}>
                    {downs}
                    <ArrowDownwardRounded />
                </Button>
                <Button className={classes.button}>
                    Score: {score}
                </Button>
            </CardActions>
        </Card>
    )
}
export default withStyles(styles)(AlbumDetails);

