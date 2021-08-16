import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { withRouter, Link } from 'react-router-dom';
import {
  makeStyles,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
} from '@material-ui/core';
import hrDash1 from '../../../../images/hrDash1.jpg';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    borderRadius: theme.shape.borderRadius * 2,
    backgroundImage: `url(${hrDash1})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center bottom`,
    backgroundSize: 'cover',
    '& .MuiCardActions-root': {
      justifyContent: 'center',
      backgroundColor: theme.palette.common.white,
    },
    '& .MuiCardContent-root': {
      minHeight: 160,
      padding: theme.spacing(0, 4, 0, 4),
      display: 'flex',
      alignItems: 'center',
    },
  },
  childTable: {
    listStyle: 'none',
    color: theme.palette.primary.contrastText,
  },
  grid: {
    color: theme.palette.primary.contrastText,
  },
}));

const Widget1 = props => {
  const classes = useStyles();
  const { employees } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Grid container alignItems="center" className={classes.grid}>
            <Grid item xs={3}>
              <Typography variant="h3" color="initial">
                {employees && employees.length}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <ul className={classes.childTable}>
                <li>
                  <Typography variant="subtitle1">Employees</Typography>
                </li>
              </ul>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button component={Link} to="/hr/employees">
            View all employees
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

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
