import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import ModuleLayout from './ModuleLayout'
import AnnouncementList from './AnnouncementList';
import AddAnnouncementDialog from './components/AddAnnouncementDialog';
import AnnouncementViewDialog from './components/AnnouncementViewDialog';
import ConfirmDeleteAnnouncementDialog from './components/ConfirmDeleteAnnouncementDialog';

export const AnnouncementPage = props => {
  const { loading } = props;

  return (
    <div>
      <Helmet>
        <title>Announcement</title>
        <meta name="description" content="ezone application announcement page" />
      </Helmet>

      <ModuleLayout>
        <AnnouncementList />
      </ModuleLayout>

      <AnnouncementViewDialog />
      <AddAnnouncementDialog />
      <ConfirmDeleteAnnouncementDialog />
    </div>
  );
}

AnnouncementPage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

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
  withRouter,
  withConnect,
  memo,
)(AnnouncementPage);
