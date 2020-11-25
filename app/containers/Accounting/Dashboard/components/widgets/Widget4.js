import React from 'react'
import { Link } from 'react-router-dom'
import {
  makeStyles,
  Button,
  Card, CardHeader,
  Table,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    overflowX: 'hidden'
  },
  table: {
    minWidth: 400,
    "& .MuiTableFooter-root": {
      borderTop: `1px solid ${theme.palette.divider} !important`
    },
    "& .MuiTableCell-root": {
      borderBottom: 0
    },
    '& .MuiTableCell-body': {
      color: theme.palette.text.secondary,
      fontSize: theme.typography.fontSize
    },
  }
}));


const Widget4 = ({ accounts, accData }) => {
  const classes = useStyles()
  const currency = accData ? accData.currency : null;

  if (!accounts.length > 0 && !accData) {
    return <Typography>No account is currently available</Typography>
  }

  return (
    <div>
      <Card>
        <CardHeader
          title="Accounts"
          action={<Button size="small" component={Link} to="/account/charts">View all</Button>}
        />
        <Table className={classes.table} size="small">
          <TableBody>
            {accounts.slice(0, 4).map((acc, i) =>
              <TableRow key={i}>
                <TableCell component="th" scope="row">{acc.accountName}</TableCell>
                <TableCell align="right">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: currency ? currency.code : 'NGN' }).format(acc.openingBalance)}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={2}>
                {accounts.length && <Button component={Link} to="/account/charts">{`${accounts.length - 4} more`}</Button>}
              </TableCell>
            </TableRow>
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" color="textSecondary">Total</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" color="textSecondary">
                  {new Intl.NumberFormat('en-NG', { style: 'currency', currency: currency ? currency.code : 'NGN' }).format(accounts.reduce((curVal, b) => curVal + b.openingBalance, 0))}
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </div>
  )
}

export default Widget4
