import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import ProjectsList from './ProjectsList';
import ModuleLayout from '../components/ModuleLayout';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const AccessOffersApp = props => {
  const classes = useStyles();
  const { modulesByAccessOffers, paymentGateways } = props;

  console.log(paymentGateways, "paymentGateways");

  return (
    <ModuleLayout>
      <ProjectsList modules={modulesByAccessOffers} />
    </ModuleLayout>
  );
};

AccessOffersApp.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  modulesByAccessOffers: Selectors.makeSelectModulesByAccessOffers(),
  paymentGateways: Selectors.makeSelectPaymentGateways(),
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
)(AccessOffersApp);
