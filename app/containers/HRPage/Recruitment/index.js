import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter, Route } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Selectors from '../selectors';
import ModuleLayout from './ModuleLayout'
import AddRecruitment from './components/AddRecruitment'
import RecruitmentList from './RecruitmentList'
import JobOpenings from './JobOpenings'
import JobOpeningDetails from './JobOpeningDetails/'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey[50]
  }
}));

const RecruitmentApp = props => {
  const classes = useStyles();
  const { loading, match, getJobOpenings, jobOpenings, } = props;
  const { path } = match
  console.log(jobOpenings, "Job openings")

  return (
    <React.Fragment>
      <Helmet>
        <title>Recruitment</title>
        <meta name="description" content="ezone application recruitment" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={JobOpenings} />
        <Route path={`${path}/new`} component={AddRecruitment} />
        <Route path={`${path}/view/:recruitmentId`} component={JobOpeningDetails} />
      </ModuleLayout>
    </React.Fragment>
  );
};

RecruitmentApp.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  jobOpenings: Selectors.makeSelectJobOpenings(),
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
)(RecruitmentApp);
