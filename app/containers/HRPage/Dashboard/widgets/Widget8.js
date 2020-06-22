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
		'In Time',
		'Absent',
		'Late'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
			'#10C117',
			'#EB4D65',
			'#FCD81C'
		],
		hoverBackgroundColor: [
			'#10C117',
			'#EB4D65',
			'#FCD81C'
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