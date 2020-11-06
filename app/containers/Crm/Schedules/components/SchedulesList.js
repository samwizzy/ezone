/* eslint-disable prettier/prettier */
import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Backdrop,
  CircularProgress,
  Card, CardHeader, CardContent,
  Grid,
  Button,
  Table, TableBody, TableRow, TableCell,
  Toolbar,
  Typography,
  Paper
} from '@material-ui/core';
import moment from 'moment'
import _ from 'lodash'
import AddIcon from '@material-ui/icons/Add';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import InfoIcon from '@material-ui/icons/Info';
import { blue } from '@material-ui/core/colors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import ScheduleDialog from './ScheduleDialog';
import ParticipantDialog from './ParticipantDialog';
import CalendarEvent from './CalendarEvent';
import Schedules from './Schedules';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    justifyContent: "space-between",
    "& .MuiGrid-container": {
      // backgroundImage: `linear-gradient(to bottom, ${blue[50]}, #fff 80%, ${blue[50]})`,
      '& .MuiGrid-item': {
        flex: 1,
      }
    }
  },
  table: {
    "& th": {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.h6.fontSize
    },
    "& th:last-child": {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.h6.fontSize,
      whiteSpace: 'nowrap'
    },
    "& td": {
      border: "0 !important",
      fontSize: theme.typography.subtitle1.fontSize
    },
  },
  card: {
    "& .MuiCardHeader-root": {
      borderBottom: `1px solid ${theme.palette.divider}`,
      "& .MuiTypography-root": {
        fontSize: theme.typography.h6.fontSize
      }
    }
  },
  paper: {
    borderRadius: theme.shape.borderRadius * 4,
    backgroundColor: theme.palette.grey[50],
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    boxShadow: theme.shadows[0]
  },
  title: {
    flexGrow: 1
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

const SchedulesList = props => {
  const classes = useStyles();
  const { loading, openNewScheduleDialog, schedules, employees } = props;

  console.log(schedules, "schedules list")

  const orderedSchedules = schedules && _.orderBy(schedules, ['dateCreated'], ['desc'])
  const todaySchedules = orderedSchedules && orderedSchedules.filter(schedule => moment().diff(schedule.startDate, 'days') === 0)

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>Schedules</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              disableElevation
              onClick={openNewScheduleDialog}
            >
              Create New Schedule
            </Button>
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Schedules schedules={schedules} employees={employees} />
            </Grid>
            <Grid item xs={4}>
              <Card className={classes.card} elevation={0}>
                <CardHeader title="Today's Schedule" subheader="" />

                <CardContent>
                  {todaySchedules && todaySchedules.length > 0 ?
                    <Fragment>
                      {todaySchedules && todaySchedules.map((schedule, i) =>
                        <Paper key={i} className={classes.paper}>
                          <Table className={classes.table}>
                            <TableBody>
                              <TableRow>
                                <TableCell component="th">{schedule.title}</TableCell>
                                <TableCell component="th">{moment(schedule.startDate).format('HH:mm')}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell colSpan={2}>{schedule.description}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Paper>
                      )}
                    </Fragment>
                    :
                    <Paper className={classes.paper}>
                      <Typography variant="subtitle1" color="textSecondary">
                        <InfoIcon />&nbsp;
                        There are no schedules today
                      </Typography>
                    </Paper>
                  }
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* <ScheduleDialog /> */}
      <ParticipantDialog />
    </div>
  );
};

SchedulesList.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  schedules: Selectors.makeSelectSchedules(),
  employees: Selectors.makeSelectEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewScheduleDialog: () => dispatch(Actions.openNewScheduleDialog()),
    openNewParticipantDialog: () => dispatch(Actions.openNewParticipantDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SchedulesList);
