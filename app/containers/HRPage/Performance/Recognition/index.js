import React, { useEffect, memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as AppSelectors from '../../../App/selectors';
// import * as AppActions from '../../../App/actions';
import * as Actions from './../actions';
// import * as Selectors from './../selectors';
import RecognitionList from './RecognitionList';
// import RecognitionDetails from './Recognition'
import RecognitionDialog from './components/RecognitionDialog';

export function RecognitionPage(props) {
  const { getRecognitions, match } = props;
  const { params } = match

  useEffect(() => {
    getRecognitions();
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Recognition Page</title>
        <meta name="description" content="ezone application recognition page" />
      </Helmet>

      <RecognitionList />

      <RecognitionDialog />
    </Fragment>
  );
}

RecognitionPage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  token: AppSelectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getRecognitions: () => dispatch(Actions.getRecognitions()),
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
)(RecognitionPage);
