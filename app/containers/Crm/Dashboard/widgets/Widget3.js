import React from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Divider,
  List,
  Paper,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    borderRadius: theme.shape.borderRadius,
    '& .MuiCardHeader-root': {
      textAlign: 'center',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .MuiCardActions-root': {
      justifyContent: 'center',
      backgroundColor: theme.palette.common.white,
      fontSize: theme.typography.subtitle1.fontSize,
    },
    '& .MuiCardContent-root': {
      minHeight: `calc(180px - 51.4px)`,
    },
  },
  table: {
    minWidth: '200px',
    '& td, & th': {
      borderBottom: 'none !important',
      fontSize: theme.typography.h6.fontSize,
    },
    '& td': {
      color: theme.palette.text.secondary,
    },
  },
}));

const Widget3 = ({ user, schedules }) => {
  const classes = useStyles();

  console.log(schedules, 'schedules');
  console.log(user, 'currentuser');
  const todaySchedules =
    schedules &&
    schedules.filter(
      schedule => moment().diff(schedule.startDate, 'days') === 0,
    );
  const userSchedules =
    todaySchedules &&
    todaySchedules.filter(schedule => schedule.hostId === user.id);

  return (
    <Card className={classes.card}>
      <CardHeader title="Today's Schedule" disableTypography />
      <CardContent>
        <Table className={classes.table} size="small">
          <TableBody>
            {userSchedules && userSchedules.length > 0 ? (
              <React.Fragment>
                {userSchedules.slice(0, 4).map((schedule, i) => (
                  <TableRow key={i}>
                    <TableCell component="th">
                      <Typography>{schedule.title}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>
                        {moment(schedule.startDate).format('HH:mm')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ) : (
              <TableRow>
                <TableCell align="center">
                  <Typography>No Schedule Found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <Divider />

      <CardActions>
        <Button component={Link} to="/crm/schedules/list">
          View All Schedules
        </Button>
      </CardActions>
    </Card>
  );
};

export default Widget3;
