import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, MenuItem, Paper, TextField, Toolbar, Typography } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../App/selectors';
import AnnouncementItem from './announcements/AnnouncementItem'
import DataMessage from '../components/DataMessage'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.white
  },
  toolbar: {
    justifyContent: "space-between",
    ...theme.mixins.toolbar
  },
  title: {
    flexGrow: 1
  },
}));

const severity = [
  { label: 'Low', value: 'LOW' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'High', value: 'HIGH' },
  { label: 'Critical', value: 'CRITICAL' },
]

const Announcement = props => {
  const classes = useStyles();
  const { loading, openNewAnnouncementDialog, openAnnouncementViewDialog, announcements } = props;

  const [state, setState] = React.useState({
    announcements,
    search: '',
    severity: '',
    month: moment().format('MM'),
    year: moment().format('YYYY')
  })

  const handleChange = event => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
  }

  const handleDateChange = name => date => {
    setState({ ...state, [name]: name === 'year' ? moment(date).format('YYYY') : moment(date).format('MM') })
  }

  const handleTextChange = (e) => {
    const value = e.target.value;
    let filteredAnnouncements = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      filteredAnnouncements = announcements && announcements.sort().filter(v => regex.test(v.title))
    } else {
      filteredAnnouncements = [...announcements]
    }

    setState((state) => ({
      ...state,
      announcements: filteredAnnouncements,
      search: value
    }))
  }

  console.log(announcements, "announcements")
  console.log(state, "state")

  if (!announcements) {
    return ''
  }

  return (
    <div className={classes.root}>
      <Grid
        container
      >
        <Grid item xs={12}>
          <AppBar position="static" color="inherit" elevation={1}>
            <Toolbar variant="dense">
              <Typography variant="h6" className={classes.title}>
                Announcements
              </Typography>
              <Button variant="contained" color="primary" onClick={openNewAnnouncementDialog}>Add Announcement</Button>
            </Toolbar>
          </AppBar>

          <Toolbar variant="dense" className={classes.toolbar}>
            <TextField
              id="search"
              name="search"
              label="Search announcement"
              value={state.search}
              style={{ minWidth: 200 }}
              onChange={handleTextChange}
              size="small"
              variant="outlined"
              margin="normal"
            />
            <div>
              <TextField
                id="type"
                name="severity"
                placeholder="Severity"
                select
                margin="normal"
                variant="outlined"
                size="small"
                label="Severity"
                style={{ minWidth: 200, marginRight: 2 }}
                value={state.severity}
                onChange={handleChange}
              >
                {severity.map((severe, i) =>
                  <MenuItem key={i} value={severe.value}>
                    {severe.label}
                  </MenuItem>
                )}
              </TextField>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  views={["month"]}
                  inputVariant="outlined"
                  format="MM"
                  margin="normal"
                  style={{ marginRight: 2 }}
                  size="small"
                  name="month"
                  id="month"
                  label="Month"
                  value={state.month}
                  onChange={handleDateChange('month')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  disableFuture
                  views={["year"]}
                  inputVariant="outlined"
                  format="yyyy"
                  margin="normal"
                  size="small"
                  name="year"
                  id="year"
                  label="Year"
                  value={state.year}
                  onChange={handleDateChange('year')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          {state.announcements && state.announcements.length ?
            <Fragment>
              {state.announcements.map((announcement, i) =>
                <AnnouncementItem key={i} announcement={announcement} />
              )}
            </Fragment>
            :
            <DataMessage message="No announcement has been taken yet" />
          }
        </Grid>
      </Grid>
    </div>
  );
};

Announcement.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
  openNewAnnouncementDialog: PropTypes.func,
  openAnnouncementViewDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
  employee: Selectors.makeSelectEmployee(),
  announcements: Selectors.makeSelectAnnouncements(),
  user: AppSelectors.makeSelectCurrentUser(),
  roles: Selectors.makeSelectRoles(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEmployees: () => dispatch(Actions.getEmployees()),
    getEmployee: (uuid) => dispatch(Actions.getEmployee(uuid)),
    openNewAnnouncementDialog: () => dispatch(Actions.openNewAnnouncementDialog()),
    openAnnouncementViewDialog: (data) => dispatch(Actions.openAnnouncementViewDialog(data)),
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
)(Announcement);
