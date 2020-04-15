import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import _ from 'lodash';
import {Button, Divider, Grid, DialogTitle, DialogContent } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1, 0)
      },
    },
}));

export const PictureUploadForm = props => {
    const {handleChange, handleDateChange, form} = props
    const classes = useStyles()

    return (
        <div>
            <DialogTitle id="alert-dialog-slide-title">
            Personal Information
            </DialogTitle>
            <Divider />   

            <DialogContent>
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
            </DialogContent>
        </div>
    )
}