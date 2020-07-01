import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Breadcrumbs, Box, Button, Divider, IconButton, Link, List, ListItem, ListItemText, ListItemAvatar, Table, TableRow, TableCell, TableBody, Grid, Paper, Typography, Toolbar, Stepper, Step, StepLabel } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import classNames from 'classnames'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../../App/selectors';
import RecognitionItem from './recognitions/RecognitionItem'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(4, 6),
    margin: theme.spacing(1, 0)
  },
  toolbar: theme.mixins.toolbar,
}));

const menus = [
  { id: 1, title: "Basic Information" },
  { id: 2, title: "CV" },
  { id: 3, title: "Interview" },
  { id: 4, title: "History" },
]

const RecognitionList = props => {
  const classes = useStyles();
  const { loading, openNewRecognitionDialog, recognitions } = props;

  console.log(recognitions, "recognitions")

  React.useEffect(() => {
  }, []);

  if (!recognitions) {
    return ''
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static" color="inherit" elevation={1}>
            <Toolbar variant="dense">
              <Typography variant="h6" className={classes.title}>
                Recognition
              </Typography>
              <Button variant="contained" color="primary" onClick={openNewRecognitionDialog}>Add Recognition</Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item md={12}>
          {recognitions && recognitions.map((recognition, i) =>
            <RecognitionItem key={i} recognition={recognition} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

RecognitionList.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  recognitions: Selectors.makeSelectRecognitions(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewRecognitionDialog: () => dispatch(Actions.openNewRecognitionDialog())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(RecognitionList);
