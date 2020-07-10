/**
 *
 * Crm
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCrm from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import messages from '../messages';
import ActivitiesList from './ActivitiesList';
import AddActivityDialog from './components/AddActivityDialog'
import ModuleLayout from '../components/ModuleLayout';

export function Activities(props) {
  useInjectReducer({ key: 'crmActivities', reducer });
  useInjectSaga({ key: 'crmActivities', saga });

  const { getAllCrmActivities } = props;

  useEffect(() => {
    getAllCrmActivities();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Crm - Activities</title>
        <meta name="description" content="Description of Crm Activities" />
      </Helmet>

      <ModuleLayout>
        <ActivitiesList />
      </ModuleLayout>

      <AddActivityDialog />
    </div>
  );
}

Activities.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getAllCrmActivities: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  crmActivities: makeSelectCrm(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllCrmActivities: () => dispatch(Actions.getAllCrmActivities()),
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
)(Activities);
