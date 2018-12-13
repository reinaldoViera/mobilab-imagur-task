import React from 'react';
import { Typography } from '@material-ui/core';

export default function Error({ error, children, className }) {
    if (!error)
        return (<div></div>);
    return (
        <Typography className={className} component="h1">
            {
                children
            }
        </Typography>
    )
}