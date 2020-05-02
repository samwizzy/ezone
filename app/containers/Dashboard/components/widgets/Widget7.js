import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@material-ui/core';

const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

export default class Widget7 extends React.Component {

  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" component="" color="textSecondary">
            Invoices
          </Typography>
          <Doughnut data={data} />
        </CardContent>
      </Card>
    );
  }
}