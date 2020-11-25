import React, { memo } from "react"
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { withRouter, Link } from "react-router-dom"
import {
  makeStyles,
  Button,
  Card,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography
} from '@material-ui/core';
import hrDash1 from '../../../../images/hrDash1.jpg'
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    borderRadius: theme.shape.borderRadius * 2,
    backgroundImage: `url(${hrDash1})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center bottom`,
    backgroundSize: 'cover',
    "& .MuiCardActions-root": {
      justifyContent: "center",
      backgroundColor: theme.palette.secondary.contrastText,
    },
    "& .MuiCardContent-root": {
      minHeight: 160,
      display: 'flex',
      alignItems: 'center',
    }
  },
  table: {
    minWidth: 280,
    whiteSpace: "nowrap",
    "& th, & td": {
      border: 0,
      color: theme.palette.common.white,
    },
  }
}));


const Widget1 = (props) => {
  const classes = useStyles()
  const { employees } = props

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Table className={classes.table} size="small">
            <TableBody>
              <TableRow>
                <TableCell component="th">
                  <Typography variant="h3">{employees && employees.length}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Employees</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <CardActions>
          <Button component={Link} to='/hr/employees'>
            View All Employees
					</Button>
        </CardActions>
      </Card>
    </div>
  )
}


const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
  user: AppSelectors.makeSelectCurrentUser(),
  departments: Selectors.makeSelectDepartmentsByOrgIdApi(),
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
)(Widget1);
