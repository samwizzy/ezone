import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Selectors from '../../selectors';
import JobOpeningDetails from './JobOpeningDetails'
import ApplicantDetails from './ApplicantDetails'
import ApplicantDialog from './ApplicantDialog'
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey[50]
  }
}));

const JobOpeningDetailsApp = props => {
  const classes = useStyles();
  const { loading, match, getJobOpenings, jobOpenings, getJobOpeningDetails } = props;
  const { params } = match

  React.useEffect(() => {
    getJobOpeningDetails(params.status);
  }, []);

  return (
    <div className={classes.root}>
      {
        params.applicantId ?
          <ApplicantDetails /> : <JobOpeningDetails />
      }

      <ApplicantDialog />
    </div>
  );
};

JobOpeningDetailsApp.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  jobOpenings: Selectors.makeSelectJobOpenings(),
  //jobOpeningDetails : Selectors.makeSelectJobOpeningDetails(),
});

function mapDispatchToProps(dispatch) {
  return {
    getJobOpeningDetails: (id) => dispatch(Actions.getJobOpeningDetails(id)),
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
)(JobOpeningDetailsApp);