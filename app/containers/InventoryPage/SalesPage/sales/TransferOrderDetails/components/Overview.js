import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { green, orange } from '@material-ui/core/colors';
import moment from 'moment';
import _ from 'lodash';
import WallpaperIcon from '@material-ui/icons/Wallpaper';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
    position: 'relative',
    overflow: 'hidden',
  },
  table: {
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        fontWeight: theme.typography.fontWeightBold,
      },
    },
    '& .MuiTableCell-root': {
      border: 'none !important',
      '& button:nth-child(n+2)': {
        marginLeft: theme.spacing(1),
      },
    },
    '& th.MuiTableCell-root': {
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
    },
  },
  table2: {
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        fontWeight: theme.typography.fontWeightBold,
      },
    },
  },
  ribbon: {
    backgroundColor: green[500],
    color: theme.palette.common.white,
    fontSize: theme.typography.fontSize - 2,
    padding: theme.spacing(0.5, 2),
    minWidth: '120px',
    '-ms-transform': 'rotate(-45deg)',
    '-webkit-transform': 'rotate(-45deg)',
    '-moz-transform': 'rotate(-45deg)',
    transform: 'rotate(-45deg)',
    position: 'absolute',
    top: '20px',
    left: '-27px',
    textAlign: 'center',
    boxShadow: `0px 7px 8px ${theme.palette.grey[300]}`,
  },
  icon: {
    color: theme.palette.grey[700],
    '&.approved': { color: theme.palette.primary.main },
    '&.inProgress': { color: orange[500] },
    '&.done': { color: green[500] },
  },
}));

const Overview = props => {
  const classes = useStyles(props);
  const { transferOrder } = props;

  console.log(transferOrder, 'transferOrder pverview');

  return (
    <Paper square className={classes.paper}>
      <div className={classes.ribbon}>Special Offer</div>

      {transferOrder ? (
        <div>
          <Table
            className={classes.table}
            size="small"
            aria-label="custom table"
          >
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5">TRANSFER ORDER</Typography>
                  <Typography variant="body2">
                    Transfer order # <strong>{transferOrder.itemName}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Ref no. <strong>{transferOrder.referenceNumber}</strong>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={transferOrder.title}>
                <TableCell component="th" scope="row">
                  DATE
                </TableCell>
                <TableCell align="right">
                  {moment(transferOrder.transferDate).format('Do MMM YY')}
                </TableCell>
              </TableRow>
              <TableRow key={transferOrder.title}>
                <TableCell component="th">CREATED BY</TableCell>
                <TableCell align="right">
                  {transferOrder.transferredBy}
                </TableCell>
              </TableRow>
              <TableRow key={transferOrder.title}>
                <TableCell component="th">
                  <Typography color="textPrimary">Reason</Typography>
                  <span>{transferOrder.reason}</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table
            className={classes.table}
            size="small"
            aria-label="custom table"
          >
            <TableHead>
              <TableRow>
                <TableCell component="th">SOURCE WAREHOUSE</TableCell>
                <TableCell component="th" align="right">
                  DESTINATION WAREHOUSE
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={transferOrder.title}>
                <TableCell component="th" scope="row">
                  {transferOrder.sourceWarehouse}
                </TableCell>
                <TableCell align="right">
                  {transferOrder.destinationWarehouse}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Box p={1} mt={2}>
            <Table
              className={classes.table2}
              size="small"
              aria-label="custom table"
            >
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2} component="th">
                    ITEMS & DESCRIPTION
                  </TableCell>
                  <TableCell component="th" align="right">
                    QUALITY TRANSFERRED
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transferOrder.items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell align="center">
                      <WallpaperIcon />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">{item.name}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      {item.transferredQuantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </div>
      ) : (
        <Skeleton variant="rect" animation="wave" width="100%" height={118} />
      )}
    </Paper>
  );
};

export default withRouter(Overview);
