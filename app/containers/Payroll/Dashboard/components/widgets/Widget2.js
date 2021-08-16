import React from 'react';
import EzoneUtils from '../../../../../utils/EzoneUtils';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {
  makeStyles,
  Button,
  Card,
  CardHeader,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    overflowX: 'hidden',
  },
  table: {
    minWidth: 400,
    '& .MuiTableCell-root': {
      border: 0,
    },
    '& .MuiTableCell-body': {
      color: theme.palette.text.secondary,
    },
  },
}));

const Widget2 = ({ accounts, accData }) => {
  const classes = useStyles();
  const payablesAccounts = _.filter(
    accounts,
    account => account.accountType && account.accountType.id === 7,
  );

  if (!payablesAccounts && !accData) {
    return <Typography>There are currently no payables</Typography>;
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          titleTypographyProps={{ variant: 'subtitle1' }}
          title="Recent pay runs"
          subheader=""
        />

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell component="th">Pay period</TableCell>
              <TableCell component="th">Ref code</TableCell>
              <TableCell component="th">Payment date</TableCell>
              <TableCell component="th">Employees</TableCell>
              <TableCell component="th">Payment</TableCell>
              <TableCell component="th">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.range(0, 3).map((item, i) => (
              <TableRow key={i}>
                <TableCell>1st Jul 2019 - 30th July 2019</TableCell>
                <TableCell>0900000</TableCell>
                <TableCell>10</TableCell>
                <TableCell>30th March 2019</TableCell>
                <TableCell>N 100,000</TableCell>
                <TableCell>Approved</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Widget2;
