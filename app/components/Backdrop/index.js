/**
 *
 * EmailConfig
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Backdrop, CircularProgress } from '@material-ui/core'
import reducer from './reducer';
import * as Selectors from './selectors';
import saga from './saga';
import * as Actions from './actions';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

export function BackDrop(props) {
  useInjectReducer({ key: 'backdrop', reducer });
  useInjectSaga({ key: 'backdrop', saga });
  const classes = useStyles()
  const { loading } = props

  console.log(loading, "backdrop")

  return (
    <div>
      <Backdrop className={classes.root} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

BackDrop.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(BackDrop);
