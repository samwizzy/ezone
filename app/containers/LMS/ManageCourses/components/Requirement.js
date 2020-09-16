import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import clsx from 'clsx';
import {
  Button,
  Card, CardContent, CardActions,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    "& .MuiCardActions-root": {
      justifyContent: 'flex-end'
    }
  },
  iconButton: {
    backgroundColor: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
    color: '#fff',
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  danger: { marginLeft: theme.spacing(1), color: 'red', backgroundColor: 'inherit' }
}));

export const Requirement = props => {
  const {
    form,
    handleChange,
    handleCourseChange,
    handleSelectChange,
    handleTabChange,
    addRequirement,
    removeRequirement
  } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify="center">
          <Grid item xs={6}>
            {form.courseDetails.map((req, i) =>
              <Toolbar key={i} variant="dense">
                {req.type === 'REQUIREMENT' &&
                  <Fragment>
                    <TextField
                      name="details"
                      label="Requirement"
                      id={`outlined-requirement-${i}`}
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={req.details}
                      onChange={handleCourseChange(i)}
                    />

                    <IconButton className={classes.iconButton} onClick={addRequirement}><AddIcon /></IconButton>
                    <IconButton className={classes.danger} onClick={removeRequirement(i)}><CloseOutlinedIcon /></IconButton>
                  </Fragment>
                }
              </Toolbar>
            )}

          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          onClick={event => handleTabChange(event, 'overview')}
          color="primary"
          variant="contained"
          endIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <Button
          onClick={event => handleTabChange(event, 'what-you-learn')}
          color="primary"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
      </CardActions>
    </Card>
  );
};
