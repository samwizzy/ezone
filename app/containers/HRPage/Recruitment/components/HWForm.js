import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx';
import _ from 'lodash';
import {AppBar, Box, Button, Card, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, MenuItem, TextField, Toolbar, Typography, CardActions, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1, 0)
        },
    },
    radio: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
}));

// Inspired by blueprintjs
function StyledRadio(props) {
    const classes = useStyles();
  
    return (
      <Radio
        className={classes.radio}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }

export const HiringWorkFlowForm = props => {
    const {handleChange, handleDateChange, form } = props
    const classes = useStyles()

    const canSubmitForm = () => {
        const {maritalStatus, gender, address } = form
        return maritalStatus.length > 0 && gender.length > 0 && address.length > 0
    }

    return (
        <Card>
        <AppBar position='relative'>
          <Toolbar>
            <Typography variant="h6" gutterBottom>Job Information</Typography>
          </Toolbar>
        </AppBar>

        <Container>
        <Box p={3} className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button onClick={()=>{}} color="secondary">
                        Add
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Hiring WorkFlow</FormLabel>
                        <RadioGroup defaultValue="screening" aria-label="gender" name="customized-radios">
                            <FormControlLabel value="screening" control={<StyledRadio />} label="Screening" />
                            <FormControlLabel value="faceTime" control={<StyledRadio />} label="Face-to-Face Interview" />
                            <FormControlLabel value="phone" control={<StyledRadio />} label="Phone Interview" />
                            <FormControlLabel value="offer" control={<StyledRadio />} label="Make an Offer" />
                            <FormControlLabel value="other" control={<StyledRadio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
        </Container>

        {/* <CardActions>
            <Button onClick={handleBack} color="primary">
                Back
            </Button>
            <Button onClick={handleNext} disabled={canSubmitForm()} color="primary">
                Next
            </Button>
        </CardActions> */}
        </Card>
    )
}