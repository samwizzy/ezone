import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { withRouter, Link } from 'react-router-dom';
import {
  makeStyles,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  List,
  Paper,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import hrDash2 from '../../../../images/hrDash2.jpg';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    borderRadius: theme.shape.borderRadius * 2,
    backgroundImage: `url(${hrDash2})`,
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

const Widget3 = props => {
  const classes = useStyles();
  const { branches } = props;

  if (!branches) {
    return '';
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Grid container alignItems="center" className={classes.grid}>
            <Grid item xs={3}>
              <Typography variant="h3" color="initial">
                {branches && branches.length}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <ul className={classes.childTable}>
                {branches.length > 0 &&
                  branches.slice(0, 4).map((branch, i) => (
                    <li key={i}>
                      <Typography variant="subtitle1">{branch.name}</Typography>
                    </li>
                  ))}
              </ul>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button component={Link} to="/hr/branches">
            View all branches
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
)(Widget3);
