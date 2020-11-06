import React, { memo } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../../utils/EzoneUtils';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Box,
  Chip,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableFooter,
  Toolbar,
} from '@material-ui/core';
import classNames from 'classnames';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { green, red, yellow, grey } from '@material-ui/core/colors';
import { CircleLoader } from '../../../../../components/LoadingIndicator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from './../../actions';
import * as Selectors from './../../selectors';
import * as PayrollSelectors from './../../../selectors';
import moment from 'moment';
import _ from 'lodash';
import ControlledButtons from './components/ControlledButtons'
import { statuses } from '../../enums'
import { NumberFormat } from 'intl';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    position: "relative",
    padding: theme.spacing(8, 1, 2, 1),
  },
  ribbon: {
    textAlign: "center",
    padding: theme.spacing(0, 3),
    height: '52px',
    '& p': { lineHeight: '52px' },
    position: "absolute",
    '&.pending': {
      backgroundColor: green[500],
      "&::after": { borderTop: `52px solid ${green[500]}` },
      "&::before": { borderBottom: `52px solid ${green[500]}` },
    },
    '&.rejected': {
      backgroundColor: red[500],
      "&::after": { borderTop: `52px solid ${red[500]}` },
      "&::before": { borderBottom: `52px solid ${red[500]}` },
    },
    '&.submitted': {
      backgroundColor: yellow[500],
      "&::after": { borderTop: `52px solid ${yellow[500]}` },
      "&::before": { borderBottom: `52px solid ${yellow[500]}` },
    },
    '&.drafted': {
      backgroundColor: grey[500],
      "&::after": { borderTop: `52px solid ${grey[500]}` },
      "&::before": { borderBottom: `52px solid ${grey[500]}` },
    },
    color: theme.palette.secondary.contrastText,
    top: 0, left: 0,
    "&::after": {
      content: "''",
      position: "absolute",
      top: 0,
      right: "-52px",
      width: 0,
      height: 0,
      borderRight: "52px solid transparent"
    },
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      right: "-52px",
      width: 0,
      height: 0,
      borderRight: "52px solid transparent"
    },
  },
  paper: {
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
  },
  gridItem: { marginBottom: theme.spacing(2) },
  label: { marginLeft: theme.spacing(1) },
  title: { flexGrow: 1 },
  table: {
    display: 'flex',
    overflowX: 'hidden',
    "& td, & th": {
      border: 0,
      ...theme.typography.body2,
    },
    '& th': { fontWeight: 'bold' }
  },
  datatable: {
    width: '100% !important',
    marginTop: theme.spacing(1),
    '& thead': {
      '& th': {
        color: theme.palette.secondary.contrastText,
      },
      '& th:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& th:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
    '& tfoot': {
      '& td': theme.typography.subtitle1
    },
    '& td': {
      '& button:nth-child(n+2)': {
        marginLeft: theme.spacing(1),
      },
    },
  },
  total: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    minWidth: 202,
    display: 'inline-flex'
  },
  toolbar: {
    padding: theme.spacing(1, 2),
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}));

const JournalDetails = props => {
  const classes = useStyles();
  const { history, allowanceData, allowances, payrollSetupData } = props;


  if (!allowanceData) {
    return <CircleLoader />
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classNames(classes.gridItem)}>
          <ControlledButtons journal={allowanceData} />
        </Grid>
        <Grid item xs={12} className={classNames(classes.gridItem)}>
          <Paper square className={classes.flex}>
            <div className={classNames(classes.ribbon, { [allowanceData.status.toLowerCase()]: true })}>
              <Typography>{_.find(statuses, { value: allowanceData.status }).label}</Typography>
            </div>

            <Toolbar variant="dense" className={classes.toolbar}>
              <Typography variant="h5">Journal</Typography>
            </Toolbar>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Date</TableCell>
                  <TableCell>{moment(allowanceData.dateCreated).format('LLL')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Ref. No.</TableCell>
                  <TableCell>{allowanceData.reference}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Currency</TableCell>
                  <TableCell>{allowanceData.currency ? allowanceData.currency.code : (currency && currency.code)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Exchange rate</TableCell>
                  <TableCell>{allowanceData.exchangeRate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} component="th">
                    <Typography gutterBottom variant="inherit">Notes</Typography>
                    <Typography color="textSecondary"><em>{allowanceData.note}</em></Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {allowanceData.entries.map((entry, id) => (
                <TableRow key={id}>
                  <TableCell>{_.find(allowances, { id: entry.accountId }) && _.find(allowances, { id: entry.accountId }).accountName}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>
                    {EzoneUtils.formatCurrency(entry.debit * (allowanceData.exchangeRate || 1), currency && currency.code)}
                  </TableCell>
                  <TableCell>
                    {EzoneUtils.formatCurrency(entry.credit * (allowanceData.exchangeRate || 1), currency && currency.code)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2} align="right">Total</TableCell>
                <TableCell>
                  <Paper elevation={0} className={classes.paper}>
                    {EzoneUtils.formatCurrency(allowanceData.entries.reduce((a, b) => a + Number(b.debit), 0) * (allowanceData.exchangeRate || 1), currency && currency.code)}
                  </Paper>
                </TableCell>
                <TableCell>
                  <Paper elevation={0} className={classes.paper}>
                    {EzoneUtils.formatCurrency(allowanceData.entries.reduce((a, b) => a + Number(b.credit), 0) * (allowanceData.exchangeRate || 1), currency && currency.code)}
                  </Paper>
                </TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} align="right">Tax amount</TableCell>
                <TableCell>
                  <Paper elevation={0} className={classes.paper}>
                    {EzoneUtils.formatCurrency(allowanceData.taxtTotal, currency && currency.code)}
                  </Paper>
                </TableCell>
                <TableCell colSpan={2} />
              </TableRow>
            </TableFooter>
          </Table>

          <Box my={2}>
            <Chip
              icon={<CropOriginalIcon />}
              label={allowanceData.attachments && `${allowanceData.attachments.length} attachments`}
              variant="outlined"
            />
          </Box>

        </Grid>
      </Grid>
    </div>
  );
};

JournalDetails.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  allowanceData: Selectors.makeSelectAllowanceData(),
  allowances: Selectors.makeSelectAllowances(),
  payrollSetupData: PayrollSelectors.makeSelectGetPayrollSetupData(),
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
