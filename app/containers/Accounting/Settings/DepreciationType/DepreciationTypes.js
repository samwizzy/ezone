import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Alert from '@material-ui/lab/Alert';
import {
  makeStyles,
  Button,
  IconButton,
  Card, CardHeader, CardContent, CardActions,
  Grid,
  Paper,
  Typography,
  Toolbar,
  Tooltip,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import moment from 'moment';
import _ from 'lodash';
import { methods } from './components/DepreciationTypeDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& .MuiCardHeader-root': {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    '& .MuiCardHeader-action': {
      margin: 0
    },
  },
  toolbar: {
    padding: theme.spacing(0, 2),
    borderBottom: `1px dotted ${theme.palette.divider}`
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1, 0),
    borderRadius: 0,
    boxShadow: theme.shadows[0]
  },
}));

const DepreciationTypes = props => {
  const classes = useStyles(props);
  const { history, match, depreciationTypes, openEditDepreciationTypeDialog } = props;

  const depreciatedType = depreciationTypes[0];

  if(!depreciatedType){
    return (
      <Card className={classes.root} elevation={0}>
        <CardContent>
          <Alert severity="info">
            <Typography variant="subtitle2">
              You currently have no depreciation type — try it out!
            </Typography>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        title="Depreciation Type Setup"
        action={
          <IconButton onClick={() => openEditDepreciationTypeDialog(depreciatedType)}>
            <EditIcon />
          </IconButton>
        }
      />

      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="subtitle2">Code</Typography>
              <Typography>{depreciatedType.code}</Typography>
            </Paper>

            <Paper className={classes.paper}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography>{depreciatedType.description}</Typography>
            </Paper>

            <Paper className={classes.paper}>
              <Typography variant="subtitle2">Minimum Depreciated value ( Residual value )</Typography>
              <Typography>{depreciatedType.depreciatedValue}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="subtitle2">Method</Typography>
              <Typography>{depreciatedType.method}</Typography>
            </Paper>

            <Paper className={classes.paper}>
              <Typography variant="subtitle2">Calculation Base</Typography>
              <Typography>{depreciatedType.calculationBase}</Typography>
            </Paper>
            <Paper className={classes.paper}>
              <Typography variant="subtitle2">Salvage value percentage</Typography>
              <Typography>{depreciatedType.percentageValue}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Toolbar variant="dense" className={classes.toolbar}>
              <Typography variant="button">Estimated Useful life</Typography>
            </Toolbar>
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="subtitle2">From</Typography>
              <Typography>{moment(depreciatedType.validFrom).format('lll')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="subtitle2">To</Typography>
              <Typography>{moment(depreciatedType.validTo).format('lll')}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = createStructuredSelector({
  depreciationTypes: Selectors.makeSelectDepreciationTypes(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewDepreciationTypeDialog: () => dispatch(Actions.openNewDepreciationTypeDialog()),
    openEditDepreciationTypeDialog: data => dispatch(Actions.openEditDepreciationTypeDialog(data)),
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
)(DepreciationTypes);
