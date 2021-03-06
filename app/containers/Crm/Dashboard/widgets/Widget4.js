import * as React from 'react';
import { withStyles, Card, CardContent, CardHeader, CardActions, Paper, Typography } from '@material-ui/core';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';

import { appointments } from './demo-data/month-appointments';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: { padding: 0 },
  card: {
    borderRadius: theme.shape.borderRadius * 4,
    "& .MuiCardHeader-root": {
      padding: theme.spacing(2),
      fontSize: `${theme.typography.subtitle1.fontSize} !important`,
      borderBottom: `1px solid ${theme.palette.divider}`,
      "& .MuiTypography-root": {
        fontSize: theme.typography.subtitle1.fontSize
      }
    }
  },
})

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    const options = props.schedules.map(function (row) {
      return { title: row.scheduleType, startDate: moment(row.startDate).format('YYYY-MM-DD'), endDate: moment(row.endDate).format('YYYY-MM-DD') }
    })

    this.state = {
      data: options, // appointments,
      currentDate: moment().format('YYYY-MM-DD'),
    };
  }

  render() {
    const { data, currentDate } = this.state;

    return (
      <Paper elevation={0}>
        <Scheduler
          data={data}
          width="100%"
        >
          <ViewState
            currentDate={currentDate}
          />
          <MonthView />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
}

export default withStyles(styles)(class Widget4 extends React.Component {
  render() {
    const { classes, schedules } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          title="My Schedules"
        />
        <CardContent classes={{ root: classes.paper }}>
          <Demo schedules={schedules} />
        </CardContent>
      </Card>
    );
  }
})
