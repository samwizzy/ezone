import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
      borderRadius: theme.shape.borderRadius * 2,
      "& .MuiCardHeader-root": {
          padding: theme.spacing(1),
          justifyContent: "center",
          "& .MuiTypography-root": {
              fontSize: theme.typography.h6.fontSize
          }
      }
  }
}));

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

export default class Widget4 extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" component="" color="textSecondary">
            My Schedules
          </Typography>
          <Line data={data} />
        </CardContent>
      </Card>
    );
  }
}
