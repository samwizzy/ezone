/*
 * HRPage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Selectors from './../selectors';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Actions from './../actions';
import makeSelectHRPage from './../selectors';
import reducer from './../reducer';
import saga from './../saga';
import ModuleLayout from './ModuleLayout'
import AnnouncementList from './AnnouncementList';
import AddAnnouncementDialog from './components/AddAnnouncementDialog';
import AnnouncementViewDialog from './components/AnnouncementViewDialog';

const key = 'hrPage';

export const AnnouncementPage = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { loading } = props;

  return (
    <React.Fragment>
      <Helmet>
        <title>Announcement Page</title>
        <meta name="description" content="ezone application announcement page" />
      </Helmet>

      <ModuleLayout>
        <AnnouncementList />
      </ModuleLayout>

      <AnnouncementViewDialog />
      <AddAnnouncementDialog />

    </React.Fragment>
  );
}

AnnouncementPage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  hrPage: makeSelectHRPage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    openNewAnnouncementDialog: () => dispatch(Actions.openNewAnnouncementDialog()),
    openAnnouncementViewDialog: (data) => dispatch(Actions.openAnnouncementViewDialog(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AnnouncementPage);
