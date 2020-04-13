import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  TextField
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import AppIcon1 from '../../../images/app-2.svg';
import AcctIcon from '../../../images/acctIcon.svg';
import StoreIcon from '../../../images/storeIcon.svg';
import CRMIcon from '../../../images/crmIcon.svg';
import ChatBox from './../ChatApp/ChatBox';
import Calendar from './Calendar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  paper: {
    display: 'flex',
    padding: theme.spacing(3),
    borderRadius: '10px',
    backgroundColor: '#F8F8F8'
  },
  button: {
    padding: theme.spacing(1, 4),
    background: theme.palette.primary.main,
    borderRadius: '20px'
  },
  grid: {
    flexGrow: 1,
    padding: theme.spacing(3),
    border: '1px solid #dcdcdc'
  },
  textField: {
    width: theme.spacing(50),
    padding: theme.spacing(0),
    borderRadius: '20px'
  },
  box: {
    margin: theme.spacing(1),
    width: theme.spacing(20),
    height: theme.spacing(20),
    borderRadius: '10px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '& img': {
      height: '70px'
    }
  }
}));

const TopSection = props => {
  const classes = useStyles();
  // const { } = props; 
  
  return (
    <React.Fragment>
        <div>
          <Grid
            justify="space-between"
            container
            className={classes.grid}
          >

            <Grid item xs={12} style={{border: '1px dotted #f8f8f8'}}>
              <Grid container className={classes.grid}>
                <Grid item sm={12} xs={12}>
                  <TextField
                    className={classes.textField}
                    id="outlined-search" 
                    label="Search Apps"
                    type="search" 
                    variant="outlined" 
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container justify="space-between" className={classes.grid}>
                <Grid item sm={6}>
                  <Typography variant="h6" component="h3">My Apps</Typography>
                </Grid>
                <Grid item sm={6} style={{textAlign: 'right'}}>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Request App Access
                  </Button>
                </Grid>
              </Grid>  
              <Grid container justify="space-between">
                <Grid item sm={12} xs={12}>
                  <Paper className={classes.paper} elevation={1}>
                    <Paper className={classes.box}>
                      <img src={AcctIcon} />
                      <Typography variant='body2'>Accounting</Typography>
                    </Paper>
                    <Paper className={classes.box}>
                      <img src={AppIcon1} />
                        <Typography variant='body2'>Human Resources</Typography>
                    </Paper>
                    <Paper className={classes.box}>
                      <img src={StoreIcon} />
                      <Typography variant='body2'>Store & Inventory Management</Typography>
                    </Paper>
                    <Paper className={classes.box}>
                      <img src={CRMIcon} />
                      <Typography variant='body2'>CRM</Typography>
                    </Paper>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
              {/* <Calendar /> */}
              <ChatBox />
            </Grid>

          </Grid>
        </div>
    </React.Fragment>
  );
};

TopSection.propTypes = {
  // openEditCompanyDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    // openEditCompanyDialog: evt => dispatch(Actions.openEditCompanyDialog(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TopSection);
