import React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core'
import { Bar } from 'react-chartjs-2';
import color from 'rcolor';

const initialState = {
  labels: ['Accountant', 'Budget Analyst', 'Stock Broker', 'Chief Finance Officer', 'Payroll Administrator'],
  datasets: [
    {
      label: 'Salary by Department',
      backgroundColor: 'rgba(0,0,125,0.2)',
      borderColor: 'rgba(0,0,125,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(0,0,125,0.4)',
      hoverBorderColor: 'rgba(0,0,125,1)',
      data: [550, 200, 400, 600, 800, 0]
    }
  ]
};

class Graph extends React.Component {
  componentWillMount() {
    this.setState(initialState);
  }
  componentDidMount() {

  }

  render() {
    return (
      <Bar data={this.state} />
    );
  }
}

export default class Widget3 extends React.Component {

  render() {
    return (
      <Card>
        <CardHeader
          titleTypographyProps={{ variant: 'subtitle1' }}
          title="Salary by Department"
        />
        <CardContent>
          <Graph />
        </CardContent>
      </Card>
    );
  }
}
