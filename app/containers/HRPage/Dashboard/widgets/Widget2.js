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
import hrDash3 from '../../../../images/hrDash3.jpg';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    borderRadius: theme.shape.borderRadius * 2,
    backgroundImage: `url(${hrDash3})`,
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

const Widget2 = props => {
  const classes = useStyles();
  const { departments } = props;

  if (!departments) {
    return '';
  }

  console.log(departments, 'departments');

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Grid container alignItems="center" className={classes.grid}>
            <Grid item xs={3}>
              <Typography variant="h3" color="initial">
                {departments && departments.length}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <ul className={classes.childTable}>
                {departments.length > 0 &&
                  departments.slice(0, 4).map((dept, i) => (
                    <li key={i}>
                      <Typography variant="subtitle1">{dept.name}</Typography>
                    </li>
                  ))}
              </ul>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button component={Link} to="/hr/departments">
            View all departments
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
)(Widget2);
