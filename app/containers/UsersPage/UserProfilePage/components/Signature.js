import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import SignatureCanvas from 'react-signature-canvas';
import { makeStyles, Button, Avatar, Card, CardActionArea, CardMedia } from '@material-ui/core';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

const Signature = props => {
  const { currentUser } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={currentUser.signature}
            title={currentUser.firstName}
          />
        </CardActionArea>
      </Card>
      <Button
        variant="contained"
        color="primary"
        // onClick={() => save()}
        className={classes.resetButton}
      >
        Save
      </Button>
      <Button
        variant="contained"
        color="primary"
        // onClick={() => trim()}
        className={classes.resetButton}
      >
        Trim
      </Button>
    </React.Fragment>
  );
};

Signature.prototypes = {
  classes: PropTypes.object.isRequired,
  openNewEmployeeDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    openNewBranchDialogAction: () => dispatch(Actions.openNewEmployeeDialog()),
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
