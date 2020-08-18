import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Grid, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ClassroomImage from '../../../../images/classroomImage.svg'
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    height: '100vh',
  },
  button: {
    borderRadius: '20px',
    margin: theme.spacing(5, 0),
    padding: theme.spacing(1.2, 15),
  }
}));

const NoVirtualClassRoom = ({ history, match }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container justify='center' alignItems='center' className={classes.root}>
        <Grid item>
          <Box my={4}>
            <img src={ClassroomImage} />
          </Box>
          <Box>
            <Typography variant='h6'>Get started on your first Virtual classroom</Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(`${match.url}/new`)}
              className={classes.button}
              disableElevation
            >
              Start classroom
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

NoVirtualClassRoom.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(NoVirtualClassRoom);
