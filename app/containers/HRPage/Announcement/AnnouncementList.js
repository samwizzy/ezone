import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Button, Grid, MenuItem, Paper, TextField, Toolbar, Typography } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../App/selectors';
import { AddAnnouncement } from '../components/AddButton'
import AnnouncementItem from './announcements/AnnouncementItem'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.white
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1
  }
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
    setState({ ...state, [name]: moment(date).format('YYYY') })
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
          <Toolbar variant="dense">
            <TextField
              id="search"
              name="search"
              label="Search announcement"
              value={state.search}
              size="small"
              variant="outlined"
              margin="normal"
            />
            <TextField
              id="type"
              name="severity"
              placeholder="Severity"
              select
              margin="normal"
              variant="outlined"
              size="small"
              label="Severity"
              style={{ minWidth: 200 }}
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
                inputVariant="outlined"
                format="dd/MM/yyyy"
                margin="normal"
                fullWidth
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
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          {announcements && announcements.map((announcement, i) =>
            <AnnouncementItem key={i} announcement={announcement} />
          )}
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
