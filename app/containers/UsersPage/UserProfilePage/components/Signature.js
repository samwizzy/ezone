/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    margin: 40,
  },
  actionButton: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Signature = props => {
  const { currentUser, dispatchOpenSignatureDialogAction } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={currentUser.signature} />
        </CardActionArea>
      </Card>
      <br />
      <div className={classes.actionButton}>
        <IconButton
          aria-label="edit"
          onClick={() => dispatchOpenSignatureDialogAction(currentUser)}
        >
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
    </React.Fragment>
  );
};

Signature.prototypes = {
  classes: PropTypes.object.isRequired,
  openNewEmployeeDialogAction: PropTypes.func,
  currentUser: PropTypes.object,
  dispatchOpenSignatureDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatchOpenSignatureDialogAction: evt =>
      dispatch(Actions.openSignatureDialog(evt)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Signature);
