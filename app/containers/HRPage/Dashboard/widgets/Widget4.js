import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, Link } from 'react-router-dom';
import {
  makeStyles,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import crmDash from '../../../../images/crmDash.jpg';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    borderRadius: theme.shape.borderRadius * 2,
    backgroundImage: `url(${crmDash})`,
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

const Widget4 = props => {
  const classes = useStyles();
  const { roles } = props;

  if (!roles) {
    return '';
  }

  console.log(roles, 'roles');

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Grid container alignItems="center" className={classes.grid}>
            <Grid item xs={3}>
              <Typography variant="h3" color="initial">
                {roles && roles.length}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <ul className={classes.childTable}>
                {roles.length > 0 &&
                  roles.slice(0, 4).map((role, i) => (
                    <li key={i}>
                      <Typography variant="subtitle1">{role.name}</Typography>
                    </li>
                  ))}
              </ul>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button component={Link} to="/hr/roles">
            View all roles
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  departments: Selectors.makeSelectDepartments(),
  employees: Selectors.makeSelectEmployees(),
  employee: Selectors.makeSelectEmployee(),
  user: AppSelectors.makeSelectCurrentUser(),
  departments: Selectors.makeSelectDepartmentsByOrgIdApi(),
  branches: Selectors.makeSelectBranches(),
  roles: Selectors.makeSelectRoles(),
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
)(Widget4);
