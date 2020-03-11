import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import SignatureCanvas from 'react-signature-canvas';
import { makeStyles, Button } from '@material-ui/core';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'gray',
  },
  sigContainer: {
    width: '100%',
    height: '50%',
    border: '2px solid gray',
    backgroundColor: '#fff',
  },
  resetButton: {
    margin: theme.spacing(2, 1),
  },
  sigImage: {
    backgroundSize: '200px 50px',
    width: '200px',
    height: '50px',
    backgroundColor: 'white',
  },
  trimTab: {
    margin: theme.spacing(1, 1),
  },
}));

const SignaturePad = props => {
  const classes = useStyles();

  const [trimmedDataURL, setTrimmedDataURL] = React.useState(null);
  let sigPad = {};
  const clear = () => {
    sigPad.clear();
  };
  const trim = () => {
    setTrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL('image/png'));
  };

  const save = () =>
    console.log(sigPad.getTrimmedCanvas().toDataURL('image/png'), 'console');

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.sigContainer}>
          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 365, height: 200, className: 'sigCanvas' }}
            ref={ref => {
              sigPad = ref;
            }}
          />
        </div>
      </div>
      {trimmedDataURL ? (
        <div className={classes.trimTab}>
          <img className={classes.sigImage} src={trimmedDataURL} alt="" />
          <br />
        </div>
      ) : null}
      <Button
        variant="contained"
        color="primary"
        onClick={() => save()}
        className={classes.resetButton}
      >
        Save
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => clear()}
        className={classes.resetButton}
      >
        Clear
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => trim()}
        className={classes.resetButton}
      >
        Trim
      </Button>
    </React.Fragment>
  );
};

SignaturePad.prototypes = {
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
)(SignaturePad);