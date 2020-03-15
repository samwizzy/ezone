import React, { memo, useEffect } from 'react';
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

  const { updateUserProfileAction, signatureDialog } = props;
  console.log(signatureDialog.data, 'come to pad');
  // console.log(signatureDialog.data.signature, 'come to pad');
  const [save, setSave] = React.useState(false);
  const [values, setValues] = React.useState({
    signature: '',
  });

  useEffect(() => {
    setValues({
      ...signatureDialog.data,
    });
  }, [signatureDialog.data]);

  const [trimmedDataURL, setTrimmedDataURL] = React.useState(null);
  let sigPad = {};
  const clear = () => {
    sigPad.clear();
  };
  const trim = () => {
    setTrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL('image/png'));
    setValues({
      ...values,
      signature: (signatureDialog.data.signature = sigPad
        .getTrimmedCanvas()
        .toDataURL('image/png')),
    });
    setSave(true);
  };

  const saveAction = () => {
    // setValues({...values, signature: signatureDialog.data.signature = sigPad
    //   .getTrimmedCanvas()
    //   .toDataURL('image/png')})
    updateUserProfileAction(values);
  };

  console.log(values, 'values outside');
  // const uploadSignature = () => {
  //   console.log(values, 'values outsidesignature');
  // };
  // const save = () => {
  //   if (signatureDialog && signatureDialog.data) {
  //     updateUserProfileAction(
  //       (signatureDialog.data.signature = sigPad
  //         .getTrimmedCanvas()
  //         .toDataURL('image/png')),
  //     );
  //   }
  // };

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
        disabled={!save}
        onClick={() => saveAction()}
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
  updateUserProfileAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    updateUserProfileAction: evt => dispatch(Actions.updateUserProfile(evt)),
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
