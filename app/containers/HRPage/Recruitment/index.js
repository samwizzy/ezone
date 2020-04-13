import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Selectors from '../selectors';
import AddRecruitment from './components/AddRecruitment'
import RecruitmentList from './RecruitmentList'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.white
  }
}));

const RecruitmentApp = props => {
  const classes = useStyles();
  const { loading, match } = props;
  const { params } = match

  console.log(params, "param recruitment")

  React.useEffect(() => {
  }, []);

  return (
    <div className={classes.root}>
      {
        params.status === 'new'?
        <AddRecruitment /> : <RecruitmentList />
      }
    </div>
  );
};

RecruitmentApp.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(
  compose(
    withConnect,
    memo,
)(RecruitmentApp));
