import * as React from 'react';
import {Card, CardContent, CardActions, Paper, Typography} from '@material-ui/core';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from './demo-data/month-appointments';

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: '2018-07-17',
    };
  }

  render() {
    const { data, currentDate } = this.state;

    return (
      <Paper>
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


export default class Widget4 extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" component="" color="textPrimary">
            My Schedules
          </Typography>
          <Demo />
        </CardContent>
      </Card>
    );
  }
}
