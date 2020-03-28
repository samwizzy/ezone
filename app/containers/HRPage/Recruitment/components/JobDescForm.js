import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import _ from 'lodash';
import {AppBar, Box, Button, Container, Divider, Grid, MenuItem, TextField, Toolbar, Typography, CardContent, CardActions, DialogContent, DialogActions, Paper } from '@material-ui/core';

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
        fontSize: 16,
    },
}));

export const JobDescForm = props => {
    const {handleChange, form} = props
    const classes = useStyles()

    const canSubmitForm = () => {
        const {firstname, lastname, phoneNumber, email, nickname } = form
        return firstname.length > 0 && lastname.length > 0 && phoneNumber.length > 0 && email.length > 0
    }

    return (
        <Paper square>
        <AppBar position='relative'>
          <Toolbar>
            <Typography variant="h6">Job Description</Typography>
          </Toolbar>
        </AppBar>

        <Container>
        <Box p={3} className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField
                    name="jobTitle"
                    label="Job Title"
                    id="outlined-title"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={form.jobTitle}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="outlined-multiline-desc"
                    name="jobDesc"
                    label="Job Description"
                    multiline
                    fullWidth
                    rows="4"
                    rowsMax="4"
                    value={form.jobDesc}
                    onChange={handleChange}
                    variant="outlined"
                    />
                </Grid>
            </Grid>
        </Box>
        </Container>

        </Paper>
    )
}