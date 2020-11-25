import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouteMatch } from 'react-router-dom';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import { CircleLoader } from '../../../../components/LoadingIndicator';
import PayrunDetails from './PayrunDetails';
import PayrunSummary from './PayrunSummary';
import PayrunPayslip from './PayrunPayslip';

export function PayrunDetailsPage(props) {
  const { params, path } = useRouteMatch();
  const { loading, getPayrunById } = props;
  const { payrunId } = params

  useEffect(() => {
    if (payrunId) {
      getPayrunById(payrunId);
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Payrun Details</title>
        <meta name="description" content="Description of Payrun Details" />
      </Helmet>

      <Fragment>
        <Route exact path={path} component={PayrunDetails} />
        <Route exact path={`${path}/summary`} component={PayrunSummary} />
        <Route exact path={`${path}/payslip`} component={PayrunPayslip} />
      </Fragment>
    </div>
  );
}

PayrunDetailsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPayrunById: data => dispatch(Actions.getPayrunById(data)),
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
)(PayrunDetailsPage);
