import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Button,
  Icon,
  IconButton,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Toolbar,
  Divider,
} from '@material-ui/core';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import AddIcon from '@material-ui/icons/Add';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
  flex: {
    position: "relative",
    padding: theme.spacing(8, 5)
  },
  status: {
    textAlign: "center",
    padding: theme.spacing(2, 5),
    position: "absolute",
    backgroundColor: '#6DCC4C',
    color: theme.palette.common.white,
    top: 0, left: 0,
    "&::after": {
      content: "''",
      position: "absolute",
      top: 0, 
      right: "-52.67px",
      width: 0,
      height: 0,
      borderTop: "52.67px solid #6DCC4C",
      borderRight: "52.67px solid transparent"
    },
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0, 
      right: "-52.67px",
      width: 0,
      height: 0,
      borderBottom: "52.67px solid #6DCC4C",
      borderRight: "52.67px solid transparent"
    }
  },
  paper: {
    padding:'15px',
    backgroundColor: theme.palette.grey[200],
  },
  grid: {
    justifyContent: "space-between",
    '& .MuiGrid-item': {
      flex: 1,
      margin: theme.spacing(2, 0),
    }
  },
  padme:{
  padding:'15px'
  },
  closingBalance:{
  padding:'25px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  },
  gridMargin: { marginBottom: theme.spacing(2) },
  label: { marginLeft: theme.spacing(1) },
  table: {
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        color: theme.palette.common.white,
      },
      '& .MuiTableCell-root:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTableCell-root:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
    '& .MuiTableFooter-root': {},
    '& .MuiTableCell-root': {
      border: "none !important",
      fontSize: theme.typography.fontSize,
      '& button:nth-child(n+2)': {
        marginLeft: theme.spacing(1),
      },
    },
    '& th.MuiTableCell-root': {
        fontWeight: theme.typography.fontWeightBold
    }
  },
  title: { flexGrow: 1 },
  iconPaper: {
    boxShadow: theme.shadows[1]
  }
}));

const DetailsOfAccountChart = props => {
  const classes = useStyles();

  const {history} = props;

  const handleBack = () => {
    history.goBack();
  }

  console.log("Selected journal data ", props.location.chartDetailsData);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
      <Grid item xs={12} className={classNames(classes.gridMargin)}>
          <Toolbar className={classes.iconPaper} variant="dense">
            <Typography>
              <IconButton onClick={handleBack}>
                <KeyboardBackspaceIcon />
              </IconButton> Back
            </Typography>
            <Typography className={classes.title} />
            <IconButton><Icon>add</Icon></IconButton>
            <IconButton><Icon>person</Icon></IconButton>
            <IconButton><Icon>edit</Icon></IconButton>
            <IconButton><Icon>cloud_download</Icon></IconButton>
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.padme} elevation={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                  <Typography variant="body1" gutterBottom>
                   Account Name
                  </Typography>
                  </Grid>
                  <Grid item xs={4}>
                  <Typography variant="body1" gutterBottom>
                  {props.location.chartDetailsData.accountName}
                  </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                  <Typography variant="body1" gutterBottom>
                   Account Code
                  </Typography>
                  </Grid>
                  <Grid item xs={4}>
                  <Typography variant="body1" gutterBottom>
                  {props.location.chartDetailsData.accountCode}
                  </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                  <Typography variant="body2" gutterBottom>
                   Account Type
                  </Typography>
                  </Grid>
                  <Grid item xs={4}>
                  <Typography variant="body2" gutterBottom>
                  {props.location.chartDetailsData.accountType}
                  </Typography>
                  </Grid>
                </Grid>
              </Grid>
              { props.location.chartDetailsData.accountType === "Bank" ? (
               <Grid item xs={12}> 
               <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                  <Typography variant="body2" gutterBottom>
                   Bank Name
                  </Typography>
                  </Grid>
                  <Grid item xs={4}>
                  <Typography variant="body2" gutterBottom>
                  {props.location.chartDetailsData.bankName}
                  </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                <Typography variant="body2" gutterBottom>
                 Account Number
                </Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography variant="body2" gutterBottom>
                {props.location.chartDetailsData.accountNumber}
                </Typography>
                </Grid>
              </Grid>
            </Grid>
            </Grid>
            </Grid>
              ):null}

              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                  <Typography color="textSecondary" variant="body2" display="block" gutterBottom>
                   Description
                  </Typography>
                  </Grid>
                  <Grid item xs={8}>
                  <Typography color="textSecondary" variant="body2" display="block" gutterBottom>
                  {props.location.chartDetailsData.description}
                  </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                  <Typography variant="body2" display="block" gutterBottom>
                   Transaction Period
                  </Typography>
                  </Grid>
                  <Grid item xs={8}>
                  <Typography variant="body2" display="block" gutterBottom>
                  { moment(props.location.chartDetailsData.dateCreated).format('LL') }
                  </Typography>
                 
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.closingBalance}>
          <Grid container spacing={3}>
                  <Grid item xs={4}>
                  <Typography variant="h6" display="block" gutterBottom>
                   Closing Balance
                  </Typography>
                  </Grid>
                  <Grid item xs={8}>
                  <Typography variant="h5" display="block" gutterBottom>
                  NGN {props.location.chartDetailsData.accountType === "Bank"?
                  props.location.chartDetailsData.bankBalance:
                   props.location.chartDetailsData.openingBalance}
                  </Typography>
                  </Grid>
                </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.transactions}>
           <Grid container spacing={3}>
             <Grid item xs={12}>
               <div style={{textAlign:'center'}}>
               <Typography variant="h6" gutterBottom>
                Transactions
                </Typography>
               </div>
             </Grid>
             <Grid item xs={12}>
               <div>
               <Paper elevation={2} className={classes.paper}>
               <Grid container spacing={3}>
                <Grid item xs={2}>
                <Typography variant="body1" display="block" gutterBottom>
                   Trs Date
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                <Typography  variant="body1" display="block" gutterBottom>
                   Created at
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                <Typography variant="body1" display="block" gutterBottom>
                   Ref no
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                <Typography variant="body1" display="block" gutterBottom>
                   Debit
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                <Typography variant="body1" display="block" gutterBottom>
                   Credit
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                <Typography variant="body1" display="block" gutterBottom>
                   Balance
                  </Typography>
                </Grid>
               </Grid>
               </Paper>
               </div>

               <div>
                 <Paper elevation={1}>
                 <Grid container spacing={3}>
                <Grid item xs={2}>
                <Typography variant="body1" display="block" gutterBottom>
                
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                <Typography variant="body1" display="block" gutterBottom>
                { moment(props.location.chartDetailsData.dateCreated).format('LL') }
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                <Typography variant="body1" display="block" gutterBottom>
                   09089
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                <Typography variant="body1" display="block" gutterBottom>
                   $2000
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                    <Typography variant="body1" display="block" gutterBottom>
                   $1200
                  </Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography variant="body1" display="block" gutterBottom>
                   $30000
                  </Typography>
                    </Grid>
                  </Grid>
               
                </Grid>
                <Grid item xs={2}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                    <Typography variant="body1" display="block" gutterBottom>
                   $1000
                  </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={8}>
                        <Typography variant="body1" display="block" gutterBottom>
                        $200000
                      </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography variant="body1" display="block" gutterBottom>
                          Total
                      </Typography>
                        </Grid>
                      </Grid>
                    
                    </Grid>
                  </Grid>
                </Grid>
               </Grid>
                 </Paper>
               </div>
               <div>
                 <Divider />
               </div>

               <div>
                
               </div>
               
             </Grid>
           </Grid>
          </div>
        </Grid>
      </Grid>
  </div>
  );
};

DetailsOfAccountChart.propTypes = {};

const mapStateToProps = createStructuredSelector({
  //   loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DetailsOfAccountChart);
