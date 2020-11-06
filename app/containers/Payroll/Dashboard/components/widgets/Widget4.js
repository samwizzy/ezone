import React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core'
import { Bar } from 'react-chartjs-2';
import color from 'rcolor';

const initialState = {
  labels: ['0 - 75k', '75 - 150k', '150 - 200k', '200 - 300k', '300 - 500k'],
  datasets: [
    {
      label: 'Salary Range',
      backgroundColor: 'rgba(255,255,65,0.2)',
      borderColor: 'rgba(255,255,65,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,255,65,0.4)',
      hoverBorderColor: 'rgba(255,255,65,1)',
      data: [75, 150, 200, 300, 500, 0]
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


export default class Widget4 extends React.Component {

  render() {
    return (
      <Card>
        <CardHeader
          titleTypographyProps={{ variant: 'subtitle1' }}
          title="Salary Range"
        />
        <CardContent>
          <Graph />
        </CardContent>
      </Card>
    );
  }
}
