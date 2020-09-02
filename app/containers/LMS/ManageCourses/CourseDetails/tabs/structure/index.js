import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash'
import * as Actions from '../../../actions';
import * as Selectors from '../../../selectors';
import * as AppSelectors from '../../../../../App/selectors';
import AssignmentDialog from './components/AssignmentDialog';
import LectureDialog from './components/LectureDialog';
import AddCourseVideoDialog from './components/AddCourseVideoDialog';
import SectionsList from './SectionsList';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const StructurePage = props => {
  const classes = useStyles();
  const { loading, history } = props;

  return (
    <Fragment>
      <SectionsList />

      <LectureDialog />
      <AssignmentDialog />
      <AddCourseVideoDialog />
    </Fragment>
  );
};

StructurePage.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
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
)(StructurePage);
