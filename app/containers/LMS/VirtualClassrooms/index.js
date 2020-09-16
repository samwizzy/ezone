/**
 *
 * Companies
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectClassrooms from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import VirtualClassRoomsList from './components/VirtualClassRoomsList';
import AddClassroom from './components/AddClassroom';
import ModuleLayout from '../components/ModuleLayout';

const key = "lmsClassrooms";

export function VirtualClassRoomApp(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { getClassrooms, match } = props;
  const { path } = match

  console.log(match, "match index")

  useEffect(() => {
    getClassrooms();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Virtual Classrooms</title>
        <meta name="description" content="Description of LMS Virtual Classrooms" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={VirtualClassRoomsList} />
        <Route path={`${path}/new`} component={AddClassroom} />
      </ModuleLayout>
    </div>
  );
}

VirtualClassRoomApp.propTypes = {
  getClassrooms: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  lmsClassrooms: makeSelectClassrooms(),
});

function mapDispatchToProps(dispatch) {
  return {
    getClassrooms: () => dispatch(Actions.getClassrooms()),
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
)(VirtualClassRoomApp);
