import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import BenefitList from './BenefitListing';
import BenefitDetails from './BenefitDetails';
import BenefitDialog from './BenefitDialog';
import * as Actions from './../actions';
import * as Selectors from './../selectors';

export function BenefitPage(props) {
  const { loading, match } = props;
  const { path } = match

  useEffect(() => { }, []);

  return (
    <div>
      <Helmet>
        <title>Benefit</title>
        <meta name="description" content="Description of Benefit" />
      </Helmet>

      <Fragment>
        <Route exact path={path} component={BenefitList} />
        <Route path={`${path}/edit/:benefitId`} component={BenefitList} />
        <Route path={`${path}/view/:benefitId`} component={BenefitDetails} />
      </Fragment>

      <BenefitDialog />
    </div>
  );
}

BenefitPage.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {}
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(BenefitPage);
