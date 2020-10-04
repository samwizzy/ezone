import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Card, CardContent, CardMedia, CardActionArea,
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
import PanoramaIcon from '@material-ui/icons/Panorama';
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
  card: {
    margin: theme.spacing(2, 0),
    maxWidth: '100%',
    '& .MuiCardMedia-root': {
      height: 180,
      backgroundSize: 'contain'
    }
  },
  media: {
    height: 140,
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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <ControlledButtons assetById={assetById} />
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.card} square>
            <CardMedia
              className={classes.media}
              image={!assetById.image ? assetById.image.fileUrl : "https://www.flaticon.com/svg/static/icons/svg/3004/3004662.svg"}
              title={assetById.image ? assetById.image.fileName : ""}
            />
            <CardContent>
              {assetById.image ?
                <Typography variant="subtitle1" component="h2">
                  {assetById.image ? assetById.image.fileName : ""}
                </Typography>
                :
                <Typography variant="subtitle1" component="h2">
                  This asset does not have an attachment
              </Typography>
              }
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
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
                  <TableCell>{assetById.manufacturer}</TableCell>
                  <TableCell component="th">Barcode</TableCell>
                  <TableCell>{assetById.barcode}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Measurement</TableCell>
                  <TableCell>{assetById.measurement}</TableCell>
                  <TableCell component="th">Dimension</TableCell>
                  <TableCell>{assetById.width}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Weight</TableCell>
                  <TableCell>{assetById.weigth}</TableCell>
                  <TableCell component="th">Quantity</TableCell>
                  <TableCell>{assetById.quantity}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Condition</TableCell>
                  <TableCell>{assetById.assetCondition}</TableCell>
                  <TableCell component="th">Location</TableCell>
                  <TableCell>{assetById.location}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Acquisition value</TableCell>
                  <TableCell>{assetById.aquisitionValue}</TableCell>
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
