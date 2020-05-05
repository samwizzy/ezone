import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx';
import _ from 'lodash';
import {AppBar, Box, Button, Card, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Checkbox, MenuItem, TextField, Toolbar, Typography, CardActions, Paper } from '@material-ui/core';

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

function handleCheck(e,x) {
    this.setState(state => ({
    checkedValues: state.checkedValues.includes(x)
        ? state.checkedValues.filter(c => c !== x)
        : [...state.checkedValues, x]
    }), ()=>{
        console.log(this.state.checkedValues);
    });
}

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
    const {handleChange, handleDateChange, handleStepChange, form } = props
    const classes = useStyles()

    const canSubmitForm = () => {
        const {hiringSteps } = form
        return hiringSteps.length > 0 
    }

    return (
        <Card>
        <AppBar position='relative'>
          <Toolbar>
            <Typography variant="h6" gutterBottom>Hiring Steps</Typography>
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
                    
                        <FormLabel component="legend">Hiring Steps(Comma separated)</FormLabel>
                        <TextField
                            name="steps"
                            label="eg. Screening, Face to face, Offer"
                            id="outlined-name"
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={form.steps}
                            onChange={handleChange}
                        />
                        {/*
                        <RadioGroup defaultValue="screening" aria-label="hiringSteps" name="hiringSteps[]">
                            <FormControlLabel value="screening" control={<StyledRadio />} label="Screening" />
                            <FormControlLabel value="faceTime" control={<StyledRadio />} label="Face-to-Face Interview" />
                            <FormControlLabel value="phone" control={<StyledRadio />} label="Phone Interview" />
                            <FormControlLabel value="offer" control={<StyledRadio />} label="Make an Offer" />
                        </RadioGroup>
                        */}
                        {/*
                        <Checkbox
                            value="Screening"
                            name="hiringSteps[]"
                            class="stepsCheckbox"
                            label="Screening"
                            inputProps={{ 'aria-label': 'Screening', 'title': 'Screening' }}
                            onChange={e => this.handleCheck(e,"Screening")}
                            checked={this.state.checkedValues.includes("Screening")}
                            />
                        <Checkbox
                            value="Face to face"
                            name="hiringSteps[]"
                            class="stepsCheckbox"
                            label="Face to face"
                            inputProps={{ 'aria-label': 'Face to face', 'title': 'Face to face' }}
                            onChange={e => this.handleCheck(e,"Face to face")}
                            checked={this.state.checkedValues.includes("Face to face")}
                            />
                        <Checkbox
                            value="Offer"
                            name="hiringSteps[]"
                            class="stepsCheckbox"
                            label="Offer"
                            inputProps={{ 'aria-label': 'Offer', 'title': 'Offer' }}
                            onChange={e => this.handleCheck(e,"Offer")}
                            checked={this.state.checkedValues.includes("Offer")}
                            />
                        */}

                </Grid>
            </Grid>
        </Box>
        </Container>
        </Card>
    )
}