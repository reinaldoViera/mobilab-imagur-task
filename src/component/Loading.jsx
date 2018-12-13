import React from 'react'
import { CircularProgress, Button } from '@material-ui/core';

export default function Loading({ loading, className, children, onClick }) {
    if (loading)
        return (
            <CircularProgress className={className} />
        );
    return (
        <Button variant="contained" color="primary" className={className} onClick={onClick}>
            {children}
        </Button>
    )
}
