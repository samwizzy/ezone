import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import EarningList from './EarningListing';
import EarningDetails from './EarningDetails';
import EarningDialog from './EarningDialog';
import * as Actions from './../actions';
import * as Selectors from './../selectors';

export function EarningPage(props) {
  const { loading, match } = props;
  const { path } = match

  useEffect(() => { }, []);

  return (
    <div>
      <Helmet>
        <title>Earning</title>
        <meta name="description" content="Description of Earning" />
      </Helmet>

      <Fragment>
        <Route exact path={path} component={EarningList} />
        <Route path={`${path}/edit/:earningId`} component={EarningList} />
        <Route path={`${path}/view/:earningId`} component={EarningDetails} />
      </Fragment>

      <EarningDialog />
    </div>
  );
}

EarningPage.propTypes = {
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
)(EarningPage);
