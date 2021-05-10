import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import PaymentDetails from './PaymentDetails';
import ModuleLayout from '../components/ModuleLayout';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const PaymentSummary = props => {
  const classes = useStyles();
  const { loading, modulesByAccessOffers, paymentGateways, regModsDetails } = props;

  console.log(paymentGateways, "paymentGateways");
  console.log(regModsDetails, "regModsDetails");

  return (
    <ModuleLayout>
      <PaymentDetails paymentDetails={regModsDetails} paymentGateways={paymentGateways} />
    </ModuleLayout>
  );
};

PaymentSummary.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  modulesByAccessOffers: Selectors.makeSelectModulesByAccessOffers(),
  paymentGateways: Selectors.makeSelectPaymentGateways(),
  regModsDetails: Selectors.makeSelectRegModsDetails(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(PaymentSummary);
