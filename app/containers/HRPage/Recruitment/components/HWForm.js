import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx';
import _ from 'lodash';
import { AppBar, Box, Button, Card, Container, Divider, FormGroup, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Checkbox, MenuItem, TextField, Toolbar, Typography, CardActions, Paper } from '@material-ui/core';

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

function handleCheck(e, x) {
    this.setState(state => ({
        checkedValues: state.checkedValues.includes(x)
            ? state.checkedValues.filter(c => c !== x)
            : [...state.checkedValues, x]
    }), () => {
        console.log(this.state.checkedValues);
    });
}

// Inspired by blueprintjs
function StyledRadio(props) {
    const classes = useStyles();

    return (
        <Checkbox
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
    const { handleChange, handleStepChange, form } = props
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const [steps, setSteps] = React.useState('')

    const canSubmitForm = () => {
        const { hiringSteps } = form
        return hiringSteps.length > 0
    }

    const addNewForm = () => setOpen(!open)

    return (
        <Card>
            <AppBar position='relative'>
                <Toolbar>
                    <Typography variant="h6">Hiring Steps</Typography>
                </Toolbar>
            </AppBar>

            <Container>
                <Box p={3} className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={addNewForm}>
                                Add
                            </Button>
                        </Grid>
                        <Grid item xs={12}>

                            {open &&
                                <React.Fragment>
                                    <FormLabel component="legend">Add a new hiring step</FormLabel>
                                    <TextField
                                        name="steps"
                                        label="Hiring step"
                                        id="outlined-name"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        size="small"
                                        value={steps}
                                        onChange={handleChange}
                                    />
                                </React.Fragment>
                            }

                            <FormLabel component="legend">Hiring Steps(In the order you want them applied)</FormLabel>
                            <FormGroup defaultValue="screening" aria-label="hiringSteps" onClick={handleStepChange}>
                                <FormControlLabel name="hiringSteps" value="screening" control={<StyledRadio />} label="Screening" />
                                <FormControlLabel name="hiringSteps" value="faceTime" control={<StyledRadio />} label="Face-to-Face Interview" />
                                <FormControlLabel name="hiringSteps" value="phone" control={<StyledRadio />} label="Phone Interview" />
                                <FormControlLabel name="hiringSteps" value="offer" control={<StyledRadio />} label="Make an Offer" />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Card>
    )
}