import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import SignatureCanvas from 'react-signature-canvas';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import * as Actions from '../../actions';

const Signature = props => {
  const { classes, openNewEmployeeDialogAction } = props;

  const [trimmedDataURL, setTrimmedDataURL] = React.useState(null);
  let sigPad = {};
  const clear = () => {
    sigPad.clear();
  };
  const trim = () => {
    setTrimmedDataURL({
      trimmedDataURL: sigPad.getTrimmedCanvas().toDataURL('image/png'),
    });
  };

  console.log(sigPad, 'sigPad');
  return (
    <React.Fragment>
      <div className>
      <SignatureCanvas
        penColor="green"
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
        ref={ref => {
          sigPad = ref;
        }}
      />
      </div>
      <div>
        <button onClick={() => clear()}>Clear</button>
        <button onClick={() => trim()}>Trim</button>
        {/* {trimmedDataURL ? <img src={trimmedDataURL} /> : null} */}
      </div>
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
