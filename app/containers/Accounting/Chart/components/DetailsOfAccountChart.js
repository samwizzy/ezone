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
} from '@material-ui/core';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import AddIcon from '@material-ui/icons/Add';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
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
      right: "-60px",
      width: 0,
      height: 0,
      borderTop: "60px solid #6DCC4C",
      borderRight: "60px solid transparent"
    },
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0, 
      right: "-60px",
      width: 0,
      height: 0,
      borderBottom: "60px solid #6DCC4C",
      borderRight: "60px solid transparent"
    }
  },
  paper: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.grey[100],
  },
  grid: {
    justifyContent: "space-between",
    '& .MuiGrid-item': {
      flex: 1,
      margin: theme.spacing(2, 0),
    }
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
      // border: "none !important",
      fontSize: theme.typography.fontSize + 2,
      '& button:nth-child(n+2)': {
        marginLeft: theme.spacing(1),
      },
    },
    '& th.MuiTableCell-root': {
        fontWeight: theme.typography.fontWeightBold
    }
  },
  iconPaper: {
    padding: theme.spacing(1),
    textAlign: "right"
  }
}));

const DetailsOfAccountChart = props => {
  const classes = useStyles();

  const {
    history
  } = props;

  const handleBack = () => {
    history.goBack();
  }

  console.log("Selected journal data ", props.location.chartDetailsData);
  

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6} className={classNames(classes.gridMargin)}>
          <Paper square className={classes.iconPaper}>
            <div>
              <IconButton
                onClick={handleBack}
              >
                <Icon>add</Icon> Back
              </IconButton>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6} className={classNames(classes.gridMargin)}>
          <Paper square className={classes.iconPaper}>
            <div>
              <IconButton><Icon>add</Icon></IconButton>
              <IconButton><Icon>person</Icon></IconButton>
              <IconButton><Icon>edit</Icon></IconButton>
              <IconButton><Icon>cloud_download</Icon></IconButton>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classNames(classes.gridMargin)}>
          <Paper square>
            <div className={classes.flex}>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell component="th">Account Name</TableCell>
                    <TableCell align="left">
                      {props.location.chartDetailsData.accountName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Account Code</TableCell>
                    <TableCell align="left">
                      { props.location.chartDetailsData.accountCode }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Account Type</TableCell>
                    <TableCell align="left">
                      { props.location.chartDetailsData.accountType }
                    </TableCell>
                  </TableRow>

                  { props.location.chartDetailsData.accountType === "Bank" ? (
                    <TableBody>
                      <TableRow>
                        <TableCell component="th">Account Number</TableCell>
                        <TableCell align="left">
                          { props.location.chartDetailsData.accountNumber }
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th">Bank Balance</TableCell>
                        <TableCell align="left">
                          { props.location.chartDetailsData.bankBalance }
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : null}

                  <TableRow>
                    <TableCell component="th">Description</TableCell>
                    <TableCell align="left">
                      { props.location.chartDetailsData.description }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Date Created</TableCell>
                    <TableCell align="left">
                      { moment(props.location.chartDetailsData.dateCreated).format('dddd do-MMM-YYYY') }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Closing Balance</TableCell>
                    <TableCell align="left">
                      { props.location.chartDetailsData.openingBalance }
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Paper>
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
