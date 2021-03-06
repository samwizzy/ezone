import React, { Fragment, memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Toolbar,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CircleLoader } from '../../../components/LoadingIndicator';
import moment from 'moment';
import _ from 'lodash';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import { Title } from '../../../components';
import AnnouncementItem from './announcements/AnnouncementItem';
import DataMessage from '../components/DataMessage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    borderTop: `1px solid ${theme.palette.divider}`,
    justifyContent: 'space-between',
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
}));

const severity = [
  { label: 'Low', value: 'LOW' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'High', value: 'HIGH' },
  { label: 'Critical', value: 'CRITICAL' },
];

const Announcement = props => {
  const classes = useStyles();
  const {
    loading,
    openNewAnnouncementDialog,
    openAnnouncementViewDialog,
    announcements,
    getAnnouncementById,
  } = props;

  const orderedAnnouncements = _.orderBy(announcements, 'dateCreated', 'desc');

  const [state, setState] = useState({
    announcements,
    search: '',
    severity: '',
    month: moment().format('MM'),
    year: moment().format('YYYY'),
  });

  useEffect(() => {
    console.log(moment('2020-10-20').diff(moment()), 'moment diff');
    setState(state => ({ ...state, announcements: orderedAnnouncements }));
  }, [announcements]);

  const handleChange = event => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleDateChange = name => date => {
    setState({
      ...state,
      [name]:
        name === 'year'
          ? moment(date).format('YYYY')
          : moment(date).format('MM'),
    });
  };

  const handleTextChange = e => {
    const value = e.target.value;
    let filteredAnnouncements = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      filteredAnnouncements =
        orderedAnnouncements &&
        orderedAnnouncements.sort().filter(v => regex.test(v.title));
    } else {
      filteredAnnouncements = [...orderedAnnouncements];
    }

    setState(state => ({
      ...state,
      announcements: filteredAnnouncements,
      search: value,
    }));
  };

  console.log(announcements, 'announcements');

  if (loading) {
    return <CircleLoader />;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static" color="inherit" elevation={0}>
            <Toolbar variant="regular">
              <Title className={classes.title}>Announcements</Title>
              <Button
                variant="contained"
                disableElevation
                color="primary"
                onClick={openNewAnnouncementDialog}
              >
                Add Announcement
              </Button>
            </Toolbar>
          </AppBar>

          <Toolbar
            variant="dense"
            className={classes.toolbar}
            component={Paper}
            elevation={0}
            square
          >
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
                style={{ minWidth: 200, marginRight: 4 }}
                value={state.severity}
                onChange={handleChange}
              >
                {severity.map((severe, i) => (
                  <MenuItem key={i} value={severe.value}>
                    {severe.label}
                  </MenuItem>
                ))}
              </TextField>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  views={['month']}
                  inputVariant="outlined"
                  format="MM"
                  margin="normal"
                  style={{ minWidth: 200, marginRight: 3 }}
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
                  views={['year']}
                  inputVariant="outlined"
                  format="yyyy"
                  margin="normal"
                  style={{ minWidth: 200 }}
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
          {state.announcements && state.announcements.length ? (
            <Fragment>
              {state.announcements.map((announcement, i) => (
                <AnnouncementItem
                  key={i}
                  announcement={announcement}
                  getAnnouncementById={getAnnouncementById}
                />
              ))}
            </Fragment>
          ) : (
            <DataMessage message="No announcement has been taken yet" />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

Announcement.propTypes = {
  loading: PropTypes.bool,
  openNewAnnouncementDialog: PropTypes.func,
  openAnnouncementViewDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  announcements: Selectors.makeSelectAnnouncements(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAnnouncementById: id => dispatch(Actions.getAnnouncementById(id)),
    openNewAnnouncementDialog: () =>
      dispatch(Actions.openNewAnnouncementDialog()),
    openAnnouncementViewDialog: data =>
      dispatch(Actions.openAnnouncementViewDialog(data)),
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
