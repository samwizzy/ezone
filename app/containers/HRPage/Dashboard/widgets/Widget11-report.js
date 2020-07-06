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

const data = {
	labels: [
		'Red',
		'Blue',
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

export default withStyles(styles)(class Widget11 extends React.Component {
	render() {
		const { classes } = this.props

		return (
			<Card className={classes.root}>
				<CardContent>
					<Pie data={data} height={100} />
				</CardContent>
			</Card>
		);
	}
})