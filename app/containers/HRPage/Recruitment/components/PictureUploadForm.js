import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import _ from 'lodash';
import {Button, Divider, Grid, CardContent, CardActions, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1, 0)
      },
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
}));

export const PictureUploadForm = props => {
    const {handleChange, form} = props
    const classes = useStyles()

    return (
        <div>
            <CardContent>
                <Typography className={classes.title} component="p" color="textSecondary" gutterBottom>
                Basic Information
                </Typography>
                
                <Divider />
                <form className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Button
                            variant="outlined"
                            component="label"
                            >
                            Upload File
                            <input
                                name="attachments"
                                type="file"
                                style={{ display: "none" }}
                                // onChange={handleImageChange}
                                multiple
                            />
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </div>
    )
}