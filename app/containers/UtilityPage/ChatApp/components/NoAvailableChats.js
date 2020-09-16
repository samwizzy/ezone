import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Box,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ChatIcon from '../../../../images/chatIcon.svg';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    padding: theme.spacing(3),
    border: '1px solid #dcdcdc',
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(4),
    padding: theme.spacing(1, 10),
    borderRadius: '50px',
  }
}));

const NoAvailableChats = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid
        justify="center"
        alignItems="center"
        container
        className={classes.root}
      >
        <Grid item style={{ border: '1px solid #efefef', padding: '10px' }}>
          <Box my={2}>
            <img src={ChatIcon} title="ChatIcon" />
          </Box>
          <Typography variant="subtitle1" component="h1">
            You currently have no chat
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Start New Chat
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

NoAvailableChats.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NoAvailableChats);
