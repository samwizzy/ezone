import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import SignatureCanvas from 'react-signature-canvas';
import { makeStyles, Button, DialogContent, DialogActions } from '@material-ui/core';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[50],
  },
  signatureArea: {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  sigImage: {
    backgroundSize: '200px 50px',
    width: '200px',
    height: '50px',
    backgroundColor: 'white',
  },
}));

const SignaturePad = props => {
  const classes = useStyles();

  const { updateUserProfileAction, signatureDialog, closeSignatureDialog } = props;
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
      <DialogContent dividers>
        <div className={classes.signatureArea}>
          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 365, height: 200 }}
            ref={ref => {
              sigPad = ref;
            }}
          />
        </div>
      
        {trimmedDataURL ? (
          <div className={classes.trimTa}>
            <img className={classes.sigImage} src={trimmedDataURL} alt="" />
            <br />
          </div>
        ) 
        : null
        }
      </DialogContent>
      
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          disabled={!save}
          onClick={() => saveAction()}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => clear()}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => trim()}
        >
          Trim
        </Button>
        <Button
          onClick={() => closeSignatureDialog()}
          color="primary"
          variant="outlined"
        >
          Cancel
        </Button>
      </DialogActions>
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
    closeSignatureDialog: () => dispatch(Actions.closeSignatureDialog()),
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
