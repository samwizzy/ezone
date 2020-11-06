import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import DeductionList from './DeductionListing';
import DeductionDetails from './DeductionDetails';
import DeductionDialog from './DeductionDialog';
import * as Actions from './../actions';
import * as Selectors from './../selectors';

export function DeductionPage(props) {
  const { loading, match } = props;
  const { path } = match

  useEffect(() => { }, []);

  return (
    <div>
      <Helmet>
        <title>Deduction</title>
        <meta name="description" content="Description of Deduction" />
      </Helmet>

      <Fragment>
        <Route exact path={path} component={DeductionList} />
        <Route path={`${path}/edit/:deductionId`} component={DeductionList} />
        <Route path={`${path}/view/:deductionId`} component={DeductionDetails} />
      </Fragment>

      <DeductionDialog />
    </div>
  );
}

DeductionPage.propTypes = {
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
)(DeductionPage);
