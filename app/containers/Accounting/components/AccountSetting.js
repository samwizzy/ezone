import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import {
  makeStyles,
  Paper,
  Grid,
} from '@material-ui/core';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
// import LoadingIndicator from '../../../components/LoadingIndicator';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

const AccountSetting = props => {
  const classes = useStyles();

  const {} = props;

//   if (loading) {
//     return <LoadingIndicator />;
//   }

  return (
    <React.Fragment>
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <h2>Welcome to E-Zone Accounting</h2>
                <h4>Setup your Accounting structure</h4>
                </Grid>
                
                
                <Grid item xs={3}>
                {/* <Paper className={classes.paper}>xs=3</Paper> */}
                </Grid>
                <Grid item xs={6}>
                {/* <Paper className={classes.paper}>xs=3</Paper> */}
                <h2>New Journal</h2>
                </Grid>
                <Grid item xs={6}>
                {/* <Paper className={classes.paper}>xs=3</Paper> */}
                <h2>New Journal</h2>
                </Grid>
                <Grid item xs={3}>
                {/* <Paper className={classes.paper}>xs=3</Paper> */}
                </Grid>
            </Grid>
        </div>
    </React.Fragment>
  );
};

AccountSetting.propTypes = {
//   loading: PropTypes.bool,
//   openNewAccountDialogAction: PropTypes.func,
//   editOpenAccountDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
//   loading: Selectors.makeSelectLoading(),
//   accountTypeData: Selectors.makeSelectAccountTypeData(),
//   chartOfAccountData: Selectors.makeSelectGetChartOfAccountData(),
});

function mapDispatchToProps(dispatch) {
  return {
    // openNewAccountDialogAction: () => dispatch(Actions.openNewAccountDialog()),
    // editOpenAccountDialogAction: evt => dispatch(Actions.editOpenAccountDialog(evt)),
    // deleteChartOfAccountAction: evt => dispatch(Actions.deleteChartOfAccountAction(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AccountSetting);
