import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
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
  const { params } = match
  console.log(jobOpenings, "Job openings")

  console.log(params, "param recruitment")

  React.useEffect(() => {
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Employee Page</title>
        <meta name="description" content="ezone application employee page" />
      </Helmet>

      <ModuleLayout>
      {
        params.status === 'new'?
        <AddRecruitment /> :
        params.status? <JobOpeningDetails /> : <JobOpenings/>
        /*
        <AddRecruitment /> : <RecruitmentList />
        */
      }
      </ModuleLayout>
    </React.Fragment>
  );
};

RecruitmentApp.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  jobOpenings : Selectors.makeSelectJobOpenings(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(RecruitmentApp);