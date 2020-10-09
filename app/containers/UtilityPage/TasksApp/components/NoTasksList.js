import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Grid, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import tasksIcon from '../../../../images/tasksIcon.svg'
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    // height: '100vh',
  },
  button: {
    borderRadius: '20px',
    margin: theme.spacing(5, 0),
    padding: theme.spacing(1, 15),
  }
}));

const NoTasksList = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container justify='center' alignItems='center' className={classes.root}>
        <Grid item>
          <Box my={4}>
            <img src={tasksIcon} />
          </Box>
          <Box>
            <Typography variant='h6'>No task yet</Typography>

            <Button variant="contained" color="primary" onClick={props.openNewTaskDialog} className={classes.button} disableElevation>
              Create a new task
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

NoTasksList.propTypes = {
  loading: PropTypes.bool,
  openNewTaskDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewTaskDialog: () => dispatch(Actions.openNewTaskDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NoTasksList);
