import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import _ from 'lodash';
import {AppBar, Box, Button, Container, Divider, FormControl, InputLabel, Input, Grid, MenuItem, TextField, Toolbar, Typography, CardContent, CardActions, Paper } from '@material-ui/core';

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

export const BasicInfoForm = props => {
    const {handleChange, handleSubmit, form} = props
    const classes = useStyles()

    const canSubmitForm = () => {
        const {jobDescription, bio } = form
        return jobDescription.length > 0 && bio.length > 0
    }

    return (
        <Paper>
        <AppBar position='relative'>
          <Toolbar>
            <Typography variant="h6" gutterBottom>Basic Information</Typography>
          </Toolbar>
        </AppBar>

        <Container>
        <Box p={3} className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <TextField
                    name="name"
                    label="Name"
                    id="outlined-name"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={form.name}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    name="email"
                    label="Email"
                    id="outlined-email"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={form.email}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="outlined">
                    <TextField
                    id="outlined-cv"
                    name="cv"
                    type="file"
                    label="Upload CV"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    value={form.cv}
                    onChange={handleChange}
                    variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="outlined">
                    <TextField
                    id="outlined-cover-letter"
                    name="coverLetter"
                    type="file"
                    label="Cover Letter"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    value={form.coverLetter}
                    onChange={handleChange}
                    variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    name="mobile"
                    label="Mobile"
                    id="outlined-mobile"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={form.mobile}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    id="gender"
                    name="gender"
                    placeholder="Select gender"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Gender"
                    value={form.gender}
                    onChange={handleChange}
                    >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {['male', 'female'].map((sex, i) => 
                    <MenuItem key={i} value={sex}>
                      {sex}
                    </MenuItem>
                    )}
                    </TextField>
                </Grid>
            </Grid>
        </Box>
        </Container>
        </Paper>
    )
}