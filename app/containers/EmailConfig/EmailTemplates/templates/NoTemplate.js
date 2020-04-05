import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import MoreVertRounded from '@material-ui/icons/MoreVertRounded'
import tasksIcon from '../../../../images/tasksIcon.svg'
import * as Actions from '../../actions';
import * as Selectors from './../../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    borderRadius: '20px',
    margin: theme.spacing(5, 0),
    padding: theme.spacing(1, 15),
  },
  grid: {
    justifyContent:'center',
    alignItems:'center',
    textAlign: 'center',
    height: '100vh',
  }

}));

const NoTemplate = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item>
          <Card>
            <CardContent>
              <Box my={4}>
                <img src={tasksIcon} />
              </Box>
              <Box>
                <Typography variant='h6'>No Templates yet</Typography>

                <Button onClick={() => {}} variant="contained" color="primary" className={classes.button} disableElevation>
                  Add template
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

NoTemplate.propTypes = {
  loading: PropTypes.bool,
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

export default compose(
  withConnect,
  memo,
)(NoTemplate);
