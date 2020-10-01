import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Box,
  Button,
  Icon,
  IconButton,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TableFooter,
  Toolbar,
} from '@material-ui/core';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(3),
  },
  flex: {
    position: "relative",
    padding: theme.spacing(8, 2)
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
      borderTop: "52.67px solid #6DCC4C", //52.67
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
  title: { flexGrow: 1 },
  table: {
    display: "flex",
    "& td, & th": {
      border: "0 !important"
    },
    "& td": {
      color: theme.palette.text.secondary
    }
  },
  datatable: {
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
      fontSize: theme.typography.fontSize,
      '& button:nth-child(n+2)': {
        marginLeft: theme.spacing(1),
      },
    },
    '& th.MuiTableCell-root': {
      fontWeight: theme.typography.fontWeightBold
    }
  },
  iconPaper: {
    boxShadow: theme.shadows[1]
  },
  bold: {
    fontWeight: theme.typography.h6.fontWeightBold
  }
}));

const JournalDetails = props => {
  const classes = useStyles();

  const { history } = props;

  const handleBack = () => {
    history.goBack();
  }

  console.log("Selected journal data ", props.location.journalDetailsData);
  // console.log("Journal entries ", props.location.journalDetailsData.entries);

  return (
    <div className={classes.root}>
      <Grid container>
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
        <Grid item xs={12} className={classNames(classes.gridMargin)}>
          <Paper square>
            <div className={classes.flex}>
              <div className={classes.status}>
                <Typography>Published</Typography>
              </div>
              <Toolbar>
                <Typography variant="h5" className={classes.bold}>Journal</Typography>
              </Toolbar>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell component="th">Date</TableCell>
                    <TableCell>{moment(props.location.journalDetailsData.dateCreated).format('LLL')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Ref. No.</TableCell>
                    <TableCell>
                      {props.location.journalDetailsData.reference}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} component="th">
                      <Typography >Notes</Typography>
                      <Box my={1}><Typography color="textSecondary"><em>{props.location.journalDetailsData.note}</em></Typography></Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Paper>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Table className={classes.datatable} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell component="th">Account</TableCell>
                <TableCell component="th">Description</TableCell>
                <TableCell component="th">Debit</TableCell>
                <TableCell component="th">Credit</TableCell>
                <TableCell component="th" />
              </TableRow>
            </TableHead>
            <TableBody>
              {props.location.journalDetailsData.entries.map((entry, id) => (
                <TableRow key={id}>
                  <TableCell align="left">
                    {entry.accountId}
                  </TableCell>
                  <TableCell align="left">
                    {entry.description}
                  </TableCell>
                  <TableCell align="left">
                    NGN {entry.debit}
                  </TableCell>
                  <TableCell align="left">
                    NGN {entry.credit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2} align="right">
                  <Typography variant="h6">Total</Typography>
                </TableCell>
                <TableCell>
                  <Paper elevation={0} square className={classes.paper}>
                    <Typography variant="button">
                      NGN {props.location.journalDetailsData.entries.reduce((a, b) => a + Number(b.debit), 0)}
                    </Typography>
                  </Paper>
                </TableCell>
                <TableCell>
                  <Paper elevation={0} square className={classes.paper}>
                    <Typography variant="button">
                      NGN {props.location.journalDetailsData.entries.reduce((a, b) => a + Number(b.credit), 0)}
                    </Typography>
                  </Paper>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
          <Table className={classes.table}>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5} component="th">
                  <Typography variant="subtitle1">Attachments</Typography>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Grid>
      </Grid>
    </div>
  );
};

JournalDetails.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
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
)(JournalDetails);
