import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
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
  const { loading, match, getJobOpeningDetails } = props;
  const { params, path } = match

  useEffect(() => {
    getJobOpeningDetails(params.recruitmentId);
  }, []);

  return (
    <div className={classes.root}>
      <Route path={path} component={JobOpeningDetails} />
      <Route path={`${path}/applicant`} component={ApplicantDetails} />

      <ApplicantDialog />
    </div>
  );
};

JobOpeningDetailsApp.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
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
