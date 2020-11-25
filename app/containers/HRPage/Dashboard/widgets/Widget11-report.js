import React from 'react';
import { Pie } from 'react-chartjs-2';
import { withStyles, Card, CardContent, CardHeader, Button } from '@material-ui/core'

const styles = theme => ({
  root: {
    borderRadius: theme.shape.borderRadius * 2,
    "& .MuiCardHeader-root": {
      "& .MuiTypography-root": {
        fontSize: theme.typography.subtitle1.fontSize
      }
    }
  },
})

export default withStyles(styles)(class Widget11 extends React.Component {
  render() {
    const { classes, employees } = this.props

    const male = employees && employees.filter(emp => emp.gender === 'Male').length
    const female = employees && employees.filter(emp => emp.gender === 'Female').length
    const notSpecified = employees && employees.filter(emp => (emp.gender !== 'Male' && emp.gender !== 'Female')).length

    const data = {
      labels: [
        'Male',
        'Female',
        'Not Specified'
      ],
      datasets: [{
        data: [male, female, notSpecified],
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

    return (
      <Card className={classes.root}>
        <CardContent>
          <Pie data={data} height={100} />
        </CardContent>
      </Card>
    );
  }
})
