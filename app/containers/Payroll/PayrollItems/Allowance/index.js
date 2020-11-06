import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AllowanceList from './AllowanceListing';
import AllowanceDetails from './AllowanceDetails';
import AllowanceDialog from './AllowanceDialog';
import * as Actions from './../actions';
import * as Selectors from './../selectors';

export function AllowancePage(props) {
  const { loading, match } = props;
  const { path } = match

  useEffect(() => { }, []);

  return (
    <div>
      <Helmet>
        <title>Allowance</title>
        <meta name="description" content="Description of Allowance" />
      </Helmet>

      <Fragment>
        <Route exact path={path} component={AllowanceList} />
        {/* <Route path={`${path}/edit/:allowanceId`} component={AllowanceList} />
        <Route path={`${path}/view/:allowanceId`} component={AllowanceDetails} /> */}
      </Fragment>

      <AllowanceDialog />
    </div>
  );
}

AllowancePage.propTypes = {
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
)(AllowancePage);
