/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Card, CardHeader, CardContent,
  Grid,
  Button,
  Table, TableBody, TableRow, TableCell,
  Toolbar,
  Typography,
  Paper
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
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
      backgroundImage: `linear-gradient(to bottom, ${blue[50]}, #fff 80%, ${blue[50]})`,
      '& .MuiGrid-item': {
        flex: 1,
      }
    }
  },
  table: {
    "& th.MuiTableCell-root": {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.h6.fontSize
    },
    "& .MuiTableCell-root": {
      border: "0 !important",
      fontSize: theme.typography.subtitle1.fontSize
    }
  },
  card: {
    "& .MuiCardHeader-root": {
      borderBottom: `1px solid ${theme.palette.divider}`
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
  }
}));

const SchedulesList = props => {
  const classes = useStyles();
  const { loading } = props;

  useEffect(() => {}, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>Schedules</Typography>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} disableElevation>Create New Schedule</Button>
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={8}>
              <Schedules />
            </Grid>
            <Grid item xs={4}>
              <Card className={classes.card}>
                <CardHeader title="Today's Schedule" subheader="" />

                <CardContent>
                  <Paper className={classes.paper}>
                    <Table className={classes.table}>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th">Daily Stand-Up</TableCell>
                          <TableCell component="th">8:00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2}>Invite team members for Skype meeting</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Paper>
                  <Paper className={classes.paper}>
                    <Table className={classes.table}>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th">Daily Stand-Up</TableCell>
                          <TableCell component="th">8:00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2}>Invite team members for Skype meeting</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <ScheduleDialog />
      <ParticipantDialog />
    </div>
  );
};

SchedulesList.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
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
