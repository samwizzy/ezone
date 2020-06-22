import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom'
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
	labels: ['18 - 25 yrs', '26 - 35 yrs', '36 - 45 yrs', '46 - 55 yrs', '56 - 65 yrs'],
	datasets: [
		{
			label: 'Age Profile dataset',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [65, 59, 80, 81, 56]
		}
	]
};

export default withStyles(styles)(class Widget12 extends React.Component {
	render() {
		const { classes, employees } = this.props

		const age18_25 = employees && employees.filter(emp => emp.age >= 18 && emp.age <= 25).length
		const age26_35 = employees && employees.filter(emp => emp.age >= 26 && emp.age <= 35).length
		const age36_45 = employees && employees.filter(emp => emp.age >= 36 && emp.age <= 45).length
		const age46_55 = employees && employees.filter(emp => emp.age >= 46 && emp.age <= 55).length
		const age56_65 = employees && employees.filter(emp => emp.age >= 56 && emp.age <= 65).length

		return (
			<Card className={classes.root}>
				<CardHeader
					action={
						<Button color="primary" aria-label="settings" component={Link} to="/hr/dashboard/age-report">
							view report
						</Button>
					}
					title="Age Profile"
				/>
				<CardContent>
					<Bar
						data={data}
						width={100}
						height={230}
						options={{
							maintainAspectRatio: false
						}}
					/>
				</CardContent>
			</Card>
		);
	}
})
