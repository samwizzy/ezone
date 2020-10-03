import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableFooter,
  TableRow,
  Typography,
  Toolbar,
} from '@material-ui/core';
import moment from 'moment';
import _ from 'lodash';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { CircleLoader } from '../../../../components/LoadingIndicator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Selectors from '../selectors';
import * as AccSelectors from '../../selectors';
import ControlledButtons from './components/ControlledButtons'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(2, 0),
  },
  toolbar: {
    ...theme.mixins.toolbar,
    border: `1px dotted ${theme.palette.divider}`
  },
  table: {
    width: '100% !important',
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
      '& td': {
        ...theme.typography.subtitle1,
        color: theme.palette.secondary.contrastText,
      },
      background: theme.palette.primary.main,
    },
    '& td:not(:last-child)': {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
}));

const ChartAccountDetails = props => {
  const classes = useStyles(props);
  const { history, accountSetupData, assetById } = props;

  console.log("Selected assetById", assetById);
  console.log("assetById accountSetupData", accountSetupData);

  const { currency } = accountSetupData;

  if (!assetById) {
    return <CircleLoader />;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <ControlledButtons assetById={assetById} />
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.paper}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell>Asset Name</TableCell>
                  <TableCell>{assetById.assetName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asset ID</TableCell>
                  <TableCell>{assetById.assetId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asset class</TableCell>
                  <TableCell>
                    {assetById.assetType && assetById.assetType.assetClass}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asset type</TableCell>
                  <TableCell>{assetById.assetType && assetById.assetType.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{assetById.description}</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Acquisition Cost</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency ? currency.code : 'NGN' }).format(assetById.aquisitionValue)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper square className={classes.paper}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Manufacturer</TableCell>
                  <TableCell></TableCell>
                  <TableCell component="th">Barcode</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Measurement</TableCell>
                  <TableCell></TableCell>
                  <TableCell component="th">Dimension</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Weight</TableCell>
                  <TableCell></TableCell>
                  <TableCell component="th">Quantity</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Condition</TableCell>
                  <TableCell></TableCell>
                  <TableCell component="th">Location</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Acquisition value</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

ChartAccountDetails.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  assetById: Selectors.makeSelectAssetById(),
  accountSetupData: AccSelectors.makeSelectGetAccountingSetupData(),
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
)(ChartAccountDetails);
