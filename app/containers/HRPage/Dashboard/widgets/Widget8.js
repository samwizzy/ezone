import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { withStyles, Button, Card, CardHeader, CardContent } from '@material-ui/core';

const styles = theme => ({
	root: {
		borderRadius: theme.shape.borderRadius * 2,
		"& .MuiCardHeader-root": {
			"& .MuiTypography-root": {
				fontSize: theme.typography.subtitle1.fontSize
			}
		}
	},
});

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

export default withStyles(styles)(class Widget8 extends React.Component {

	render() {
		const { classes } = this.props

		return (
			<Card className={classes.root}>
				<CardHeader
					action={
						<Button color="primary" aria-label="settings">
							see all
                    </Button>
					}
					title="Attendance"
				/>
				<CardContent>
					<Doughnut data={data} />
				</CardContent>
			</Card>
		);
	}
})