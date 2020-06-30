import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { withStyles, Button, Card, CardHeader, CardContent, Typography } from '@material-ui/core';

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


export default withStyles(styles)(class Widget8 extends React.Component {

	render() {
		const { classes, attendances } = this.props

		const inTime = attendances && attendances.filter(attd => attd.status === 'PRESENT').length
		const absent = attendances && attendances.filter(attd => attd.gender === 'ABSENT').length
		const late = attendances && attendances.filter(attd => attd.gender === 'LATE').length

		const data = {
			labels: [
				'In Time',
				'Absent',
				'Late'
			],
			datasets: [{
				data: [inTime, absent, late],
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
					{(inTime || absent || late) ?
						<Doughnut data={data} /> :
						<Typography align="center" color="textSecondary">No attendance has been taken</Typography>
					}
				</CardContent>
			</Card>
		);
	}
})