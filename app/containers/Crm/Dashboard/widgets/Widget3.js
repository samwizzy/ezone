import React from "react"
import {
  makeStyles,
  Box,
  Button,
  Card, CardContent, CardActions, CardHeader,
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
  Typography
} from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    border: `1px solid ${theme.palette.divider}`,
    '& .MuiGrid-item': {
      flex: 1,
      margin: theme.spacing(5)
    }
  },
  card: {
    minheight: 208,
    borderRadius: theme.shape.borderRadius * 4,
    "& .MuiCardHeader-root": {
      textAlign: "center",
      padding: theme.spacing(1),
      fontSize: `${theme.typography.subtitle1.fontSize} !important`,
      borderBottom: `1px solid ${theme.palette.divider}`,
    }
  },
  table: {
    "& td, & th": {
      borderBottom: "none !important",
      fontSize: theme.typography.h6.fontSize
    },
    "& td": {
      color: theme.palette.text.secondary,
    },
  }
}));

const Widget3 = ({ user, schedules }) => {
  const classes = useStyles()

  console.log(schedules, "schedules")
  console.log(user, "currentuser")
  const todaySchedules = schedules && schedules.filter(schedule => moment().diff(schedule.startDate, 'days') === 0)
  const userSchedules = todaySchedules && todaySchedules.filter(schedule => schedule.hostId === user.id)

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          title="Today's Schedule"
          disableTypography
        />
        <CardContent>
          <Table className={classes.table} size="small">
            <TableBody>
              {userSchedules && userSchedules.length > 0 ?
                <React.Fragment>
                  {userSchedules.slice(0, 4).map((schedule, i) =>
                    <TableRow key={i}>
                      <TableCell component="th">
                        <Typography>{schedule.scheduleType}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{moment(moment(schedule.startDate).format('YYY-MM-DD') + ' ' + schedule.startTime).format('HH:mm')}</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
                :
                <TableRow>
                  <TableCell align="center">
                    <Typography>No Schedule Found</Typography>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Widget3
