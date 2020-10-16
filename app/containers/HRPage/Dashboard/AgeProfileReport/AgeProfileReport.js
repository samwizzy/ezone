import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Breadcrumbs, IconButton, Link, MenuItem, Tooltip, TextField, Grid, Typography, Toolbar } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import MUIDataTable from 'mui-datatables'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import { Widget12_Report } from '../widgets'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1
  },
  paper: {
    margin: theme.spacing(1, 0)
  },
  toolbar: theme.mixins.toolbar,
  datatable: {
    '& thead': {
      '& th': {
        color: theme.palette.common.white,
      },
      '& th:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& th:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
}));

const groups = ['Department', 'Branch', 'Roles', 'Location'];

const AgeProfileReport = props => {
  const classes = useStyles();
  const { loading, history } = props;
  const [group, setGroup] = React.useState('')

  const handleChange = event => setGroup(event.target.value)

  const columns = [
    {
      name: 'uuId',
      label: 'Id',
      options: {
        display: 'excluded',
        filter: true,
      },
    },
    {
      name: 'name',
      label: 'Department name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'employees',
      label: 'Employee count',
      options: {
        filter: true,
        sort: true,
        customBodyRender: employees => {
          return <span>{employees && employees.length}</span>
        }
      },
    },
    {
      name: 'dateCreated',
      label: 'Created',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => value ? moment(value).format('lll') : ''
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () =>
      <TextField
        id="group-select"
        size="small"
        select
        label="Filter By"
        name="group"
        value={group}
        variant="outlined"
        onChange={handleChange}
        style={{ width: 250 }}
      >
        {groups.map((group, i) =>
          <MenuItem key={i} value={group}>
            {group}
          </MenuItem>
        )}
      </TextField>,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    elevation: 0
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static" color="inherit" elevation={1}>
            <Toolbar variant="dense">
              <Tooltip title="Back to Dashboard">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                  <Link color="inherit" onClick={() => history.push('/hr/dashboard')}>
                    <IconButton onClick={() => history.push('/hr/dashboard')}>
                      <ArrowBackIcon className={classes.icon} />
                    </IconButton>
                  </Link>
                  <Typography variant="subtitle1" color="textPrimary" className={classes.title}>
                    Age Profile Report
                  </Typography>
                </Breadcrumbs>
              </Tooltip>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item md={12}>
          <Widget12_Report />
        </Grid>
        <Grid item md={12}>
          <div className={classes.paper}>
            <MUIDataTable
              className={classes.datatable}
              title=" "
              data={[]}
              columns={columns}
              options={options}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

AgeProfileReport.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(AgeProfileReport);
